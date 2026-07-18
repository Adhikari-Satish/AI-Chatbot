from sqlalchemy.orm import Session

from app.models.chat import Chat


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