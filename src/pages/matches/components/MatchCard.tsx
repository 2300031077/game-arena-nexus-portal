
import { Trophy, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MatchCardProps {
  match: {
    id: number;
    team1: string;
    team2: string;
    game: string;
    tournament: string;
    score: string;
    status: string;
  };
}

const MatchCard = ({ match }: MatchCardProps) => {
  return (
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
  );
};

export default MatchCard;
