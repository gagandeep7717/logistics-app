import { useNavigate, Outlet } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleTabChange = async (value) => {
    if (value === 'logout') {
      try {
        await signOut();
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
      return;
    }
    navigate(`/${value}`);
  };

  // Get the current path to set active tab
  const currentPath = window.location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {user?.first_name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <Tabs defaultValue={currentPath} value={currentPath} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="logout">Logout</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 