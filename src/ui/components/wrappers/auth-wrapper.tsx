import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/auth-context';

const AuthWrapper = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default AuthWrapper;
