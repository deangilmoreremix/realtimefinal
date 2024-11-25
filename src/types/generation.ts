export interface GenerationOptions {
  modelId: string;
  prompt: string;
  negativePrompt?: string;
  guidanceScale?: number;
  steps?: number;
  width?: number;
  height?: number;
  scheduler?: string;
  seed?: number;
  batchSize?: number;
}

export interface GenerationResponse {
  id: string;
  status: 'PENDING' | 'COMPLETE' | 'FAILED';
  imageUrl?: string;
  error?: string;
}

export type SchedulerType = 
  | 'euler' 
  | 'euler_ancestral' 
  | 'heun' 
  | 'dpm_2' 
  | 'dpm_2_ancestral' 
  | 'lms' 
  | 'ddim';

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  type: string;
}