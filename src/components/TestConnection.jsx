import { useState } from 'react';
import { fetchApi } from '../utils/api';
import { API_ENDPOINTS } from '../config/api';

export default function TestConnection() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    try {
      setError(null);
      const response = await fetchApi(API_ENDPOINTS.testDb);
      setConnectionStatus(response);
    } catch (err) {
      setError(err.message);
      setConnectionStatus(null);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={testConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Supabase Connection
      </button>

      {connectionStatus && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <h3 className="font-bold">Connection Successful!</h3>
          <pre className="mt-2 whitespace-pre-wrap">
            {JSON.stringify(connectionStatus, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h3 className="font-bold">Connection Error:</h3>
          <p className="mt-2">{error}</p>
        </div>
      )}
    </div>
  );
} 