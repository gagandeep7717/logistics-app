import { supabase } from '@/lib/supabase';
import { STORAGE_KEYS, ERROR_MESSAGES } from '@/lib/constants';

// Mock user data for development
const MOCK_USER = {
  username: 'admin',
  password: 'admin123',
  name: 'Admin User'
};

export const login = async (username, password) => {
  try {
    console.log('Attempting login with:', { username });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // Supabase uses email for auth, we'll use username as email
      password,
    });

    if (error) {
      console.error('Supabase login error:', error);
      throw error;
    }

    if (!data.session) {
      console.error('No session returned from Supabase');
      throw new Error('Authentication failed');
    }

    console.log('Login successful:', { user: data.user.email });

    return {
      token: data.session.access_token,
      user: {
        username: data.user.email,
        name: data.user.user_metadata?.name || data.user.email,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
};

export const signup = async (name, username, password) => {
  try {
    console.log('Attempting signup with:', { name, username });
    
    const { data, error } = await supabase.auth.signUp({
      email: username, // Using username as email
      password,
      options: {
        data: {
          name,
          username,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Supabase signup error:', error);
      throw error;
    }

    if (!data.user) {
      console.error('No user returned from Supabase');
      throw new Error('Signup failed');
    }

    console.log('Signup successful:', { user: data.user.email });

    return {
      token: data.session?.access_token,
      user: {
        username: data.user.email,
        name: data.user.user_metadata?.name || data.user.email,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(error.message || ERROR_MESSAGES.ACCOUNT_CREATION_FAILED);
  }
};

export const logout = async () => {
  try {
    console.log('Attempting logout');
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Supabase logout error:', error);
      throw error;
    }
    
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('Getting current user');
    
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase get session error:', error);
      throw error;
    }
    
    if (!session) {
      console.log('No active session found');
      return null;
    }

    console.log('Current user found:', { user: session.user.email });

    return {
      username: session.user.email,
      name: session.user.user_metadata?.name || session.user.email,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}; 