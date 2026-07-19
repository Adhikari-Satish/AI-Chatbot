from pydantic import BaseModel
from datetime import datetime


class MessageCreate(BaseModel):
    chat_id:int
    role:str
    content:str

class ChatRequest(BaseModel):
    chat_id: int
    content: str

class ChatMessageResponse(BaseModel):
    role: str
    content: str

    class Config:
        from_attributes = True
    
class ChatHistoryResponse(BaseModel):

    chat_id: int
    messages: list[ChatMessageResponse]

class MessageResponse(BaseModel):
    id:int
    chat_id:int
    role:str
    content:str
    created_at:datetime

    class Config:
        from_attributes = True