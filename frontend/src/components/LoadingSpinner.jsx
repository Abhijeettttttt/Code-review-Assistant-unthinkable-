import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: '📁', text: 'Reading your files...' },
    { icon: '🧠', text: 'AI is analyzing code structure...' },
    { icon: '🔍', text: 'Checking for potential issues...' },
    { icon: '💡', text: 'Generating suggestions...' },
    { icon: '📊', text: 'Calculating scores...' },
    { icon: '✨', text: 'Finalizing report...' }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-32 h-32 border-4 border-gray-200 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
        </div>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-bounce-slow">
            {steps[currentStep].icon}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-80 bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center animate-fade-in">
        <p className="text-xl font-semibold text-gray-700 mb-2">
          {steps[currentStep].text}
        </p>
        <p className="text-gray-500">
          AI is working its magic ✨
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2 mt-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Fun facts */}
      <div className="mt-8 text-center max-w-md">
        <p className="text-sm text-gray-400 italic">
          💡 Did you know? Good code readability can reduce debugging time by up to 70%!
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;