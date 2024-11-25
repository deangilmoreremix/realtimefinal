import React, { useState, useRef, useEffect } from 'react';
import { useGenerationStore } from '../store/generationStore';
import Tooltip from './Tooltip';

const models = [
  { id: 'leonardo-creative-sdxl', name: 'Creative SDXL', description: 'Latest and most advanced model for high-quality, detailed images' },
  { id: 'leonardo-creative-v2', name: 'Creative V2', description: 'Balanced model for general-purpose image generation' },
  { id: 'leonardo-creative-v1', name: 'Creative V1', description: 'Fast and efficient model for quick iterations' },
  { id: 'leonardo-diffusion-v2', name: 'Diffusion V2', description: 'Specialized model for artistic and creative outputs' },
  { id: 'leonardo-diffusion-v1', name: 'Diffusion V1', description: 'Basic model for simple image generation' }
];

const generationModes = [
  { id: 'text2img', name: 'Text to Image', description: 'Generate images from text descriptions' },
  { id: 'img2img', name: 'Image to Image', description: 'Transform existing images using AI' },
  { id: 'inpainting', name: 'Inpainting', description: 'Edit specific parts of an image' },
  { id: 'outpainting', name: 'Outpainting', description: 'Extend images beyond their original boundaries' }
];

const ActionButtons: React.FC = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { model, setModel } = useGenerationStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsModelOpen(false);
        setIsModeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedModel = models.find(m => m.id === model)?.name || 'Select Model';
  const selectedMode = generationModes[0].name;

  return (
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <div className="relative" ref={dropdownRef}>
          <Tooltip content="Select AI model for image generation">
            <button
              onClick={() => setIsModelOpen(!isModelOpen)}
              className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white font-medium py-3 px-4 rounded-lg flex items-center transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E44E51]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2z" clipRule="evenodd" />
              </svg>
              {selectedModel}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 transition-transform duration-300 ${isModelOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Tooltip>
          {isModelOpen && (
            <div className="absolute left-0 bottom-full mb-2 w-64 rounded-md shadow-lg bg-[#1C1C1E] ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {models.map((model) => (
                  <Tooltip key={model.id} content={model.description}>
                    <button
                      onClick={() => {
                        setModel(model.id);
                        setIsModelOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2C2C2E] hover:text-white transition duration-300"
                    >
                      {model.name}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Tooltip content="Choose generation mode">
            <button
              onClick={() => setIsModeOpen(!isModeOpen)}
              className="bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white font-medium py-3 px-4 rounded-lg flex items-center transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#E44E51]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
              </svg>
              {selectedMode}
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 transition-transform duration-300 ${isModeOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Tooltip>
          {isModeOpen && (
            <div className="absolute left-0 bottom-full mb-2 w-64 rounded-md shadow-lg bg-[#1C1C1E] ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {generationModes.map((mode) => (
                  <Tooltip key={mode.id} content={mode.description}>
                    <button
                      onClick={() => setIsModeOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2C2C2E] hover:text-white transition duration-300"
                    >
                      {mode.name}
                    </button>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Tooltip content="Generate a new random seed for unique variations">
        <button 
          onClick={() => {
            const randomSeed = Math.floor(Math.random() * 2147483647);
            useGenerationStore.getState().setSeed(randomSeed);
          }}
          className="bg-[#E44E51] hover:bg-[#c73c3f] text-white font-medium py-3 px-4 rounded-lg flex items-center transition duration-300"
        >
          Random Seed
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};

export default ActionButtons;