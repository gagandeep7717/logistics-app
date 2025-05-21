import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AUTH_ROUTES } from '@/lib/constants';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          navigate(AUTH_ROUTES.LOGIN, {
            state: { error: 'Failed to verify email. Please try again.' }
          });
          return;
        }

        if (session) {
          // Store auth data
          localStorage.setItem('token', session.access_token);
          localStorage.setItem('user', JSON.stringify({
            username: session.user.email,
            name: session.user.user_metadata?.name || session.user.email,
          }));

          navigate(AUTH_ROUTES.ACCOUNTS);
        } else {
          navigate(AUTH_ROUTES.LOGIN, {
            state: { message: 'Email verified! Please sign in.' }
          });
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate(AUTH_ROUTES.LOGIN, {
          state: { error: 'Something went wrong. Please try again.' }
        });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
} 