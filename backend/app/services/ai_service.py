# try:
#     import ollama  # type: ignore[import]
# except ImportError as exc:
#     ollama = None
#     _OLLAMA_IMPORT_ERROR = exc

import ollama  # type: ignore[import]

MODEL = "llama3.1"



def generate_response(
        message: str
):

    response = ollama.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": message
            }
        ]
    )


    return response["message"]["content"]