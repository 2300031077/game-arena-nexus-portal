
import { Medal, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leaderboard = () => {
  // Mock data for leaderboard
  const leaderboardData = [
    { id: 1, name: "Team Phoenix", points: 2500, wins: 25, rank: 1 },
    { id: 2, name: "Dragons Elite", points: 2350, wins: 23, rank: 2 },
    { id: 3, name: "Victory Vision", points: 2200, wins: 20, rank: 3 },
    { id: 4, name: "Ninja Squad", points: 2100, wins: 19, rank: 4 },
    { id: 5, name: "Team Titans", points: 2000, wins: 18, rank: 5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold gaming-heading">Global Leaderboard</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-gaming-purple" />
            Top Teams
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((team) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-gaming-purple/20 flex items-center justify-center">
                    {team.rank === 1 ? (
                      <Trophy className="h-4 w-4 text-yellow-500" />
                    ) : team.rank === 2 ? (
                      <Medal className="h-4 w-4 text-gray-400" />
                    ) : team.rank === 3 ? (
                      <Medal className="h-4 w-4 text-amber-600" />
                    ) : (
                      <Star className="h-4 w-4 text-gaming-purple" />
                    )}
                  </span>
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-muted-foreground">{team.wins} Wins</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-gaming-purple">{team.points}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
