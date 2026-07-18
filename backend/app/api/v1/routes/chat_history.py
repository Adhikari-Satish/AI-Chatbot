from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.chat import ChatCreate, ChatResponse

from app.services.chat_service import create_chat

from app.core.auth import get_current_user


router = APIRouter(
    prefix="/chat",
    tags=["Chat History"]
)


@router.post(
    "/create",
    response_model=ChatResponse
)
def new_chat(
    chat: ChatCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return create_chat(
        db=db,
        title=chat.title,
        user_id=current_user.id
    )