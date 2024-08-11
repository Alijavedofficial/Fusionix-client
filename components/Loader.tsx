import React from 'react';

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
     <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
    </div>
  );
}
