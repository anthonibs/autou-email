import spacy

nlp = spacy.load("pt_core_news_sm")

def preprocess_text(text: str) -> str:
    doc = nlp(text)
    tokens = [
        token.lemma_.lower()  
        for token in doc
        if not token.is_stop     
        and token.is_alpha  
    ]

    return " ".join(tokens)
