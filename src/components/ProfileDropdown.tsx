
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut, Award } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitials = user.username.slice(0, 2).toUpperCase();

  // Mock data for tournaments and games - in a real app, this would come from your API
  const tournaments = ["Spring Championship 2025", "Summer League"];
  const games = ["Valorant", "Call of Duty"];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative flex items-center gap-2 hover:bg-secondary/50"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.avatar} 
              alt={user.username} 
            />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">Profile</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-none shadow-none">
          <div className="flex flex-col">
            <div className="flex items-center gap-4 p-4 border-b">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-bold text-lg">{user.username}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <span className="inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium bg-gaming-purple/20 text-gaming-purple">
                  {user.role}
                </span>
              </div>
            </div>
            
            <div className="p-4 border-b space-y-3">
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Award size={16} />
                  Registered Tournaments
                </h4>
                {tournaments.length > 0 ? (
                  <ul className="mt-1 text-sm">
                    {tournaments.map((tournament, i) => (
                      <li key={i} className="text-muted-foreground">{tournament}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">No tournaments registered</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <User size={16} />
                  Current Games
                </h4>
                {games.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {games.map((game, i) => (
                      <span 
                        key={i} 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                      >
                        {game}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">No games selected</p>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={logout}
              >
                <LogOut size={16} className="mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileDropdown;
