import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ url }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (url && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#FFFFFF',
          light: '#1F2937'
        }
      });
    }
  }, [url]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        className="border border-gray-600 rounded-lg bg-gray-700"
      />
      <p className="text-sm text-gray-400 mt-2 text-center break-all">
        {url}
      </p>
    </div>
  );
};

export default QRCodeGenerator;