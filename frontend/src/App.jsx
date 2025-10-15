import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ReviewCard from './components/ReviewCard';
import LoadingSpinner from './components/LoadingSpinner';

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [stats, setStats] = useState({ totalReviews: 0, avgReadability: 0, avgModularity: 0 });

  useEffect(() => {
    if (activeTab === 'history') {
      fetchReviews();
    }
  }, [activeTab]);

  useEffect(() => {
    if (reviews.length > 0) {
      calculateStats();
    }
  }, [reviews]);

  const calculateStats = () => {
    const totalReviews = reviews.length;
    const avgReadability = reviews.reduce((sum, r) => sum + r.readability_score, 0) / totalReviews;
    const avgModularity = reviews.reduce((sum, r) => sum + r.modularity_score, 0) / totalReviews;
    setStats({ totalReviews, avgReadability: avgReadability.toFixed(1), avgModularity: avgModularity.toFixed(1) });
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleFileUpload = async (files) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await axios.post(`${API_BASE_URL}/review`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setReviews(response.data.reviews);
      setActiveTab('results');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error analyzing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg animate-bounce-slow">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Code Review Assistant
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered code analysis using Google Gemini ✨
          </p>
          
          {/* Stats Bar */}
          {reviews.length > 0 && (
            <div className="flex justify-center mt-6 space-x-6 animate-slide-up">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                <div className="text-2xl font-bold text-blue-600">{stats.totalReviews}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                <div className="text-2xl font-bold text-green-600">{stats.avgReadability}</div>
                <div className="text-sm text-gray-600">Avg Readability</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                <div className="text-2xl font-bold text-purple-600">{stats.avgModularity}</div>
                <div className="text-sm text-gray-600">Avg Modularity</div>
              </div>
            </div>
          )}
        </header>

        {/* Enhanced Navigation */}
        <nav className="flex justify-center mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-2 border border-white/20">
            <div className="flex space-x-1">
              {[
                { id: 'upload', label: 'Upload Code', icon: '📁' },
                { id: 'results', label: 'Results', icon: '📊' },
                { id: 'history', label: 'History', icon: '📚' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 transform ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50 hover:scale-102'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content with Animations */}
        <main className="animate-fade-in">
          {loading && <LoadingSpinner />}
          
          {!loading && activeTab === 'upload' && (
            <div className="animate-slide-up">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          )}

          {!loading && (activeTab === 'results' || activeTab === 'history') && (
            <div className="animate-slide-up">
              {reviews.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="inline-block p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
                    <div className="text-6xl mb-4 animate-bounce-slow">
                      {activeTab === 'results' ? '🚀' : '📝'}
                    </div>
                    <p className="text-gray-500 text-xl font-medium">
                      {activeTab === 'results' 
                        ? 'No reviews yet. Upload some code files to get started!' 
                        : 'No review history found.'}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {activeTab === 'results' 
                        ? 'Drag & drop your files or click to browse' 
                        : 'Your past reviews will appear here'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={`flex flex-wrap justify-center gap-8 ${
                  reviews.length === 1 
                    ? 'max-w-md mx-auto' 
                    : reviews.length === 2 
                      ? 'max-w-4xl mx-auto' 
                      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {reviews.map((review, index) => (
                    <div 
                      key={review.id || index} 
                      className={`animate-fade-in-up ${
                        reviews.length === 1 
                          ? 'w-full' 
                          : reviews.length === 2 
                            ? 'w-full md:w-96' 
                            : ''
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ReviewCard review={review} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        {/* Floating Action Button */}
        {activeTab !== 'upload' && (
          <button
            onClick={() => setActiveTab('upload')}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce-slow"
          >
            <span className="text-2xl">➕</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;