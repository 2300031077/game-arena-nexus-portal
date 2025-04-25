import { useState } from 'react';
import { 
  Search, Filter, Plus, Trash2, Edit, 
  Eye, ChevronLeft, ChevronRight, Gamepad
} from 'lucide-react';

// Mock game data
const MOCK_GAMES = [
  {
    id: 1,
    name: 'League of Legends',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg',
    category: 'MOBA',
    platforms: ['PC'],
    supportedFormats: ['1v1', '5v5', 'Double Elimination'],
    status: 'active',
    addedDate: '2023-05-10'
  },
  {
    id: 2,
    name: 'Counter-Strike 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike%202-285x380.jpg',
    category: 'FPS',
    platforms: ['PC'],
    supportedFormats: ['1v1', '2v2', '5v5', 'Single Elimination', 'Swiss'],
    status: 'active',
    addedDate: '2023-06-15'
  },
  {
    id: 3,
    name: 'Valorant',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg',
    category: 'FPS',
    platforms: ['PC'],
    supportedFormats: ['1v1', '5v5', 'Double Elimination'],
    status: 'active',
    addedDate: '2023-04-22'
  },
  {
    id: 4,
    name: 'Dota 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg',
    category: 'MOBA',
    platforms: ['PC'],
    supportedFormats: ['1v1', '5v5', 'Single Elimination', 'Double Elimination'],
    status: 'active',
    addedDate: '2023-03-08'
  },
  {
    id: 5,
    name: 'Fortnite',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg',
    category: 'Battle Royale',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    supportedFormats: ['Solo', 'Duos', 'Trios', 'Squads'],
    status: 'active',
    addedDate: '2023-07-01'
  },
  {
    id: 6,
    name: 'Rocket League',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/30921-285x380.jpg',
    category: 'Sports',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    supportedFormats: ['1v1', '2v2', '3v3', 'Single Elimination'],
    status: 'active',
    addedDate: '2023-08-05'
  },
  {
    id: 7,
    name: 'Apex Legends',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg',
    category: 'Battle Royale',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    supportedFormats: ['Solo', 'Duos', 'Trios'],
    status: 'active',
    addedDate: '2023-06-12'
  },
  {
    id: 8,
    name: 'Overwatch 2',
    image: 'https://static-cdn.jtvnw.net/ttv-boxart/515025-285x380.jpg',
    category: 'FPS',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    supportedFormats: ['1v1', '5v5', 'Single Elimination'],
    status: 'active',
    addedDate: '2023-07-20'
  }
];

const GameManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddGameModalOpen, setIsAddGameModalOpen] = useState(false);
  
  // Filter games based on search and category
  const filteredGames = MOCK_GAMES.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(MOCK_GAMES.map(game => game.category)))];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold gaming-heading">Game Management</h1>
        <button 
          onClick={() => setIsAddGameModalOpen(true)}
          className="gaming-btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Game
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="gaming-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="gaming-input w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="gaming-input"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredGames.map(game => (
          <div key={game.id} className="gaming-card overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={game.image} 
                alt={game.name} 
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3">
                  <h3 className="text-lg font-bold text-white">{game.name}</h3>
                  <p className="text-sm text-gray-300">{game.category}</p>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex flex-wrap gap-1">
                {game.platforms.map((platform, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gaming-dark py-1 px-2 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Formats: {game.supportedFormats.join(', ')}</p>
                <p>Added: {new Date(game.addedDate).toLocaleDateString()}</p>
              </div>
              <div className="flex justify-between pt-2">
                <button className="gaming-btn-secondary py-1 px-3 flex items-center gap-1">
                  <Edit size={14} />
                  Edit
                </button>
                <button className="gaming-btn-secondary py-1 px-3 flex items-center gap-1">
                  <Eye size={14} />
                  View
                </button>
                <button className="text-red-500 py-1 px-3 rounded-md hover:bg-red-500/10">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredGames.length}</span> of{' '}
          <span className="font-medium">{MOCK_GAMES.length}</span> games
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
      
      {/* Add Game Modal (placeholder) */}
      {isAddGameModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="gaming-card w-full max-w-md p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Gamepad size={20} className="text-gaming-purple" />
                Add New Game
              </h3>
              <button 
                onClick={() => setIsAddGameModalOpen(false)}
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
                <label htmlFor="gameName" className="block text-sm font-medium mb-1">
                  Game Name
                </label>
                <input
                  id="gameName"
                  type="text"
                  className="gaming-input w-full"
                  placeholder="Enter game name"
                />
              </div>
              
              <div>
                <label htmlFor="gameCategory" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select id="gameCategory" className="gaming-input w-full">
                  <option value="">Select a category</option>
                  <option value="FPS">FPS</option>
                  <option value="MOBA">MOBA</option>
                  <option value="Battle Royale">Battle Royale</option>
                  <option value="Sports">Sports</option>
                  <option value="Fighting">Fighting</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="gameImage" className="block text-sm font-medium mb-1">
                  Game Image
                </label>
                <div className="gaming-input w-full flex items-center">
                  <input
                    id="gameImage"
                    type="file"
                    className="w-full text-sm cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Platforms
                </label>
                <div className="flex flex-wrap gap-2">
                  {['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'].map((platform, index) => (
                    <label key={index} className="flex items-center gap-1 cursor-pointer">
                      <input type="checkbox" className="rounded text-gaming-purple" />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  onClick={() => setIsAddGameModalOpen(false)}
                  className="gaming-btn-secondary"
                >
                  Cancel
                </button>
                <button className="gaming-btn-primary">
                  Add Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameManagement;
