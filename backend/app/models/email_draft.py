from sqlalchemy import Column, String, Enum, Text, ForeignKey, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
import enum
from app.models.base import Base

class EmailStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    SENT = "SENT"

class EmailDraft(Base):
    __tablename__ = "email_drafts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vendor_id = Column(UUID(as_uuid=True), ForeignKey("vendors.id"), nullable=False)
    
    recipient_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    body_html = Column(Text, nullable=False)
    
    # We store the generated credentials temporarily in the draft 
    # so the admin can review them in the email body before sending.
    # In a strict environment, these should be encrypted or not stored at all 
    # (just regenerated on view), but for this specific "Draft" workflow, 
    # storing the drafted content (which includes the password) is necessary.
    generated_password = Column(String, nullable=True) 
    
    status = Column(Enum(EmailStatus), default=EmailStatus.DRAFT)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    sent_at = Column(TIMESTAMP(timezone=True), nullable=True)

    def __repr__(self):
        return f"<EmailDraft {self.id} Status={self.status}>"
