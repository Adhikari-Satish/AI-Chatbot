from sqlalchemy.orm import Session
from app.models.message import Message


def create_message(
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

def get_chat_messages(
        db: Session,
        chat_id: int
):

    messages = (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at)
        .all()
    )

    return messages

def get_chat_history_for_ai(
        db: Session,
        chat_id: int
):

    messages = (
        db.query(Message)
        .filter(Message.chat_id == chat_id)
        .order_by(Message.created_at)
        .all()
    )


    chat_messages = []


    for msg in messages:

        chat_messages.append(
            {
                "role": msg.role,
                "content": msg.content
            }
        )


    return chat_messages

def get_messages(
        db,
        chat_id
):

    return (
        db.query(Message)
        .filter(Message.chat_id==chat_id)
        .order_by(Message.created_at)
        .all()
    )