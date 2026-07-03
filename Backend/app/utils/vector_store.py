import os
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import chromadb
from chromadb.utils import embedding_functions

# Initialize the persistent local ChromaDB database directory
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chroma_db")
chroma_client = chromadb.PersistentClient(path=DB_PATH)

# Use a local, fast embedding function (All-MiniLM-L6-v2)
default_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

def get_or_create_collection(course_id: str):
    """Fetches or initializes a dedicated vector sandbox collection for a course."""
    return chroma_client.get_or_create_collection(
        name=f"course_{course_id.lower()}",
        embedding_function=default_ef
    )

def process_pdf_to_vector_store(file_path: str, filename: str, course_id: str):
    """Parses PDF text, partitions it logically into vector chunks, and saves to ChromaDB."""
    # 1. Extract text from PDF layers
    reader = PdfReader(file_path)
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
            
    if not full_text.strip():
        raise ValueError("The document contains no parseable text layers.")

    # 2. Slice text cleanly into structural chunks
    # We use a chunk size of 600 characters with an overlap of 120 to preserve structural context
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=120,
        length_function=len
    )
    chunks = text_splitter.split_text(full_text)

    # 3. Mount chunks straight into the ChromaDB sandbox collection
    collection = get_or_create_collection(course_id)
    
    ids = [f"{filename}_chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"source": filename, "chunk_index": i} for i in range(len(chunks))]
    
    collection.add(
        documents=chunks,
        metadatas=metadatas,
        ids=ids
    )

    return {
        "filename": filename,
        "total_chunks": len(chunks),
        "preview": chunks[0][:150] if chunks else ""
    }