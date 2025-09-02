import json
from openai import OpenAI

def classify_with_gpt(message: str, client: OpenAI, examples: list):
    prompt = "Você é um assistente que classifica emails e sugere respostas curtas.\n\nExemplos:\n"
    for ex in examples:
        prompt += f'Email: "{ex["email"]}"\nResposta:\n{{"tag": "{ex["tag"]}", "suggestedReply": "{ex["suggestedReply"]}"}}\n\n'

    prompt += f'Agora classifique o seguinte email e sugira uma resposta:\nEmail: "{message}"\nRetorne APENAS no formato JSON válido, sem texto adicional: {{ "tag": "...", "suggestedReply": "..." }}\n\nImportante: Se o email contém um arquivo anexo ou menciona envio de arquivos, a resposta sugerida deve ser adequada ao contexto do arquivo recebido, não uma solicitação para gerar novos arquivos.'

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response.choices[0].message.content.strip()
    
    # Remove markdown code blocks se presente
    if content.startswith('```json'):
        content = content[7:]
    if content.startswith('```'):
        content = content[3:]
    if content.endswith('```'):
        content = content[:-3]
    
    content = content.strip()
    
    try:
        return json.loads(content)
    except Exception:
        return {"tag": "unproductive", "suggestedReply": "Obrigado pela mensagem!"}
