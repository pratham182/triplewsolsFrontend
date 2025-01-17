import axios from "axios";


const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:2000";

export const submitUserData = async (submissionData) => {
  try {
    const response = await axios.post(`${backendUrl}/api/submissions/`, submissionData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Submission failed!",
    };
  }
};



export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/users`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch users!",
    };
  }
};
