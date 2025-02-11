import { useState, useCallback } from "react";

// Custom hook to handle copy-to-clipboard functionality
const useCopyToClipboard = () => {
  const [success, setSuccess] = useState(false); // Track if copy was successful

  // Function to copy text to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text); // Write text to clipboard
      setSuccess(true); // Set success flag to true if copy is successful
      setTimeout(() => setSuccess(false), 2000); // Reset success flag after 2s
      return true;
    } catch (error) {
      setSuccess(false); // Set success flag to false if error occurs
      return false;
    }
  }, []);

  return { copyToClipboard, success }; // Return the copy function and success status
};

export default useCopyToClipboard;
