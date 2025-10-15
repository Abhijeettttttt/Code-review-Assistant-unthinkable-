import React, { useState } from 'react';

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-emerald-600';
    if (score >= 6) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 8) return 'bg-gradient-to-br from-emerald-50 to-green-100';
    if (score >= 6) return 'bg-gradient-to-br from-amber-50 to-yellow-100';
    return 'bg-gradient-to-br from-red-50 to-pink-100';
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return 'from-emerald-500 to-green-500';
    if (score >= 6) return 'from-amber-500 to-yellow-500';
    return 'from-red-500 to-pink-500';
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      js: '🟨', jsx: '⚛️', ts: '🔷', tsx: '⚛️',
      py: '🐍', java: '☕', cpp: '⚙️', c: '⚙️',
      cs: '🔷', php: '🐘', rb: '💎', go: '🐹', rs: '🦀'
    };
    return icons[ext] || '📄';
  };

  const CircularProgress = ({ score, label, gradient }) => (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`bg-gradient-to-r ${gradient} text-transparent`}
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${score * 10}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={`stop-color-${gradient.split(' ')[0].replace('from-', '')}`} />
            <stop offset="100%" className={`stop-color-${gradient.split(' ')[1].replace('to-', '')}`} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getFileIcon(review.filename)}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {review.filename}
              </h3>
              {review.created_at && (
                <span className="text-xs text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Score Circles */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="text-center">
            <CircularProgress 
              score={review.readability_score} 
              label="Read" 
              gradient={getScoreGradient(review.readability_score)}
            />
          </div>
          <div className="text-center">
            <CircularProgress 
              score={review.modularity_score} 
              label="Mod" 
              gradient={getScoreGradient(review.modularity_score)}
            />
          </div>
        </div>

        {/* Issues Preview */}
        {review.potential_issues && review.potential_issues.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              Issues ({review.potential_issues.length})
            </h4>
            <div className="space-y-2">
              {review.potential_issues.slice(0, isExpanded ? undefined : 2).map((issue, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-2 p-3 bg-red-50 rounded-xl border-l-4 border-red-400 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-sm text-gray-700">{issue}</span>
                </div>
              ))}
              {!isExpanded && review.potential_issues.length > 2 && (
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    +{review.potential_issues.length - 2} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Suggestions Preview */}
        {review.suggestions && review.suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
              <span className="text-blue-500 mr-2">💡</span>
              Suggestions ({review.suggestions.length})
            </h4>
            <div className="space-y-2">
              {review.suggestions.slice(0, isExpanded ? undefined : 2).map((suggestion, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-2 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-400 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </div>
              ))}
              {!isExpanded && review.suggestions.length > 2 && (
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    +{review.suggestions.length - 2} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overall Score Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${
            ((review.readability_score + review.modularity_score) / 2) >= 8 
              ? 'from-emerald-500 to-green-500' 
              : ((review.readability_score + review.modularity_score) / 2) >= 6 
                ? 'from-amber-500 to-yellow-500' 
                : 'from-red-500 to-pink-500'
          }`}>
            {((review.readability_score + review.modularity_score) / 2).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;