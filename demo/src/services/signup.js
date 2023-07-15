import axios from "axios";

export const signupService = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/signup`
    );

    // Handle the response data here

    return response.data;
  } catch (error) {
    throw new Error("signup request failed: " + error.message);
  }
};
