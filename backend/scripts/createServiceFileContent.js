module.exports = function createServiceFileContent(endpoint, requestType) {
    return `
    import axios from "axios";
 

export const ${endpoint}Service = async () => {
  try {
    const response = await axios.${requestType.toLowerCase()}(
      \`\${process.env.REACT_APP_API_URL}/${endpoint}\` 
    );

    // Handle the response data here

    return response.data;
  } catch (error) {
    throw new Error("${endpoint} request failed: " + error.message);
  }
};
    `;
};
