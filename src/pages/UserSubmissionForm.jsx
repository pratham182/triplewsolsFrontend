import React, { useState } from "react";
import { submitUserData } from "../api";
import Message from "../components/Message";
import FileInput from "../components/FileInput";
import InputField from "../components/InputField";

const UserSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.socialMediaHandle || images.length === 0) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("socialMediaHandle", formData.socialMediaHandle);
    
    Array.from(images).forEach((file) => submissionData.append("images", file));
    const response = await submitUserData(submissionData);

    if (response.success) {
      setMessage({ type: "success", text: response.message });
      setFormData({ name: "", socialMediaHandle: "" });
      setImages([]);
    } else {
      setMessage({ type: "error", text: response.message });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        User Submission Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Name:"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          className="w-full"
        />
        <InputField
          label="Social Media Handle:"
          type="text"
          name="socialMediaHandle"
          value={formData.socialMediaHandle}
          onChange={handleInputChange}
          placeholder="Enter your social media handle"
          className="w-full"
        />
        <FileInput
          label="Upload Images:"
          name="images"
          onChange={handleImageChange}
          className="w-full"
        />
        {message.text && (
          <Message
            type={message.type}
            text={message.text}
            className={`text-center text-sm p-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserSubmissionForm;
