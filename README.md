# Lighthub.ed

Lighthub.ed is a student study assistant repository with a Next.js frontend and a Python FastAPI backend. The workspace includes a study dashboard, course workspace, gap detector, panic mode UI, and a backend AI engine with document upload and vector search support.

## What this repo contains

- `app/`: Next.js App Router frontend for the study assistant UI
- `Backend/`: FastAPI backend service with document ingestion, PDF parsing, ChromaDB vector storage, and chat endpoint logic
- `render.yaml`: Render service configuration for hosting the backend
- frontend pages: dashboard, course workspace, gap detector, panic mode, and login

## What is implemented

- frontend navigation and branded Lighthub.ed interface
- course dashboard and workspace UI
- panic mode and gap detector pages
- FastAPI backend service at `Backend/app/main.py`
- document upload endpoint and PDF text extraction pipeline
- local ChromaDB vector store integration in `Backend/app/processing.py`
- deployment-ready Render configuration with `root: Backend`

## Run locally

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Next.js app.

### Backend

```bash
cd Backend
python -m pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Open [http://localhost:8000](http://localhost:8000) to verify the FastAPI backend.

## Deployment

This repo includes a Render configuration file at `render.yaml`.

The backend deploys from the `Backend` directory with:

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Environment variable: `PYTHONUNBUFFERED=1`

## Notes

The frontend is a working Next.js app, and the backend is configured for Render deployment. Some features are still prototype-level and may require further integration for production readiness.
