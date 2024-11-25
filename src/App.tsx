import React from 'react';
import Header from './components/Header';
import ImagePreview from './components/ImagePreview';
import ElementsPanel from './components/ElementsPanel';
import PromptInput from './components/PromptInput';
import ActionButtons from './components/ActionButtons';
import GenerationControls from './components/GenerationControls';
import GenerationHistory from './components/GenerationHistory';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0E0E0F] text-white flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6 flex">
        <div className="flex-grow mr-6 flex flex-col">
          <ImagePreview />
          <div className="mt-4">
            <PromptInput />
          </div>
          <div className="mt-4">
            <ActionButtons />
          </div>
          <div className="mt-4">
            <GenerationControls />
          </div>
          <GenerationHistory />
        </div>
        <div className="w-80 flex-shrink-0">
          <ElementsPanel />
        </div>
      </div>
    </div>
  );
};

export default App;