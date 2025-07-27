import axios from 'axios';

// Define the Tenor API base URL
const BASE_URL = 'https://tenor.googleapis.com/v2';

// Define the function handler for Netlify
export async function handler(event) {
  const pageParam = event.queryStringParameters?.pos || '';

  const apiKey = process.env.TENOR_API_KEY;
  const clientKey = process.env.TENOR_CLIENT_KEY;

  // Ensure that API keys are available
  if (!apiKey || !clientKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing Tenor API keys in environment variables.',
      }),
    };
  }

  // Define response headers
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  };

  // Handle the request and make the API call to Tenor
  try {
    const response = await axios.get(`${BASE_URL}/featured`, {
      params: {
        key: apiKey,
        client_key: clientKey,
        media_filter: 'gif,tinywebm',
        random: 'true',
        pos: pageParam,
        limit: 10,
      },
    });

    // Return the trending results and next page position
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        results: response.data.results,
        next: response.data.next || null,
      }),
    };
  } catch (error) {
    // Return an error response if the API request fails
    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to fetch trending GIFs from Tenor',
        details: error.response?.data || error.message,
      }),
    };
  }
}
