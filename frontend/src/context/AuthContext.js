import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setAuthReady(true);
  }, []);

  // Normalize user data to handle both `name` and `userName` fields
  const normalizeUser = useCallback((payloadUser) => {
    if (!payloadUser) return null;
    return {
      ...payloadUser,
      name: payloadUser.name || payloadUser.userName || 'User',
      userName: payloadUser.userName || payloadUser.name || 'User',
    };
  }, []);

  // Clear session data
  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('hn-user');
    localStorage.removeItem('hn-token');
  }, []);

  // Session restoration on token change
  useEffect(() => {
    if (!token) {
      return;
    }

    let mounted = true;

    const restoreSession = async () => {
      try {
        const response = await authAPI.me();
        const payloadUser = normalizeUser(response?.data?.user);
        
        if (!payloadUser) {
          throw new Error('Invalid session');
        }

        if (mounted) {
          const normalizedUser = normalizeUser(payloadUser);
          setUser(normalizedUser);
          localStorage.setItem('user', JSON.stringify(normalizedUser));
        }
      } catch (error) {
        if (mounted) {
          clearSession();
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, [token, normalizeUser, clearSession]);

  // Register function
  const register = useCallback(
    async ({ name, email, password }) => {
      try {
        const response = await authAPI.register({
          userName: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        });

        const payloadUser = response?.data?.user;
        const payloadToken = response?.data?.token;

        if (!payloadUser || !payloadToken) {
          throw new Error('Invalid register response from server.');
        }

        const normalizedUser = normalizeUser(payloadUser);

        // Store in state AND localStorage
        setUser(normalizedUser);
        setToken(payloadToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        localStorage.setItem('token', payloadToken);

        return normalizedUser;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed.');
      }
    },
    [normalizeUser]
  );

  // Login function
  const login = useCallback(
    async ({ email, password }) => {
      try {
        const response = await authAPI.login({
          email: email.trim().toLowerCase(),
          password,
        });

        const payloadUser = response?.data?.user;
        const payloadToken = response?.data?.token;

        if (!payloadUser || !payloadToken) {
          throw new Error('Invalid login response from server.');
        }

        const normalizedUser = normalizeUser(payloadUser);

        // Store in state AND localStorage
        setUser(normalizedUser);
        setToken(payloadToken);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        localStorage.setItem('token', payloadToken);

        return normalizedUser;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed.');
      }
    },
    [normalizeUser]
  );

  // Logout function
  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  // Compute authentication status
  const isAuthenticated = !!token && !!user;

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      user,
      token,
      authReady,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [user, token, authReady, isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};