import { Leonardo } from '@leonardo-ai/sdk';
import { LEONARDO_API_KEY } from './config';
import { GenerationResponse } from '../types/generation';

const leonardoApi = new Leonardo({
  auth: {
    apiKey: LEONARDO_API_KEY
  }
});

interface GenerationParams {
  prompt: string;
  modelId: string;
  negative_prompt?: string;
  guidance_scale?: number;
  num_inference_steps?: number;
  width?: number;
  height?: number;
  scheduler?: string;
  seed?: number;
  num_images?: number;
}

export const generateImage = async (params: GenerationParams) => {
  try {
    console.log('Generating with params:', params);
    
    const response = await leonardoApi.generations.createGeneration({
      prompt: params.prompt,
      modelId: params.modelId,
      negative_prompt: params.negative_prompt,
      guidance_scale: params.guidance_scale,
      num_inference_steps: params.num_inference_steps,
      width: params.width,
      height: params.height,
      scheduler: params.scheduler as any,
      seed: params.seed,
      num_images: params.num_images || 1,
    });

    if (!response.sdGenerationJob) {
      throw new Error('No generation job returned from API');
    }

    return response.sdGenerationJob;
  } catch (error: any) {
    console.error('Generation error:', error);
    const errorMessage = error.response?.data?.error || error.message || 'Failed to generate image';
    console.error('Error details:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const createVariation = async (imageId: string, params: Omit<GenerationParams, 'modelId'>) => {
  try {
    const response = await leonardoApi.variations.createVariation({
      imageId,
      prompt: params.prompt,
      negative_prompt: params.negative_prompt,
      guidance_scale: params.guidance_scale,
      num_inference_steps: params.num_inference_steps,
      scheduler: params.scheduler as any,
      seed: params.seed,
      num_images: params.num_images || 1,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create variation');
  }
};

export const getGenerationById = async (id: string) => {
  try {
    const response = await leonardoApi.generations.getGenerationById({
      id
    });
    return response.sdGenerationJob;
  } catch (error: any) {
    console.error('Error fetching generation:', error);
    throw error;
  }
};

export const getGenerationHistory = async () => {
  try {
    const response = await leonardoApi.generations.listGenerations({
      offset: 0,
      limit: 50
    });
    return response.generations;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch generation history');
  }
};

export const getModels = async () => {
  try {
    const response = await leonardoApi.models.listModels();
    return response.models;
  } catch (error: any) {
    console.error('Error fetching models:', error);
    throw error;
  }
};