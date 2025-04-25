
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Calendar, Award, ArrowRight, GameController } from 'lucide-react';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 z-0"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block animate-pulse-glow">
            <Trophy size={50} className="mx-auto text-gaming-purple mb-4" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gaming-font mb-4">
            Arena<span className="text-gaming-purple">Nexus</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            The ultimate gaming tournament platform for players, organizers and fans
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to={`/${user?.role}/dashboard`} className="gaming-btn-primary px-8 py-3 text-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="gaming-btn-primary px-8 py-3 text-lg">
                  Get Started
                </Link>
                <Link to="/login" className="gaming-btn-secondary px-8 py-3 text-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gaming-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold gaming-heading text-center mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-purple/20 flex items-center justify-center mb-4">
                <Trophy size={28} className="text-gaming-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tournament Management</h3>
              <p className="text-muted-foreground">
                Create and manage tournaments with flexible formats, custom rules, and automatic bracket generation.
              </p>
            </div>
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-orange/20 flex items-center justify-center mb-4">
                <Users size={28} className="text-gaming-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Team Registration</h3>
              <p className="text-muted-foreground">
                Form teams, invite players, and join tournaments together with integrated communication tools.
              </p>
            </div>
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-blue/20 flex items-center justify-center mb-4">
                <Calendar size={28} className="text-gaming-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Match Scheduling</h3>
              <p className="text-muted-foreground">
                Automated or manual match scheduling with timezone support and player availability checks.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-blue/20 flex items-center justify-center mb-4">
                <GameController size={28} className="text-gaming-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Game Integration</h3>
              <p className="text-muted-foreground">
                Support for multiple games with custom rulesets, map pools, and game-specific settings.
              </p>
            </div>
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-purple/20 flex items-center justify-center mb-4">
                <Award size={28} className="text-gaming-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Leaderboards & Rankings</h3>
              <p className="text-muted-foreground">
                Global and game-specific leaderboards with ELO/MMR ratings and detailed player statistics.
              </p>
            </div>
            <div className="gaming-card p-6 flex flex-col items-center text-center hover:translate-y-[-5px] transition-transform">
              <div className="w-16 h-16 rounded-full bg-gaming-orange/20 flex items-center justify-center mb-4">
                <Trophy size={28} className="text-gaming-orange" />
              </div>
              <h3 className="text-xl font-bold mb-3">Prize Distribution</h3>
              <p className="text-muted-foreground">
                Transparent prize pool management with automatic distribution based on tournament results.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gaming-purple/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold gaming-heading mb-6">
            Ready to jump into the action?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of players and organizers in the ultimate gaming tournament platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tournaments" className="gaming-btn-primary px-6 py-3 flex items-center gap-2">
              Browse Tournaments
              <ArrowRight size={18} />
            </Link>
            {!isAuthenticated && (
              <Link to="/signup" className="gaming-btn-secondary px-6 py-3">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
