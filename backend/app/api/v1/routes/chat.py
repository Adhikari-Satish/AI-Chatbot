
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.chat import (
    ChatCreate,
    ChatRename,
    ChatResponse,
    ChatResponse1
)
from app.services.message_service import (
    create_message,
    get_chat_history_for_ai,
    get_messages,
    get_chat_messages
)

from app.services.chat_service import (
    create_chat,
    get_user_chats,
    get_chat,
    rename_chat,
    delete_chat,
    save_message,
    get_messages
)

from app.services.ai_service import generate_response

from app.core.auth import get_current_user

from app.models.user import User
from app.db.database import get_db
from app.models import message

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


# @router.post("/")
# def chat(
#     message: str,
#     current_user: User = Depends(get_current_user)
# ):

#     response = generate_response(message)


#     return {
#         "user": current_user.username,
#         "response": response
#     }


@router.post("/create", response_model=ChatResponse)
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
    
@router.post("/{chat_id}/message")
def chat(
    chat_id:int,
    message:str,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):

    # save user message

    save_message(
        db,
        chat_id,
        "user",
        message
    )


    # generate AI response

    response = generate_response(message)


    # save AI response

    save_message(
        db,
        chat_id,
        "assistant",
        response
    )


    return {
        "response":response
    }



@router.post("/", response_model=ChatResponse1)
def new_chat(
    data: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):
    chat=create_chat(
        db,
        title=data.title,
        user_id=current_user.id
    )
    # Save user message
    create_message(
        db=db,
        chat_id=chat.id,
        role="user",
        content=data.title
    )
    history = get_chat_history_for_ai(
        db,
        chat.id
        # user_id=current_user.id
    )
    # Generate AI response

    ai_text = generate_response(
        history
    )
    create_message(
        db,
        chat.id,
        "assistant",
        ai_text
    )

    chat = create_chat(
        db=db,
        title=data.title,
        user_id=current_user.id
    )

    return {
        "title": data.title,
        "response": ai_text
    }
    
    
@router.get("/get_all", response_model=list[ChatResponse])
def all_chats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return get_user_chats(
        db,
        current_user.id
    )
    
@router.get("/{chat_id}")
def single_chat(
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
    data: ChatRename,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = rename_chat(
        db,
        chat_id,
        current_user.id,
        data.title
    )

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return chat

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

@router.delete("/{chat_id}")
def remove_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    success = delete_chat(
        db,
        chat_id,
        current_user.id
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    return {
        "message": "Chat deleted successfully"
    }