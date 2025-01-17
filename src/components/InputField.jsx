import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  multiple = false,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block font-medium mb-2">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        multiple={multiple}
        className={`w-full px-3 py-2 border rounded-md ${className}`}
      />
    </div>
  );
};

export default InputField;
