from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.user import User
# from app.core.security import hash_password
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)


def create_user(
    db: Session,
    username,
    email,
    password
    ):
    
    existing_user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


    if existing_user:
        raise HTTPException(
            status_code=400,
            detail={"field":"email",
                "message": "Email already registered"}
        )

    hashed = hash_password(password)


    user = User(
        username=username,
        email=email,
        password=hashed
        
    )
    try:

        db.add(user)

        db.commit()

        db.refresh(user)


    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail={"field":"general",
                "message": "User already exists"}
        )

    return user

def authenticate_user(
    db: Session,
    email,
    password
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


    if not user:
        return None


    if not verify_password(
        password,
        user.password
    ):
        return None
    # token = create_access_token(
    #     {
    #         "sub": str(user.id)
    #     }
    # )
    
    return user
    # return {
    #     "access_token": token,
    #     "token_type": "bearer"
    # }



def login_user(
    db: Session,
    email,
    password
):

    user = authenticate_user(
        db,
        email,
        password
    )


    if not user:
        return None


    token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email
        }
    )


    return token