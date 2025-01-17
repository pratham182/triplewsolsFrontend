import React from "react";

const Message = ({ type, text }) => {
  if (!text) return null;

  const styles = {
    success: "text-green-600 bg-green-100 border-green-500",
    error: "text-red-600 bg-red-100 border-red-500",
  };

  return (
    <p
      className={`border-l-4 p-4 rounded ${styles[type]} font-medium`}
    >
      {text}
    </p>
  );
};

export default Message;
