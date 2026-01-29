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
    # Log it to console so developer can see it
    print(email_content)
    logger.info(f"Email sent to {to_email}")
    return True
