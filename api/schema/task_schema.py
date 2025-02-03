from pydantic import BaseModel
from datetime import date
from typing import Optional

class TaskSchema(BaseModel):
    text_task: str
    start_date: Optional[date] = date.today()
    end_date: date
    state: int
    user_id: int
    category_id: int