from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from pydantic import BaseModel
from app.core.database import get_db
from app.models.notification import Notification, NotificationType
from app.models.admin_notification import AdminNotification, AdminNotificationType
from app.models.vendor import Vendor, VendorStatus
from app.api.deps import get_current_vendor, get_current_admin
import uuid
from datetime import datetime

router = APIRouter()


# ===================== SCHEMAS =====================

class NotificationResponse(BaseModel):
    id: str
    type: str
    title: str
    message: str
    is_read: bool
    created_at: datetime
    extra_data: Optional[dict] = None

    class Config:
        from_attributes = True


class SendNotificationRequest(BaseModel):
    vendor_id: Optional[str] = None  # None = send to all vendors
    type: str = "MESSAGE"
    title: str
    message: str
    extra_data: Optional[dict] = None


class BestSellerInviteRequest(BaseModel):
    vendor_id: str
    message: Optional[str] = None


# ===================== VENDOR ENDPOINTS =====================

@router.get("/notifications", response_model=List[NotificationResponse])
async def get_vendor_notifications(
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """Get all notifications for the logged-in vendor, most recent first."""
    result = await db.execute(
        select(Notification)
        .where(Notification.vendor_id == vendor.id)
        .order_by(Notification.created_at.desc())
    )
    notifications = result.scalars().all()
    
    return [
        NotificationResponse(
            id=str(n.id),
            type=n.type.value,
            title=n.title,
            message=n.message,
            is_read=n.is_read,
            created_at=n.created_at,
            extra_data=n.extra_data
        )
        for n in notifications
    ]


@router.get("/notifications/unread-count")
async def get_unread_count(
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """Get count of unread notifications for notification bell badge."""
    result = await db.execute(
        select(Notification)
        .where(Notification.vendor_id == vendor.id)
        .where(Notification.is_read == False)
    )
    count = len(result.scalars().all())
    return {"unread_count": count}


@router.post("/notifications/{notification_id}/read")
async def mark_notification_read(
    notification_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """Mark a notification as read."""
    notification = await db.get(Notification, notification_id)
    
    if not notification or notification.vendor_id != vendor.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.is_read = True
    await db.commit()
    
    return {"message": "Notification marked as read"}


@router.post("/notifications/mark-all-read")
async def mark_all_read(
    db: AsyncSession = Depends(get_db),
    vendor: Vendor = Depends(get_current_vendor)
):
    """Mark all vendor notifications as read."""
    result = await db.execute(
        select(Notification)
        .where(Notification.vendor_id == vendor.id)
        .where(Notification.is_read == False)
    )
    notifications = result.scalars().all()
    
    for n in notifications:
        n.is_read = True
    
    await db.commit()
    
    return {"message": f"Marked {len(notifications)} notifications as read"}


# ===================== ADMIN ENDPOINTS =====================

@router.post("/admin/notifications/send")
async def send_notification(
    request: SendNotificationRequest,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """
    Send a notification to a specific vendor or all vendors.
    If vendor_id is None, sends to all approved vendors.
    """
    notification_type = NotificationType(request.type)
    
    if request.vendor_id:
        # Send to specific vendor
        vendor = await db.get(Vendor, uuid.UUID(request.vendor_id))
        if not vendor:
            raise HTTPException(status_code=404, detail="Vendor not found")
        
        notification = Notification(
            vendor_id=vendor.id,
            type=notification_type,
            title=request.title,
            message=request.message,
            extra_data=request.extra_data
        )
        db.add(notification)
        await db.commit()
        
        return {"message": f"Notification sent to {vendor.business_name}"}
    
    else:
        # Send to all approved vendors
        result = await db.execute(
            select(Vendor).where(Vendor.status == VendorStatus.APPROVED)
        )
        vendors = result.scalars().all()
        
        count = 0
        for vendor in vendors:
            notification = Notification(
                vendor_id=vendor.id,
                type=notification_type,
                title=request.title,
                message=request.message,
                extra_data=request.extra_data
            )
            db.add(notification)
            count += 1
        
        await db.commit()
        
        return {"message": f"Notification sent to {count} vendors"}


@router.post("/admin/notifications/best-seller-invite")
async def send_best_seller_invite(
    request: BestSellerInviteRequest,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """
    Send a Best Seller invitation to a vendor asking them to select
    products to be featured on the homepage.
    """
    vendor = await db.get(Vendor, uuid.UUID(request.vendor_id))
    if not vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    if vendor.status != VendorStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Can only invite approved vendors")
    
    default_message = (
        "Congratulations! Your products have been performing well. "
        "We'd like to feature one of your products in our Best Sellers section. "
        "Please select which product you'd like to highlight."
    )
    
    notification = Notification(
        vendor_id=vendor.id,
        type=NotificationType.BEST_SELLER,
        title="🌟 Best Seller Feature Invitation",
        message=request.message or default_message,
        extra_data={"status": "pending_selection"}
    )
    db.add(notification)
    await db.commit()
    
    return {"message": f"Best Seller invitation sent to {vendor.business_name}"}


@router.get("/admin/notifications/history")
async def get_notification_history(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Get history of all sent notifications (for admin dashboard)."""
    result = await db.execute(
        select(Notification)
        .order_by(Notification.created_at.desc())
        .limit(100)
    )
    notifications = result.scalars().all()
    
    # Get vendor names
    vendor_ids = list(set(n.vendor_id for n in notifications))
    vendors_result = await db.execute(
        select(Vendor).where(Vendor.id.in_(vendor_ids))
    )
    vendors = {v.id: v.business_name for v in vendors_result.scalars().all()}
    
    return [
        {
            "id": str(n.id),
            "vendor_id": str(n.vendor_id),
            "vendor_name": vendors.get(n.vendor_id, "Unknown"),
            "type": n.type.value,
            "title": n.title,
            "message": n.message[:100] + "..." if len(n.message) > 100 else n.message,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat()
        }
        for n in notifications
    ]


# ===================== ADMIN INBOX ENDPOINTS =====================

@router.get("/admin/notifications/received")
async def get_admin_notifications(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Get notifications sent TO the admin (New Order, New Vendor, etc)."""
    result = await db.execute(
        select(AdminNotification)
        .order_by(AdminNotification.created_at.desc())
        .limit(100)
    )
    notifications = result.scalars().all()
    
    return [
        {
            "id": str(n.id),
            "type": n.type.value,
            "title": n.title,
            "message": n.message,
            "is_read": n.is_read,
            "created_at": n.created_at,
            "extra_data": n.extra_data
        }
        for n in notifications
    ]


@router.get("/admin/notifications/received/unread-count")
async def get_admin_unread_count(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Get unread count for admin bell."""
    result = await db.execute(
        select(AdminNotification)
        .where(AdminNotification.is_read == False)
    )
    count = len(result.scalars().all())
    return {"unread_count": count}


@router.post("/admin/notifications/received/{notification_id}/read")
async def mark_admin_notification_read(
    notification_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Mark an admin notification as read."""
    notification = await db.get(AdminNotification, notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    notification.is_read = True
    await db.commit()
    return {"message": "Marked as read"}


@router.post("/admin/notifications/received/mark-all-read")
async def mark_all_admin_notifications_read(
    db: AsyncSession = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Mark all admin notifications as read."""
    result = await db.execute(
        select(AdminNotification)
        .where(AdminNotification.is_read == False)
    )
    notifications = result.scalars().all()
    
    for n in notifications:
        n.is_read = True
        
    await db.commit()
    return {"message": f"Marked {len(notifications)} notifications as read"}


# ===================== HELPER FUNCTION =====================

async def create_system_notification(
    db: AsyncSession,
    vendor_id: uuid.UUID,
    title: str,
    message: str,
    extra_data: dict = None
):
    """
    Helper function to create system notifications.
    Used by other parts of the app (like suspend/reactivate).
    """
    notification = Notification(
        vendor_id=vendor_id,
        type=NotificationType.SYSTEM,
        title=title,
        message=message,
        extra_data=extra_data
    )
    db.add(notification)
    # Note: Caller is responsible for committing the transaction
    return notification


async def create_admin_notification(
    db: AsyncSession,
    type: AdminNotificationType,
    title: str,
    message: str,
    extra_data: dict = None
):
    """Helper to create notifications for admins."""
    notification = AdminNotification(
        type=type,
        title=title,
        message=message,
        extra_data=extra_data
    )
    db.add(notification)
    return notification


async def notify_all_vendors(
    db: AsyncSession,
    type: NotificationType,
    title: str,
    message: str,
    extra_data: dict = None
):
    """Helper to send a notification to ALL approved vendors."""
    result = await db.execute(
        select(Vendor).where(Vendor.status == VendorStatus.APPROVED)
    )
    vendors = result.scalars().all()
    
    for vendor in vendors:
        notification = Notification(
            vendor_id=vendor.id,
            type=type,
            title=title,
            message=message,
            extra_data=extra_data
        )
        db.add(notification)
    
    # Caller must commit
    return len(vendors)
