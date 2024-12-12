import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/ui/context/auth-context';
import { LogIn, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import InputField from '@/ui/components/input-field';
import Modal from '@/ui/components/modal';

const Login = () => {
  // Form state
  const [name, setName] = useState('');
  const [server, setServer] = useState('');
  const [error, setError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async () => {
    setError('');
    if (!name.trim() || name.length < 3) {
      setError('Login musi mieć co najmniej 3 znaki.');
      return;
    }
    if (!server.trim()) {
      setError('Musisz wybrać serwer.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(async () => {
      const result = await login(server, name);
      if (!result) {
        toast.error(
          'Nie udało się połączyć z serwerem. Spróbuj ponownie.',
        );
        setIsSubmitting(false);
      }
      toast.success('Zalogowano pomyślnie!');
      navigate('/');
    }, 500);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900'>
      <div className='card w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-2xl shadow-2xl p-8'>
        <div className='flex flex-col items-center mb-8'>
          <img
            src='https://img.icons8.com/ios-filled/50/ffffff/chat.png'
            alt='Chat Icon'
            className='w-16 h-16 mb-4 animate-bounce'
          />
          <h2 className='text-4xl font-bold text-white text-center mb-4'>
            Witaj w naszym czacie!
          </h2>
          <p className='text-xl text-white opacity-80 text-center mb-6'>
            Wprowadź swój login i wybierz serwer, aby rozpocząć
            rozmowę.
          </p>
        </div>

        <InputField
          label='Twój login'
          type='text'
          value={name}
          placeholder='Wpisz swój login'
          onChange={(e: any) => setName(e.target.value)}
          error={error && !name.trim() ? error : ''}
        />

        <InputField
          label='Serwer'
          value={server}
          placeholder='Wybierz serwer'
          onChange={(e: any) => setServer(e.target.value)}
          error={error && !server.trim() ? error : ''}
        />

        {error && (
          <p className='text-red-500 text-sm mb-4'>{error}</p>
        )}

        <button
          className={`btn w-full ${
            isSubmitting
              ? 'opacity-50'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } rounded-full py-3`}
          onClick={handleLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='spinner-border animate-spin h-5 w-5 border-4 border-indigo-300 rounded-full' />
          ) : (
            <>
              <LogIn size={20} className='mr-2' />
              Zaloguj
            </>
          )}
        </button>

        <div className='text-center mt-4'>
          <button
            className='text-indigo-300 hover:text-indigo-500 flex items-center justify-center'
            onClick={() => setShowModal(true)}
          >
            <Info size={16} className='mr-2' />
            Regulamin czatu
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title='Regulamin czatu'
      >
        <p className='text-sm mb-4'>
          Zapoznaj się z naszym regulaminem, aby korzystać z czatu w
          sposób bezpieczny i odpowiedzialny.
        </p>
        <ul className='list-disc pl-5 space-y-2'>
          <li>Nie obrażaj innych użytkowników.</li>
          <li>Zachowuj szacunek w rozmowach.</li>
          <li>Nie udostępniaj prywatnych danych.</li>
          <li>Czat jest tylko do celów towarzyskich.</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Login;
