import { account } from '@/lib/appwrite';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifySession = async () => {
    try {
      // Get current session
      const session = await account.getSession('current');
      
      // Check if session is still valid
      if (session && new Date(session.expire) > new Date()) {
        const currentUser = await account.get();
        return { valid: true, user: currentUser, session };
      } else {
        return { valid: false, error: 'Session expired' };
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      return { valid: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    verifySession,
    checkSession,
    logout
  };
}