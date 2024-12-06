import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  console.log(isAuthenticated, user);

  useEffect(() => {
    const unsub = window.electron.subscribeConnectionStatus((status) => {
      console.log(status);
      setUser({
        userID: status.content.userID,
        username: status.content.username,
      });
      setIsAuthenticated(true);
    });

    return () => {
      logout();
      unsub();
    };
  });

  const login = (username: string) => {
    if (username) {
      window.electron.connectUserToServer(username);
    }
  };

  const logout = () => {
    if (user) {
      window.electron.dissconnectUserFromServer(user);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
