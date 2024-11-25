import React, { useState } from 'react';
import { useGenerationStore } from '../store/generationStore';
import { generateImage } from '../services/leonardoApi';
import Tooltip from './Tooltip';

const PromptInput: React.FC = () => {
  const { prompt, setPrompt, model, guidanceScale, steps, width, height, scheduler, seed, batchSize, negativePrompt } = useGenerationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await generateImage({
        prompt,
        modelId: model,
        negative_prompt: negativePrompt,
        guidance_scale: guidanceScale,
        num_inference_steps: steps,
        width,
        height,
        scheduler: scheduler.toLowerCase(),
        seed: seed === -1 ? undefined : seed,
        num_images: batchSize,
      });

      console.log('Generation started:', response);
      
      if (response.generationId) {
        useGenerationStore.getState().addToHistory({
          id: response.generationId,
          status: 'PENDING',
          error: undefined
        });
      } else {
        throw new Error('No generation ID received');
      }
    } catch (error: any) {
      console.error('Generation failed:', error);
      setError(error.message || 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex space-x-4">
        <Tooltip content="Enter your image description here">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a prompt..."
            className="flex-grow bg-[#1C1C1E] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-[#E44E51]"
          />
        </Tooltip>
        <Tooltip content="Start generating your image">
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className={`${
              isLoading || !prompt ? 'bg-gray-600' : 'bg-[#E44E51] hover:bg-[#c73c3f]'
            } text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </Tooltip>
      </div>
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default PromptInput;