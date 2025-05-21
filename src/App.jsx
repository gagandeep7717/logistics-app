import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccountsPage from './pages/accounts';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { getCurrentUser } from './api/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
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
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/accounts" replace />
            ) : (
              <SignupPage />
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
