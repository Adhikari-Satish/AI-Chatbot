from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.models.message import Message

def create_chat(
    db: Session,
    title: str,
    user_id: int
):
    chat = Chat(
        title=title,
        user_id=user_id
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat

def get_user_chats(
    db: Session,
    user_id: int
):

    return (
        db.query(Chat)
        .filter(Chat.user_id == user_id)
        .order_by(Chat.created_at.desc())
        .all()
    )

def get_chat(
    db: Session,
    chat_id: int,
    user_id: int
):

    return (
        db.query(Chat)
        .filter(
            Chat.id == chat_id,
            Chat.user_id == user_id
        )
        .first()
    )
    
 
def rename_chat(db: Session, chat_id: int, user_id: int, title: str):

    chat = get_chat(db, chat_id, user_id)
    # chat = db.query(Chat).filter(
    #     Chat.id == chat_id
    # ).first()

    if not chat:
        return None

    chat.title = title

    db.commit()
    db.refresh(chat)

    return chat


def delete_chat(db: Session, chat_id: int, user_id: int):

    chat = get_chat(db, chat_id, user_id)
    # chat = db.query(Chat).filter(
    #     Chat.id == chat_id,
    #     Chat.user_id == user_id
    # ).first()

    if not chat:
        return False

    db.delete(chat)
    db.commit()

    # return True
    return chat


def save_message(
    db,
    chat_id,
    role,
    content
):

    message = Message(
        chat_id=chat_id,
        role=role,
        content=content
    )

    db.add(message)

    db.commit()

    db.refresh(message)

    return message



def get_messages(
    db,
    chat_id
):

    return (
        db.query(Message)
        .filter(
            Message.chat_id == chat_id
        )
        .order_by(
            Message.created_at
        )
        .all()
    )


# def delete_chat(
#     db: Session,
#     chat: Chat
# ):

#     db.delete(chat)

#     db.commit()
    
# def rename_chat(
#     db: Session,
#     chat: Chat,
#     title: str
# ):

#     chat.title = title

#     db.commit()

#     db.refresh(chat)

#     return chat


