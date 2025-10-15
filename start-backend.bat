@echo off
echo Starting Code Review Assistant Backend...
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000