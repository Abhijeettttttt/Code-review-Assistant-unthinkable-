@echo off
echo Setting up Code Review Assistant...

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit backend/.env file and add your GEMINI_API_KEY
    echo Get your API key from: https://makersuite.google.com/app/apikey
    echo.
)
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Setup complete!
echo.
echo NEXT STEPS:
echo 1. Edit backend/.env file and add your GEMINI_API_KEY
echo 2. Start backend: cd backend && uvicorn main:app --reload
echo 3. Start frontend: cd frontend && npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
pause