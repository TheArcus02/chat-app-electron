import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/ui/context/auth-context';

// TODO: Login with server
const Login = () => {
  const [name, setName] = useState('');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-8'>
      <h1 className='text-3xl font-semibold'>Podaj swój login</h1>
      <input
        className='input input-bordered w-full max-w-xs'
        type='text'
        onChange={(e) => setName(e.target.value)}
      />
      <button className='btn btn-primary' onClick={handleLogin}>
        Zaloguj
      </button>
    </div>
  );
};

export default Login;
