
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, LogOut, Trophy, Gamepad, Users, 
  Calendar, BarChart3, Medal, User, Bell
} from 'lucide-react';

interface MainLayoutProps {
  children: ReactNode;
}

interface NavigationLink {
  path: string;
  name: string;
  icon: JSX.Element;
  roles: string[];
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const navigationLinks: NavigationLink[] = [
    { 
      path: '/tournaments', 
      name: 'Tournaments', 
      icon: <Trophy size={20} />, 
      roles: ['admin', 'organizer', 'player', 'spectator'] 
    },
    { 
      path: '/admin/dashboard', 
      name: 'Admin Dashboard', 
      icon: <BarChart3 size={20} />, 
      roles: ['admin'] 
    },
    { 
      path: '/admin/games', 
      name: 'Games', 
      icon: <Gamepad size={20} />, 
      roles: ['admin'] 
    },
    { 
      path: '/admin/users', 
      name: 'Users', 
      icon: <Users size={20} />, 
      roles: ['admin'] 
    },
    { 
      path: '/organizer/tournaments', 
      name: 'My Tournaments', 
      icon: <Trophy size={20} />, 
      roles: ['organizer'] 
    },
    { 
      path: '/player/dashboard', 
      name: 'My Dashboard', 
      icon: <BarChart3 size={20} />, 
      roles: ['player'] 
    },
    { 
      path: '/player/teams', 
      name: 'My Teams', 
      icon: <Users size={20} />, 
      roles: ['player'] 
    },
    { 
      path: '/matches', 
      name: 'Matches', 
      icon: <Calendar size={20} />, 
      roles: ['player', 'spectator', 'admin', 'organizer'] 
    },
    { 
      path: '/leaderboard', 
      name: 'Leaderboards', 
      icon: <Medal size={20} />, 
      roles: ['admin', 'organizer', 'player', 'spectator'] 
    },
  ];
  
  const filteredLinks = user ? navigationLinks.filter(link => link.roles.includes(user.role)) : [];
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-border">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gaming-purple flex items-center justify-center animate-pulse-glow">
              <Trophy size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold gaming-font text-white">Arena<span className="text-gaming-purple">Nexus</span></h1>
          </Link>
        </div>
        
        {/* Navigation */}
        <div className="py-4 px-3">
          {user ? (
            <div className="mb-6 p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border-2 border-gaming-purple" 
                />
                <div>
                  <p className="font-medium text-white">{user.username}</p>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="text-center">
                <button 
                  onClick={() => navigate('/login')} 
                  className="gaming-btn-primary w-full mb-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="gaming-btn-secondary w-full"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          
          <nav>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/" 
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/' 
                      ? 'bg-gaming-purple text-white' 
                      : 'hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  <Home size={20} className="mr-3" />
                  <span>Home</span>
                </Link>
              </li>
              
              {filteredLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(link.path)
                        ? 'bg-gaming-purple text-white'
                        : 'hover:bg-secondary/80 text-foreground'
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col w-full pl-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-card">
          <h2 className="text-lg font-medium">
            {location.pathname === '/' ? 'Home' : 
             location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h2>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <button className="relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-gaming-orange rounded-full text-[10px] flex items-center justify-center">
                    3
                  </span>
                </button>
                
                <div className="flex items-center gap-2">
                  <Link to="/profile" className="flex items-center gap-2 hover:text-gaming-purple transition-colors">
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  
                  <button 
                    onClick={logout} 
                    className="ml-4 flex items-center gap-1 text-muted-foreground hover:text-white transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="p-4 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ArenaNexus Gaming | All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
