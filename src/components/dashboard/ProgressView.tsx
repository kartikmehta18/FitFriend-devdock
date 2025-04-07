
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Calendar } from "lucide-react";

interface UserStats {
  workoutsCompleted: number;
  averageCalories: number;
  minutesThisWeek: number;
  minutesLastWeek: number;
  streakDays: number;
  daysActive: number;
  caloriesBurned: number;
  distanceCovered: number;
  weightLifted: number;
}

interface ProgressViewProps {
  userStats: UserStats;
}

const ProgressView = ({ userStats }: ProgressViewProps) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  // Demo data for charts
  const weeklyData = [
    { day: "Mon", calories: 350, minutes: 45 },
    { day: "Tue", calories: 280, minutes: 35 },
    { day: "Wed", calories: 0, minutes: 0 },
    { day: "Thu", calories: 410, minutes: 50 },
    { day: "Fri", calories: 320, minutes: 40 },
    { day: "Sat", calories: 180, minutes: 25 },
    { day: "Sun", calories: 0, minutes: 0 },
  ];
  
  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i+1}`,
    calories: Math.floor(Math.random() * 300) + 100,
    minutes: Math.floor(Math.random() * 40) + 10,
  }));
  
  const yearlyData = Array.from({ length: 12 }, (_, i) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
      month: monthNames[i],
      calories: Math.floor(Math.random() * 5000) + 2000,
      minutes: Math.floor(Math.random() * 600) + 200,
    };
  });
  
  // Get the appropriate data based on the selected time range
  const getChartData = () => {
    switch (timeRange) {
      case "week": return weeklyData;
      case "month": return monthlyData;
      case "year": return yearlyData;
      default: return weeklyData;
    }
  };
  
  // Get x-axis data key
  const getXAxisDataKey = () => {
    switch (timeRange) {
      case "week": return "day";
      case "month": return "day";
      case "year": return "month";
      default: return "day";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your fitness journey over time</CardDescription>
            </div>
            
            <Tabs 
              value={timeRange} 
              onValueChange={(value) => setTimeRange(value as "week" | "month" | "year")} 
              className="mt-4 md:mt-0"
            >
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Calories Burned Chart */}
            <div>
              <h3 className="text-lg font-medium mb-4">Calories Burned</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisDataKey()} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#FF7750" name="Calories Burned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Active Minutes Chart */}
            <div>
              <h3 className="text-lg font-medium mb-4">Active Minutes</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={getXAxisDataKey()} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="minutes" stroke="#3B82F6" name="Active Minutes" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Activity Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Calendar</CardTitle>
          <CardDescription>Your workout consistency over time</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center text-center text-gray-500">
            <Calendar className="h-12 w-12 mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Activity Calendar Coming Soon</h3>
            <p className="max-w-md">
              Track your workout consistency with a visual calendar showing your active days and streaks.
              Stay tuned for this feature update!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressView;
