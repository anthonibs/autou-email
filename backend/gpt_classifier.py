import json
from openai import OpenAI

def classify_with_gpt(message: str, client: OpenAI, examples: list):
    prompt = "Você é um assistente que classifica emails e sugere respostas curtas.\n\nExemplos:\n"
    for ex in examples:
        prompt += f'Email: "{ex["email"]}"\nResposta:\n{{"tag": "{ex["tag"]}", "suggestedReply": "{ex["suggestedReply"]}"}}\n\n'

    prompt += f'Agora classifique o seguinte email e sugira uma resposta:\nEmail: "{message}"\nRetorne no formato JSON: {{ "tag": "...", "suggestedReply": "..." }}'

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.8,
    )

    content = response.choices[0].message.content.strip()
    try:
        return json.loads(content)
    except Exception:
        return {"tag": "unproductive", "suggestedReply": "Obrigado pela mensagem!"}
