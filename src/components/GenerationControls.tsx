import React from 'react';
import { useGenerationStore } from '../store/generationStore';
import Tooltip from './Tooltip';

const schedulers = ['EULER', 'DDIM', 'DPM++ 2M'];
const dimensionPresets = [
  { name: 'Square', width: 512, height: 512 },
  { name: 'Portrait', width: 512, height: 768 },
  { name: 'Landscape', width: 768, height: 512 },
];

const GenerationControls: React.FC = () => {
  const store = useGenerationStore();

  return (
    <div className="bg-[#1C1C1E] rounded-lg p-4 space-y-4">
      <Tooltip content="Add terms to exclude from the generation">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Negative Prompt
          </label>
          <textarea
            value={store.negativePrompt}
            onChange={(e) => store.setNegativePrompt(e.target.value)}
            className="w-full bg-[#0E0E0F] text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-[#E44E51]"
            rows={2}
          />
        </div>
      </Tooltip>

      <div className="grid grid-cols-2 gap-4">
        <Tooltip content="Control how closely the image follows your prompt (higher = more faithful to prompt)">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Guidance Scale ({store.guidanceScale})
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={store.guidanceScale}
              onChange={(e) => store.setGuidanceScale(Number(e.target.value))}
              className="w-full accent-[#E44E51]"
            />
          </div>
        </Tooltip>

        <Tooltip content="Number of denoising steps (higher = more detailed but slower)">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Steps ({store.steps})
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={store.steps}
              onChange={(e) => store.setSteps(Number(e.target.value))}
              className="w-full accent-[#E44E51]"
            />
          </div>
        </Tooltip>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Tooltip content="Choose the algorithm for image generation (affects quality and speed)">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scheduler
            </label>
            <select
              value={store.scheduler}
              onChange={(e) => store.setScheduler(e.target.value)}
              className="w-full bg-[#0E0E0F] text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-[#E44E51]"
            >
              {schedulers.map((scheduler) => (
                <option key={scheduler} value={scheduler}>
                  {scheduler}
                </option>
              ))}
            </select>
          </div>
        </Tooltip>

        <Tooltip content="Set the output image dimensions">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dimensions
            </label>
            <select
              value={`${store.width}x${store.height}`}
              onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                store.setDimensions(width, height);
              }}
              className="w-full bg-[#0E0E0F] text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-[#E44E51]"
            >
              {dimensionPresets.map((preset) => (
                <option key={preset.name} value={`${preset.width}x${preset.height}`}>
                  {preset.name} ({preset.width}x{preset.height})
                </option>
              ))}
            </select>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default GenerationControls;