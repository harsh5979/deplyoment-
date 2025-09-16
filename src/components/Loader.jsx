import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999] bg-gray-900/70 backdrop-blur-sm">
      <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700">
        
        {/* Spinner Rings */}
        <div className="relative flex justify-center items-center mb-4">
          <div className="w-16 h-16 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute w-10 h-10 border-4 border-transparent border-b-emerald-500 rounded-full animate-spin-slow"></div>
        </div>

        {/* Animated Message */}
        <p className="text-lg font-semibold tracking-wide animate-pulse">
          {message}
        </p>

        {/* Shimmer Progress Bar */}
        <div className="mt-4 w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-emerald-600 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
