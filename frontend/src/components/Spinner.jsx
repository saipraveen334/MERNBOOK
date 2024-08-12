import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
        <div className="absolute top-1 left-1 w-14 h-14 border-4 border-t-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-4 border-t-transparent border-blue-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
