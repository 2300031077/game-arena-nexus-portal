
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { Trophy } from 'lucide-react';

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('player');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      await signup(username, email, password, role);
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
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
          <p className="text-muted-foreground mt-2">Create your account to get started</p>
        </div>
        
        {/* Signup Form */}
        <div className="gaming-card p-6">
          <h2 className="text-xl font-bold mb-6">Create Account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="gaming-input w-full"
                placeholder="Choose a username"
              />
            </div>
            
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
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="gaming-input w-full"
                placeholder="Confirm your password"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Register As
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
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-gaming-purple hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
