import axios from 'axios';

// Define the Tenor API base URL
const BASE_URL = 'https://tenor.googleapis.com/v2';

export async function handler(event) {
  const query = event.queryStringParameters?.query || '';
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

  // Handle the request and make the API call to Tenor
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: apiKey,
        client_key: clientKey,
        q: query,
        media_filter: 'gif,tinywebm',
        pos: pageParam,
        limit: 10,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: response.data.results || [],
        next: response.data.next || null,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch GIFs from Tenor',
      }),
    };
  }
}
