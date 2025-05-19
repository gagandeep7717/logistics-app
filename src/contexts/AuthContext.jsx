import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/auth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function checkUser() {
    try {
      const { session } = await auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Session check error:', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn: async (credentials) => {
      const { user, session, error } = await auth.signIn(credentials);
      if (error) throw new Error(error);
      setUser(user);
      setSession(session);
      return user;
    },
    signUp: async (credentials) => {
      const { user, error } = await auth.signUp(credentials);
      if (error) throw new Error(error);
      setUser(user);
      return user;
    },
    signOut: async () => {
      const { error } = await auth.signOut();
      if (error) throw new Error(error);
      setUser(null);
      setSession(null);
    },
    // Add method to refresh session
    refreshSession: async () => {
      await checkUser();
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 