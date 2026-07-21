from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.chat import ChatCreate, ChatResponse

from app.services.chat_service import (
    create_chat,
    get_user_chats,
    get_chat,
    rename_chat,
    delete_chat,
    get_messages
)

from app.core.auth import get_current_user

from app.models.user import User

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

@router.post("/new", response_model=ChatResponse)
def new_chat(
    chat: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return create_chat(
        db=db,
        title=chat.title,
        user_id=current_user.id
    )
    
@router.get("/", response_model=list[ChatResponse])
def all_chats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_user_chats(
        db,
        current_user.id
    )


@router.get("/{chat_id}")
def one_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = get_chat(
        db,
        chat_id,
        current_user.id
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return chat


@router.put("/{chat_id}")
def update_chat(
    chat_id: int,
    chat: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    db_chat = get_chat(
        db,
        chat_id,
        current_user.id
    )

    if not db_chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return rename_chat(
        db=db,
        chat_id=chat_id,
        user_id=current_user.id,
        title=chat.title
    )
    
    
@router.delete("/{chat_id}")
def remove_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = get_chat(
        db,
        chat_id,
        current_user.id
    )

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    delete_chat(
        db=db,
        chat_id=chat_id,
        user_id=current_user.id
    )

    return {
        "message": "Chat deleted successfully"
    }
    
@router.get("/{chat_id}/messages")
def messages(
    chat_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):

    return get_messages(
        db,
        chat_id
    )