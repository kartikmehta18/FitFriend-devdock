
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Users, MessageCircle, UserPlus, Calendar, DumbbellIcon, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for fitness buddies
const buddiesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    avatarFallback: "SJ",
    location: "New York, NY",
    distance: 1.2,
    goals: ["Weight Loss", "Strength"],
    level: "Intermediate",
    bio: "Fitness enthusiast looking for morning workout partners. Love HIIT and strength training.",
    age: 28,
    workoutsPerWeek: 4,
    favoriteWorkouts: ["HIIT", "Powerlifting"],
    achievements: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg",
    avatarFallback: "MC",
    location: "Boston, MA",
    distance: 2.5,
    goals: ["Muscle Gain", "Endurance"],
    level: "Advanced",
    bio: "Personal trainer and competitive athlete. Happy to help beginners or challenge advanced fitness fans.",
    age: 32,
    workoutsPerWeek: 6,
    favoriteWorkouts: ["Bodybuilding", "CrossFit"],
    achievements: 23,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    avatarFallback: "ER",
    location: "Chicago, IL",
    distance: 0.8,
    goals: ["Marathon", "General Fitness"],
    level: "Intermediate",
    bio: "Training for my third marathon! Looking for running partners on weekends for long runs.",
    age: 35,
    workoutsPerWeek: 5,
    favoriteWorkouts: ["Running", "Yoga"],
    achievements: 18,
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg",
    avatarFallback: "DK",
    location: "Seattle, WA",
    distance: 3.1,
    goals: ["Flexibility", "Strength"],
    level: "Beginner",
    bio: "New to fitness and looking for workout buddies to stay motivated. Interested in bodyweight training.",
    age: 26,
    workoutsPerWeek: 3,
    favoriteWorkouts: ["Calisthenics", "Pilates"],
    achievements: 5,
  },
  {
    id: 5,
    name: "Jessica Martinez",
    avatar: "/placeholder.svg",
    avatarFallback: "JM",
    location: "Miami, FL",
    distance: 1.5,
    goals: ["Weight Loss", "Toning"],
    level: "Beginner",
    bio: "Lost 20lbs so far and looking to continue my fitness journey with supportive friends.",
    age: 31,
    workoutsPerWeek: 3,
    favoriteWorkouts: ["Zumba", "Swimming"],
    achievements: 8,
  },
  {
    id: 6,
    name: "Thomas Wilson",
    avatar: "/placeholder.svg",
    avatarFallback: "TW",
    location: "Austin, TX",
    distance: 4.2,
    goals: ["Bodybuilding", "Strength"],
    level: "Advanced",
    bio: "Competing in natural bodybuilding. Looking for serious training partners for intense sessions.",
    age: 29,
    workoutsPerWeek: 5,
    favoriteWorkouts: ["Bodybuilding", "Powerlifting"],
    achievements: 20,
  },
  {
    id: 7,
    name: "Olivia Lee",
    avatar: "/placeholder.svg",
    avatarFallback: "OL",
    location: "Denver, CO",
    distance: 2.0,
    goals: ["Hiking", "Core Strength"],
    level: "Intermediate",
    bio: "Outdoor enthusiast who loves hiking and incorporating fitness into my active lifestyle.",
    age: 33,
    workoutsPerWeek: 4,
    favoriteWorkouts: ["Hiking", "Functional Training"],
    achievements: 15,
  },
  {
    id: 8,
    name: "James Peterson",
    avatar: "/placeholder.svg",
    avatarFallback: "JP",
    location: "Portland, OR",
    distance: 3.7,
    goals: ["Flexibility", "Mindfulness"],
    level: "Intermediate",
    bio: "Yoga instructor looking to connect with other fitness professionals for cross-training.",
    age: 38,
    workoutsPerWeek: 6,
    favoriteWorkouts: ["Yoga", "Meditation"],
    achievements: 17,
  }
];

// Mock data for groups
const groupsData = [
  {
    id: 1,
    name: "Morning HIIT Warriors",
    members: 42,
    category: "HIIT",
    location: "Local",
    description: "Early morning high-intensity interval training group. We meet at 6 AM three times a week.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Weekend Runners",
    members: 68,
    category: "Running",
    location: "Local",
    description: "Group for casual and serious runners alike. We organize weekend runs of various distances.",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Powerlifting Club",
    members: 32,
    category: "Strength",
    location: "Online",
    description: "Serious lifters focused on improving technique and maximal strength in the big three lifts.",
    image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "Yoga for Everyone",
    members: 94,
    category: "Yoga",
    location: "Hybrid",
    description: "A supportive community for all levels of yoga practitioners, with both in-person and online sessions.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 5,
    name: "Weight Loss Support",
    members: 126,
    category: "Weight Loss",
    location: "Online",
    description: "Supportive group for those on a weight loss journey. We share tips, motivation, and celebrate victories.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 6,
    name: "Home Workout Heroes",
    members: 85,
    category: "Home Fitness",
    location: "Online",
    description: "For those who prefer to work out at home. We share no-equipment workouts and motivation.",
    image: "https://images.unsplash.com/photo-1518310952931-b1de897abd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  }
];

// Mock data for events
const eventsData = [
  {
    id: 1,
    name: "Community 5K Run",
    date: "Jun 15, 2023",
    time: "8:00 AM",
    location: "Central Park",
    participants: 84,
    type: "Running",
    image: "https://images.unsplash.com/photo-1530137229292-041bd2750615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Yoga in the Park",
    date: "Jun 18, 2023",
    time: "9:30 AM",
    location: "Riverside Park",
    participants: 42,
    type: "Yoga",
    image: "https://images.unsplash.com/photo-1508164274-1a304aedf3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Fitness Bootcamp Challenge",
    date: "Jun 24, 2023",
    time: "10:00 AM",
    location: "Downtown Fitness Center",
    participants: 35,
    type: "Bootcamp",
    image: "https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "Weightlifting Workshop",
    date: "Jul 1, 2023",
    time: "2:00 PM",
    location: "Strength Gym",
    participants: 28,
    type: "Strength",
    image: "https://images.unsplash.com/photo-1585152968992-d2b9444408cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

// Filter options
const fitnessGoals = ["All Goals", "Weight Loss", "Muscle Gain", "Strength", "Endurance", "Marathon", "Flexibility", "General Fitness"];
const fitnessLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const ageRanges = ["All Ages", "18-25", "26-35", "36-45", "46+"];

const Community = () => {
  const [activeTab, setActiveTab] = useState("buddies");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("All Goals");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedAgeRange, setSelectedAgeRange] = useState("All Ages");
  
  // Filter buddies based on selections
  const filteredBuddies = buddiesData.filter(buddy => {
    // Search query filter
    if (searchQuery && !buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !buddy.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Goal filter
    if (selectedGoal !== "All Goals" && !buddy.goals.includes(selectedGoal)) {
      return false;
    }
    
    // Level filter
    if (selectedLevel !== "All Levels" && buddy.level !== selectedLevel) {
      return false;
    }
    
    // Age filter
    if (selectedAgeRange !== "All Ages") {
      const age = buddy.age;
      if (selectedAgeRange === "18-25" && (age < 18 || age > 25)) return false;
      if (selectedAgeRange === "26-35" && (age < 26 || age > 35)) return false;
      if (selectedAgeRange === "36-45" && (age < 36 || age > 45)) return false;
      if (selectedAgeRange === "46+" && age < 46) return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">FitFriend Community</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect with people who share your fitness goals, join local groups, and participate in fitness events to stay motivated.
            </p>
          </div>
          
          <Tabs defaultValue="buddies" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3">
              <TabsTrigger value="buddies" className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                <span>Find Fitness Buddies</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                <span>Groups</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Fitness Buddies Tab */}
            <TabsContent value="buddies">
              <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                  >
                    {fitnessGoals.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                  >
                    {fitnessLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedAgeRange}
                    onChange={(e) => setSelectedAgeRange(e.target.value)}
                    className="rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 text-sm"
                  >
                    {ageRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {filteredBuddies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBuddies.map(buddy => (
                    <Card key={buddy.id} className="fitfriend-card overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-14 w-14 border-2 border-white">
                              <AvatarImage src={buddy.avatar} />
                              <AvatarFallback className="bg-fitfriend-purple text-white">
                                {buddy.avatarFallback}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{buddy.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {buddy.level}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{buddy.location}</span>
                                <span className="mx-2">•</span>
                                <span>{buddy.distance} miles away</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                              {buddy.bio}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {buddy.goals.map((goal, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg py-2">
                                <div className="text-xs text-gray-500">Age</div>
                                <div className="font-medium">{buddy.age}</div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg py-2">
                                <div className="text-xs text-gray-500">Workouts/week</div>
                                <div className="font-medium">{buddy.workoutsPerWeek}</div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg py-2">
                                <div className="text-xs text-gray-500">Achievements</div>
                                <div className="font-medium">{buddy.achievements}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-800">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="h-8 px-3">
                              <MessageCircle className="h-3.5 w-3.5 mr-1" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 px-3">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              View Profile
                            </Button>
                          </div>
                          
                          <Button size="sm" className="h-8 px-3 bg-fitfriend-purple hover:bg-fitfriend-purple/90 text-white">
                            <UserPlus className="h-3.5 w-3.5 mr-1" />
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No fitness buddies found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try adjusting your filters to find fitness partners that match your criteria.
                  </p>
                </div>
              )}
              
              {filteredBuddies.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">Load More</Button>
                </div>
              )}
            </TabsContent>
            
            {/* Groups Tab */}
            <TabsContent value="groups">
              <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search groups..."
                    className="pl-10"
                  />
                </div>
                
                <Button className="w-full sm:w-auto bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                  Create New Group
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupsData.map(group => (
                  <Card key={group.id} className="fitfriend-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-40 relative">
                        <img
                          src={group.image}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-semibold text-lg">{group.name}</h3>
                          <div className="flex items-center text-white/80 text-sm">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{group.members} members</span>
                            <span className="mx-2">•</span>
                            <span>{group.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            {group.location}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {group.location === "Local" ? (
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>Near you</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
                          {group.description}
                        </p>
                        
                        <Button className="w-full bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                          Join Group
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Groups</Button>
              </div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events">
              <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10"
                  />
                </div>
                
                <Button className="w-full sm:w-auto bg-fitfriend-green hover:bg-fitfriend-green/90 text-white">
                  Create Event
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventsData.map(event => (
                  <Card key={event.id} className="fitfriend-card overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-40 md:h-auto">
                          <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="md:w-2/3 p-5">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-lg">{event.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center text-gray-500 text-sm mb-4">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{event.date}</span>
                            <span className="mx-2">•</span>
                            <span>{event.time}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-5">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{event.participants} participants</span>
                          </div>
                          
                          <div className="flex space-x-3">
                            <Button className="flex-1 bg-fitfriend-green hover:bg-fitfriend-green/90 text-white">
                              Join Event
                            </Button>
                            <Button variant="outline" className="px-3">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Events</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Community;
