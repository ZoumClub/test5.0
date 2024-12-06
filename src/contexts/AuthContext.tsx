import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signOut, getCurrentUser } from '../lib/auth';
import type { Profile } from '../lib/auth/types';

interface AuthContextType {
  user: any;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const data = await getCurrentUser();
      setUser(data?.user ?? null);
      setProfile(data?.profile ?? null);
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignIn(email: string, password: string) {
    const { user: newUser, profile: newProfile } = await signIn(email, password);
    setUser(newUser);
    setProfile(newProfile);
  }

  async function handleSignOut() {
    await signOut();
    setUser(null);
    setProfile(null);
  }

  const value = {
    user,
    profile,
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}