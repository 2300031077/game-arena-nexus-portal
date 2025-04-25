import { useState } from 'react';
import { 
  BarChart3, Trophy, Users, Gamepad, 
  TrendingUp, DollarSign, Calendar, Circle
} from 'lucide-react';

// Stats card component
const StatsCard = ({ title, value, icon, trend, color }: { 
  title: string;
  value: string;
  icon: JSX.Element;
  trend?: { value: string; up: boolean };
  color: string;
}) => (
  <div className="gaming-card p-4">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${trend.up ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={12} className={`mr-1 ${!trend.up && 'transform rotate-180'}`} />
            <span>{trend.value} from last month</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}/20`}>
        {icon}
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'tournaments'>('overview');
  
  // Mock data for the dashboard
  const stats = [
    {
      title: 'Total Users',
      value: '12,438',
      icon: <Users size={20} className="text-gaming-purple" />,
      trend: { value: '+8.2%', up: true },
      color: 'gaming-purple'
    },
    {
      title: 'Active Tournaments',
      value: '24',
      icon: <Trophy size={20} className="text-gaming-orange" />,
      trend: { value: '+4.3%', up: true },
      color: 'gaming-orange'
    },
    {
      title: 'Supported Games',
      value: '48',
      icon: <Gamepad size={20} className="text-gaming-blue" />,
      trend: { value: '+12.5%', up: true },
      color: 'gaming-blue'
    },
    {
      title: 'Prize Money Awarded',
      value: '$158,290',
      icon: <DollarSign size={20} className="text-green-500" />,
      trend: { value: '+23.1%', up: true },
      color: 'green-500'
    }
  ];
  
  const recentTournaments = [
    { 
      id: 1, 
      name: 'Summer Championship 2023', 
      game: 'League of Legends',
      status: 'active',
      participants: 128,
      startDate: '2023-08-15'
    },
    { 
      id: 2, 
      name: 'Apex Predators Cup', 
      game: 'Apex Legends',
      status: 'upcoming',
      participants: 60,
      startDate: '2023-09-01'
    },
    { 
      id: 3, 
      name: 'Valorant Pro League Season 4', 
      game: 'Valorant',
      status: 'active',
      participants: 32,
      startDate: '2023-07-20'
    },
    { 
      id: 4, 
      name: 'CSGO Masters Tournament', 
      game: 'CS:GO',
      status: 'completed',
      participants: 64,
      startDate: '2023-06-10'
    },
    { 
      id: 5, 
      name: 'Rocket League World Cup', 
      game: 'Rocket League',
      status: 'upcoming',
      participants: 48,
      startDate: '2023-09-15'
    },
  ];
  
  const recentUsers = [
    {
      id: 1,
      username: 'ProPlayer123',
      email: 'proplayer123@example.com',
      role: 'player',
      joinDate: '2023-08-01',
      status: 'active'
    },
    {
      id: 2,
      username: 'TournamentOrg42',
      email: 'org42@example.com',
      role: 'organizer',
      joinDate: '2023-07-28',
      status: 'active'
    },
    {
      id: 3,
      username: 'GamingFan99',
      email: 'fan99@example.com',
      role: 'spectator',
      joinDate: '2023-08-05',
      status: 'active'
    },
    {
      id: 4,
      username: 'EsportsManager',
      email: 'manager@example.com',
      role: 'organizer',
      joinDate: '2023-08-02',
      status: 'active'
    },
    {
      id: 5,
      username: 'StreamerGirl',
      email: 'streamer@example.com',
      role: 'player',
      joinDate: '2023-07-30',
      status: 'active'
    },
  ];
  
  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'upcoming': return 'text-blue-500';
      case 'completed': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold gaming-heading">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'overview' 
                ? 'border-gaming-purple text-gaming-purple' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart3 size={16} className="inline-block mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'users' 
                ? 'border-gaming-purple text-gaming-purple' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users size={16} className="inline-block mr-2" />
            Recent Users
          </button>
          <button
            onClick={() => setActiveTab('tournaments')}
            className={`py-2 px-1 border-b-2 ${
              activeTab === 'tournaments' 
                ? 'border-gaming-purple text-gaming-purple' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Trophy size={16} className="inline-block mr-2" />
            Recent Tournaments
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="gaming-card p-5">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Platform Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gaming-dark/30 p-4 rounded-md border border-border">
                <h4 className="text-lg font-medium mb-3">Upcoming Events</h4>
                <div className="space-y-3">
                  {recentTournaments
                    .filter(t => t.status === 'upcoming')
                    .slice(0, 3)
                    .map(tournament => (
                      <div key={tournament.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{tournament.name}</p>
                          <p className="text-sm text-muted-foreground">{tournament.game}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Start: {new Date(tournament.startDate).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{tournament.participants} teams</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bg-gaming-dark/30 p-4 rounded-md border border-border">
                <h4 className="text-lg font-medium mb-3">Recent Registrations</h4>
                <div className="space-y-3">
                  {recentUsers.slice(0, 3).map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Joined: {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gaming-purple/10 rounded-md border border-gaming-purple/30 mt-6">
              <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="bg-gaming-dark/50 p-3 rounded-md hover:bg-gaming-dark transition-colors text-center">
                  <Trophy size={18} className="mx-auto mb-1" />
                  <span className="text-sm">New Tournament</span>
                </button>
                <button className="bg-gaming-dark/50 p-3 rounded-md hover:bg-gaming-dark transition-colors text-center">
                  <Gamepad size={18} className="mx-auto mb-1" />
                  <span className="text-sm">Add Game</span>
                </button>
                <button className="bg-gaming-dark/50 p-3 rounded-md hover:bg-gaming-dark transition-colors text-center">
                  <Calendar size={18} className="mx-auto mb-1" />
                  <span className="text-sm">Schedule Event</span>
                </button>
                <button className="bg-gaming-dark/50 p-3 rounded-md hover:bg-gaming-dark transition-colors text-center">
                  <Users size={18} className="mx-auto mb-1" />
                  <span className="text-sm">Manage Users</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div>
            <h3 className="text-xl font-medium mb-4">Recent User Registrations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-2">Username</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2">Join Date</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id} className="border-b border-border hover:bg-secondary/10">
                      <td className="py-3 px-2 font-medium">{user.username}</td>
                      <td className="py-3 px-2">{user.email}</td>
                      <td className="py-3 px-2 capitalize">{user.role}</td>
                      <td className="py-3 px-2">{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td className="py-3 px-2">
                        <span className="flex items-center">
                          <Circle size={8} className="text-green-500 mr-2" fill="currentColor" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'tournaments' && (
          <div>
            <h3 className="text-xl font-medium mb-4">Recent Tournaments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 px-2">Name</th>
                    <th className="py-3 px-2">Game</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Participants</th>
                    <th className="py-3 px-2">Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTournaments.map(tournament => (
                    <tr key={tournament.id} className="border-b border-border hover:bg-secondary/10">
                      <td className="py-3 px-2 font-medium">{tournament.name}</td>
                      <td className="py-3 px-2">{tournament.game}</td>
                      <td className="py-3 px-2">
                        <span className={`capitalize ${getTournamentStatusColor(tournament.status)}`}>
                          {tournament.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">{tournament.participants}</td>
                      <td className="py-3 px-2">{new Date(tournament.startDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
