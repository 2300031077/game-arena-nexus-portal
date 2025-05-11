
import { useState } from 'react';
import { 
  User, Mail, Calendar, Trophy, Gamepad, 
  Clock, X, Check, ChevronLeft
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// Mock user data
const mockUser = {
  id: "user-123",
  username: "GamingLegend",
  email: "legend@gaming.com",
  fullName: "Alex Johnson",
  avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=GamingLegend",
  role: "player",
  joinDate: "2023-05-15",
  tournaments: {
    active: [
      {
        id: 1,
        name: "Summer Championship",
        game: "League of Legends",
        teamName: "Phoenix Rising",
        startDate: "2023-07-15"
      }
    ],
    completed: [
      {
        id: 2,
        name: "Spring League",
        game: "Valorant",
        teamName: "Shadow Ops",
        startDate: "2023-03-10",
        endDate: "2023-04-05",
        placement: "2nd Place"
      },
      {
        id: 3,
        name: "Winter Cup",
        game: "Call of Duty",
        teamName: "Frost Squad",
        startDate: "2022-12-10",
        endDate: "2022-12-15",
        placement: "1st Place"
      }
    ]
  },
  games: [
    { name: "League of Legends", hours: 350, main: true },
    { name: "Valorant", hours: 220, main: false },
    { name: "Call of Duty", hours: 180, main: false }
  ],
  upcomingMatches: [
    {
      id: 1,
      tournament: "Summer Championship",
      opponent: "Team Blaze",
      date: "2023-07-28",
      time: "18:00"
    }
  ]
};

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={18} />
        </Button>
        <h1 className="text-3xl font-bold gaming-heading">User Details</h1>
      </div>
      
      <div className="gaming-card p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="w-24 h-24">
            <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
            <AvatarFallback className="text-2xl">{mockUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">{mockUser.username}</h2>
                <p className="text-muted-foreground">{mockUser.fullName}</p>
              </div>
              <Badge variant="outline" className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/20">
                {mockUser.role}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={16} className="text-muted-foreground" />
                {mockUser.email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-muted-foreground" />
                Joined {new Date(mockUser.joinDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {mockUser.games.map((game, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 rounded-full text-sm ${
                    game.main 
                      ? 'bg-gaming-purple/20 text-gaming-purple' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {game.name}
                  {game.main && <span className="ml-1 text-xs">(Main)</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="gaming-card p-5">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Trophy size={18} /> 
                Active Tournaments
              </h3>
              
              {mockUser.tournaments.active.length > 0 ? (
                <div className="space-y-3">
                  {mockUser.tournaments.active.map((tournament) => (
                    <div key={tournament.id} className="border border-border rounded-md p-3">
                      <p className="font-medium">{tournament.name}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{tournament.game}</span>
                        <span className="text-muted-foreground">Team: {tournament.teamName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No active tournaments</p>
              )}
            </div>
            
            <div className="gaming-card p-5">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock size={18} />
                Upcoming Matches
              </h3>
              
              {mockUser.upcomingMatches.length > 0 ? (
                <div className="space-y-3">
                  {mockUser.upcomingMatches.map((match) => (
                    <div key={match.id} className="border border-border rounded-md p-3">
                      <p className="font-medium">{match.tournament}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">vs {match.opponent}</span>
                        <span className="text-muted-foreground">
                          {new Date(match.date).toLocaleDateString()} at {match.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No upcoming matches</p>
              )}
            </div>
          </div>
          
          <div className="gaming-card p-5">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Gamepad size={18} />
              Game Statistics
            </h3>
            
            <div className="space-y-3">
              {mockUser.games.map((game, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{game.name}</span>
                    {game.main && (
                      <span className="bg-gaming-purple/20 text-gaming-purple text-xs px-2 py-0.5 rounded-full">
                        Main
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground">{game.hours} hours played</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tournaments" className="space-y-6">
          <div className="gaming-card p-5">
            <h3 className="text-lg font-medium mb-4">Active Tournaments</h3>
            
            {mockUser.tournaments.active.length > 0 ? (
              <div className="space-y-3">
                {mockUser.tournaments.active.map((tournament) => (
                  <div key={tournament.id} className="border border-border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-lg">{tournament.name}</p>
                        <p className="text-sm text-muted-foreground">{tournament.game}</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/20">
                        Active
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-muted-foreground" />
                        Team: {tournament.teamName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-muted-foreground" />
                        Started: {new Date(tournament.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No active tournaments</p>
            )}
          </div>
          
          <div className="gaming-card p-5">
            <h3 className="text-lg font-medium mb-4">Completed Tournaments</h3>
            
            {mockUser.tournaments.completed.length > 0 ? (
              <div className="space-y-3">
                {mockUser.tournaments.completed.map((tournament) => (
                  <div key={tournament.id} className="border border-border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-lg">{tournament.name}</p>
                        <p className="text-sm text-muted-foreground">{tournament.game}</p>
                      </div>
                      <Badge variant="outline" className="bg-gray-500/10 text-gray-500">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-muted-foreground" />
                        Team: {tournament.teamName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-muted-foreground" />
                        {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy size={16} className="text-yellow-500" />
                        {tournament.placement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No completed tournaments</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="games" className="gaming-card p-5">
          <h3 className="text-lg font-medium mb-4">Game History & Statistics</h3>
          
          <div className="space-y-6">
            {mockUser.games.map((game, index) => (
              <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium">{game.name}</h4>
                  {game.main ? (
                    <Badge className="bg-gaming-purple/20 text-gaming-purple border-none">
                      Main Game
                    </Badge>
                  ) : null}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours Played</p>
                    <p className="font-medium">{game.hours} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Status</p>
                    <div className="flex items-center gap-2">
                      {game.hours > 200 ? (
                        <>
                          <Check size={16} className="text-green-500" />
                          <span>Active Player</span>
                        </>
                      ) : (
                        <>
                          <X size={16} className="text-red-500" />
                          <span>Casual Player</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetails;
