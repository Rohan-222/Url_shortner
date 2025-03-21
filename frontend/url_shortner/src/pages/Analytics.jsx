import { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const Analytics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fetch analytics data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics/all');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  // ✅ Handle deletion of a short URL
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete URL');
      fetchData(); // ✅ Refresh data after deletion
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Analytics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b w-[300px]">Original URL</th>
                <th className="py-2 px-4 border-b">Short URL</th>
                <th className="py-2 px-4 border-b">Clicks</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">QR Code</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100 transition">
                  <td className="py-2 px-4 border-b">{row.id}</td>
                  
                  {/* ✅ Wrap long URLs + overflow handling */}
                  <td className="py-2 px-4 border-b w-[300px] break-words overflow-hidden text-ellipsis">
                    <a
                      href={row.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {row.original_url}
                    </a>
                  </td>
                  
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`http://localhost:5000/${row.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      {`http://localhost:5000/${row.short_url}`}
                    </a>
                  </td>
                  
                  <td className="py-2 px-4 border-b">{row.clicks}</td>
                  <td className="py-2 px-4 border-b">{row.country || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  
                  {/* ✅ Fixed QR code display */}
                  <td className="py-2 px-4 border-b">
                    {row.qr_code ? (
                      <img
                        src={row.qr_code}
                        alt="QR Code"
                        className="w-16 h-16 border border-gray-300 rounded transition-transform duration-200 hover:scale-110 cursor-pointer"
                        onClick={() => window.open(row.qr_code, '_blank', 'noopener,noreferrer')}
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No analytics data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
