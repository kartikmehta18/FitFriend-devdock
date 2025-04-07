
import { Link } from "react-router-dom";
import { DumbbellIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserStats } from "@/utils/workoutStorage";

const DashboardHeader = () => {
  const [username, setUsername] = useState("Alex");
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    // Get time of day for appropriate greeting
    const hour = new Date().getHours();
    let timeGreeting = "Welcome back";
    
    if (hour < 12) {
      timeGreeting = "Good morning";
    } else if (hour < 18) {
      timeGreeting = "Good afternoon";
    } else {
      timeGreeting = "Good evening";
    }
    
    setGreeting(timeGreeting);
    
    // Get user stats to check if we should congratulate them
    const stats = getUserStats();
    if (stats.streakDays > 0) {
      // If they have an active streak, update the greeting
      setGreeting(`${timeGreeting} • ${stats.streakDays} day streak!`);
    }
    
    // In a real app, we would get the username from authentication
    // For now, we're hardcoding it
    const savedUsername = localStorage.getItem("fitfriend_username");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      localStorage.setItem("fitfriend_username", username);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold">{greeting}, {username}!</h1>
        <p className="text-gray-600 dark:text-gray-400">Your fitness journey at a glance</p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-4">
        <Link to="/workouts">
          <Button variant="outline" className="flex items-center gap-2">
            <DumbbellIcon className="h-4 w-4" />
            Start Workout
          </Button>
        </Link>
        <Link to="/health-calculator">
          <Button className="bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Health Check
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
