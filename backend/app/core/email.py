import logging

logger = logging.getLogger(__name__)

async def send_approval_email(to_email: str, password: str, login_url: str = "http://localhost:3000/login/vendor"):
    """
    Simulates sending an approval email with credentials.
    In production, replace this with SES/SendGrid/SMTP logic.
    """
    email_content = f"""
    --------------------------------------------------
    📧 SENDING EMAIL TO: {to_email}
    --------------------------------------------------
    Subject: Welcome to NextGen Organics - Vendor Approval
    
    Dear Partner,
    
    Congratulations! Your vendor application has been approved.
    
    Here are your login credentials:
    Login URL: {login_url}
    Username: {to_email}
    Temporary Password: {password}
    
    Please change your password immediately upon first login.
    
    Welcome to the ecosystem!
    - NextGen Organics Admin Team
    --------------------------------------------------
    """
    print(email_content)
    logger.info(f"Approval email sent to {to_email}")
    return True


async def send_suspension_email(to_email: str, business_name: str, reason: str = None):
    """
    Send email notification when a vendor is suspended.
    """
    reason_text = f"\n    Reason: {reason}" if reason else ""
    email_content = f"""
    --------------------------------------------------
    📧 SENDING EMAIL TO: {to_email}
    --------------------------------------------------
    Subject: Important: Your NextGen Organics Vendor Account Has Been Suspended
    
    Dear {business_name},
    
    We regret to inform you that your vendor account on NextGen Organics has been suspended.{reason_text}
    
    What this means:
    • Your products are no longer visible to customers
    • You cannot accept new orders
    • Your existing orders will still be processed
    
    If you believe this was done in error or have questions, please contact our support team at:
    support@nextgenorganics.com
    
    We value your partnership and hope to resolve this matter soon.
    
    - NextGen Organics Admin Team
    --------------------------------------------------
    """
    print(email_content)
    logger.info(f"Suspension email sent to {to_email}")
    return True


async def send_reactivation_email(to_email: str, business_name: str):
    """
    Send email notification when a vendor account is reactivated.
    """
    email_content = f"""
    --------------------------------------------------
    📧 SENDING EMAIL TO: {to_email}
    --------------------------------------------------
    Subject: Great News! Your NextGen Organics Vendor Account Has Been Reactivated
    
    Dear {business_name},
    
    We are pleased to inform you that your vendor account on NextGen Organics has been reactivated!
    
    What this means:
    • Your products are now visible to customers again
    • You can accept new orders
    • Your vendor dashboard is fully accessible
    
    Login to your dashboard to check your store:
    http://localhost:3000/login/vendor
    
    Thank you for your continued partnership!
    
    - NextGen Organics Admin Team
    --------------------------------------------------
    """
    print(email_content)
    logger.info(f"Reactivation email sent to {to_email}")
    return True


async def send_rejection_email(to_email: str, business_name: str, reason: str = None):
    """
    Send email notification when a vendor application is rejected.
    """
    reason_text = f"\n    Reason: {reason}" if reason else ""
    email_content = f"""
    --------------------------------------------------
    📧 SENDING EMAIL TO: {to_email}
    --------------------------------------------------
    Subject: Update on Your NextGen Organics Vendor Application
    
    Dear {business_name},
    
    Thank you for your interest in partnering with NextGen Organics.
    
    After careful review, we regret to inform you that we are unable to approve your vendor application at this time.{reason_text}
    
    You may reapply after addressing the concerns mentioned above.
    
    If you have any questions, please reach out to:
    vendors@nextgenorganics.com
    
    - NextGen Organics Admin Team
    --------------------------------------------------
    """
    print(email_content)
    logger.info(f"Rejection email sent to {to_email}")
    return True

