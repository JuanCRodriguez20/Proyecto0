# models/task.py
from datetime import date
from sqlalchemy import ForeignKey, String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class Task(Base):
    __tablename__ = "tasks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    text_task: Mapped[str] = mapped_column(String(30))
    start_date: Mapped[date] = mapped_column(Date)
    end_date: Mapped[date] = mapped_column(Date)
    state: Mapped[int] = mapped_column()
    
    # Foreign keys
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    
    # Relationships
    category: Mapped["Category"] = relationship("Category", back_populates="tasks")
    user: Mapped["User"] = relationship("User", back_populates="tasks")
    
    def _repr_(self) -> str:
        return f"Task(id={self.id!r}, text_task={self.text_task!r}, start_date={self.start_date!r}, end_date={self.end_date!r}, state={self.state!r}, user_id={self.user_id!r}, category_id={self.category_id!r})"