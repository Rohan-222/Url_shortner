import { useState } from 'react';
import Navbar from '../Components/Navbar';

const ShortUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/shorten', { // ✅ Fixed URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
        setQrCode(data.qrCode);
      } else {
        alert('Failed to shorten URL');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="w-full max-w-md bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Shorten URL</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="url"
              placeholder="Enter URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition"
            >
              Shorten
            </button>
          </form>

          {shortUrl && (
            <div className="mt-6">
              <p className="text-sm text-gray-600">Shortened URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 break-all"
              >
                {shortUrl}
              </a>
              {qrCode && (
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="mt-4 w-32 h-32 border border-gray-300 rounded"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortUrl;
