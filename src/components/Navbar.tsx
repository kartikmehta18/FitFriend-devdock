
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, User, Activity, Dumbbell, Users, Heart, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <Activity className="h-4 w-4 mr-1" /> },
    { name: "Workouts", path: "/workouts", icon: <Dumbbell className="h-4 w-4 mr-1" /> },
    { name: "Community", path: "/community", icon: <Users className="h-4 w-4 mr-1" /> },
    { name: "Health Calculator", path: "/health-calculator", icon: <Heart className="h-4 w-4 mr-1" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container px-4 mx-auto py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Dumbbell className="h-6 w-6 text-fitfriend-blue" />
          <span className="font-bold text-xl">
            <span className="text-fitfriend-blue">Fit</span>
            <span className="text-fitfriend-purple">Friend</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center text-sm font-medium ${
                isActive(link.path)
                  ? "text-fitfriend-blue"
                  : "text-gray-600 hover:text-fitfriend-purple transition"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-fitfriend-blue transition">
                  <AvatarFallback className="bg-fitfriend-purple text-white">
                    {user.email ? user.email.substring(0, 2).toUpperCase() : <User className="h-4 w-4" />}
                  </AvatarFallback>
                  <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm" className="bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-14 inset-x-0 bg-white dark:bg-gray-950 shadow-lg border-b border-border z-40 animate-fade-in">
          <div className="container px-4 py-4 mx-auto flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center p-2 rounded-md ${
                  isActive(link.path)
                    ? "bg-fitfriend-blue/10 text-fitfriend-blue"
                    : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            ))}
            <div className="pt-2 flex flex-col space-y-2 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                <Button onClick={handleLogout} variant="destructive" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
