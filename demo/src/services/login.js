import axios from "axios";

export const loginService = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`);

    // Handle the response data here

    return response.data;
  } catch (error) {
    throw new Error("login request failed: " + error.message);
  }
};
