import { supabase } from './supabase';

export const auth = {
  // Sign up new user
  async signUp({ email, password, username, firstName, lastName, phoneNumber }) {
    try {
      // 1. Create auth user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
          }
        }
      });

      if (authError) throw authError;

      // 2. Store additional user data in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username,
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
          },
        ]);

      if (profileError) throw profileError;

      return { user: authData.user, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message };
    }
  },

  // Sign in user
  async signIn({ email, password }) {
    try {
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      return { user: { ...user, ...profile }, session, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, session: null, error: error.message };
    }
  },

  // Sign out user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.message };
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session?.user) {
        // Fetch user profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        return { session: { ...session, user: { ...session.user, ...profile } }, error: null };
      }

      return { session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: error.message };
    }
  },

  // Subscribe to auth changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch user profile data when session changes
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        callback(event, { ...session, user: { ...session.user, ...profile } });
      } else {
        callback(event, session);
      }
    });
  }
}; 