import random

from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.otp import OTP



def generate_otp():

    return str(
        random.randint(
            100000,
            999999
        )
    )



def save_otp(
    db: Session,
    email: str
):

    otp = generate_otp()


    otp_record = OTP(
        email=email,
        otp=otp
    )


    db.add(otp_record)

    db.commit()


    return otp



def verify_otp(
    db: Session,
    email: str,
    otp: str
):

    record = (
        db.query(OTP)
        .filter(
            OTP.email == email,
            OTP.otp == otp
        )
        .first()
    )


    if record:

        return True


    return False