import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Could be a nice loading spinner
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
} 