from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

# from app.schemas.user import UserCreate, UserResponse
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin
)

from fastapi.security import OAuth2PasswordRequestForm

from app.services.auth_service import create_user, login_user

from app.schemas.otp import OTPRequest

from app.services.otp_service import save_otp

from app.services.email_service import send_email

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    new_user = create_user(
        db,
        user.username,
        user.email,
        user.password
    )
    
    # otp_valid = verify_otp( # type: ignore
    #     db,
    #     user.email,
    #     user.otp
    # )
    # if not otp_valid:

    #     raise HTTPException(
    #         status_code=401,
    #         detail="Invalid OTP"
    #     )


    return new_user

# @router.post("/send-otp")
# def send_otp(
#     data: OTPRequest,
#     db: Session = Depends(get_db)
# ):

#     otp = save_otp(
#         db,
#         data.email
#     )


#     send_email(
#         data.email,
#         otp
#     )


#     return {
#         "message":
#         "OTP sent successfully"
#     }

@router.post("/login", response_model=dict)
def login(
    # user: UserLogin,
    user: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    token = login_user(
        db,
        user.username,
        user.password
    )
    
    # otp_valid = verify_otp( # type: ignore
    #     db,
    #     user.username,  # Assuming the username is the email
    #     user.otp
    # )
    # if not otp_valid:

    #     raise HTTPException(
    #         status_code=401,
    #         detail="Invalid OTP"
    #     )

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )


    return {
        "access_token": token,
        "token_type": "bearer"
    }

# @router.post("/login")
# def login(
#     user: UserLogin,
#     db: Session = Depends(get_db)
# ):

#     return {
#         "email": user.email,
#         "message": "Login success"
#     }