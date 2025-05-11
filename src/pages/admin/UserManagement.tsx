
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserRound, Mail, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock users data
const mockUsers = [
  {
    id: 1,
    username: "GamingLegend",
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "player",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=GamingLegend",
    activeTournaments: 2,
    totalTournaments: 5,
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    username: "ProGamer99",
    fullName: "Sarah Miller",
    email: "sarah.miller@example.com",
    role: "player",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=ProGamer99",
    activeTournaments: 1,
    totalTournaments: 3,
    joinDate: "2023-02-20"
  },
  {
    id: 3,
    username: "TournamentHost",
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    role: "organizer",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=TournamentHost",
    activeTournaments: 0,
    totalTournaments: 8,
    joinDate: "2022-11-05"
  },
  {
    id: 4,
    username: "SystemAdmin",
    fullName: "Emily Wilson",
    email: "emily.wilson@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=SystemAdmin",
    activeTournaments: 0,
    totalTournaments: 0,
    joinDate: "2022-10-01"
  },
  {
    id: 5,
    username: "GameMaster",
    fullName: "David Lee",
    email: "david.lee@example.com",
    role: "player",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=GameMaster",
    activeTournaments: 3,
    totalTournaments: 7,
    joinDate: "2023-03-10"
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const getBadgeColorByRole = (role) => {
    switch (role) {
      case 'admin':
        return "bg-red-500/20 text-red-500 border-red-500/20";
      case 'organizer':
        return "bg-blue-500/20 text-blue-500 border-blue-500/20";
      case 'player':
        return "bg-green-500/20 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gaming-heading">User Management</h1>
        <Button>Add New User</Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Active Tournaments</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getBadgeColorByRole(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span>{user.activeTournaments}</span>
                    <span className="text-muted-foreground text-sm"> / {user.totalTournaments} total</span>
                  </TableCell>
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(user.id)}>
                        <UserRound className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UserEditDialog 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
        user={selectedUser} 
        onSave={(updatedUser) => {
          setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
          handleCloseDialog();
        }}
      />
    </div>
  );
};

const UserEditDialog = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    role: '',
    avatar: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    
    const updatedUser = {
      ...user,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      role: formData.role,
      avatar: formData.avatar
    };
    
    onSave(updatedUser);
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={formData.avatar} alt={formData.username} />
              <AvatarFallback>{formData.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Avatar URL</label>
              <Input 
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Full Name</label>
              <Input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Username</label>
              <Input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Email</label>
              <Input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Role</label>
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="player">Player</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagement;
