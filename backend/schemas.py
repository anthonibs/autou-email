from pydantic import BaseModel
from typing import Literal

class EmailIn(BaseModel):
    message: str
    id: str
    message: str
    datetime: str
    category: Literal["productive", "unproductive"]
    suggestedReply: str

class EmailOut(BaseModel):
    id: str
    message: str
    datetime: str
    category: Literal["productive", "unproductive"]
    suggestedReply: str
    status: str
