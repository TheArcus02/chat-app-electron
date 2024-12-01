import { LogOut, MessageCircle } from 'lucide-react';
import { mockUsers } from '../mock/data';
import { useAuth } from '../context/auth-context';
import { Link, Outlet, useLocation } from 'react-router';

const Dashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className='flex-1 flex'>
      <div className='flex flex-col max-w-xs bg-base-200 w-full p-6'>
        <h2 className='text-xl font-semibold'>Active People</h2>
        <ul className='overflow-y-scroll flex-1 list-none space-y-2 mt-4 max-h-[calc(100vh-220px)] overflow-x-hidden'>
          {mockUsers.map((user) => (
            <li
              key={user.id}
              className='relative flex items-center space-x-3 rounded-lg hover:bg-base-300 p-2 cursor-pointer transition-colors'
            >
              <img
                className='w-8 h-8 rounded-full bg-base-content'
                src={`https://ui-avatars.com/api/?name=${user.name.replace(/ /g, '+')}`}
                alt='avatar'
              />
              <span className='font-semibold'>{user.name}</span>
              <Link className='absolute size-full' to={`/chat/${user.id}`} />
            </li>
          ))}
        </ul>
        <div className='border-base-300 space-y-4 pt-6'>
          <div className='flex space-x-2'>
            <img
              className='w-8 h-8 rounded-full bg-base-content'
              src={`https://ui-avatars.com/api/?name=Charlie+Doe`}
              alt='avatar'
            />
            <div className='flex flex-col'>
              <span className='font-medium'>Charlie Doe</span>
              <span className='text-gray-500'>online</span>
            </div>
          </div>
          <button className='btn btn-neutral w-full btn-sm' onClick={logout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      <div className='flex flex-col flex-1 items-center justify-center'>
        {location.pathname === '/' ? (
          <>
            <h1 className='text-3xl font-bold'>Welcome to the Chat</h1>
            <p className='text-gray-500'>
              Select a user from the sidebar to start chatting
            </p>
            <MessageCircle size={64} strokeWidth={1} />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
