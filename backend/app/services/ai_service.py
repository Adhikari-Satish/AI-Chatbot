
# import ollama  # type: ignore[import]

# MODEL = "llama3.1"



# def generate_response(message: str):
#     system_message = {
#         "role": "system",
#         "content": """
# You are a helpful chatbot.
# Answer user questions in a simple and short way.
# Keep answers within 1-2 sentences unless the user asks for details.
# Do not add unnecessary explanations.
# """
#     }
#     message.insert(0, system_message)
#     response = ollama.chat(
#         model=MODEL,
#         messages=message
#         # messages=[
#         #     {
#         #         "role": "user",
#         #         "content": message
#         #     }
#         # ]
#     )


#     return response["message"]["content"]

import ollama  # type: ignore[import]

MODEL = "llama3.1"


SYSTEM_MESSAGE = {
    "role": "system",
    "content": """
You are a helpful AI assistant.

Rules:
- Answer in a simple and easy-to-understand way.
- Keep answers within 1-2 sentences unless the user asks for details.
- Be accurate and concise.
- If you don't know the answer, say so.
- Remember the conversation context provided in the messages.
"""
}

def generate_response(messages: list)-> str:
    """
    Generate a response using the full conversation history.
    """

    conversation = [SYSTEM_MESSAGE] + messages

    response = ollama.chat(
        model=MODEL,
        messages=conversation
    )

    return response["message"]["content"]


def generate_stream(messages: list):

    conversation = [SYSTEM_MESSAGE] + messages

    stream = ollama.chat(
        model=MODEL,
        messages=conversation,
        stream=True
    )

    for chunk in stream:
        yield chunk["message"]["content"]