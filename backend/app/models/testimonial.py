from sqlalchemy import Column, Integer, String, Text, Boolean
from app.models.base import Base

class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    role = Column(String)
    name = Column(String)
    location = Column(String)
    quote = Column(Text)
    rating = Column(Integer)
    is_featured = Column(Boolean, default=True)

    def __repr__(self):
        return f"<Testimonial {self.name}>"
