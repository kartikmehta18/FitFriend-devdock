
import { Link } from "react-router-dom";
import { Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Buddy type definition
type FitnessBuddy = {
  id: number;
  name: string;
  workouts: number;
  avatar: string;
  goals: string[];
  location: string;
};

interface FitnessBuddiesProps {
  buddies: FitnessBuddy[];
}

const FitnessBuddies = ({ buddies }: FitnessBuddiesProps) => {
  return (
    <Card className="fitfriend-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Your Fitness Buddies</CardTitle>
          <Link to="/community">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-xs">Find More</span>
            </Button>
          </Link>
        </div>
        <CardDescription>People with similar fitness goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {buddies.map((buddy) => (
            <div key={buddy.id} className="flex items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-fitfriend-purple dark:hover:border-fitfriend-purple transition">
              <div className="h-10 w-10 rounded-full bg-fitfriend-purple text-white flex items-center justify-center mr-3 flex-shrink-0">
                {buddy.avatar}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{buddy.name}</h4>
                  <p className="text-xs text-gray-500">{buddy.location}</p>
                </div>
                <div className="flex items-center mt-1">
                  <div className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 mr-2">
                    {buddy.goals[0]}
                  </div>
                  {buddy.goals.length > 1 && (
                    <div className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
                      {buddy.goals[1]}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 px-6 py-4">
        <Link to="/community" className="text-fitfriend-purple hover:text-fitfriend-purple/80 text-sm font-medium flex items-center">
          View Community
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FitnessBuddies;
