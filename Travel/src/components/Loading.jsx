import React from 'react';
import Image from './Image';

function Loading() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 bg-transparent bg-opacity-70 z-50 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500'></div>
    </div>
  );
}

export default Loading;