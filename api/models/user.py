# models/user.py
from typing import List
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    password: Mapped[str] = mapped_column(String(60))
    avatar: Mapped[str] = mapped_column(String(30))
    
    # Relationships
    tasks: Mapped[List["Task"]] = relationship(
        "Task", back_populates="user", cascade="all, delete-orphan"
    )
    
    def _repr_(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, password={self.password!r}, avatar={self.avatar!r})"