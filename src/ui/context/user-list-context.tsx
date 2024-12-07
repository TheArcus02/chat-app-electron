import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserListContextType = {
  users: User[];
  updateUserList: (users: User[]) => void;
  getUser: (userID: string) => User | undefined;
};

const UserListContext = createContext<UserListContextType>({
  users: [],
  updateUserList: () => {},
  getUser: () => undefined,
});

export const UserListProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeUserListUpdate(
      (message) => {
        setUsers(message.content.userList);
      },
    );
    return unsub;
  }, []);

  // ! Remove this line after implementing the login functionality
  console.log(users);

  const updateUserList = (users: User[]) => {
    setUsers(users);
  };

  const getUser = (userID: string) => {
    const user = users.find((user) => user.userID === userID);
    return user;
  };

  return (
    <UserListContext.Provider
      value={{ users, updateUserList, getUser }}
    >
      {children}
    </UserListContext.Provider>
  );
};

export const useUserListContext = (): UserListContextType => {
  const context = useContext(UserListContext);
  if (!context) {
    throw new Error(
      'useUserContext must be used within a UserProvider',
    );
  }
  return context;
};
