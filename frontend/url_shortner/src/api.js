const API_URL = 'http://localhost:5000/api';

export const shortenUrl = async (originalUrl) => {
  try {
    const response = await fetch(`${API_URL}/shorten`, { // ✅ Fixed template string
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });

    if (!response.ok) {
      throw new Error(`Failed to shorten URL: ${response.statusText}`); // ✅ Fixed template string
    }

    const data = await response.json();

    if (!data.shortUrl) {
      throw new Error('Invalid response from server');
    }

    return data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};
