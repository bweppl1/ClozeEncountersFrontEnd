import axios from "axios";

const API_BASE = "http://localhost:8000";

export const register_user = async (user_data) => {
  try {
    const response = await axios.get(`${API_BASE}/auth/register`, {});
    return response.data;
  } catch (error) {
    console.error("Error registering: ", error);
  }
};
