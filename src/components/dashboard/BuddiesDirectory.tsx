
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Users, MapPin, DumbbellIcon, Medal } from "lucide-react";

type FitnessBuddy = {
  id: number;
  name: string;
  workouts: number;
  avatar: string;
  goals: string[];
  location: string;
};

// Extended buddy data for the directory
const mockBuddiesData = [
  {
    id: 1,
    name: "Emma R.",
    workouts: 38,
    avatar: "E",
    goals: ["Weight Loss", "Strength"],
    location: "New York",
    stats: {
      workoutsCompleted: 38,
      activeDays: 24,
      streak: 3
    },
    joinedDate: "2 months ago"
  },
  {
    id: 2,
    name: "Jason M.",
    workouts: 52,
    avatar: "J",
    goals: ["Muscle Gain", "HIIT"],
    location: "Boston",
    stats: {
      workoutsCompleted: 52,
      activeDays: 38,
      streak: 5
    },
    joinedDate: "3 months ago"
  },
  {
    id: 3,
    name: "Sarah L.",
    workouts: 45,
    avatar: "S",
    goals: ["Marathon", "Endurance"],
    location: "Chicago",
    stats: {
      workoutsCompleted: 45,
      activeDays: 30,
      streak: 2
    },
    joinedDate: "5 weeks ago"
  },
  {
    id: 4,
    name: "Michael K.",
    workouts: 65,
    avatar: "M",
    goals: ["Crossfit", "Strength"],
    location: "Los Angeles",
    stats: {
      workoutsCompleted: 65,
      activeDays: 42,
      streak: 7
    },
    joinedDate: "4 months ago"
  },
  {
    id: 5,
    name: "Jessica T.",
    workouts: 28,
    avatar: "J",
    goals: ["Yoga", "Flexibility"],
    location: "Portland",
    stats: {
      workoutsCompleted: 28,
      activeDays: 20,
      streak: 4
    },
    joinedDate: "1 month ago"
  },
  {
    id: 6,
    name: "David W.",
    workouts: 33,
    avatar: "D",
    goals: ["Running", "Cardio"],
    location: "Seattle",
    stats: {
      workoutsCompleted: 33,
      activeDays: 25,
      streak: 0
    },
    joinedDate: "6 weeks ago"
  }
];

interface BuddiesDirectoryProps {
  buddies: FitnessBuddy[];
}

const BuddiesDirectory = ({ buddies }: BuddiesDirectoryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("your-buddies");
  const [filteredBuddies, setFilteredBuddies] = useState(mockBuddiesData);
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredBuddies(mockBuddiesData);
      return;
    }
    
    const filtered = mockBuddiesData.filter(buddy => 
      buddy.name.toLowerCase().includes(query.toLowerCase()) ||
      buddy.location.toLowerCase().includes(query.toLowerCase()) ||
      buddy.goals.some(goal => goal.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredBuddies(filtered);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <CardTitle>Fitness Buddies</CardTitle>
              <CardDescription>Connect with others who share your fitness goals</CardDescription>
            </div>
            
            <div className="mt-4 md:mt-0 relative w-full md:w-60">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search buddies..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="your-buddies" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="your-buddies">Your Buddies</TabsTrigger>
              <TabsTrigger value="suggested">Suggested Buddies</TabsTrigger>
              <TabsTrigger value="requests">Buddy Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="your-buddies">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBuddies.slice(0, 3).map((buddy) => (
                  <Card key={buddy.id} className="border border-gray-100 dark:border-gray-800 hover:border-fitfriend-purple dark:hover:border-fitfriend-purple transition">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-full bg-fitfriend-purple text-white flex items-center justify-center flex-shrink-0 text-lg font-medium">
                          {buddy.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{buddy.name}</h4>
                            <div className="flex items-center text-gray-500 text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {buddy.location}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-1">
                            {buddy.goals.map((goal, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="text-xs bg-gray-50 dark:bg-gray-800"
                              >
                                {goal}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                              <div className="flex items-center justify-center text-fitfriend-purple mb-1">
                                <DumbbellIcon className="h-3 w-3 mr-1" />
                              </div>
                              <p className="text-xs text-gray-500">Workouts</p>
                              <p className="font-medium text-sm">{buddy.stats.workoutsCompleted}</p>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                              <div className="flex items-center justify-center text-fitfriend-green mb-1">
                                <Users className="h-3 w-3 mr-1" />
                              </div>
                              <p className="text-xs text-gray-500">Active Days</p>
                              <p className="font-medium text-sm">{buddy.stats.activeDays}</p>
                            </div>
                            
                            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                              <div className="flex items-center justify-center text-fitfriend-orange mb-1">
                                <Medal className="h-3 w-3 mr-1" />
                              </div>
                              <p className="text-xs text-gray-500">Streak</p>
                              <p className="font-medium text-sm">{buddy.stats.streak} days</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <p className="text-xs text-gray-500">Joined {buddy.joinedDate}</p>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="suggested">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBuddies.slice(3).map((buddy) => (
                  <Card key={buddy.id} className="border border-gray-100 dark:border-gray-800 hover:border-fitfriend-blue dark:hover:border-fitfriend-blue transition">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-full bg-fitfriend-blue text-white flex items-center justify-center flex-shrink-0 text-lg font-medium">
                          {buddy.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{buddy.name}</h4>
                            <div className="flex items-center text-gray-500 text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {buddy.location}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-1">
                            {buddy.goals.map((goal, i) => (
                              <Badge 
                                key={i} 
                                variant="outline" 
                                className="text-xs bg-gray-50 dark:bg-gray-800"
                              >
                                {goal}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <DumbbellIcon className="h-3 w-3 mr-1 text-fitfriend-blue" />
                                <span className="text-xs">{buddy.stats.workoutsCompleted} workouts</span>
                              </div>
                              <div className="flex items-center">
                                <Medal className="h-3 w-3 mr-1 text-fitfriend-orange" />
                                <span className="text-xs">{buddy.stats.streak} day streak</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <p className="text-xs text-gray-500">Joined {buddy.joinedDate}</p>
                            <Button variant="outline" size="sm" className="h-8">
                              <UserPlus className="h-3 w-3 mr-1" />
                              Add Buddy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requests">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No buddy requests</h3>
                <p className="text-gray-500 max-w-md">
                  You don't have any pending buddy requests at the moment.
                  Explore suggested buddies to connect with more fitness enthusiasts.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuddiesDirectory;
