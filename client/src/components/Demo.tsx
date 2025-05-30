import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true }) as { ref: any; inView: any; };
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    navigate('/agent-runner');
  };

  return (
    <section id="demo" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={ref} 
          className={`text-center mb-12 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the power and simplicity of Alpha Agent Runner with our interactive demo
          </p>
        </div>

        <div 
          className={`relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Demo Canvas Placeholder */}
          <div className="aspect-video bg-gray-800 relative">
            {/* Gradient overlay to simulate a UI */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30"></div>
            
            {/* Simulated UI elements */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gray-900 flex items-center px-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center text-sm font-mono opacity-70">Alpha Agent Runner Demo</div>
            </div>
            
            {/* Simulated canvas with nodes */}
            <div className="absolute inset-0 pt-12 p-4 flex">
              {/* Left panel */}
              <div className="w-1/3 bg-gray-850 rounded-lg mr-2 p-3 flex flex-col">
                <div className="bg-gray-700 rounded p-2 mb-2 text-sm">
                  <div className="font-bold mb-1 text-blue-300">Prompt</div>
                  <div className="text-gray-300">Find the population of Tokyo and calculate its growth rate...</div>
                </div>
                
                <div className="bg-gray-700 rounded p-2 mb-2 text-sm">
                  <div className="font-bold mb-1 text-purple-300">Tools</div>
                  <div className="flex gap-2 mb-1">
                    <div className="bg-blue-600 px-2 py-1 rounded text-xs">Search</div>
                    <div className="bg-green-600 px-2 py-1 rounded text-xs">Calculate</div>
                  </div>
                </div>
                
                <div className="flex-1"></div>
                
                <button 
                  className="bg-blue-600 animate-bounce hover:bg-blue-700 transition-colors py-2 rounded-lg font-medium flex items-center justify-center"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <>
                    <Play className="h-4 w-4 mr-2" />
                    <span>Run Agent</span>
                  </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      <span>Run Agent</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Right panel - Canvas */}
              <div className="flex-1 bg-gray-850 rounded-lg p-3 relative">
                {/* Animated nodes and connections if playing */}
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-xl text-blue-400 animate-pulse">Agent running...</div>
                  </div>
                )}
                
                {/* Static nodes */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-800 rounded-lg flex items-center justify-center text-xs font-bold">
                  Prompt Node
                </div>
                <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-purple-800 rounded-lg flex items-center justify-center text-xs font-bold">
                  Search Tool
                </div>
                <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-green-800 rounded-lg flex items-center justify-center text-xs font-bold">
                  Calculator
                </div>
                
                {/* Connector lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path 
                    d="M 100,100 L 200,200" 
                    stroke="rgba(59, 130, 246, 0.6)" 
                    strokeWidth="2"
                    fill="none"
                  />
                  <path 
                    d="M 200,200 L 300,100" 
                    stroke="rgba(59, 130, 246, 0.6)" 
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Demo Controls */}
          <div className="bg-gray-850 p-4 border-t border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {isPlaying ? 'Agent is running...' : 'Click "Run Agent" to start the demo'}
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View full documentation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;