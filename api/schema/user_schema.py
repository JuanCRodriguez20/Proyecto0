from pydantic import BaseModel
from typing import Optional

class UserSchema(BaseModel):
    name: str
    password: str
    avatar: Optional[str] = None