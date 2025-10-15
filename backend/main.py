from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
import json
import sqlite3
from datetime import datetime
from typing import List
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Code Review Assistant API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")
genai.configure(api_key=GEMINI_API_KEY)

# Get the correct model name
def get_available_model():
    try:
        models = genai.list_models()
        available_models = [m.name for m in models if 'generateContent' in m.supported_generation_methods]
        print(f"Available models: {available_models}")
        
        # Prefer newer models
        for model_name in available_models:
            if 'gemini-1.5-flash' in model_name:
                return model_name
            elif 'gemini-1.5-pro' in model_name:
                return model_name
            elif 'gemini-pro' in model_name:
                return model_name
        
        # Return first available model
        return available_models[0] if available_models else 'gemini-pro'
    except Exception as e:
        print(f"Error getting models: {e}")
        return 'gemini-1.5-flash'

model_name = get_available_model()
print(f"Using model: {model_name}")
model = genai.GenerativeModel(model_name)

# Initialize database
def init_db():
    conn = sqlite3.connect('reviews.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            readability_score REAL,
            modularity_score REAL,
            potential_issues TEXT,
            suggestions TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.get("/")
async def root():
    return {"message": "Code Review Assistant API", "status": "running"}

@app.get("/test")
async def test_gemini():
    try:
        response = model.generate_content("Say 'Hello from Gemini API!'")
        return {"status": "success", "response": response.text}
    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.get("/models")
async def list_models():
    try:
        models = genai.list_models()
        model_names = [m.name for m in models]
        return {"available_models": model_names}
    except Exception as e:
        return {"error": str(e)}

@app.post("/review")
async def review_code(files: List[UploadFile] = File(...)):
    try:
        reviews = []
        
        for file in files:
            print(f"Processing file: {file.filename}")
            
            # Read file content
            content = await file.read()
            code_content = content.decode('utf-8')
            
            # Limit code content size to avoid API limits
            if len(code_content) > 10000:
                code_content = code_content[:10000] + "\n... (truncated)"
            
            # Create prompt for Gemini
            prompt = f"""
            You are a code review expert. Analyze the following code and provide a JSON response with exactly this structure:

            {{
                "readability_score": 8.5,
                "modularity_score": 7.2,
                "potential_issues": ["Issue 1", "Issue 2"],
                "suggestions": ["Suggestion 1", "Suggestion 2"]
            }}

            Rules:
            - readability_score: number between 0-10 (how easy to read/understand)
            - modularity_score: number between 0-10 (how well organized/modular)
            - potential_issues: array of strings describing problems
            - suggestions: array of strings with improvement recommendations
            - Return ONLY valid JSON, no other text

            Code to analyze:
            ```{file.filename}
            {code_content}
            ```
            """
            
            try:
                # Get response from Gemini
                print("Calling Gemini API...")
                response = model.generate_content(prompt)
                print(f"Gemini response: {response.text[:200]}...")
                
                # Clean the response text
                response_text = response.text.strip()
                
                # Try to extract JSON from response
                if "```json" in response_text:
                    # Extract JSON from markdown code block
                    start = response_text.find("```json") + 7
                    end = response_text.find("```", start)
                    response_text = response_text[start:end].strip()
                elif "```" in response_text:
                    # Extract from generic code block
                    start = response_text.find("```") + 3
                    end = response_text.find("```", start)
                    response_text = response_text[start:end].strip()
                
                # Parse JSON response
                review_data = json.loads(response_text)
                print(f"Parsed review data: {review_data}")
                
            except json.JSONDecodeError as e:
                print(f"JSON parsing error: {e}")
                print(f"Raw response: {response.text}")
                # Fallback with mock data
                review_data = {
                    "readability_score": 7.5,
                    "modularity_score": 7.0,
                    "potential_issues": ["AI response parsing failed", "Please try uploading the file again"],
                    "suggestions": ["Ensure code file is properly formatted", "Try with a smaller code file"]
                }
            except Exception as e:
                print(f"Gemini API error: {e}")
                # Fallback with mock data
                review_data = {
                    "readability_score": 6.0,
                    "modularity_score": 6.0,
                    "potential_issues": ["API connection error", str(e)],
                    "suggestions": ["Check internet connection", "Try again in a moment"]
                }
            
            # Validate and sanitize the data
            review_data = {
                "readability_score": float(review_data.get("readability_score", 7.0)),
                "modularity_score": float(review_data.get("modularity_score", 7.0)),
                "potential_issues": review_data.get("potential_issues", ["No issues detected"]),
                "suggestions": review_data.get("suggestions", ["No suggestions available"])
            }
            
            # Store in database
            review_id = str(uuid.uuid4())
            conn = sqlite3.connect('reviews.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO reviews (id, filename, readability_score, modularity_score, potential_issues, suggestions)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                review_id,
                file.filename,
                review_data["readability_score"],
                review_data["modularity_score"],
                json.dumps(review_data["potential_issues"]),
                json.dumps(review_data["suggestions"])
            ))
            conn.commit()
            conn.close()
            
            review_data["id"] = review_id
            review_data["filename"] = file.filename
            reviews.append(review_data)
            print(f"Successfully processed {file.filename}")
        
        return {"reviews": reviews}
        
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing files: {str(e)}")

@app.get("/reviews")
async def get_reviews():
    try:
        conn = sqlite3.connect('reviews.db')
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, filename, readability_score, modularity_score, 
                   potential_issues, suggestions, created_at
            FROM reviews ORDER BY created_at DESC LIMIT 20
        ''')
        rows = cursor.fetchall()
        conn.close()
        
        reviews = []
        for row in rows:
            reviews.append({
                "id": row[0],
                "filename": row[1],
                "readability_score": row[2],
                "modularity_score": row[3],
                "potential_issues": json.loads(row[4]),
                "suggestions": json.loads(row[5]),
                "created_at": row[6]
            })
        
        return {"reviews": reviews}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)