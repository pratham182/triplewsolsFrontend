import axios from "axios";

export const submitUserData = async (submissionData) => {
  try {
    const response = await axios.post("http://localhost:2000/api/submissions/", submissionData, {
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
    const response = await axios.get("http://localhost:2000/api/users"); 
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch users!",
    };
  }
};
