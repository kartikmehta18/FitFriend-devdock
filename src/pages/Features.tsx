
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Users, Dumbbell, BarChart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-fitfriend-blue" />,
      title: "Community Connection",
      description: "Find fitness partners with similar goals and schedules in your area."
    },
    {
      icon: <Dumbbell className="h-10 w-10 text-fitfriend-blue" />,
      title: "Personalized Workouts",
      description: "Access AI-generated workout plans tailored to your fitness level and goals."
    },
    {
      icon: <BarChart className="h-10 w-10 text-fitfriend-blue" />,
      title: "Progress Tracking",
      description: "Monitor your progress with comprehensive metrics and visual reports."
    },
    {
      icon: <Brain className="h-10 w-10 text-fitfriend-blue" />,
      title: "AI Health Calculator",
      description: "Calculate BMI, calorie needs, and other health metrics with our advanced algorithms."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Features That Power Your Fitness Journey
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Discover all the tools and capabilities designed to transform your fitness experience.
              </p>
              <Button size="lg" className="bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Features */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Detailed Feature Sections */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Find Your Perfect Fitness Partner</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect with like-minded individuals who share your fitness goals and schedule. 
                  Our matching algorithm considers your location, fitness level, and preferences 
                  to suggest the most compatible workout partners.
                </p>
                <ul className="space-y-3">
                  {["Location-based matching", "Interest and goal alignment", "Schedule compatibility", "In-app messaging"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" 
                  alt="People working out together" 
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80" 
                  alt="AI generated workout plan" 
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">AI-Powered Workout Generation</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our advanced AI algorithm creates personalized workout plans 
                  based on your fitness level, goals, available equipment, and time constraints. 
                  Get a workout plan as unique as you are.
                </p>
                <ul className="space-y-3">
                  {["Personalized intensity", "Equipment adaptation", "Goal-oriented programming", "Progressive overload"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
