import { AuthProvider } from '@/ui/context/auth-context';
import { ChatContextProvider } from '@/ui/context/chat-context';
import { UserListProvider } from '@/ui/context/user-list-context';
import { Outlet } from 'react-router';

const GlobalWrapper = () => {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      <UserListProvider>
        <AuthProvider>
          <ChatContextProvider>
            <Outlet />
          </ChatContextProvider>
        </AuthProvider>
      </UserListProvider>
    </div>
  );
};

export default GlobalWrapper;
