from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db

from app.services.message_service import (
    create_message,
    get_chat_history_for_ai,
    get_messages,
    get_chat_messages
)
from app.schemas.message import ChatMessageResponse, ChatHistoryResponse
from app.services.ai_service import generate_response
from app.core.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)

@router.post("/generate_message")
def send_message(
    # request: ChatRequest,
    chat_id:int,
    content:str,
    db: Session=Depends(get_db)):
    current_user: User = Depends(get_current_user)

    # Save user message

    create_message(
        db,
        chat_id,
        "user",
        content
    )
    history = get_chat_history_for_ai(
        db,
        chat_id
    )
    # Generate AI response

    ai_text = generate_response(
        history
    )


    # Save assistant response

    create_message(
        db,
        chat_id,
        "assistant",
        ai_text
    )


    return {
        "response": ai_text
        # "chat_id": chat_id,
        # "user_message": content,
        # "assistant_message": ai_text
    }

# @router.post("/")
# def add_message(
#     chat_id:int,
#     role:str,
#     content:str,
#     db=Depends(get_db)
# ):

#     return create_message(
#         db,
#         chat_id,
#         role,
#         content
#     )



@router.get("/chats/{chat_id}/messages", response_model=ChatHistoryResponse)
def history(
    chat_id:int,
    db: Session=Depends(get_db)):
    
    messages = get_chat_messages(
        db,
        chat_id
    )

    # return messages
    return {
        "chat_id": chat_id,
        "messages": messages
    #     "messages":[
    #     {
    #         "role":"user",
    #         "content":"Hello"
    #     },
    #     {
    #         "role":"assistant",
    #         "content":"Hi"
    #     }
    # ]

    }

    # return get_chat_messages(
    #     db,
    #     chat_id
    # )