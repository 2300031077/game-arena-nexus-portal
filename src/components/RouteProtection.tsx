
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../contexts/AuthContext';

// Component to protect routes that require authentication
export const ProtectedRoute = ({ children }: { children?: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

// Component to protect routes based on role
export const RoleProtectedRoute = ({ 
  allowedRoles,
  children 
}: { 
  allowedRoles: UserRole[],
  children?: JSX.Element 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
};

// Component to redirect authenticated users away from auth pages
export const AuthRoute = ({ children }: { children?: JSX.Element }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated && user) {
    // Redirect based on role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'organizer':
        return <Navigate to="/organizer/tournaments" replace />;
      case 'player':
        return <Navigate to="/player/dashboard" replace />;
      case 'spectator':
        return <Navigate to="/tournaments" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children || <Outlet />;
};
