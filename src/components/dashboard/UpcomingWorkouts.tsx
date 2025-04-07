
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Workout type definition
type Workout = {
  id: number;
  name: string;
  time: string;
  duration: string;
  intensityLevel: string;
  caloriesBurn: number;
};

interface UpcomingWorkoutsProps {
  workouts: Workout[];
}

const UpcomingWorkouts = ({ workouts }: UpcomingWorkoutsProps) => {
  return (
    <Card className="fitfriend-card lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming Workouts</CardTitle>
        <CardDescription>Your scheduled sessions for the next few days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-fitfriend-blue dark:hover:border-fitfriend-blue transition"
            >
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium">{workout.name}</h4>
                <p className="text-sm text-gray-500">{workout.time}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-medium">{workout.duration}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Intensity</p>
                  <p className="font-medium">{workout.intensityLevel}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="font-medium">{workout.caloriesBurn}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 px-6 py-4">
        <Link to="/workouts" className="text-fitfriend-blue hover:text-fitfriend-blue/80 text-sm font-medium flex items-center">
          View All Workouts
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UpcomingWorkouts;
