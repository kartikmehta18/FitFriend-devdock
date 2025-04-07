
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Activity type definition
type Activity = {
  id: string | number;
  type: string;
  name: string;
  time: string;
  duration?: string;
  calories?: number;
  description?: string;
};

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="fitfriend-card">
      <CardHeader>
        <CardTitle className="text-xl">Recent Activity</CardTitle>
        <CardDescription>Your latest fitness activities and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8 before:absolute before:left-3.5 before:top-0 before:h-full before:w-px before:bg-gray-200 dark:before:bg-gray-700">
          {activities.map((activity) => (
            <div key={activity.id} className="relative mb-8 last:mb-0">
              <div className="absolute left-[-8px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 bg-fitfriend-blue"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h4 className="font-medium">{activity.name}</h4>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.description && (
                    <p className="text-sm mt-1">{activity.description}</p>
                  )}
                </div>
                {activity.type === "workout" && (
                  <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium">{activity.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-medium">{activity.calories}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 px-6 py-4">
        <Link to="/activity" className="text-fitfriend-blue hover:text-fitfriend-blue/80 text-sm font-medium flex items-center">
          View Full History
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentActivity;
