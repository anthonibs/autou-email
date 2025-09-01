![o](https://github.com/user-attachments/assets/51c10b4c-d188-4fe1-a2b9-afede27b937f)



# Process Email

Sistema de classificação e resposta automática de emails.

---

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **Backend:** Processamento de emails, classificação e geração de respostas.  
- **Frontend:** Interface web para upload de emails e exibição dos resultados.

---

## **Backend**

### Passos para rodar localmente:

1. Navegue até a pasta `backend`:

```bash
cd backend
````

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

MIT License

