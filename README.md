# 🧠 Code Review Assistant

> **Transform your code quality with AI-powered reviews in seconds!**

An intelligent code review assistant that analyzes your code for readability, modularity, potential bugs, and provides actionable improvement suggestions using Google's advanced Gemini AI.

![Code Review Assistant Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![AI Powered](https://img.shields.io/badge/AI-Gemini-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 What Does This Do? (In Simple Terms)

Imagine having a **super-smart coding buddy** who:
- 📖 **Reads your code** like a book and tells you how easy it is to understand
- 🧩 **Checks if your code is well-organized** (like a tidy room vs messy room)
- 🐛 **Spots potential problems** before they become real bugs
- 💡 **Gives you tips** to make your code better and cleaner
- ⚡ **Does all this in seconds** instead of hours of manual review

**Perfect for:** Students learning to code, developers wanting to improve, teams maintaining code quality, or anyone curious about their coding skills!

## ✨ Key Features

### 🎯 **Smart Analysis**
- **Readability Score (0-10)**: How easy is your code to read and understand?
- **Modularity Score (0-10)**: How well-organized and reusable is your code?
- **Issue Detection**: Finds potential bugs, security issues, and bad practices
- **Improvement Suggestions**: Actionable tips to enhance your code

### 🎨 **Beautiful Interface**
- **Drag & Drop Upload**: Simply drag your code files onto the screen
- **Real-time Analysis**: Watch AI analyze your code with animated progress
- **Interactive Results**: Expandable cards showing detailed feedback
- **History Tracking**: Keep track of all your past code reviews
- **Mobile Friendly**: Works perfectly on phones, tablets, and desktops

### 🚀 **Developer Experience**
- **Multiple File Support**: Analyze entire projects at once
- **Language Support**: JavaScript, Python, Java, C++, TypeScript, and more
- **Fast Processing**: Get results in under 30 seconds
- **No Registration**: Start using immediately, no sign-up required

## 🛠️ Technical Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React + TailwindCSS + Vite | Beautiful, responsive user interface |
| **Backend** | FastAPI (Python) | High-performance API server |
| **AI Engine** | Google Gemini API | Advanced code analysis and suggestions |
| **Database** | SQLite | Store review history and results |
| **Styling** | Custom CSS + Animations | Smooth, engaging user experience |

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.8+** installed on your computer
- **Node.js 16+** installed on your computer
- **Google Gemini API Key** (free to get!)

### Step 1: Get Your API Key 🔑
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (keep it safe!)

### Step 2: Clone & Setup 📥
```bash
# Clone the repository
git clone https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-.git
cd Code-review-Assistant-unthinkable-

# Setup Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env file and add your GEMINI_API_KEY

# Setup Frontend (in a new terminal)
cd frontend
npm install
```

### Step 3: Run the Application 🏃‍♂️
```bash
# Terminal 1: Start Backend Server
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Start Frontend Server
cd frontend
npm run dev
```

### Step 4: Start Reviewing! 🎉
1. Open your browser to `http://localhost:3000`
2. Drag and drop your code files
3. Watch the AI analyze your code
4. Get detailed feedback and suggestions!

## 📁 Project Structure

```
Code-review-Assistant-unthinkable-/
├── 📂 backend/                 # Python FastAPI server
│   ├── main.py                # Main API application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   └── reviews.db            # SQLite database (auto-created)
├── 📂 frontend/               # React application
│   ├── 📂 src/
│   │   ├── 📂 components/     # React components
│   │   │   ├── FileUpload.jsx # File upload interface
│   │   │   ├── ReviewCard.jsx # Review result display
│   │   │   └── LoadingSpinner.jsx # Loading animation
│   │   ├── App.jsx           # Main application
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Styles and animations
│   ├── package.json          # Node.js dependencies
│   └── index.html            # HTML template
├── 📂 sample-code/            # Example files for testing
├── README.md                 # This file
├── .gitignore               # Git ignore rules
└── setup.bat                # Windows setup script
```

## 🎮 How to Use

### 1. **Upload Your Code**
- Click "Upload Code" tab
- Drag & drop files or click "Choose Files"
- Supports: `.js`, `.py`, `.java`, `.cpp`, `.ts`, `.jsx`, `.tsx`, `.c`, `.cs`, `.php`, `.rb`, `.go`, `.rs`

### 2. **Watch the Magic** ✨
- AI analyzes your code structure
- Checks for readability and modularity
- Identifies potential issues
- Generates improvement suggestions

### 3. **Review Results** 📊
- **Scores**: See readability and modularity ratings (0-10)
- **Issues**: Red cards showing potential problems
- **Suggestions**: Blue cards with improvement tips
- **Expand**: Click cards to see full details

### 4. **Track Progress** 📈
- View your coding improvement over time
- Compare scores across different projects
- Access full history of past reviews

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API health check |
| `/test` | GET | Test Gemini AI connection |
| `/models` | GET | List available AI models |
| `/review` | POST | Analyze uploaded code files |
| `/reviews` | GET | Get review history |

## 🎨 Customization

### Adding New Programming Languages
Edit `FileUpload.jsx` and add your file extension:
```javascript
accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.your_extension"
```

### Modifying AI Prompts
Edit the prompt in `backend/main.py` to customize analysis focus:
```python
prompt = f"""
Your custom analysis instructions here...
"""
```

### Styling Changes
Modify `frontend/src/index.css` for custom animations and colors.

## 🚨 Troubleshooting

### Common Issues & Solutions

**❌ "API connection error"**
- ✅ Check your `GEMINI_API_KEY` in `.env` file
- ✅ Verify internet connection
- ✅ Ensure API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)

**❌ "Site cannot be reached"**
- ✅ Make sure both backend (port 8000) and frontend (port 3000) are running
- ✅ Check if ports are already in use
- ✅ Try restarting both servers

**❌ "File upload fails"**
- ✅ Ensure file size is under 10MB
- ✅ Check file extension is supported
- ✅ Verify file contains valid code

**❌ "Module not found" errors**
- ✅ Run `pip install -r requirements.txt` in backend folder
- ✅ Run `npm install` in frontend folder
- ✅ Check Python and Node.js versions

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💾 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### Ideas for Contributions
- 🌍 Add support for more programming languages
- 🎨 Improve UI/UX design
- 🧠 Enhance AI prompts for better analysis
- 📱 Add mobile app version
- 🔒 Add user authentication
- 📊 Add more detailed analytics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful code analysis capabilities
- **FastAPI** for the excellent Python web framework
- **React & TailwindCSS** for the beautiful frontend
- **Open Source Community** for inspiration and tools

## 🌐 Live Demo & Deployment

### Quick Deploy Options

#### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-&project-name=code-review-assistant&root-directory=frontend)

#### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-&envs=GEMINI_API_KEY)

### Deployment Instructions
- **Detailed Guide**: See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
- **Quick Fix**: If you got a 404 error on Vercel, check the deployment guide above

## 📞 Support & Contact

- 🐛 **Found a bug?** [Open an issue](https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/Abhijeettttttt/Code-review-Assistant-unthinkable-/discussions)
- 📧 **Need help?** Create an issue with the "help wanted" label
- 🚀 **Deployment issues?** Check [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

---

<div align="center">

**⭐ If this project helped you, please give it a star! ⭐**

Made with ❤️ by [Abhijeet](https://github.com/Abhijeettttttt)

</div>