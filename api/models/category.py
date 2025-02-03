from typing import List
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class Category(Base):
    __tablename__ = "categories"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    description: Mapped[str] = mapped_column(String(30))
    
    # Relationships
    tasks: Mapped[List["Task"]] = relationship(
        "Task", back_populates="category", cascade="all, delete-orphan"
    )
    
    def _repr_(self) -> str:
        return f"Category(id={self.id!r}, name={self.name!r}, description={self.description!r})"