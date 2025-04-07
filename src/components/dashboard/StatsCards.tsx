
import { DumbbellIcon, Timer, Flame, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Stats type definition
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

interface StatsCardsProps {
  userStats: UserStats;
}

const StatsCards = ({ userStats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="fitfriend-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Workouts Completed</p>
              <h3 className="text-3xl font-bold mt-1">{userStats.workoutsCompleted}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-fitfriend-blue">
              <DumbbellIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={70} className="h-1.5 bg-blue-100" />
            <p className="text-xs text-gray-500 mt-2">70% of monthly goal</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="fitfriend-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Minutes</p>
              <h3 className="text-3xl font-bold mt-1">{userStats.minutesThisWeek}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-fitfriend-green">
              <Timer className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>This Week</span>
              <span className="text-fitfriend-green">+{Math.round((userStats.minutesThisWeek - userStats.minutesLastWeek) / userStats.minutesLastWeek * 100)}%</span>
            </div>
            <Progress value={74} className="h-1.5 bg-green-100" />
            <p className="text-xs text-gray-500 mt-2">74% of weekly goal</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="fitfriend-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Calories Burned</p>
              <h3 className="text-3xl font-bold mt-1">{userStats.caloriesBurned}</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-fitfriend-orange">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={85} className="h-1.5 bg-orange-100" />
            <p className="text-xs text-gray-500 mt-2">85% of monthly goal</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="fitfriend-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">Current Streak</p>
              <h3 className="text-3xl font-bold mt-1">{userStats.streakDays} days</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-fitfriend-purple">
              <CalendarDays className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 mx-0.5 rounded-sm ${
                  i < userStats.streakDays ? "bg-fitfriend-purple" : "bg-gray-200 dark:bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Keep it up!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
