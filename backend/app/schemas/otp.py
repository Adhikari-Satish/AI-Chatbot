from pydantic import BaseModel, EmailStr


class OTPRequest(BaseModel):

    new_email: EmailStr


class OTPVerify(BaseModel):
    otp: str

class NewEmailOTPVerify(BaseModel):
    new_email:EmailStr
    otp:str