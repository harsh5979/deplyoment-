import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ConfirmButton = React.memo(({ label, onConfirm, onCancel }) => {
  const modelref = useRef();
  const firstref = useRef();
  const secoundref = useRef();
  const closeModel = (e) => {
    if (modelref.current === e.target) {
      onCancel();
    }
  };
  useEffect(() => {
    if (firstref.current) {
      firstref.current.focus();
    }
  }, []);

  const handleKeyDown = (e, isFirst) => {
    if (e.key === "Tab") {
      e.preventDefault();

      if (isFirst) {
        secoundref.current.focus();
      } else {
        firstref.current.focus();
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };
  return (
    <motion.div
      ref={modelref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={closeModel}
      className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-hidden"
    >
      <div className="md:p-8 p-4 bg-white shadow-lg rounded-lg md:w-1/3 ">
        <h2 className="md:text-xl text-md text-center text-black font-semibold mt-2 ">
          Are you sure you want to {label}?
        </h2>
        <div className="flex justify-center  items-center space-x-4 mt-6">
          <button
            className="bg-red-500 flex-1 hover:bg-red-600 text-white py-2 px-4 rounded font-medium "
            onClick={onConfirm}
            ref={firstref}
            onKeyDown={(e) => handleKeyDown(e, true)}
          >
            {label.split(" ")[0]} 
          </button>
          <button
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4  rounded font-medium"
            onClick={onCancel}
            ref={secoundref}
            onKeyDown={(e) => handleKeyDown(e, false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
})

export default ConfirmButton;
