import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '@/ui/context/auth-context';
import { LogIn, User } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900">
      {/* Nagłówek z ikonką */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat.png" // Prosta ikona czatu
          alt="Chat Icon"
          className="w-16 h-16 mb-4"
        />
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Witaj w naszym czacie!
        </h2>
        <p className="text-xl text-white opacity-80 text-center mb-6">
          Wprowadź swój login, aby rozpocząć rozmowę.
        </p>
      </div>

      <div className="card w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-2xl shadow-2xl p-8">
        {/* Pole logowania */}
        <div className="form-control w-full mb-4">
          <div className="flex items-center bg-gray-700 rounded-full p-3">
            <User size={20} className="text-white mr-3" /> {/* Użycie User jako komponentu */}
            <input
              type="text"
              placeholder="Wpisz swój login"
              className="input input-bordered w-full bg-gray-700 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Przycisk logowania */}
        <button
          className={`btn w-full ${!name.trim() ? "btn-disabled opacity-50" : "bg-indigo-600 hover:bg-indigo-700"} rounded-full py-3`}
          onClick={handleLogin}
          disabled={!name.trim()}
        >
          <LogIn size={20} className="mr-2" /> {/* Użycie LogIn jako komponentu */}
          Zaloguj
        </button>
      </div>
    </div>
  );
};

export default Login;
