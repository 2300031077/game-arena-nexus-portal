
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Calendar, Users, Tag, Gamepad, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TournamentDialogProps {
  tournament: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TournamentDialog = ({ tournament, open, onOpenChange }: TournamentDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [joining, setJoining] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email || "");

  const handleJoinTournament = () => {
    if (!teamName || !contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically make an API call to register for the tournament
    // For now, we'll just show a success message
    toast({
      title: "Successfully Registered!",
      description: `Your team ${teamName} has been registered for ${tournament.name}.`,
      variant: "default",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <div className="relative h-40">
          <img 
            src={tournament?.image} 
            alt={tournament?.game} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-4 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold text-xl">{tournament?.game}</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500 capitalize">
                  {tournament?.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-xl font-bold">{tournament?.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Organized by {tournament?.organizer}
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gaming-purple" />
              <div>
                <p className="text-sm font-medium">Dates</p>
                <p className="text-sm text-muted-foreground">
                  {tournament ? new Date(tournament.startDate).toLocaleDateString() : ""} - {tournament ? new Date(tournament.endDate).toLocaleDateString() : ""}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-gaming-orange" />
              <div>
                <p className="text-sm font-medium">Prize Pool</p>
                <p className="text-sm text-muted-foreground">{tournament?.prizePool}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-gaming-blue" />
              <div>
                <p className="text-sm font-medium">Format</p>
                <p className="text-sm text-muted-foreground">{tournament?.format}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users size={18} className="text-gaming-purple" />
              <div>
                <p className="text-sm font-medium">Teams</p>
                <p className="text-sm text-muted-foreground">
                  {tournament?.registeredTeams} / {tournament?.maxTeams}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Gamepad size={18} className="text-muted-foreground" />
            <p className="text-sm">Region: {tournament?.region}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Info size={18} className="text-muted-foreground shrink-0" />
            <p className="text-sm">
              This tournament follows a {tournament?.format} structure and is open to all players in the {tournament?.region} region.
              Register your team before the deadline to participate!
            </p>
          </div>
        </div>

        {joining ? (
          <div className="p-4 border-t mt-3">
            <h4 className="text-base font-medium mb-3">Register Your Team</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="teamName" className="text-sm font-medium block mb-1">
                  Team Name *
                </label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="text-sm font-medium block mb-1">
                  Contact Email *
                </label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter className="p-4 border-t">
          {joining ? (
            <div className="flex w-full gap-2">
              <Button variant="outline" onClick={() => setJoining(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleJoinTournament} className="flex-1">
                Submit Registration
              </Button>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Close
              </Button>
              <Button onClick={() => setJoining(true)} className="flex-1">
                Join Tournament
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TournamentDialog;
