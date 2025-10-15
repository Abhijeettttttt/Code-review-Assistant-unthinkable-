@echo off
echo Setting up Git repository...

echo.
echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: AI-powered Code Review Assistant

Features:
- React + TailwindCSS frontend with animations
- FastAPI backend with Google Gemini AI integration
- Real-time code analysis and scoring
- Beautiful UI with drag-and-drop file upload
- Review history and statistics
- Support for multiple programming languages
- Responsive design for all devices"

echo.
echo Adding remote repository...
git remote add origin https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-.git

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Repository setup complete!
echo Your project is now available at:
echo https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-
pause