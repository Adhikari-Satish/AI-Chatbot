from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.database import Base

class OTP(Base):

    __tablename__ = "otp"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    username = Column(
        String,
        nullable=True,
        default=None
    )
    
    password = Column(
        String,
        nullable=True,
        default=None
    )
    
    email = Column(
        String,
        nullable=False
    )

    otp = Column(
        String(6),
        nullable=False
    )
    purpose = Column(
        String,
        nullable=False,
        default="forgot_password"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )