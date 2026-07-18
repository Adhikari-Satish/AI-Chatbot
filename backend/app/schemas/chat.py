# from pydantic import BaseModel
# from datetime import datetime


# class ChatRequest(BaseModel):

#     message: str



# class ChatResponse(BaseModel):

#     response: str

from pydantic import BaseModel
from datetime import datetime


class ChatCreate(BaseModel):
    title: str


class ChatResponse(BaseModel):
    id: int
    title: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True