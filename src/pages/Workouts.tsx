
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, DumbbellIcon, Heart, Clock, Zap, Star, Users, Bookmark, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for workouts
const workoutData = [
  {
    id: 1,
    name: "HIIT Fat Burner",
    category: "HIIT",
    level: "Intermediate",
    duration: 30,
    calories: 400,
    equipment: ["None"],
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "High-intensity interval training designed to maximize calorie burn in minimum time.",
    participants: 278,
  },
  {
    id: 2,
    name: "Upper Body Power",
    category: "Strength",
    level: "Advanced",
    duration: 45,
    calories: 320,
    equipment: ["Dumbbells", "Bench"],
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Build strength and definition in your upper body with this comprehensive routine.",
    participants: 156,
  },
  {
    id: 3,
    name: "Yoga Flow",
    category: "Yoga",
    level: "Beginner",
    duration: 60,
    calories: 200,
    equipment: ["Yoga mat"],
    rating: 4.9,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Improve flexibility, balance, and mindfulness with this gentle yoga sequence.",
    participants: 342,
  },
  {
    id: 4,
    name: "Core Crusher",
    category: "Strength",
    level: "Intermediate",
    duration: 20,
    calories: 250,
    equipment: ["Mat"],
    rating: 4.7,
    reviews: 118,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Target your abs, obliques, and lower back with this intense core workout.",
    participants: 198,
  },
  {
    id: 5,
    name: "Full Body Blast",
    category: "Circuit",
    level: "Intermediate",
    duration: 50,
    calories: 450,
    equipment: ["Dumbbells", "Kettlebell", "Mat"],
    rating: 4.5,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "A comprehensive workout that targets all major muscle groups in one session.",
    participants: 231,
  },
  {
    id: 6,
    name: "Cardio Kickboxing",
    category: "Cardio",
    level: "Beginner",
    duration: 40,
    calories: 380,
    equipment: ["None"],
    rating: 4.7,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    description: "Combine martial arts moves with high-energy cardio for a full-body workout.",
    participants: 187,
  }
];

// Filter categories
const categories = ["All", "HIIT", "Strength", "Cardio", "Yoga", "Pilates", "Circuit"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const durations = ["All", "Under 30 min", "30-45 min", "Over 45 min"];

const Workouts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [calorieRange, setCalorieRange] = useState([150, 500]);
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredWorkouts = workoutData.filter(workout => {
    // Search query filter
    if (searchQuery && !workout.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== "All" && workout.category !== selectedCategory) {
      return false;
    }
    
    // Level filter
    if (selectedLevel !== "All" && workout.level !== selectedLevel) {
      return false;
    }
    
    // Duration filter
    if (selectedDuration !== "All") {
      if (selectedDuration === "Under 30 min" && workout.duration >= 30) {
        return false;
      } else if (selectedDuration === "30-45 min" && (workout.duration < 30 || workout.duration > 45)) {
        return false;
      } else if (selectedDuration === "Over 45 min" && workout.duration <= 45) {
        return false;
      }
    }
    
    // Calorie range filter
    if (workout.calories < calorieRange[0] || workout.calories > calorieRange[1]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Find Your Perfect Workout</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse hundreds of workout plans designed for different fitness levels and goals.
              Find the perfect routine to help you reach your objectives.
            </p>
          </div>
          
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search workouts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          {showFilters && (
            <Card className="mb-8 animate-fade-in">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedCategory === category 
                              ? "bg-fitfriend-blue hover:bg-fitfriend-blue/90" 
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Difficulty Level</h3>
                    <div className="flex flex-wrap gap-2">
                      {levels.map(level => (
                        <Badge
                          key={level}
                          variant={selectedLevel === level ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedLevel === level 
                              ? "bg-fitfriend-purple hover:bg-fitfriend-purple/90" 
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Duration</h3>
                    <div className="flex flex-wrap gap-2">
                      {durations.map(duration => (
                        <Badge
                          key={duration}
                          variant={selectedDuration === duration ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedDuration === duration 
                              ? "bg-fitfriend-green hover:bg-fitfriend-green/90" 
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedDuration(duration)}
                        >
                          {duration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Calories Burned</h3>
                  <div className="px-2">
                    <Slider
                      value={calorieRange}
                      min={100}
                      max={600}
                      step={10}
                      onValueChange={setCalorieRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{calorieRange[0]} calories</span>
                      <span>{calorieRange[1]} calories</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="all">All Workouts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {filteredWorkouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorkouts.map(workout => (
                    <Card key={workout.id} className="fitfriend-card overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={workout.image}
                          alt={workout.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white dark:bg-fitfriend-dark/80 text-gray-800 dark:text-white">
                            {workout.category}
                          </Badge>
                        </div>
                        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 dark:bg-fitfriend-dark/80 flex items-center justify-center hover:bg-white dark:hover:bg-fitfriend-dark">
                          <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                      
                      <CardContent className="p-5 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{workout.name}</h3>
                          <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-gray-700 dark:text-gray-300 ml-1 text-sm">{workout.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {workout.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Clock className="h-4 w-4 text-fitfriend-blue mb-1" />
                            <span className="text-xs text-gray-500">Duration</span>
                            <span className="text-sm font-medium">{workout.duration} min</span>
                          </div>
                          
                          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Zap className="h-4 w-4 text-fitfriend-orange mb-1" />
                            <span className="text-xs text-gray-500">Calories</span>
                            <span className="text-sm font-medium">{workout.calories}</span>
                          </div>
                          
                          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Users className="h-4 w-4 text-fitfriend-purple mb-1" />
                            <span className="text-xs text-gray-500">Users</span>
                            <span className="text-sm font-medium">{workout.participants}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {workout.level}
                          </Badge>
                          {workout.equipment.slice(0, 2).map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                          {workout.equipment.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{workout.equipment.length - 2}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                        <Button className="w-full bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                          Start Workout
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DumbbellIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No workouts found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Try adjusting your filters or search query to find workouts that match your criteria.
                  </p>
                </div>
              )}
              
              {filteredWorkouts.length > 0 && (
                <div className="flex justify-center pt-4">
                  <Button variant="outline">Load More Workouts</Button>
                </div>
              )}
            </TabsContent>
            
            {/* Placeholder content for other tabs */}
            <TabsContent value="trending" className="space-y-6">
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-fitfriend-orange mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Trending Workouts</h3>
                <p className="text-gray-500">
                  Discover workouts that are popular right now with the FitFriend community.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-fitfriend-pink mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Most Popular Workouts</h3>
                <p className="text-gray-500">
                  Explore our most loved and highly-rated workout programs.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6">
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-fitfriend-purple mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Your Saved Workouts</h3>
                <p className="text-gray-500">
                  Login to see workouts you've saved for later.
                </p>
                <div className="mt-6">
                  <Button className="bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">Log In</Button>
                </div>
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

export default Workouts;
