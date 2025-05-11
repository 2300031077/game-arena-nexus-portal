
import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Set a timeout to complete the animation after 2.5 seconds
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isAnimationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gaming-purple/20 flex items-center justify-center animate-pulse-glow mb-4">
          <Trophy size={40} className="text-gaming-purple animate-bounce" />
        </div>
        
        <h1 className="text-5xl font-bold gaming-font text-center">
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>A</span>
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.3s' }}>r</span>
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.4s' }}>e</span>
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.5s' }}>n</span>
          <span className="inline-block animate-fade-in" style={{ animationDelay: '0.6s' }}>a</span>
          <span className="inline-block text-gaming-purple animate-fade-in" style={{ animationDelay: '0.7s' }}>N</span>
          <span className="inline-block text-gaming-purple animate-fade-in" style={{ animationDelay: '0.8s' }}>e</span>
          <span className="inline-block text-gaming-purple animate-fade-in" style={{ animationDelay: '0.9s' }}>x</span>
          <span className="inline-block text-gaming-purple animate-fade-in" style={{ animationDelay: '1s' }}>u</span>
          <span className="inline-block text-gaming-purple animate-fade-in" style={{ animationDelay: '1.1s' }}>s</span>
        </h1>
        
        <div className="mt-6 w-64 h-1 bg-muted relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 h-full bg-gaming-purple animate-[loading_2s_ease-in-out]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
