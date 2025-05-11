
import { useState } from 'react';
import { 
  Search, Filter, Plus, Trophy, Calendar, Users, 
  Tag, Eye, Edit, Trash2, ChevronDown, Check
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock tournament data - in a real app, this would be fetched from an API
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
    region: 'North America'
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
    region: 'Europe'
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
    region: 'North America'
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
    region: 'Global'
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
    region: 'Europe'
  }
];

// List of available games with images
const AVAILABLE_GAMES = [
  { 
    id: 1, 
    name: 'League of Legends', 
    image: 'public/lovable-uploads/3365eaa0-885a-4a04-820a-df2e5057e8c0.png',
    genre: 'MOBA',
    formats: ['1v1', '5v5', 'Double Elimination'],
    added: '5/10/2023'
  },
  { 
    id: 2, 
    name: 'Counter-Strike 2', 
    image: 'public/lovable-uploads/3365eaa0-885a-4a04-820a-df2e5057e8c0.png',
    genre: 'FPS',
    formats: ['1v1', '2v2', '5v5', 'Single Elimination', 'Swiss'],
    added: '6/15/2023'
  },
  { 
    id: 3, 
    name: 'Valorant', 
    image: 'public/lovable-uploads/3365eaa0-885a-4a04-820a-df2e5057e8c0.png',
    genre: 'FPS',
    formats: ['1v1', '5v5', 'Double Elimination'],
    added: '4/22/2023'
  },
  { 
    id: 4, 
    name: 'Dota 2', 
    image: 'public/lovable-uploads/3365eaa0-885a-4a04-820a-df2e5057e8c0.png',
    genre: 'MOBA',
    formats: ['1v1', '5v5', 'Single Elimination', 'Double Elimination'],
    added: '3/8/2023'
  },
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

// Define the tournament type to match the MOCK_TOURNAMENTS structure
type Tournament = {
  id: number;
  name: string;
  game: string;
  image: string;
  status: string;
  format: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  registeredTeams: number;
  maxTeams: number;
  region: string;
  description?: string;
};

interface TournamentFormData {
  id?: number;
  name: string;
  game: string;
  image: string;
  status: string;
  format: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  maxTeams: number; // Changed from string to number to match the type
  region: string;
  description: string;
  registeredTeams?: number; // Added this field that was missing
}

const emptyTournamentForm: TournamentFormData = {
  name: '',
  game: '',
  image: '',
  status: 'upcoming',
  format: '',
  startDate: '',
  endDate: '',
  prizePool: '',
  maxTeams: 0, // Changed from empty string to 0 to match number type
  region: '',
  description: '',
  registeredTeams: 0 // Initialize with 0
};

const AdminTournamentManagement = () => {
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [currentTournament, setCurrentTournament] = useState<TournamentFormData>(emptyTournamentForm);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  
  // Filter tournaments
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open create tournament modal
  const handleCreateTournament = () => {
    setCurrentTournament(emptyTournamentForm);
    setModalMode('create');
    setIsModalOpen(true);
  };

  // Open view tournament modal
  const handleViewTournament = (tournament: Tournament) => {
    setCurrentTournament({
      ...tournament,
      description: tournament.description || ''
    });
    setModalMode('view');
    setIsModalOpen(true);
  };

  // Open edit tournament modal
  const handleEditTournament = (tournament: Tournament) => {
    setCurrentTournament({
      ...tournament,
      description: tournament.description || ''
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Handle delete tournament
  const handleDeleteTournament = (id: number) => {
    setConfirmDeleteId(id);
  };

  // Confirm delete tournament
  const confirmDelete = () => {
    if (confirmDeleteId) {
      setTournaments(tournaments.filter(t => t.id !== confirmDeleteId));
      toast({
        title: "Tournament deleted",
        description: "The tournament has been successfully removed.",
      });
      setConfirmDeleteId(null);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert maxTeams to number when it's that field
    if (name === 'maxTeams') {
      setCurrentTournament(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseInt(value, 10)
      }));
    } else {
      setCurrentTournament(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Save tournament (create or edit)
  const handleSaveTournament = () => {
    // Validate form
    if (!currentTournament.name || !currentTournament.game || !currentTournament.format || 
        !currentTournament.startDate || !currentTournament.endDate || !currentTournament.prizePool || 
        currentTournament.maxTeams <= 0 || !currentTournament.region) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (modalMode === 'create') {
      // Create new tournament
      const newTournament: Tournament = {
        ...currentTournament,
        id: Math.max(0, ...tournaments.map(t => t.id)) + 1,
        image: AVAILABLE_GAMES.find(g => g.name === currentTournament.game)?.image || '',
        registeredTeams: currentTournament.registeredTeams || 0
      };
      setTournaments([...tournaments, newTournament]);
      toast({
        title: "Tournament created",
        description: `${newTournament.name} has been successfully created.`,
      });
    } else if (modalMode === 'edit') {
      // Update existing tournament
      setTournaments(tournaments.map(t => 
        t.id === currentTournament.id ? { 
          ...t, 
          ...currentTournament,
          registeredTeams: currentTournament.registeredTeams || t.registeredTeams,
          maxTeams: currentTournament.maxTeams
        } : t
      ));
      toast({
        title: "Tournament updated",
        description: `${currentTournament.name} has been successfully updated.`,
      });
    }
    
    setIsModalOpen(false);
  };
  
  // Get game list for dropdown
  const gameOptions = AVAILABLE_GAMES.map(game => game.name);
  
  // Get format options based on selected game
  const formatOptions = currentTournament.game 
    ? AVAILABLE_GAMES.find(g => g.name === currentTournament.game)?.formats || []
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold gaming-heading">Tournament Management</h1>
        <Button 
          onClick={handleCreateTournament}
          className="gaming-btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Create Tournament
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="gaming-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
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
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map(tournament => (
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
                  <Button variant="secondary" size="sm" className="flex items-center gap-1" onClick={() => handleViewTournament(tournament)}>
                    <Eye size={14} />
                    <span className="hidden md:inline">View</span>
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-1" onClick={() => handleEditTournament(tournament)}>
                    <Edit size={14} />
                    <span className="hidden md:inline">Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-500 flex items-center gap-1" onClick={() => handleDeleteTournament(tournament.id)}>
                    <Trash2 size={14} />
                    <span className="hidden md:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-10 bg-gaming-dark/20 rounded-lg border border-dashed border-gray-700">
            <Trophy size={48} className="mx-auto opacity-20 mb-4" />
            <h3 className="text-xl font-medium mb-1">No tournaments found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "Create your first tournament to get started."}
            </p>
          </div>
        )}
      </div>
      
      {/* Tournament Modal (Create/Edit/View) */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Trophy size={20} className="text-gaming-purple" />
              {modalMode === 'create' ? 'Create Tournament' : 
               modalMode === 'edit' ? 'Edit Tournament' : 'Tournament Details'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className={modalMode === 'view' ? 'opacity-70' : ''}>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Tournament Name {modalMode !== 'view' && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="name"
                name="name"
                value={currentTournament.name}
                onChange={handleInputChange}
                placeholder="Enter tournament name"
                disabled={modalMode === 'view'}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="game" className="block text-sm font-medium mb-1">
                  Game {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <select 
                  id="game" 
                  name="game" 
                  className="gaming-input w-full"
                  value={currentTournament.game}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                >
                  <option value="">Select a game</option>
                  {gameOptions.map((game, index) => (
                    <option key={index} value={game}>{game}</option>
                  ))}
                </select>
              </div>
              
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="format" className="block text-sm font-medium mb-1">
                  Format {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <select 
                  id="format" 
                  name="format" 
                  className="gaming-input w-full"
                  value={currentTournament.format}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view' || !currentTournament.game}
                  required
                >
                  <option value="">Select a format</option>
                  {formatOptions.map((format, index) => (
                    <option key={index} value={format}>{format}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Start Date {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={currentTournament.startDate}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                  End Date {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={currentTournament.endDate}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <select 
                  id="status" 
                  name="status" 
                  className="gaming-input w-full"
                  value={currentTournament.status}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="prizePool" className="block text-sm font-medium mb-1">
                  Prize Pool {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <Input
                  id="prizePool"
                  name="prizePool"
                  value={currentTournament.prizePool}
                  onChange={handleInputChange}
                  placeholder="e.g. $5,000"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="maxTeams" className="block text-sm font-medium mb-1">
                  Max Teams {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <Input
                  id="maxTeams"
                  name="maxTeams"
                  type="number"
                  min="1"
                  value={currentTournament.maxTeams.toString()}
                  onChange={handleInputChange}
                  placeholder="e.g. 32"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div className={modalMode === 'view' ? 'opacity-70' : ''}>
                <label htmlFor="region" className="block text-sm font-medium mb-1">
                  Region {modalMode !== 'view' && <span className="text-red-500">*</span>}
                </label>
                <select 
                  id="region" 
                  name="region" 
                  className="gaming-input w-full"
                  value={currentTournament.region}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  required
                >
                  <option value="">Select a region</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="South America">South America</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Global">Global</option>
                </select>
              </div>
            </div>
            
            <div className={modalMode === 'view' ? 'opacity-70' : ''}>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={currentTournament.description || ''}
                onChange={handleInputChange}
                placeholder="Enter tournament description, rules, etc."
                rows={4}
                disabled={modalMode === 'view'}
              />
            </div>

            {modalMode === 'view' && (
              <div className="border rounded-md p-4 bg-gaming-dark/20">
                <h4 className="text-sm font-medium mb-2">Registered Teams</h4>
                <p className="text-sm text-muted-foreground">
                  {currentTournament.registeredTeams !== undefined ? `${currentTournament.registeredTeams} out of ${currentTournament.maxTeams} teams registered` : 'No teams registered yet'}
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {modalMode === 'view' ? (
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveTournament} className="flex items-center gap-2">
                  <Check size={18} />
                  {modalMode === 'create' ? 'Create Tournament' : 'Save Changes'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Deletion</DialogTitle>
          </DialogHeader>
          
          <p className="py-4">
            Are you sure you want to delete this tournament? This action cannot be undone.
          </p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete Tournament</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTournamentManagement;
