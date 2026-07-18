from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)

    chat_id = Column(Integer, ForeignKey("chats.id"))

    role = Column(Text)

    content = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    chat = relationship(
        "Chat",
        back_populates="messages"
    )