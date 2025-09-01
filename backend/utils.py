import io
from fastapi import UploadFile, HTTPException

import PyPDF2

async def read_file(file: UploadFile) -> str:
    if file.filename.endswith(".txt"):
        content = (await file.read()).decode("utf-8")
    elif file.filename.endswith(".pdf"):
        file_bytes = await file.read()
        pdf_stream = io.BytesIO(file_bytes)
        pdf_reader = PyPDF2.PdfReader(pdf_stream)
        content = ""
        for page in pdf_reader.pages:
            content += page.extract_text() + "\n"
    else:
        raise HTTPException(status_code=422, detail="Unsupported file type. Only .txt or .pdf allowed.")
    return content
