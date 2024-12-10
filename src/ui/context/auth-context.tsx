import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useUserListContext } from './user-list-context';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { updateUserList, removeUser } = useUserListContext();

  // ! Remove this line after implementing the login functionality
  console.log(isAuthenticated, user);

  useEffect(() => {
    const unsub = window.electron.subscribeConnectionStatus(
      (status) => {
        console.log(status);
        if (status.type === 'connect_response') {
          setUser({
            userID: status.content.userID,
            username: status.content.username,
          });
          updateUserList(status.content.userList);
          setIsAuthenticated(true);
        } else if (status.type === 'disconnect_response') {
          removeUser(status.content.userID);
          setIsAuthenticated(false);
          setUser(null);
        }
      },
    );

    return () => {
      logout();
      unsub();
    };
  }, []);

  const login = (username: string) => {
    if (username) {
      window.electron.connectUserToServer(username);
    }
  };

  const logout = () => {
    if (user) {
      window.electron.disconnectUserFromServer(user);
      removeUser(user.userID);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useUserContext must be used within a UserProvider',
    );
  }
  return context;
};
