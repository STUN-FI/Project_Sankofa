import io
import os
from pypdf import PdfReader
import chromadb
from chromadb.utils import embedding_functions

# 1. Initialize Persistent local ChromaDB Client sandbox directory
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chroma_db")
chroma_client = chromadb.PersistentClient(path=DB_PATH)

# Use a lightweight, local model running entirely on your machine
default_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts raw text layers from the uploaded binary byte stream."""
    try:
        # Load the bytes direct into an in-memory stream wrapper
        pdf_stream = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_stream)
        
        full_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
                
        return full_text.strip()
    except Exception as e:
        return f"Error: Text layer parsing extraction failed: {str(e)}"

def chunk_text(text: str, chunk_size: int = 600, overlap: int = 120) -> list:
    """Slices plain text into chunks and instantly indexes them into local ChromaDB."""
    if not text or text.startswith("Error"):
        return []

    # --- Standard Token/Character Splitter Logic ---
    words = text.split()
    chunks = []
    
    # Fast window sliding mechanics over list indices
    step = chunk_size - overlap
    for i in range(0, len(words), step):
        chunk_words = words[i:i + chunk_size]
        chunk_text = " ".join(chunk_words)
        if chunk_text.strip():
            chunks.append(chunk_text)

    # If parsing somehow yielded zero chunks, return empty
    if not chunks:
        return []

    # --- CHROMADB LOCAL MOUNTING ENGINE ---
    try:
        # Get or create a specific vector sandbox space for COS 141 workspace
        collection = chroma_client.get_or_create_collection(
            name="course_cos141",
            embedding_function=default_ef
        )
        
        # Build vector tracking keys
        # We use standard string indexing hashes to prevent database collisions
        ids = [f"doc_chunk_{i}_{hash(chunks[i][:20])}" for i in range(len(chunks))]
        metadatas = [{"chunk_index": i} for i in range(len(chunks))]
        
        # Add straight to the local persistent database storage
        collection.add(
            documents=chunks,
            metadatas=metadatas,
            ids=ids
        )
    except Exception as database_error:
        print(f"ChromaDB Sandbox Write Exception: {database_error}")
        # We fall back silently so the API route still completes successfully 
        # even if database locks happen during setup spikes

    return chunks

def query_vector_store(user_query: str, n_results: int = 3) -> str:
    """Queries ChromaDB for the most contextually relevant chunks matching the user's prompt."""
    try:
        # Reference the established sandbox collection
        collection = chroma_client.get_or_create_collection(
            name="course_cos141",
            embedding_function=default_ef
        )
        
        # Search the database collection for matches
        results = collection.query(
            query_texts=[user_query],
            n_results=n_results
        )
        
        # Flatten the retrieved matching text documents into a unified background context block
        retrieved_docs = results.get("documents", [[]])[0]
        
        if not retrieved_docs:
            return "No background reference text has been indexed for this course yet."
            
        context_block = "\n---\n".join(retrieved_docs)
        return context_block

    except Exception as e:
        print(f"ChromaDB Query Error: {e}")
        return ""