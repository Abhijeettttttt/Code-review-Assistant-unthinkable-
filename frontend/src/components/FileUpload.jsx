import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.includes('text') || 
      file.name.match(/\.(js|jsx|ts|tsx|py|java|cpp|c|cs|php|rb|go|rs)$/i)
    );
    
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.includes('text') || 
      file.name.match(/\.(js|jsx|ts|tsx|py|java|cpp|c|cs|php|rb|go|rs)$/i)
    );
    
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      onFileUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
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

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 transform ${
          dragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105 shadow-2xl'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:scale-102'
        } bg-white/80 backdrop-blur-sm shadow-xl`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10">
          <div className="mb-6 animate-bounce-slow">
            <div className="inline-block p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Upload Your Code Files
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            Drag and drop your files here, or click to browse
          </p>
          
          <input
            type="file"
            multiple
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span className="mr-2">📁</span>
            Choose Files
          </label>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['JS', 'TS', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust'].map((lang) => (
              <span key={lang} className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-sm text-gray-600 border border-gray-200">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-8 animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Selected Files ({selectedFiles.length})
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-white to-gray-50 p-4 rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getFileIcon(file.name)}</span>
                    <div>
                      <span className="font-semibold text-gray-800 block">
                        {file.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>🚀</span>
              <span>Analyze {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}</span>
              <span>✨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;