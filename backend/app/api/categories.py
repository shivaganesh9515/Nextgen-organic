from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.category import Category
from app.api.deps import get_current_admin
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CategoryCreate(BaseModel):
    name: str
    slug: str
    image_url: str = None

class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    image_url: str = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[CategoryResponse])
async def list_categories(db: AsyncSession = Depends(get_db)):
    """
    Public Endpoint: Get all active categories.
    """
    result = await db.execute(select(Category))
    return result.scalars().all()

@router.post("/", response_model=CategoryResponse)
async def create_category(
    category: CategoryCreate, 
    db: AsyncSession = Depends(get_db), 
    admin=Depends(get_current_admin)
):
    """
    Admin Only: Create a new category.
    """
    new_category = Category(**category.dict())
    db.add(new_category)
    try:
        await db.commit()
        await db.refresh(new_category)
        return new_category
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Category creation failed. Slug might be duplicate.")
