import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="flex justify-center items-center">
      <img
        src="https://w7.pngwing.com/pngs/994/388/png-transparent-computer-icons-editing-font-awesome-graphics-editor-advertising-angle-text-logo.png"
        alt="Logo"
        style={{ width }}
        className="rounded-lg shadow-md object-contain h-xl"
      />
    </div>
  );
}

export default Logo;

