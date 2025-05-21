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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // Supabase uses email for auth, we'll use username as email
      password,
    });

    if (error) throw error;

    return {
      token: data.session.access_token,
      user: {
        username: data.user.email,
        name: data.user.user_metadata?.name || data.user.email,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
};

export const signup = async (name, username, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: username, // Using username as email
      password,
      options: {
        data: {
          name,
          username,
        },
      },
    });

    if (error) throw error;

    return {
      token: data.session?.access_token,
      user: {
        username: data.user.email,
        name: data.user.user_metadata?.name || data.user.email,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    throw new Error(ERROR_MESSAGES.ACCOUNT_CREATION_FAILED);
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    if (!session) return null;

    return {
      username: session.user.email,
      name: session.user.user_metadata?.name || session.user.email,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}; 