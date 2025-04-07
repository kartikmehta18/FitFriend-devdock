
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkouts, WorkoutSession } from "@/utils/workoutStorage";
import { CalendarDays, Clock, Flame, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ActivityHistory = () => {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, inProgress
  
  useEffect(() => {
    // Get workouts from localStorage
    const storedWorkouts = getWorkouts();
    
    // Sort workouts by date (newest first)
    const sortedWorkouts = [...storedWorkouts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setWorkouts(sortedWorkouts);
    setFilteredWorkouts(sortedWorkouts);
  }, []);
  
  useEffect(() => {
    let result = [...workouts];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(workout => 
        workout.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter === "completed") {
      result = result.filter(workout => workout.completed);
    } else if (filter === "inProgress") {
      result = result.filter(workout => !workout.completed);
    }
    
    setFilteredWorkouts(result);
  }, [searchQuery, filter, workouts]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your complete workout and activity history</CardDescription>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <Filter className="h-4 w-4" />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Badge 
                  variant={filter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter("all")}
                >
                  All
                </Badge>
                <Badge 
                  variant={filter === "completed" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Badge>
                <Badge 
                  variant={filter === "inProgress" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setFilter("inProgress")}
                >
                  In Progress
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredWorkouts.length > 0 ? (
            <div className="space-y-4">
              {filteredWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-fitfriend-blue dark:hover:border-fitfriend-blue transition"
                >
                  <div className="mb-3 sm:mb-0">
                    <div className="flex items-center">
                      <h4 className="font-medium">{workout.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          workout.completed 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {workout.completed ? "Completed" : "In progress"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(workout.date)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 flex items-center justify-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Duration
                      </p>
                      <p className="font-medium">{workout.duration} min</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 flex items-center justify-center">
                        <Flame className="h-3 w-3 mr-1" />
                        Calories
                      </p>
                      <p className="font-medium">{workout.caloriesBurned}</p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No activities found</h3>
              <p className="text-gray-500 max-w-md">
                {searchQuery || filter !== "all" 
                  ? "Try adjusting your filters or search query"
                  : "Start tracking your fitness journey by completing workouts"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityHistory;
