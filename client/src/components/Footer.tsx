import React from 'react';
import { Github, Twitter, Mail, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Zap className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-xl font-bold text-white">Alpha Agent Runner</span>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="mailto:info@example.com" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">About</h3>
              <p className="text-gray-400 text-sm">
                Alpha Agent Runner is an open-source project that simplifies building and deploying LLM agents with a visual interface. Created for developers who want to harness the power of AI without complex coding.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub Issues</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Contributing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Code of Conduct</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Alpha Agent Runner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;