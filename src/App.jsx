import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountsPage from './pages/accounts';
import LoginPage from './pages/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/accounts" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/accounts" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/accounts"
          element={
            isAuthenticated ? (
              <AccountsPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
