from fastapi import FastAPI, UploadFile, Form, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime
from pathlib import Path
import json
import os

from backend.models import emails, generate_uuid
from backend.schemas import EmailIn, EmailOut
from backend.utils import read_file
from backend.gpt_classifier import classify_with_gpt

from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

# -------------------------
# Load Env
# -------------------------
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(find_dotenv(str(BASE_DIR / ".env")))

api_key = os.getenv("OPEN_AI_KEY")
if not api_key:
    raise RuntimeError("A variável OPEN_AI_KEY não está definida!")

client = OpenAI(api_key=api_key)

# -------------------------
# Load examples
# -------------------------
with open('backend/model.json', 'r', encoding='utf-8') as f:
    examples = json.load(f)

# -------------------------
# Initial FastAPI
# -------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Routes
# -------------------------
@app.get("/emails", response_model=list[EmailIn])
def list_emails():
    return emails

@app.post("/process-email", response_model=EmailOut, status_code=status.HTTP_201_CREATED)
async def process_email(
    message: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    if file:
        content = await read_file(file)
        title = content[:50]
    elif message:
        content = message
        title = message
    else:
        raise HTTPException(status_code=422, detail="Validation error: No message or file provided")

    classification = classify_with_gpt(content, client, examples)

    new_email = {
        "id": generate_uuid(),
        "message": title,
        "datetime": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "category": classification["tag"],
        "suggestedReply": classification["suggestedReply"],
    }
    emails.append(new_email)
    return {**new_email, "status": "Email successfully processed"}