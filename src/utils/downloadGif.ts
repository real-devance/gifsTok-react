export const downloadGif = async (gifUrl: string, filename = "download.gif") => {
    try {
        const response = await fetch(gifUrl);  // Fetch the GIF file
        const blob = await response.blob();  // Convert response to blob
        const url = URL.createObjectURL(blob);  // Create a temporary URL for the blob

        const a = document.createElement("a");  // Create an anchor element
        a.href = url;  // Set the URL as the anchor's href
        a.download = filename;  // Set the filename for download
        document.body.appendChild(a);  // Append the anchor to the body
        a.click();  // Trigger a click event to start the download
        document.body.removeChild(a);  // Remove the anchor element from the DOM
        URL.revokeObjectURL(url);  // Clean up the object URL
    } catch (error) {
        throw error;  // Throw the error
    }
};
