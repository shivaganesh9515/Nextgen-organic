from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: str = "customer"

class UserCreate(UserBase):
    password: str
    phone_number: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True
