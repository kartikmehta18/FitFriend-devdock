
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "./StatsCards";
import UpcomingWorkouts from "./UpcomingWorkouts";
import FitnessBuddies from "./FitnessBuddies";
import RecentActivity from "./RecentActivity";
import ProgressView from "./ProgressView";
import ActivityHistory from "./ActivityHistory";
import BuddiesDirectory from "./BuddiesDirectory";
import WorkoutGenerator from "./WorkoutGenerator";
import { initializeWorkoutData, getUserStats, getWorkouts } from "@/utils/workoutStorage";
import { upcomingWorkouts, fitnessBuddies } from "./data";
import { supabase } from "@/integrations/supabase/client";

// Types for all data needed by the dashboard
type UserStats = {
  workoutsCompleted: number;
  averageCalories: number;
  minutesThisWeek: number;
  minutesLastWeek: number;
  streakDays: number;
  daysActive: number;
  caloriesBurned: number;
  distanceCovered: number;
  weightLifted: number;
};

type Workout = {
  id: number | string;
  name: string;
  time: string;
  duration: string;
  intensityLevel: string;
  caloriesBurn: number;
};

type FitnessBuddy = {
  id: number;
  name: string;
  workouts: number;
  avatar: string;
  goals: string[];
  location: string;
};

// Define Activity type to match the one in RecentActivity.tsx
type Activity = {
  id: string | number;
  type: string;
  name: string;
  time: string;
  duration?: string;
  calories?: number;
  description?: string;
};

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs = ({
  activeTab,
  setActiveTab
}: DashboardTabsProps) => {
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [dbWorkouts, setDbWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize workout data if empty
    initializeWorkoutData();
    
    // Get user stats from localStorage
    setUserStats(getUserStats());
    
    // Convert workout data to recent activities format
    const workouts = getWorkouts();
    const recentActivitiesData = workouts
      .filter(workout => workout.completed)
      .slice(0, 3)  // Get the 3 most recent activities
      .map(workout => ({
        id: workout.id,
        type: "workout",
        name: workout.name,
        time: new Date(workout.date).toLocaleString('en-US', { 
          weekday: 'short', 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true 
        }),
        duration: `${workout.duration} min`,
        calories: workout.caloriesBurned
      }));
      
    setRecentActivities(recentActivitiesData);

    // Fetch workouts from Supabase if authenticated
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Using type assertion to fix TypeScript error
          const { data, error } = await (supabase
            .from('workouts') as any)
            .select(`
              id, 
              name, 
              description, 
              duration, 
              calories_burned, 
              date, 
              completed,
              ai_generated
            `)
            .order('date', { ascending: false })
            .limit(5);
            
          if (error) {
            console.error("Error fetching workouts:", error);
          } else if (data) {
            setDbWorkouts(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkouts();
  }, []);

  // Transform Supabase workouts to the format expected by UpcomingWorkouts
  const transformedWorkouts = dbWorkouts.map(workout => ({
    id: workout.id,
    name: workout.name,
    time: new Date(workout.date).toLocaleString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    }),
    duration: `${workout.duration} min`,
    intensityLevel: workout.ai_generated ? "AI Generated" : "Custom",
    caloriesBurn: workout.calories_burned || 0
  }));

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="progress">Progress</TabsTrigger>
        <TabsTrigger value="buddies">Fitness Buddies</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="generator">AI Generator</TabsTrigger>
      </TabsList>
      
      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        {/* Stats Cards */}
        <StatsCards userStats={userStats} />
        
        {/* Upcoming Workouts & Fitness Buddies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingWorkouts workouts={transformedWorkouts.length > 0 ? transformedWorkouts : upcomingWorkouts} />
          <FitnessBuddies buddies={fitnessBuddies} />
        </div>
        
        {/* Recent Activity */}
        <RecentActivity activities={recentActivities} />
      </TabsContent>
      
      {/* Progress Tab */}
      <TabsContent value="progress">
        <ProgressView userStats={userStats} />
      </TabsContent>
      
      {/* Buddies Tab */}
      <TabsContent value="buddies">
        <BuddiesDirectory buddies={fitnessBuddies} />
      </TabsContent>
      
      {/* Activity Tab */}
      <TabsContent value="activity">
        <ActivityHistory />
      </TabsContent>
      
      {/* AI Generator Tab */}
      <TabsContent value="generator">
        <div className="grid grid-cols-1 gap-6">
          <WorkoutGenerator />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
