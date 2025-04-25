
import { useState } from 'react';
import { 
  Search, Filter, Plus, Trophy, Calendar, Users, 
  Tag, Eye, Edit, Trash2, ChevronDown, Check
} from 'lucide-react';

// Mock tournament data
const MOCK_TOURNAMENTS = [
  {
    id: 1,
    name: 'Winter Championship 2023',
    game: 'League of Legends',
    status: 'upcoming',
    format: '5v5 Double Elimination',
    startDate: '2023-12-15',
    endDate: '2023-12-18',
    prizePool: '$5,000',
    registeredTeams: 16,
    maxTeams: 32,
    region: 'North America'
  },
  {
    id: 2,
    name: 'CS2 Pro League Season 2',
    game: 'Counter-Strike 2',
    status: 'active',
    format: '5v5 Round Robin + Playoffs',
    startDate: '2023-11-01',
    endDate: '2023-12-20',
    prizePool: '$10,000',
    registeredTeams: 12,
    maxTeams: 12,
    region: 'Europe'
  },
  {
    id: 3,
    name: 'Valorant College Cup',
    game: 'Valorant',
    status: 'upcoming',
    format: '5v5 Single Elimination',
    startDate: '2023-12-10',
    endDate: '2023-12-11',
    prizePool: '$2,500',
    registeredTeams: 24,
    maxTeams: 32,
    region: 'North America'
  },
  {
    id: 4,
    name: 'Summer Apex Invitational',
    game: 'Apex Legends',
    status: 'completed',
    format: 'Trios Points System',
    startDate: '2023-08-05',
    endDate: '2023-08-06',
    prizePool: '$3,000',
    registeredTeams: 20,
    maxTeams: 20,
    region: 'Global'
  },
  {
    id: 5,
    name: 'Rocket League Weekly Cup',
    game: 'Rocket League',
    status: 'active',
    format: '3v3 Double Elimination',
    startDate: '2023-11-25',
    endDate: '2023-11-26',
    prizePool: '$1,000',
    registeredTeams: 16,
    maxTeams: 16,
    region: 'Europe'
  }
];

const TournamentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Filter tournaments
  const filteredTournaments = MOCK_TOURNAMENTS.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
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
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold gaming-heading">Tournament Management</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="gaming-btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Create Tournament
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="gaming-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gaming-input w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="gaming-input"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tournaments List */}
      <div className="space-y-4">
        {filteredTournaments.map(tournament => (
          <div key={tournament.id} className="gaming-card p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left side with main info */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{tournament.name}</h3>
                    <p className="text-muted-foreground">{tournament.game}</p>
                  </div>
                  <StatusBadge status={tournament.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-muted-foreground" />
                    <span>{tournament.format}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{tournament.registeredTeams} / {tournament.maxTeams} Teams</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="py-1 px-2 bg-gaming-dark/50 rounded-md text-xs">
                    Prize: {tournament.prizePool}
                  </span>
                  <span className="py-1 px-2 bg-gaming-dark/50 rounded-md text-xs">
                    Region: {tournament.region}
                  </span>
                </div>
              </div>
              
              {/* Right side with actions */}
              <div className="flex md:flex-col justify-between border-t md:border-l md:border-t-0 border-border bg-gaming-dark/30 p-4">
                <button className="gaming-btn-secondary py-1 px-3 flex items-center gap-1">
                  <Eye size={14} />
                  <span className="hidden md:inline">View</span>
                </button>
                <button className="gaming-btn-secondary py-1 px-3 flex items-center gap-1">
                  <Edit size={14} />
                  <span className="hidden md:inline">Edit</span>
                </button>
                <button className="text-red-500 py-1 px-3 rounded-md hover:bg-red-500/10 flex items-center gap-1">
                  <Trash2 size={14} />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Create Tournament Modal (placeholder) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="gaming-card w-full max-w-xl p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Trophy size={20} className="text-gaming-purple" />
                Create Tournament
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="tournamentName" className="block text-sm font-medium mb-1">
                  Tournament Name
                </label>
                <input
                  id="tournamentName"
                  type="text"
                  className="gaming-input w-full"
                  placeholder="Enter tournament name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="game" className="block text-sm font-medium mb-1">
                    Game
                  </label>
                  <select id="game" className="gaming-input w-full">
                    <option value="">Select a game</option>
                    <option value="League of Legends">League of Legends</option>
                    <option value="Counter-Strike 2">Counter-Strike 2</option>
                    <option value="Valorant">Valorant</option>
                    <option value="Dota 2">Dota 2</option>
                    <option value="Rocket League">Rocket League</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="format" className="block text-sm font-medium mb-1">
                    Format
                  </label>
                  <select id="format" className="gaming-input w-full">
                    <option value="">Select a format</option>
                    <option value="5v5 Single Elimination">5v5 Single Elimination</option>
                    <option value="5v5 Double Elimination">5v5 Double Elimination</option>
                    <option value="5v5 Round Robin">5v5 Round Robin</option>
                    <option value="1v1 Double Elimination">1v1 Double Elimination</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className="gaming-input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className="gaming-input w-full"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prizePool" className="block text-sm font-medium mb-1">
                    Prize Pool
                  </label>
                  <input
                    id="prizePool"
                    type="text"
                    className="gaming-input w-full"
                    placeholder="e.g. $5,000"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxTeams" className="block text-sm font-medium mb-1">
                    Max Teams
                  </label>
                  <input
                    id="maxTeams"
                    type="number"
                    className="gaming-input w-full"
                    placeholder="e.g. 32"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium mb-1">
                  Region
                </label>
                <select id="region" className="gaming-input w-full">
                  <option value="">Select a region</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="South America">South America</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Global">Global</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="gaming-input w-full"
                  placeholder="Enter tournament description, rules, etc."
                ></textarea>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  onClick={() => setIsCreateModalOpen(false)}
                  className="gaming-btn-secondary"
                >
                  Cancel
                </button>
                <button className="gaming-btn-primary flex items-center gap-2">
                  <Check size={18} />
                  Create Tournament
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentManagement;
