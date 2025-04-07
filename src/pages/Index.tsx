import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell, Users, Heart, BarChart, ArrowRight, CheckCircle, Bike, Weight, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data
const features = [
  {
    icon: <Dumbbell className="h-6 w-6 text-fitfriend-blue" />,
    title: "Personalized Workouts",
    description: "Access hundreds of workout plans tailored to your fitness level and goals."
  },
  {
    icon: <Users className="h-6 w-6 text-fitfriend-purple" />,
    title: "Connect with Others",
    description: "Find friends with similar fitness goals to stay motivated and accountable."
  },
  {
    icon: <Heart className="h-6 w-6 text-fitfriend-pink" />,
    title: "Health Metrics",
    description: "Track your progress with advanced health and fitness metrics."
  },
  {
    icon: <BarChart className="h-6 w-6 text-fitfriend-green" />,
    title: "Progress Tracking",
    description: "Visualize your improvement over time with detailed progress charts."
  }
];

const testimonials = [
  {
    name: "Sarah J.",
    avatar: "S",
    text: "FitFriend helped me find workout buddies in my area with similar goals. I've lost 15 pounds in 3 months!"
  },
  {
    name: "Michael T.",
    avatar: "M",
    text: "The personalized workout plans are incredible. I've never been more consistent with my fitness routine."
  },
  {
    name: "Emma R.",
    avatar: "E",
    text: "I love the health calculator - it gave me realistic goals and helps me track my progress every step of the way."
  }
];

const workoutTypes = [
  { name: "Strength", icon: <Dumbbell className="h-5 w-5" />, color: "bg-fitfriend-blue" },
  { name: "Cardio", icon: <Bike className="h-5 w-5" />, color: "bg-fitfriend-green" },
  { name: "Weight Loss", icon: <Weight className="h-5 w-5" />, color: "bg-fitfriend-orange" },
  { name: "HIIT", icon: <Activity className="h-5 w-5" />, color: "bg-fitfriend-purple" }
];

const benefits = [
  "Find workout partners near you",
  "Track your progress with visual charts",
  "Access 500+ workout plans",
  "Get personalized fitness advice",
  "Join fitness challenges and competitions",
  "Calculate health metrics and fitness goals"
];

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="block">Connect, Train, and</span>
                <span className="fitfriend-gradient-text">Achieve Together</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                Find fitness partners with similar goals, access personalized workout plans, and 
                track your health journey with smart metrics all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/dashboard">
                  <Button className="w-full sm:w-auto bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                    Generate AI Workout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/health-calculator">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Try Health Calculator
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle className="h-4 w-4 text-fitfriend-green" />
                <span>No credit card required</span>
                <span className="mx-2">•</span>
                <CheckCircle className="h-4 w-4 text-fitfriend-green" />
                <span>Free 30-day trial</span>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-75 blur"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Fitness community" 
                    className="w-full object-cover aspect-[4/3]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Reach Your Fitness Goals</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              FitFriend combines social networking, personalized training, and health tracking in one seamless platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="fitfriend-card">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workout Types Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                Find the Perfect Workout for Your Goals
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Browse through hundreds of workout plans designed for different fitness levels and goals. 
                Connect with others following similar programs.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {workoutTypes.map((type, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-fitfriend-blue dark:hover:border-fitfriend-blue transition"
                  >
                    <div className={`${type.color} h-8 w-8 rounded-full flex items-center justify-center text-white mr-3`}>
                      {type.icon}
                    </div>
                    <span className="font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/workouts">
                <Button className="bg-fitfriend-purple hover:bg-fitfriend-purple/90 text-white">
                  Explore Workouts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Strength training" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Cardio training" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="HIIT training" 
                  className="rounded-lg object-cover h-48 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Yoga training" 
                  className="rounded-lg object-cover h-48 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold mb-8">Join Thousands of Happy FitFriend Users</h2>
              
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-fitfriend-purple text-white flex items-center justify-center mr-3">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">"{testimonial.text}"</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">What You'll Get</h3>
                
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-fitfriend-green mr-3" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-4">Ready to transform your fitness journey?</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-full"
                    />
                    <Button className="bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white whitespace-nowrap">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fitfriend-blue/10 to-fitfriend-purple/10 dark:from-fitfriend-blue/20 dark:to-fitfriend-purple/20">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Reach Your Fitness Goals?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their fitness journey with FitFriend. Connect, train, and achieve together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup">
              <Button className="w-full sm:w-auto bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white">
                Get Started Free
              </Button>
            </Link>
            <Link to="/health-calculator">
              <Button variant="outline" className="w-full sm:w-auto">
                Try Health Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
