import React from 'react';
import { useGenerationStore } from '../store/generationStore';
import Tooltip from './Tooltip';

const GenerationHistory: React.FC = () => {
  const { generationHistory, setSelectedImage } = useGenerationStore();

  return (
    <div className="bg-[#1C1C1E] rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">Generation History</h2>
      <div className="grid grid-cols-4 gap-4">
        {generationHistory.map((generation, index) => (
          <Tooltip 
            key={index}
            content={generation.status === 'COMPLETE' ? 'Click to select or create variations' : generation.status}
          >
            <div 
              className="relative group cursor-pointer"
              onClick={() => generation.imageUrl && setSelectedImage(generation.imageUrl)}
            >
              {generation.imageUrl ? (
                <img 
                  src={generation.imageUrl} 
                  alt={`Generation ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-24 bg-[#2C2C2E] rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">
                    {generation.status === 'PENDING' ? 'Generating...' : 'Failed'}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <button className="text-white text-sm bg-[#E44E51] px-3 py-1 rounded-md">
                  Create Variation
                </button>
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default GenerationHistory;