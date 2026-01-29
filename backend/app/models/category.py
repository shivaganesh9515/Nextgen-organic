from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    image_url = Column(String, nullable=True)
    
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    # Self-referential relationship for Nested Categories
    parent = relationship("Category", remote_side=[id], backref="subcategories")
    
    # Relationships
    products = relationship("Product", back_populates="category")

    def __repr__(self):
        return f"<Category {self.name}>"
