import React, { createContext, useContext, useEffect, useState } from 'react';

type UserListContextType = {
  users: User[];
  updateUserList: (users: User[]) => void;
};

const UserListContext = createContext<UserListContextType>({
  users: [],
  updateUserList: () => {},
});

export const UserListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeUserListUpdate((message) => {
      setUsers(message.content.userList);
    });
    return unsub;
  }, []);

  // ! Remove this line after implementing the login functionality
  console.log(users);

  const updateUserList = (users: User[]) => {
    setUsers(users);
  };

  return (
    <UserListContext.Provider value={{ users, updateUserList }}>
      {children}
    </UserListContext.Provider>
  );
};

export const useUserListContext = (): UserListContextType => {
  const context = useContext(UserListContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
