# from fastapi import APIRouter, Depends

# from sqlalchemy.orm import Session

# from app.db.database import get_db

# from app.schemas.chat import ChatCreate, ChatResponse

# from app.services.chat_service import create_chat

# from app.core.auth import get_current_user
# from app.models.chat_history import ChatHistory


# router = APIRouter(
#     prefix="/chat-history",
#     tags=["Chat History"]
# )

# # Get all chats of logged-in user
# @router.get("/all")
# def get_chat_history(
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):

#     chats = (
#         db.query(ChatHistory)
#         .filter(
#             ChatHistory.user_id == current_user.id
#         )
#         .order_by(
#             ChatHistory.created_at.desc()
#         )
#         .all()
#     )

#     return chats

# @router.get("/{chat_id}")
# def get_single_chat(
#     chat_id: int,
#     db: Session = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):

#     chat = (
#         db.query(ChatHistory)
#         .filter(
#             ChatHistory.id == chat_id,
#             ChatHistory.user_id == current_user.id
#         )
#         .first()
#     )

#     return chat

# @router.delete("/{chat_id}")
# def delete_chat(
#     chat_id:int,
#     db:Session = Depends(get_db),
#     current_user = Depends(get_current_user)
# ):

#     chat = (
#         db.query(ChatHistory)
#         .filter(
#             ChatHistory.id == chat_id,
#             ChatHistory.user_id == current_user.id
#         )
#         .first()
#     )


#     if not chat:
#         return {
#             "message":"Chat not found"
#         }


#     db.delete(chat)
#     db.commit()


#     return {
#         "message":"Chat deleted successfully"
#     }