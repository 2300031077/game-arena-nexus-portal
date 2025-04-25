
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Trophy, ChevronRight } from 'lucide-react';

const Login = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('player');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password, role);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  // Demo accounts for easy login
  const demoAccounts = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'organizer@example.com', password: 'organizer123', role: 'organizer' },
    { email: 'player@example.com', password: 'player123', role: 'player' },
    { email: 'spectator@example.com', password: 'spectator123', role: 'spectator' },
  ];
  
  const handleDemoLogin = (demoEmail: string, demoPassword: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setRole(demoRole);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gaming-dark p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gaming-purple flex items-center justify-center animate-pulse-glow">
              <Trophy size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold gaming-font text-white">Arena<span className="text-gaming-purple">Nexus</span></h1>
          </div>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>
        
        {/* Login Form */}
        <div className="gaming-card p-6">
          <h2 className="text-xl font-bold mb-6">Login</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="gaming-input w-full"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="gaming-input w-full"
                placeholder="Enter your password"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Login As
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="gaming-input w-full"
              >
                <option value="admin">Admin</option>
                <option value="organizer">Tournament Organizer</option>
                <option value="player">Player</option>
                <option value="spectator">Spectator</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`gaming-btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-gaming-purple hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        {/* Demo Accounts Section */}
        <div className="gaming-card p-5 mt-6">
          <h3 className="text-md font-medium mb-3">Demo Accounts</h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account.email, account.password, account.role as UserRole)}
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gaming-purple/10 transition-colors text-left"
              >
                <div>
                  <p className="font-medium capitalize">{account.role}</p>
                  <p className="text-xs text-muted-foreground">{account.email}</p>
                </div>
                <ChevronRight size={16} className="text-gaming-purple" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
