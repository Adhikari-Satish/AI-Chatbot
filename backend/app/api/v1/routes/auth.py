from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db
from sqlalchemy.exc import IntegrityError
# from app.schemas.user import UserCreate, UserResponse
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin
)
from app.schemas.user import UserUpdate, PasswordUpdate
from app.core.security import hash_password, verify_password

from fastapi.security import OAuth2PasswordRequestForm

# from app.services.auth_service import create_user, login_user
from app.services.auth_service import login_user

from app.schemas.otp import OTPRequest, OTPVerify, NewEmailOTPVerify

from app.services.otp_service import generate_otp
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


# @router.post("/register", response_model=UserResponse)
@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)):   
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail={
                "field":"email",
                "message":"Email already registered"
            }
        )
    # generate otp
    otp = generate_otp()
    # save otp
    hashed = hash_password(user.password)
    otp_record = OTP(
        username=user.username,
        email=user.email,
        password=hashed,
        otp=otp,
        purpose="Registration"
    )
    db.add(otp_record)
    db.commit()
    # store user data temporarily
    
    # send otp
    send_email(
        user.email,
        otp
    )
    return {
        "message":"OTP sent to email",
        "email":user.email
    }


@router.post("/verify-register-otp")
def verify_register_otp(
    data:dict,
    db:Session=Depends(get_db)
    ):
    email = data.get("email")
    otp = data.get("otp")
    print("EMAIL:",email)
    print("OTP:",otp) 
    otp_record = (
        db.query(OTP)
        .filter(
            OTP.email == email,
            OTP.otp == otp,
            OTP.purpose == "Registration"
        )
        .first()
    )
    print("OTP RECORD:", otp_record)
    if not otp_record:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        #     detail={
        #     "field": "otp",
        #     "message": "Invalid OTP"
        # }
        )
    new_user = User(
        username = otp_record.username,
        email = otp_record.email,
        password = otp_record.password,
        is_verified = True
        )
    
    try:
        db.add(new_user)
        # delete used otp
        db.delete(otp_record)
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )
    # return {
    #     "message":"Registration successful",
    #     "user":{
    #         "username":new_user.username,
    #         "email":new_user.email
    #     }
    # }   
    return {
        "message": "Email verified successfully"
    }

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
    # current_user.email = data.email
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
    send_email(email, otp)
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
    record=db.query(OTP).filter(
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
   
    
@router.post("/send-old-email-otp")
def send_old_email_otp(
    data:OTPRequest,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
    ):
    existing_email = db.query(User).filter(
            User.email == data.new_email
        ).first()
    if existing_email:
        raise HTTPException(
                status_code=400,
                detail="Email already exists"
        )
    otp = generate_otp()
    otp_record = OTP(
        email=current_user.email,
        otp=otp,
        purpose="old_email"
    )
    db.add(otp_record)
    db.commit()
    send_email(
        current_user.email,
        otp
    )
    return {
        "message":"OTP sent to old email"
    }
    
@router.post("/verify-old-email-otp")
def verify_old_email_otp(
    data:OTPVerify,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
):
    record = db.query(OTP).filter(
        OTP.email==current_user.email,
        OTP.otp==data.otp,
        OTP.purpose=="old_email"
    ).first()
    if not record:
        raise HTTPException(
            400,
            "Invalid OTP"
        )
    return {
        "verified":True
    }
    
@router.post("/send-new-email-otp")
def send_new_email_otp(
    data:OTPRequest,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
    ):
    existing=db.query(User).filter(
        User.email==data.new_email
    ).first()
    if existing:
        raise HTTPException(
            400,
            "Email already exists"
        )
    otp=generate_otp()
    record=OTP(
        email=data.new_email,
        otp=otp,
        purpose="new_email"
    )
    db.add(record)
    db.commit()
    send_email(
        data.new_email,
        otp
    )
    return {
        "message":"OTP sent to new email"
    }
    
@router.post("/verify-new-email-otp")
def verify_new_email_otp(
    new_email: str,
    otp: str,
    db:Session=Depends(get_db),
    current_user=Depends(get_current_user)
    ):
    record=db.query(OTP).filter(
        OTP.email==new_email,
        OTP.otp==otp,
        OTP.purpose=="new_email"
    ).first()
    if not record:
        raise HTTPException(
            400,
            "Invalid OTP"
        )
    current_user.email=new_email
    db.delete(record)
    db.commit()
    db.refresh(current_user)
    return {
        "message":
        "Email changed successfully"
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