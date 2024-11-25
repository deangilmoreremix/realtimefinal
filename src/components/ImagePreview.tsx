import React from 'react';

const ImagePreview: React.FC = () => {
  return (
    <div className="bg-[#1C1C1E] rounded-lg w-full flex items-center justify-center p-1" style={{ aspectRatio: '1 / 1', maxHeight: 'calc(100vh - 200px)' }}>
      <div className="w-full h-full bg-[#0E0E0F] rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-transparent opacity-50"></div>
        <p className="text-gray-500 text-lg font-medium z-10">Image preview area</p>
      </div>
    </div>
  );
};

export default ImagePreview;