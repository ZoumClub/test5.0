import { supabase } from '../config/supabase';
import type { Profile } from '../config/supabase';

const ADMIN_EMAIL = 'admin@carcompare.com';
const ADMIN_PASSWORD = 'admin123';

export async function signIn(email: string, password: string) {
  try {
    // Special handling for admin user
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If sign in succeeds, return the user data
      if (!signInError && signInData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', signInData.user.id)
          .single();

        return {
          user: signInData.user,
          profile: profile as Profile,
          session: signInData.session,
        };
      }

      // If sign in fails, create the admin user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: 'admin' }
        }
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error('Failed to create admin user');

      // Directly confirm the admin user
      const { error: confirmError } = await supabase.rpc('confirm_user', {
        user_id: user.id
      });

      if (confirmError) throw confirmError;

      // Create admin profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        username: email,
        role: 'admin',
      });

      if (profileError) throw profileError;

      // Sign in with the newly created account
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return {
        user: data.user,
        profile: { id: user.id, username: email, role: 'admin' } as Profile,
        session: data.session,
      };
    }

    // Regular sign in for non-admin users
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    if (profile.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    return {
      user: data.user,
      profile: profile as Profile,
      session: data.session,
    };
  } catch (error) {
    console.error('Auth error:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return { user, profile: profile as Profile | null };
}

export function getSession() {
  return supabase.auth.getSession();
}