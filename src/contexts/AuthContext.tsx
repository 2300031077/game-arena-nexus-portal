
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user roles
export type UserRole = 'admin' | 'organizer' | 'player' | 'spectator';

// Define user interface
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (username: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in a real app, this would come from an API
const MOCK_USERS: Record<string, { password: string } & User> = {
  "admin@example.com": {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
  },
  "organizer@example.com": {
    id: "2",
    username: "organizer",
    email: "organizer@example.com",
    password: "organizer123",
    role: "organizer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=organizer"
  },
  "player@example.com": {
    id: "3",
    username: "player",
    email: "player@example.com",
    password: "player123",
    role: "player",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=player"
  },
  "spectator@example.com": {
    id: "4",
    username: "spectator",
    email: "spectator@example.com",
    password: "spectator123",
    role: "spectator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=spectator"
  }
};

// Define auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = MOCK_USERS[email];
      
      if (!mockUser || mockUser.password !== password || mockUser.role !== role) {
        throw new Error("Invalid credentials or role");
      }
      
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = mockUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Show success notification
      toast.success(`Welcome back, ${userWithoutPassword.username}!`);
      
      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'organizer':
          navigate('/organizer/tournaments');
          break;
        case 'player':
          navigate('/player/dashboard');
          break;
        case 'spectator':
          navigate('/tournaments');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Signup function
  const signup = async (username: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS[email]) {
        throw new Error("User already exists");
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
      };
      
      // In a real app, we would send this to an API
      // For demo, we'll just add to our mock data
      MOCK_USERS[email] = { ...newUser, password };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Show success notification
      toast.success("Account created successfully!");
      
      // Redirect based on role
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'organizer':
          navigate('/organizer/tournaments');
          break;
        case 'player':
          navigate('/player/dashboard');
          break;
        case 'spectator':
          navigate('/tournaments');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info("You have been logged out");
    navigate('/login');
  };
  
  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
