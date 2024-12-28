import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/ui/context/auth-context';
import { LogIn, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import InputField from '@/ui/components/input-field';
import Modal from '@/ui/components/modal';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '../lib/utils';

const loginSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Podaj login' })
    .min(3, { message: 'Login musi mieć co najmniej 3 znaki.' }),
  server: z
    .string()
    .nonempty({ message: 'Podaj adres serwera' })
    .ip({ message: 'Niepoprawny adres serwera.', version: 'v4' }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginSchemaType) => {
    setIsSubmitting(true);
    const { name, server } = data;

    setTimeout(async () => {
      const loginResult = await login(server, name);
      if (!loginResult) {
        toast.error(
          'Nie udało się połączyć z serwerem. Spróbuj ponownie.',
        );
        setIsSubmitting(false);
        return;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='Twój login'
            type='text'
            placeholder='Wpisz swój login'
            {...register('name')}
            error={errors.name?.message}
          />

          <InputField
            label='Serwer'
            type='text'
            placeholder='Wybierz serwer'
            {...register('server')}
            error={errors.server?.message}
          />

          <button
            className={cn(
              'btn w-full rounded-full py-3',
              isSubmitting || Object.keys(errors).length > 0
                ? 'opacity-50'
                : 'bg-indigo-600 hover:bg-indigo-700',
            )}
            disabled={isSubmitting || Object.keys(errors).length > 0}
            type='submit'
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
        </form>

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
