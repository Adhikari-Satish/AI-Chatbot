from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

# from app.schemas.user import UserCreate, UserResponse
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin
)
from app.schemas.user import UserUpdate, PasswordUpdate
from app.core.security import hash_password, verify_password

from fastapi.security import OAuth2PasswordRequestForm

from app.services.auth_service import create_user, login_user

from app.schemas.otp import OTPRequest

from app.services.otp_service import save_otp, generate_otp
from app.services.email_service import send_email
from app.core.auth import get_current_user
from app.models.user import User
from app.models import OTP
from passlib.context import CryptContext # type: ignore

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
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

@router.get("/profile")
def get_profile(
    # db: Session = Depends(get_db)
    current_user: User = Depends(get_current_user)
):

    # user = db.query(User).first()

    if not current_user:
        # return {
        #             "username": "Guest",
        #             "email": "guest@example.com"
        #         }
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }

@router.put("/profile")
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # Check email already exists for another user
    existing_email = db.query(User).filter(
        User.email == data.email,
        User.id != current_user.id
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )
    current_user.username = data.username
    current_user.email = data.email
    db.commit()
    db.refresh(current_user)
    return current_user


@router.put("/password")
def change_password(
    data: PasswordUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
    ):
    if not verify_password(
        data.old_password,
        current_user.password
    ):
        return {
            "message":"Old password incorrect"
        }
    current_user.password = hash_password(
        data.new_password
    )
    db.commit()
    return {
        "message":"Password updated successfully"
    }

@router.post("/login", response_model=dict)
def login(
    # user: UserLogin,
    user: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)):
    print("USERNAME:", user.username)
    print("PASSWORD:", user.password)

    result = login_user(
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
    if result == "email_not_found":
        raise HTTPException(
            status_code=404,
            detail="Email does not exist")
    if result == "invalid_password":
        raise HTTPException(
            status_code=401,
            detail="Incorrect password")
    # if not token:
    #     raise HTTPException(
    #         status_code=401,
    #         detail="Invalid email or password"
    #     )
    return {
        "access_token": result,
        "token_type": "bearer"
    }
    # return result

@router.put("/change-password")
def change_password(
    data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    old_password = data["old_password"]
    new_password = data["new_password"]
    if not verify_password(
        old_password,
        current_user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Old password is incorrect"
        )
    current_user.password = hash_password(new_password)
    db.commit()
    return {
        "message":"Password updated successfully"
    }

@router.delete("/delete-account")
def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db.delete(current_user)
    db.commit()
    return {
        "message":"Account deleted successfully"
    }

@router.put("/reset-password")
def reset_password(
    data:dict,
    db:Session=Depends(get_db)
    ):
    email=data.get("email")
    password=data.get("password")
    user=db.query(User).filter(
        User.email==email
    ).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    hashed_password = pwd_context.hash(
        password
    )
    user.password = hashed_password
    db.commit()
    return {
        "message":
        "Password updated successfully"
    }

@router.post("/send-otp")
def send_otp(
    data:dict,
    db:Session=Depends(get_db)):
    email=data.get("email")
    user=db.query(User).filter(
        User.email==email
    ).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )
    otp=generate_otp()
    reset=OTP(
        email=email,
        otp=otp
    )
    db.add(reset)
    db.commit()
    # here send email
    print(
        "OTP:",
        otp
    )
    return {
        "message":"OTP sent successfully"
    }

@router.post("/verify-otp")
def verify_otp(
    data:dict,
    db:Session=Depends(get_db)
    ):
    email=data.get("email")
    otp=data.get("otp")
    record=db.query(
        OTP
    ).filter(
        OTP.email==email,
        OTP.otp==otp
    ).first()
    if not record:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )
    return {
        "message":"OTP verified"
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