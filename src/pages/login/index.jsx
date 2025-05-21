import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/api/auth';
import { AUTH_ROUTES, ERROR_MESSAGES, STORAGE_KEYS } from '@/lib/constants';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(location.state?.message || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const { token, user } = await login(username, password);
      
      // Store auth data
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      
      // Redirect to accounts page
      navigate(AUTH_ROUTES.ACCOUNTS);
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive text-center">{error}</div>
          )}

          {message && (
            <div className="text-sm text-green-600 text-center">{message}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link to={AUTH_ROUTES.SIGNUP} className="text-primary hover:underline">
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 