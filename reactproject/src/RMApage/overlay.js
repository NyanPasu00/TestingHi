import React, { useState } from 'react';

const OverlayExample = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div>
      <h1>Overlay Example1234</h1>
      <button onClick={toggleOverlay}>Toggle Overlay</button>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>This is an Overlay!</h2>
            <p>You can place any content here...</p>
            <button onClick={toggleOverlay}>Close Overlay</button>
          </div>
        </div>
      )}
      {/* Your main content */}
      <div className="main-content">
        {/* Your main content goes here */}
      </div>
      {/* Styles for the overlay */}
      <style>
        {`
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .overlay-content {
            background-color: white;
            padding: 150px;
            border-radius: 5px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default OverlayExample;