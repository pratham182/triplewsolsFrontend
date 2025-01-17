import React from "react";

const FileInput = ({ label, name, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        type="file"
        name={name}
        multiple
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default FileInput;
