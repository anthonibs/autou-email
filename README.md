![o (1)](https://github.com/user-attachments/assets/4b6192a0-d247-48a9-a6af-84d689df57e4)



# Trust Email: O seu assistente pessoal de e-mails.

O Trust Email automatiza suas respostas, liberando você para focar no que realmente importa. Com nossa inteligência artificial avançada, suas mensagens são analisadas e respondidas de forma instantânea, mantendo a profissionalidade e a personalização.

## Demonstração em Vídeo

Confira abaixo um exemplo da aplicação em funcionamento, desde o envio de emails até a classificação e sugestão de resposta automática:

[Screencast from 2025-09-01 20-45-34.webm](https://github.com/user-attachments/assets/700b8a69-1513-4475-a10d-969487de2481)


---

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend:** Processamento de emails, classificação e geração de respostas.  
- **Frontend:** Interface web para upload de emails e exibição dos resultados.

---

## Funcionalidades

- Upload de arquivos .txt e .pdf com conteúdo de emails.
- Classificação automática dos emails em Produtivo ou Improdutivo.
- Exibição da lista de emails processados com data e conteúdo.
- Sugestão de resposta automática para emails produtivos.
- API com rotas:
  - `/emails` → retorna a lista de emails processados.
  - `/process-email` → processa um novo email enviado.

## **Backend**

### Variáveis de ambiente

Crie um arquivo .env dentro da pasta backend com o seguinte conteúdo:

```bash
VITE_API_BASE_URL=http://localhost:8000
OPEN_AI_KEY=<sua_chave_openai_aqui>
```

- `VITE_API_BASE_URL`: URL base onde o backend será acessado.
- `OPEN_AI_KEY`: sua chave da API da OpenAI para processar os emails.

### Rotas disponíveis

- `GET /emails` → Retorna lista de emails mockados.
- `POST /process-email` → Recebe um texto ou arquivo (.txt/.pdf) e retorna classificação (Produtivo/Improdutivo) e resposta sugerida.

### Passos para rodar localmente:

1. Navegue até a pasta `backend`:

```bash
cd backend
```

2. Crie o ambiente virtual:

```bash
python3 -m venv .venv
```

3. Ative o ambiente virtual:

```bash
source .venv/bin/activate   # Linux/macOS
# .venv\Scripts\activate    # Windows
```

4. Instale as dependências (caso tenha `requirements.txt`):

```bash
pip install -r requirements.txt
```

5. Execute o servidor localmente:

```bash
python -m uvicorn backend.main:app --reload
```

> O servidor estará disponível em: `http://127.0.0.1:8000/emails`

---

## **Frontend**

### Passos para rodar localmente:

1. Navegue até a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm i
```

3. Rode o frontend em modo de desenvolvimento:

```bash
npm run dev
```

4. Para gerar o build de produção:

```bash
npm run build
```

---

## **Uso**

1. Abra a interface web no navegador (por padrão `http://localhost:5173` ou o endereço mostrado no terminal).
2. Faça upload de um arquivo `.txt` ou `.pdf`, ou cole o texto do email.
3. Clique em **Enviar**.
4. Veja a categoria do email (Produtivo ou Improdutivo) e a resposta sugerida.

---

## **Hospedagem**

* A aplicação pode ser hospedada em plataformas gratuitas como **Heroku**, **Vercel**, **AWS Free Tier** ou **GCP**.
* Forneça o link da aplicação online para testes.

---

## **Tecnologias Utilizadas**

* **Backend:** Python, FastAPI, AI (OpenAI GPT)
* **Frontend:** HTML, CSS, JavaScript,Vite (React)
* **Hospedagem:** Plataformas de nuvem gratuitas

---

## **Licença**

[MIT License](https://github.com/anthonibs/process-email?tab=MIT-1-ov-file)

