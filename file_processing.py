import pdfplumber
import chromadb

chroma_client = chromadb.Client()

def store_chunks(course_name, chunks):
    """Stores text chunks in a per-course collection."""
    collection = chroma_client.get_or_create_collection(name=course_name)
    ids = [f"{course_name}_{i}" for i in range(len(chunks))]
    collection.add(documents=chunks, ids=ids)
    return collection

def get_collection(course_name):
    return chroma_client.get_or_create_collection(name=course_name)


def extract_text_from_pdf(uploaded_file):
    """Takes a Streamlit uploaded PDF file, returns all text as a string."""
    text = ""
    with pdfplumber.open(uploaded_file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def chunk_text(text, chunk_size=500, overlap=50):
    """Splits text into overlapping chunks so we don't lose context at boundaries."""
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks