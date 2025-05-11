
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, RoleProtectedRoute, AuthRoute } from "./components/RouteProtection";
import MainLayout from "./components/layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import GameManagement from "./pages/admin/GameManagement";
import UserDetails from "./pages/admin/UserDetails";
import TournamentManagement from "./pages/admin/TournamentManagement";
import UserManagement from "./pages/admin/UserManagement";

// Organizer pages
import OrganizerTournamentManagement from "./pages/organizer/TournamentManagement";

// Player pages
import PlayerDashboard from "./pages/player/PlayerDashboard";
import MyTeam from "./pages/player/teams/MyTeam";

// Public pages
import TournamentList from "./pages/tournaments/TournamentList";
import Matches from "./pages/matches/Matches";
import Leaderboard from "./pages/leaderboard/Leaderboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
            <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Public Routes with Main Layout */}
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/tournaments" element={<MainLayout><TournamentList /></MainLayout>} />
            
            {/* Updated Matches and Leaderboard routes to be accessible to all */}
            <Route path="/matches" element={<MainLayout><Matches /></MainLayout>} />
            <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
                <Route path="/admin/games" element={<MainLayout><GameManagement /></MainLayout>} />
                <Route path="/admin/users" element={<MainLayout><UserManagement /></MainLayout>} />
                <Route path="/admin/users/:userId" element={<MainLayout><UserDetails /></MainLayout>} />
                <Route path="/admin/tournaments" element={<MainLayout><TournamentManagement /></MainLayout>} />
              </Route>
            </Route>
            
            {/* Protected Organizer Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleProtectedRoute allowedRoles={["organizer"]} />}>
                <Route path="/organizer/tournaments" element={<MainLayout><OrganizerTournamentManagement /></MainLayout>} />
              </Route>
            </Route>
            
            {/* Protected Player Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleProtectedRoute allowedRoles={["player"]} />}>
                <Route path="/player/dashboard" element={<MainLayout><PlayerDashboard /></MainLayout>} />
                <Route path="/player/teams" element={<MainLayout><MyTeam /></MainLayout>} />
                <Route path="/player/matches" element={<MainLayout><Matches /></MainLayout>} />
              </Route>
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
