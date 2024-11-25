import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';

const Header: React.FC = () => {
  const [isUpscaleOpen, setIsUpscaleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUpscaleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#0E0E0F] py-4 border-b border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="w-24"></div>
        <h1 className="text-xl font-bold">
          VideoRemix AI <span className="text-[#E44E51]">Realtime Generation</span>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <Tooltip content="Choose upscale mode">
              <button 
                onClick={() => setIsUpscaleOpen(!isUpscaleOpen)}
                className="text-[#E44E51] hover:text-[#c73c3f] flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Creative Upscale
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 transition-transform duration-300 ${isUpscaleOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Tooltip>
            {isUpscaleOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-md shadow-lg bg-[#1C1C1E] ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu">
                  <button className="flex flex-col w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2C2C2E] hover:text-white transition duration-300">
                    <span className="font-semibold">Normal Upscale Mode</span>
                    <span className="text-gray-500 text-sm">Upscale your image - retaining some qualities of the original with an output that may appear less polished than with Creative Upscale</span>
                  </button>
                  <button className="flex flex-col w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2C2C2E] hover:text-white transition duration-300">
                    <span className="font-semibold">Creative Upscale Mode</span>
                    <span className="text-gray-500 text-sm">Creatively upscale your image - the recommended method for Realtime Gen</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <Tooltip content="Download generated image">
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};

export default Header;