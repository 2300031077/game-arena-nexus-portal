
import { Users, Trophy, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyTeam = () => {
  // Mock data for team details
  const teamData = {
    name: "Team Phoenix",
    members: [
      { id: 1, name: "John Doe", role: "Captain" },
      { id: 2, name: "Jane Smith", role: "Player" },
      { id: 3, name: "Mike Johnson", role: "Player" },
    ],
    stats: {
      wins: 15,
      losses: 5,
      winRate: "75%"
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold gaming-heading">My Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-gaming-purple" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {teamData.members.map((member) => (
                <li key={member.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20">
                  <span>{member.name}</span>
                  <span className="text-sm text-muted-foreground">{member.role}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-gaming-orange" />
              Team Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold">{teamData.stats.wins}</p>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold">{teamData.stats.losses}</p>
                  <p className="text-sm text-muted-foreground">Losses</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/20">
                  <p className="text-2xl font-bold">{teamData.stats.winRate}</p>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyTeam;
