export const SubmitForm = async (formData) => {
  try {
    const response = await fetch(`http://localhost:3001/api/generateapp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(" form submission failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`form submission failed: ${error.message}`);
  }
};
