from fastapi import APIRouter, Depends, HTTPException

from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)

from app.services.ai_service import generate_response

from app.core.auth import get_current_user

from app.models.user import User

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)



# @router.post(
#     "/",
#     response_model=ChatResponse
# )
# def chat(
#     request: ChatRequest
# ):

#     answer = generate_response(
#         request.message
#     )


#     return {
#         "response": answer
#     }

@router.post("/")
def chat(
    message: str,
    current_user: User = Depends(get_current_user)
):

    response = generate_response(message)


    return {
        "user": current_user.username,
        "response": response
    }