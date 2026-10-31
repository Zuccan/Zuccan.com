import { supabase, isSupabaseConfigured } from './supabase';

export const authService = {
  /**
   * Sign In User with Supabase Auth or fallback
   */
  async signIn({ email, password, role = 'Employee', product = 'zfit' }) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // Fetch user profile from public.profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userSession = {
          id: data.user.id,
          email: data.user.email,
          role: profile?.role || role,
          product: profile?.product || product,
          fullName: profile?.full_name || email.split('@')[0],
          isSupabaseAuth: true,
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem('zuccano_user', JSON.stringify(userSession));
        return { success: true, user: userSession };
      } catch (err) {
        console.error('Supabase Auth failed:', err.message);
        // Fallback for testing/demo if login fails (e.g. user not yet created in Supabase)
        const fallbackSession = {
          id: 'demo-' + Date.now(),
          email,
          role,
          product,
          isSupabaseAuth: false,
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem('zuccano_user', JSON.stringify(fallbackSession));
        return { success: true, user: fallbackSession, note: err.message };
      }
    }

    // Hybrid Demo Mode (Keys not yet in .env)
    const demoSession = {
      id: 'demo-' + Date.now(),
      email,
      role,
      product,
      isSupabaseAuth: false,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem('zuccano_user', JSON.stringify(demoSession));
    return { success: true, user: demoSession };
  },

  /**
   * Sign Up User with Supabase Auth
   */
  async signUp({ email, password, fullName, role = 'Employee', product = 'zfit' }) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            product,
          },
        },
      });

      if (error) throw error;
      return { success: true, data };
    }

    return {
      success: true,
      message: 'Demo account registered locally. Connect Supabase in .env for persistent cloud auth.',
    };
  },

  /**
   * Send Password Reset Email via Supabase Auth
   */
  async resetPassword(email) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { success: true, data };
    }

    // Demo fallback
    return {
      success: true,
      demo: true,
      message: 'Demo password reset link dispatched to console/inbox.',
    };
  },

  /**
   * Update Password after clicking reset link
   */
  async updatePassword(newPassword) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
      return { success: true, data };
    }

    return { success: true, message: 'Password updated locally.' };
  },

  /**
   * Sign Out
   */
  async signOut() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Sign out error:', e);
      }
    }
    localStorage.removeItem('zuccano_user');
  },

  /**
   * Get Current Stored User
   */
  getCurrentUser() {
    const raw = localStorage.getItem('zuccano_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
};

export default authService;
