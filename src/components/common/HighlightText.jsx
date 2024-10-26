import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-yellow-200 via-gray-500 to-yellow-600 text-transparent bg-clip-text font-bold font-inter">
      {text}
    </span>
  );
};

export default HighlightText;
