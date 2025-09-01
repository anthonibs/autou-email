from typing import List
from datetime import datetime
from uuid import uuid4
from pydantic import BaseModel
from typing import Literal

def generate_uuid():
    return str(uuid4())

class Email(BaseModel):
    id: str
    message: str
    suggestedReply: str
    datetime: datetime
    category: Literal["productive", "unproductive"]

# Mock email list
emails: List[Email] = [
    { 
        "id": generate_uuid(),
        "message": "Preciso do status da minha solicitação.",
        "category": "productive",
        "suggestedReply": "Obrigado pelo envio! Irei verificar e responder em breve.",
        "datetime": "2025-08-31 16:45"
    },
    {
        "id": generate_uuid(),
        "message": "Feliz aniversário!",
        "category": "unproductive",
        "suggestedReply": "Agradeço a mensagem!",
        "datetime": "2025-08-31 16:45"
    },
    {
        "id": generate_uuid(),
        "message": "Segue em anexo o relatório atualizado.",
        "category": "productive",
        "suggestedReply": "Obrigado pelo envio! Irei verificar e responder em breve.",
        "datetime": "2025-08-31 16:45"
    }
]
