import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants';
import Spinner from '../components/ui/Spinner';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" className="text-primary" />
      </div>
    );
  }

  return user ? children : <Navigate to={ROUTES.LOGIN} replace />;
}