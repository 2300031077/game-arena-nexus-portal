
import { Calendar } from 'lucide-react';

interface MatchStatsProps {
  totalMatches: number;
}

const MatchStats = ({ totalMatches }: MatchStatsProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold gaming-heading">Live Matches</h1>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gaming-purple opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gaming-purple"></span>
        </span>
        <span className="text-sm text-muted-foreground">
          {totalMatches} Matches Live
        </span>
      </div>
    </div>
  );
};

export default MatchStats;
