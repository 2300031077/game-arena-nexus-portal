
import { useState } from 'react';
import { 
  Search, Filter, Calendar, Trophy, 
  Users, GameController, Tag, ChevronRight, ChevronLeft 
} from 'lucide-react';

// Mock tournament data
const MOCK_TOURNAMENTS = [
  {
    id: 1,
    name: 'Winter Championship 2023',
    game: 'League of Legends',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg',
    status: 'upcoming',
    format: '5v5 Double Elimination',
    startDate: '2023-12-15',
    endDate: '2023-12-18',
    prizePool: '$5,000',
    registeredTeams: 16,
    maxTeams: 32,
    region: 'North America',
    organizer: 'ESL Gaming'
  },
  {
    id: 2,
    name: 'CS2 Pro League Season 2',
    game: 'Counter-Strike 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike%202-285x380.jpg',
    status: 'active',
    format: '5v5 Round Robin + Playoffs',
    startDate: '2023-11-01',
    endDate: '2023-12-20',
    prizePool: '$10,000',
    registeredTeams: 12,
    maxTeams: 12,
    region: 'Europe',
    organizer: 'FACEIT'
  },
  {
    id: 3,
    name: 'Valorant College Cup',
    game: 'Valorant',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg',
    status: 'upcoming',
    format: '5v5 Single Elimination',
    startDate: '2023-12-10',
    endDate: '2023-12-11',
    prizePool: '$2,500',
    registeredTeams: 24,
    maxTeams: 32,
    region: 'North America',
    organizer: 'College Esports Network'
  },
  {
    id: 4,
    name: 'Summer Apex Invitational',
    game: 'Apex Legends',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg',
    status: 'completed',
    format: 'Trios Points System',
    startDate: '2023-08-05',
    endDate: '2023-08-06',
    prizePool: '$3,000',
    registeredTeams: 20,
    maxTeams: 20,
    region: 'Global',
    organizer: 'Electronic Arts'
  },
  {
    id: 5,
    name: 'Rocket League Weekly Cup',
    game: 'Rocket League',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/30921-285x380.jpg',
    status: 'active',
    format: '3v3 Double Elimination',
    startDate: '2023-11-25',
    endDate: '2023-11-26',
    prizePool: '$1,000',
    registeredTeams: 16,
    maxTeams: 16,
    region: 'Europe',
    organizer: 'Psyonix'
  },
  {
    id: 6,
    name: 'Dota 2 Major Tournament',
    game: 'Dota 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg',
    status: 'upcoming',
    format: '5v5 Double Elimination',
    startDate: '2023-12-20',
    endDate: '2023-12-28',
    prizePool: '$50,000',
    registeredTeams: 12,
    maxTeams: 16,
    region: 'Global',
    organizer: 'Valve'
  },
  {
    id: 7,
    name: 'Fortnite Battle Royale Cup',
    game: 'Fortnite',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg',
    status: 'upcoming',
    format: 'Solos & Duos',
    startDate: '2023-12-18',
    endDate: '2023-12-19',
    prizePool: '$20,000',
    registeredTeams: 48,
    maxTeams: 100,
    region: 'Global',
    organizer: 'Epic Games'
  },
  {
    id: 8,
    name: 'Overwatch 2 Championship',
    game: 'Overwatch 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/515025-285x380.jpg',
    status: 'upcoming',
    format: '5v5 Single Elimination',
    startDate: '2024-01-05',
    endDate: '2024-01-07',
    prizePool: '$8,000',
    registeredTeams: 8,
    maxTeams: 16,
    region: 'Asia',
    organizer: 'Blizzard Entertainment'
  }
];

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

const TournamentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gameFilter, setGameFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  // Get unique games
  const games = ['all', ...Array.from(new Set(MOCK_TOURNAMENTS.map(t => t.game)))];
  
  // Filter tournaments
  const filteredTournaments = MOCK_TOURNAMENTS.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    const matchesGame = gameFilter === 'all' || tournament.game === gameFilter;
    return matchesSearch && matchesStatus && matchesGame;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold gaming-heading">Tournaments</h1>
      
      {/* Search and Filters */}
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
          <div className="flex flex-wrap gap-3">
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
            <div className="flex items-center gap-2">
              <GameController size={18} className="text-muted-foreground" />
              <select
                value={gameFilter}
                onChange={(e) => setGameFilter(e.target.value)}
                className="gaming-input"
              >
                <option value="all">All Games</option>
                {games.slice(1).map((game, index) => (
                  <option key={index} value={game}>{game}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center bg-secondary/50 rounded-md overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-gaming-purple text-white' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-gaming-purple text-white' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid or List View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTournaments.map(tournament => (
            <div key={tournament.id} className="gaming-card overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={tournament.image} 
                  alt={tournament.game} 
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-3 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold truncate">{tournament.game}</h3>
                      <StatusBadge status={tournament.status} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">{tournament.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">by {tournament.organizer}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-muted-foreground" />
                    <span>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag size={14} className="text-muted-foreground" />
                    <span>{tournament.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy size={14} className="text-muted-foreground" />
                    <span>{tournament.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={14} className="text-muted-foreground" />
                    <span>{tournament.registeredTeams} / {tournament.maxTeams} Teams</span>
                  </div>
                </div>
                
                <button className="gaming-btn-primary w-full flex items-center justify-center gap-1">
                  <span>View Tournament</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTournaments.map(tournament => (
            <div key={tournament.id} className="gaming-card p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-24 lg:w-32 shrink-0">
                  <img 
                    src={tournament.image} 
                    alt={tournament.game} 
                    className="w-full h-full object-cover md:h-32 lg:h-full"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{tournament.name}</h3>
                        <StatusBadge status={tournament.status} />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <GameController size={14} />
                        <span>{tournament.game}</span>
                        <span className="text-xs">•</span>
                        <span>{tournament.organizer}</span>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <button className="gaming-btn-primary flex items-center gap-1">
                        <span>View Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} /> Dates
                      </p>
                      <p>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Trophy size={14} /> Prize Pool
                      </p>
                      <p>{tournament.prizePool}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Tag size={14} /> Format
                      </p>
                      <p>{tournament.format}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Users size={14} /> Teams
                      </p>
                      <p>{tournament.registeredTeams} / {tournament.maxTeams}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 lg:hidden">
                    <button className="gaming-btn-primary w-full flex items-center justify-center gap-1">
                      <span>View Details</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredTournaments.length}</span> of{' '}
          <span className="font-medium">{MOCK_TOURNAMENTS.length}</span> tournaments
        </p>
        
        <div className="flex items-center gap-2">
          <button className="gaming-btn-secondary py-1 px-2 flex items-center">
            <ChevronLeft size={18} />
            <span className="sr-only">Previous</span>
          </button>
          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gaming-purple text-white">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-secondary">
              2
            </button>
          </div>
          <button className="gaming-btn-secondary py-1 px-2 flex items-center">
            <ChevronRight size={18} />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentList;
