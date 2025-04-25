
import MatchCard from './components/MatchCard';
import MatchStats from './components/MatchStats';

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
      <MatchStats totalMatches={ongoingMatches.length} />
      <div className="grid gap-6">
        {ongoingMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default Matches;
