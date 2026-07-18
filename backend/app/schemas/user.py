from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserCreate(BaseModel):

    username: str

    email: EmailStr

    password: str
    
    # created_at: datetime
    
    # otp: str



class UserLogin(BaseModel):

    email: EmailStr

    password: str
    
    # created_at: datetime
    
    # otp: str


class UserResponse(BaseModel):

    id: int

    username: str

    email: EmailStr
    
    # created_at: datetime


    class Config:

        from_attributes = True