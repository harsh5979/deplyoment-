import React, { useEffect, useState } from "react";
import "../index.css";
import { FiLoader } from "react-icons/fi";

const Mainloader = () => {

   return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <FiLoader size={32} className="text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      );
};

export default Mainloader;
