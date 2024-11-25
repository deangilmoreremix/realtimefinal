import { create } from 'zustand';
import { GenerationResponse } from '../types/generation';

interface GenerationState {
  model: string;
  prompt: string;
  negativePrompt: string;
  guidanceScale: number;
  steps: number;
  width: number;
  height: number;
  scheduler: string;
  seed: number;
  batchSize: number;
  generationHistory: GenerationResponse[];
  selectedImage: string | null;
  setModel: (model: string) => void;
  setPrompt: (prompt: string) => void;
  setNegativePrompt: (prompt: string) => void;
  setGuidanceScale: (scale: number) => void;
  setSteps: (steps: number) => void;
  setDimensions: (width: number, height: number) => void;
  setScheduler: (scheduler: string) => void;
  setSeed: (seed: number) => void;
  setBatchSize: (size: number) => void;
  addToHistory: (generation: GenerationResponse) => void;
  setSelectedImage: (imageUrl: string | null) => void;
  clearHistory: () => void;
}

export const useGenerationStore = create<GenerationState>((set) => ({
  model: 'leonardo-creative-sdxl',
  prompt: '',
  negativePrompt: '',
  guidanceScale: 7,
  steps: 30,
  width: 512,
  height: 512,
  scheduler: 'EULER',
  seed: -1,
  batchSize: 1,
  generationHistory: [],
  selectedImage: null,
  
  setModel: (model) => set({ model }),
  setPrompt: (prompt) => set({ prompt }),
  setNegativePrompt: (prompt) => set({ negativePrompt }),
  setGuidanceScale: (guidanceScale) => set({ guidanceScale }),
  setSteps: (steps) => set({ steps }),
  setDimensions: (width, height) => set({ width, height }),
  setScheduler: (scheduler) => set({ scheduler }),
  setSeed: (seed) => set({ seed }),
  setBatchSize: (batchSize) => set({ batchSize }),
  addToHistory: (generation) => set((state) => ({
    generationHistory: [generation, ...state.generationHistory]
  })),
  setSelectedImage: (imageUrl) => set({ selectedImage: imageUrl }),
  clearHistory: () => set({ generationHistory: [] })
}));