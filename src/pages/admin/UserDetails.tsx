
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Calendar, Trophy, Gamepad, 
  Clock, X, Check, ChevronLeft, Edit, UserRound, 
  Phone
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

// Mock user data
const mockUser = {
  id: "user-123",
  username: "GamingLegend",
  email: "legend@gaming.com",
  fullName: "Alex Johnson",
  phoneNumber: "+1 555-123-4567",
  bio: "Professional gamer with 5+ years of competitive experience. Specialized in FPS and MOBA games.",
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
      },
      {
        id: 4,
        name: "Fall Invitational",
        game: "Fortnite",
        teamName: "Storm Raiders",
        startDate: "2023-09-10"
      }
    ],
    upcoming: [
      {
        id: 5,
        name: "Winter Classic",
        game: "Call of Duty: Modern Warfare",
        teamName: "Frost Squad",
        startDate: "2023-12-05"
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
    { name: "Call of Duty", hours: 180, main: false },
    { name: "Fortnite", hours: 150, main: false }
  ],
  upcomingMatches: [
    {
      id: 1,
      tournament: "Summer Championship",
      opponent: "Team Blaze",
      date: "2023-07-28",
      time: "18:00"
    },
    {
      id: 2,
      tournament: "Fall Invitational",
      opponent: "Storm Chasers",
      date: "2023-09-15",
      time: "20:00"
    }
  ]
};

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(mockUser);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // In a real application, you would fetch user data based on the userId
  useEffect(() => {
    // This would be a fetch call to your API
    console.log(`Fetching user with ID: ${userId}`);
    // For now, we're using mock data
  }, [userId]);

  const handleUserUpdate = (updatedUserData) => {
    setUser({...user, ...updatedUserData});
    setIsEditDialogOpen(false);
  };
  
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
        <div className="flex-grow"></div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit size={16} />
          Edit Profile
        </Button>
      </div>
      
      <div className="gaming-card p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-2xl">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-muted-foreground">{user.fullName}</p>
              </div>
              <Badge variant="outline" className="bg-gaming-purple/20 text-gaming-purple border-gaming-purple/20">
                {user.role}
              </Badge>
            </div>
            
            {user.bio && (
              <p className="text-sm">{user.bio}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={16} className="text-muted-foreground" />
                {user.email}
              </div>
              {user.phoneNumber && (
                <div className="flex items-center gap-1">
                  <Phone size={16} className="text-muted-foreground" />
                  {user.phoneNumber}
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-muted-foreground" />
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {user.games.map((game, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="gaming-card p-5">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Trophy size={18} /> 
                Active Tournaments
              </h3>
              
              {user.tournaments.active.length > 0 ? (
                <div className="space-y-3">
                  {user.tournaments.active.map((tournament) => (
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
                Upcoming Tournaments
              </h3>
              
              {user.tournaments.upcoming.length > 0 ? (
                <div className="space-y-3">
                  {user.tournaments.upcoming.map((tournament) => (
                    <div key={tournament.id} className="border border-border rounded-md p-3">
                      <p className="font-medium">{tournament.name}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{tournament.game}</span>
                        <span className="text-muted-foreground">Team: {tournament.teamName}</span>
                      </div>
                      <div className="text-sm mt-1">
                        <span className="text-muted-foreground">Starts: {new Date(tournament.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No upcoming tournaments</p>
              )}
            </div>
            
            <div className="gaming-card p-5">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock size={18} />
                Upcoming Matches
              </h3>
              
              {user.upcomingMatches.length > 0 ? (
                <div className="space-y-3">
                  {user.upcomingMatches.map((match) => (
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
              {user.games.map((game, index) => (
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
            
            {user.tournaments.active.length > 0 ? (
              <div className="space-y-3">
                {user.tournaments.active.map((tournament) => (
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
            <h3 className="text-lg font-medium mb-4">Upcoming Tournaments</h3>
            
            {user.tournaments.upcoming.length > 0 ? (
              <div className="space-y-3">
                {user.tournaments.upcoming.map((tournament) => (
                  <div key={tournament.id} className="border border-border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-lg">{tournament.name}</p>
                        <p className="text-sm text-muted-foreground">{tournament.game}</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">
                        Upcoming
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <User size={16} className="text-muted-foreground" />
                        Team: {tournament.teamName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-muted-foreground" />
                        Starts: {new Date(tournament.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming tournaments</p>
            )}
          </div>
          
          <div className="gaming-card p-5">
            <h3 className="text-lg font-medium mb-4">Completed Tournaments</h3>
            
            {user.tournaments.completed.length > 0 ? (
              <div className="space-y-3">
                {user.tournaments.completed.map((tournament) => (
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
            {user.games.map((game, index) => (
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

      <EditUserDialog 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)} 
        onSave={handleUserUpdate}
        user={user}
      />
    </div>
  );
};

const EditUserDialog = ({ isOpen, onClose, onSave, user }) => {
  const form = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      bio: user?.bio || '',
      avatar: user?.avatar || '',
    }
  });

  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
        avatar: user.avatar,
      });
    }
  }, [user, form]);

  const handleSubmit = (data) => {
    onSave(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
            <div className="flex flex-col items-center gap-4 mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={form.watch('avatar')} alt={form.watch('username')} />
                <AvatarFallback>{form.watch('username')?.slice(0, 2).toUpperCase() || ''}</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Avatar URL" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone Number" type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea 
                        {...field}
                        className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                        placeholder="Tell us about yourself"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
