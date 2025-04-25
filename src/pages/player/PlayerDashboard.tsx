
import { Trophy, Calendar, Users, Clock, ArrowRight, Shield, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor, textColor;
  
  switch (status) {
    case 'active':
      bgColor = 'bg-green-500/20';
      textColor = 'text-green-500';
      break;
    case 'upcoming':
      bgColor = 'bg-blue-500/20';
      textColor = 'text-blue-500';
      break;
    case 'completed':
      bgColor = 'bg-gray-500/20';
      textColor = 'text-gray-400';
      break;
    default:
      bgColor = 'bg-gray-500/20';
      textColor = 'text-gray-400';
  }
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} capitalize`}>
      {status === 'active' && <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>}
      {status}
    </span>
  );
};

// Mock player data
const playerStats = {
  totalTournaments: 15,
  totalMatches: 48,
  wins: 32,
  winRate: "66.7%",
  upcomingMatches: 3,
  ranking: "#342",
  mostPlayedGame: "League of Legends",
  recentTeam: "Cyber Knights"
};

// Mock tournaments
const playerTournaments = [
  {
    id: 1,
    name: "Winter Championship 2023",
    game: "League of Legends",
    team: "Cyber Knights",
    status: "upcoming",
    placement: "-",
    startDate: "2023-12-15",
    nextMatch: "2023-12-15 18:00"
  },
  {
    id: 2,
    name: "CS2 Pro League Season 2",
    game: "Counter-Strike 2",
    team: "Cyber Knights",
    status: "active",
    placement: "4th",
    startDate: "2023-11-01",
    nextMatch: "2023-12-05 20:00"
  },
  {
    id: 3,
    name: "Summer Apex Invitational",
    game: "Apex Legends",
    team: "Apex Predators",
    status: "completed",
    placement: "2nd",
    startDate: "2023-08-05",
    nextMatch: null
  }
];

// Mock upcoming matches
const upcomingMatches = [
  {
    id: 1,
    tournament: "Winter Championship 2023",
    opponent: "Team Liquid",
    date: "2023-12-15 18:00",
    game: "League of Legends",
    round: "Quarterfinals"
  },
  {
    id: 2,
    tournament: "CS2 Pro League Season 2",
    opponent: "Cloud9",
    date: "2023-12-05 20:00",
    game: "Counter-Strike 2",
    round: "Semifinals"
  },
  {
    id: 3,
    tournament: "CS2 Pro League Season 2",
    opponent: "TBD",
    date: "2023-12-12 19:00",
    game: "Counter-Strike 2",
    round: "Finals (if qualified)"
  }
];

// Mock teams
const playerTeams = [
  {
    id: 1,
    name: "Cyber Knights",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=CK&backgroundColor=8B5CF6",
    members: 5,
    games: ["League of Legends", "Counter-Strike 2"],
    captain: true
  },
  {
    id: 2,
    name: "Apex Predators",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AP&backgroundColor=F97316",
    members: 3,
    games: ["Apex Legends"],
    captain: false
  }
];

const PlayerDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gaming-heading">Player Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.username}</p>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="gaming-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tournaments</p>
              <h4 className="text-2xl font-bold">{playerStats.totalTournaments}</h4>
            </div>
            <Trophy size={24} className="text-gaming-purple" />
          </div>
        </div>
        
        <div className="gaming-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <h4 className="text-2xl font-bold">{playerStats.winRate}</h4>
              <p className="text-xs text-muted-foreground">{playerStats.wins} / {playerStats.totalMatches} matches</p>
            </div>
            <Star size={24} className="text-gaming-orange" />
          </div>
        </div>
        
        <div className="gaming-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Matches</p>
              <h4 className="text-2xl font-bold">{playerStats.upcomingMatches}</h4>
            </div>
            <Calendar size={24} className="text-gaming-blue" />
          </div>
        </div>
        
        <div className="gaming-card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Global Ranking</p>
              <h4 className="text-2xl font-bold">{playerStats.ranking}</h4>
            </div>
            <Shield size={24} className="text-gaming-purple" />
          </div>
        </div>
      </div>
      
      {/* Next Match and Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Match */}
        <div className="gaming-card p-5 col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Clock size={18} className="text-gaming-purple" />
              Next Match
            </h3>
          </div>
          
          {upcomingMatches[0] ? (
            <div className="space-y-4">
              <div className="bg-gaming-dark/30 p-3 rounded-md border border-border">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold">{upcomingMatches[0].tournament}</p>
                  <p className="text-xs text-gaming-orange">{upcomingMatches[0].round}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{upcomingMatches[0].game}</p>
                
                <div className="flex items-center justify-between bg-gaming-dark/50 rounded-md p-3">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gaming-purple/20 flex items-center justify-center mx-auto mb-1 border border-gaming-purple/30">
                      <Trophy size={16} className="text-gaming-purple" />
                    </div>
                    <p className="text-sm font-medium">You</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gaming-orange">VS</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(upcomingMatches[0].date).toLocaleDateString()} at {new Date(upcomingMatches[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gaming-orange/20 flex items-center justify-center mx-auto mb-1 border border-gaming-orange/30">
                      <Shield size={16} className="text-gaming-orange" />
                    </div>
                    <p className="text-sm font-medium">{upcomingMatches[0].opponent}</p>
                  </div>
                </div>
              </div>
              
              <button className="gaming-btn-primary w-full flex items-center justify-center gap-1">
                <Calendar size={16} />
                View All Matches
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No upcoming matches</p>
            </div>
          )}
        </div>
        
        {/* Teams */}
        <div className="gaming-card p-5 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Users size={18} className="text-gaming-purple" />
              My Teams
            </h3>
            <button className="gaming-btn-secondary py-1 px-3 text-sm">
              Manage Teams
            </button>
          </div>
          
          <div className="space-y-4">
            {playerTeams.map(team => (
              <div key={team.id} className="flex justify-between items-center p-3 bg-gaming-dark/30 rounded-md border border-border">
                <div className="flex items-center gap-3">
                  <img 
                    src={team.logo} 
                    alt={team.name}
                    className="w-12 h-12 rounded-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{team.name}</p>
                      {team.captain && (
                        <span className="text-xs bg-gaming-purple/20 text-gaming-purple px-2 py-0.5 rounded-full">
                          Captain
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {team.members} members • {team.games.join(', ')}
                    </p>
                  </div>
                </div>
                <button className="gaming-btn-secondary py-1 px-3 text-sm">
                  View
                </button>
              </div>
            ))}
            
            <button className="gaming-btn-secondary w-full flex items-center justify-center gap-1">
              <Plus size={16} />
              Create New Team
            </button>
          </div>
        </div>
      </div>
      
      {/* Current Tournaments */}
      <div className="gaming-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Trophy size={18} className="text-gaming-purple" />
            My Tournaments
          </h3>
          <button className="gaming-btn-secondary py-1 px-3 text-sm">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2">Tournament</th>
                <th className="py-3 px-2">Game</th>
                <th className="py-3 px-2">Team</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Placement</th>
                <th className="py-3 px-2">Next Match</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {playerTournaments.map(tournament => (
                <tr key={tournament.id} className="border-b border-border hover:bg-secondary/10">
                  <td className="py-3 px-2 font-medium">{tournament.name}</td>
                  <td className="py-3 px-2">{tournament.game}</td>
                  <td className="py-3 px-2">{tournament.team}</td>
                  <td className="py-3 px-2">
                    <StatusBadge status={tournament.status} />
                  </td>
                  <td className="py-3 px-2">{tournament.placement}</td>
                  <td className="py-3 px-2">
                    {tournament.nextMatch ? (
                      <span>{new Date(tournament.nextMatch).toLocaleDateString()} {new Date(tournament.nextMatch).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    <button className="gaming-btn-secondary py-1 px-3 text-sm flex items-center gap-1">
                      <ArrowRight size={14} />
                      <span className="sr-only">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
