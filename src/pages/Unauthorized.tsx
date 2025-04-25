
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const goBack = () => {
    navigate(-1);
  };
  
  const goHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gaming-dark p-4">
      <div className="gaming-card p-8 max-w-md text-center animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <Shield size={32} className="text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
        
        <p className="text-muted-foreground mb-6">
          {isAuthenticated 
            ? `Sorry, you don't have permission to access this page. Your current role (${user?.role}) doesn't have the required privileges.`
            : 'You need to be logged in to access this page.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={goBack} className="gaming-btn-secondary flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button onClick={goHome} className="gaming-btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
