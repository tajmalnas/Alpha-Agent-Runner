import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const animateText = () => {
      if (!textRef.current) return;
      
      textRef.current.classList.add('animate-in');
    };

    // Start animation after a small delay
    const timer = setTimeout(animateText, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 z-0"></div>
      
      {/* Animated background particles/grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute w-full h-full bg-[radial-gradient(#3B82F6_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 
            ref={textRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white opacity-0 transition-all duration-1000 transform translate-y-8"
          >
            <span className="block">Build and Run</span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              LLM Agents Visually
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 opacity-90 max-w-2xl mx-auto">
            A developer-first playground to compose AI tools with ease. 
            Design, test, and deploy intelligent agents without writing complex code.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={scrollToDemo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Try the Demo</span>
              <ArrowDown className="h-4 w-4" />
            </button>
            
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium transition-all hover:bg-gray-600 hover:shadow-lg"
            >
              View on GitHub
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;