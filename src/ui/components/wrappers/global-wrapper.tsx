import { AuthProvider } from '@/ui/context/auth-context';
import { Outlet } from 'react-router';

const GlobalWrapper = () => {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden'>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default GlobalWrapper;
