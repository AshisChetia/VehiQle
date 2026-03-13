import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser   ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('vehiqle_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('vehiqle_user',  JSON.stringify(userData));
    localStorage.setItem('vehiqle_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('vehiqle_user');
    localStorage.removeItem('vehiqle_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}