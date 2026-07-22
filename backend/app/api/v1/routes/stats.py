from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.chat import Chat
from app.models.message import Message
# from app.models.document import Document
from app.core.auth import get_current_user


router = APIRouter()


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    # total_chats = db.query(Chat)\
    #     .filter(Chat.user_id == current_user.id)\
    #     .count()
    total_chats = db.query(Chat).count()

    # total_messages = db.query(Message)\
    #     .filter(Message.user_id == current_user.id)\
    #     .count()
    total_messages = db.query(Message).count()
    # total_documents = db.query(Document)\
    #     .filter(Document.user_id == current_user.id)\
    #     .count()


    return {
        "total_chats": total_chats,
        "documents": 0,
        "messages": total_messages 
    }