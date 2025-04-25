
import { Calendar, Clock, Trophy, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Matches = () => {
  // Mock data for ongoing matches
  const ongoingMatches = [
    {
      id: 1,
      team1: "Team Phoenix",
      team2: "Team Dragons",
      game: "League of Legends",
      tournament: "Summer Championship",
      score: "2 - 1",
      status: "Live"
    },
    {
      id: 2,
      team1: "Ninja Squad",
      team2: "Victory Vision",
      game: "Valorant",
      tournament: "Pro League",
      score: "12 - 10",
      status: "Live"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gaming-heading">Live Matches</h1>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gaming-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gaming-purple"></span>
          </span>
          <span className="text-sm text-muted-foreground">
            {ongoingMatches.length} Matches Live
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {ongoingMatches.map((match) => (
          <Card key={match.id} className="overflow-hidden">
            <CardHeader className="bg-secondary/20">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="text-gaming-purple" />
                  {match.tournament}
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-gaming-purple/20 text-gaming-purple">
                  {match.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="font-semibold text-lg">{match.team1}</p>
                </div>
                <div className="px-6 py-3 rounded-lg bg-secondary/20 mx-4">
                  <p className="text-2xl font-bold text-gaming-purple">{match.score}</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-semibold text-lg">{match.team2}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User size={16} />
                  {match.game}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Matches;
