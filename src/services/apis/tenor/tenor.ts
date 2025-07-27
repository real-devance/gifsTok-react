import axios from "axios";

const BASE_URL = "/.netlify/functions"; // The Netlify functions directory


const getSearchGifs = async (query: string, pageParam: string = ""): Promise<{ results: any[], next: string | null }> => {
  try {
    // Make API request to Tenor API to search for GIFs based on query and pagination
    const response = await axios.get(`${BASE_URL}/getSearchGifs`, {
      params: {
        query,
        pos: pageParam,
      },
    });

    // Return the results and the next page position (if available)
    return {
      results: response.data.results, // Return search results or empty array
      next: response.data.next || null, // Return next page parameter (null if no more pages)
    };

  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching GIFs:", error);

    // Return empty results and null for next page on error
    throw error
  }
};


// Fetches trending GIFs with pagination support
const getTrendingGifs = async (pageParam: string = ""): Promise<{ results: any[]; next: string | null }> => {
  try {
    const response = await axios.get(`${BASE_URL}/getTrendingGifs`, {
      params: {

        pos: pageParam, // Pagination position (page offset)
      },
    });

    // Return trending results and next page position
    return {
      results: response.data.results, // Trending GIFs
      next: response.data.next || null, // Next page token (null if no more pages)
    };

  } catch (error) {
    console.error("Error fetching trending GIFs:", error);
    throw error; // Throw error to let caller handle it
  }
};


export { getTrendingGifs, getSearchGifs };
