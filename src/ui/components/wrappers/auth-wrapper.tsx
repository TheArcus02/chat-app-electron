import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/auth-context';

const AuthWrapper = ({ redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default AuthWrapper;
