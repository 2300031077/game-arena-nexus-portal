import { useState } from 'react';
import { 
  Trophy, Gamepad, Calendar, Users, Activity, 
  Plus, Medal, ChevronRight, Clock, Search
} from 'lucide-react';

// Mock data for recent tournaments
const recentTournaments = [
  {
    id: 1,
    name: 'Summer Championship 2023',
    game: 'League of Legends',
    date: '2023-08-15',
    status: 'active',
    participants: 128
  },
  {
    id: 2,
    name: 'Apex Predators Cup',
    game: 'Apex Legends',
    date: '2023-09-01',
    status: 'upcoming',
    participants: 60
  },
  {
    id: 3,
    name: 'Valorant Pro League Season 4',
    game: 'Valorant',
    date: '2023-07-20',
    status: 'active',
    participants: 32
  },
  {
    id: 4,
    name: 'CSGO Masters Tournament',
    game: 'CS:GO',
    date: '2023-06-10',
    status: 'completed',
    participants: 64
  },
  {
    id: 5,
    name: 'Rocket League World Cup',
    game: 'Rocket League',
    date: '2023-09-15',
    status: 'upcoming',
    participants: 48
  },
];

// Mock data for upcoming matches
const upcomingMatches = [
  {
    id: 1,
    team1: 'Team A',
    team2: 'Team B',
    game: 'League of Legends',
    time: '2023-08-20 18:00',
    tournament: 'Summer Championship 2023'
  },
  {
    id: 2,
    team1: 'Team X',
    team2: 'Team Y',
    game: 'Valorant',
    time: '2023-08-22 20:00',
    tournament: 'Valorant Pro League Season 4'
  },
  {
    id: 3,
    team1: 'Team 1',
    team2: 'Team 2',
    game: 'Apex Legends',
    time: '2023-08-25 16:00',
    tournament: 'Apex Predators Cup'
  },
];

// Mock data for player stats
const playerStats = {
  totalGamesPlayed: 245,
  winRate: '68%',
  averageKills: 12.5,
  favoriteGame: 'League of Legends'
};

const PlayerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gaming-heading">Player Dashboard</h1>
        <button className="gaming-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Create Team
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tournaments, teams, games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="gaming-input w-full pl-10"
        />
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="gaming-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Games Played</p>
              <h4 className="text-2xl font-bold mt-1">{playerStats.totalGamesPlayed}</h4>
            </div>
            <Activity size={40} className="text-gaming-purple" />
          </div>
        </div>
        
        <div className="gaming-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
              <h4 className="text-2xl font-bold mt-1">{playerStats.winRate}</h4>
            </div>
            <Trophy size={40} className="text-gaming-orange" />
          </div>
        </div>
        
        <div className="gaming-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Favorite Game</p>
              <h4 className="text-xl font-bold mt-1">{playerStats.favoriteGame}</h4>
            </div>
            <Gamepad size={40} className="text-gaming-blue" />
          </div>
        </div>
      </div>
      
      {/* Upcoming Matches */}
      <div className="gaming-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Upcoming Matches</h3>
          <a href="#" className="text-sm text-gaming-purple hover:underline">View All</a>
        </div>
        
        <div className="space-y-3">
          {upcomingMatches.map(match => (
            <div key={match.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{match.team1} vs {match.team2}</p>
                <p className="text-sm text-muted-foreground">
                  <Calendar size={14} className="inline-block mr-1" />
                  {new Date(match.time).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  <Trophy size={14} className="inline-block mr-1" />
                  {match.tournament} ({match.game})
                </p>
              </div>
              <span className="text-sm text-blue-500">
                <Clock size={16} className="inline-block mr-1" />
                {new Date(match.time) > new Date() ? 'Upcoming' : 'Live'}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Tournaments */}
      <div className="gaming-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Recent Tournaments</h3>
          <a href="#" className="text-sm text-gaming-purple hover:underline">View All</a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Game</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2">Participants</th>
              </tr>
            </thead>
            <tbody>
              {recentTournaments.map(tournament => (
                <tr key={tournament.id} className="border-b border-border hover:bg-secondary/10">
                  <td className="py-3 px-2 font-medium">{tournament.name}</td>
                  <td className="py-3 px-2">{tournament.game}</td>
                  <td className="py-3 px-2">{new Date(tournament.date).toLocaleDateString()}</td>
                  <td className="py-3 px-2">
                    <span className="capitalize">{tournament.status}</span>
                  </td>
                  <td className="py-3 px-2">{tournament.participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Badges and Achievements */}
      <div className="gaming-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Badges & Achievements</h3>
          <a href="#" className="text-sm text-gaming-purple hover:underline">View All</a>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6].map(index => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gaming-dark/50 flex items-center justify-center mx-auto">
                <Medal size={24} className="text-yellow-500" />
              </div>
              <p className="text-sm mt-2 text-muted-foreground">Achievement {index}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
