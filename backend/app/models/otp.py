from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.database import Base


class OTP(Base):

    __tablename__ = "otps"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    email = Column(
        String,
        nullable=False
    )

    otp = Column(
        String(6),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )