
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Phone, Mail, MessageSquare, LifeBuoy, ChevronRight, Dumbbell, Users, Settings, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Help = () => {
  const helpCategories = [
    {
      icon: <LifeBuoy className="h-8 w-8 text-fitfriend-blue" />,
      title: "Getting Started",
      description: "Guides and tutorials for new users",
      articles: [
        "Creating your account",
        "Setting up your profile",
        "Finding workout partners",
        "Navigating the dashboard"
      ]
    },
    {
      icon: <Dumbbell className="h-8 w-8 text-fitfriend-blue" />,
      title: "Workouts",
      description: "Everything about workouts and exercises",
      articles: [
        "Creating custom workouts",
        "Using AI workout generator",
        "Tracking workout progress",
        "Logging your activities"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-fitfriend-blue" />,
      title: "Community",
      description: "Connect with fitness partners",
      articles: [
        "Finding workout buddies",
        "Messaging other users",
        "Community guidelines",
        "Reporting issues"
      ]
    },
    {
      icon: <Settings className="h-8 w-8 text-fitfriend-blue" />,
      title: "Account & Settings",
      description: "Manage your account preferences",
      articles: [
        "Updating personal information",
        "Changing password",
        "Subscription management",
        "Privacy settings"
      ]
    }
  ];

  const quickLinks = [
    { text: "How to create an AI workout plan", count: 214 },
    { text: "Finding workout partners near me", count: 186 },
    { text: "Tracking my progress over time", count: 159 },
    { text: "Connecting with fitness buddies", count: 142 },
    { text: "Customizing my workout schedule", count: 127 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Search */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How can we help you?
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Search our knowledge base or browse categories below
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search for help articles..." 
                  className="pl-10 pr-4 py-6 rounded-lg border border-gray-300 dark:border-gray-700 w-full"
                />
                <Button className="absolute right-1.5 top-1.5 bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto">
              {quickLinks.map((link, i) => (
                <Button key={i} variant="outline" className="rounded-full text-sm">
                  {link.text} <span className="ml-1 text-gray-400 text-xs">({link.count})</span>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Help Categories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Browse Help by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <Card key={index} className="border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4">
                      {category.icon}
                    </div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, i) => (
                        <li key={i}>
                          <a 
                            href="#" 
                            className="flex items-center text-fitfriend-blue hover:underline"
                          >
                            <ChevronRight className="h-4 w-4 mr-1" />
                            {article}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Tabs */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Still Need Help?</h2>
            
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
                <TabsTrigger value="faq">FAQs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact" className="p-6 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="text-center">
                      <Phone className="h-8 w-8 mx-auto text-fitfriend-blue mb-2" />
                      <CardTitle>Phone Support</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="mb-4">Available 9am-5pm ET, Monday to Friday</p>
                      <a href="tel:+18005551234" className="text-fitfriend-blue font-medium">
                        +1 (800) 555-1234
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="text-center">
                      <Mail className="h-8 w-8 mx-auto text-fitfriend-blue mb-2" />
                      <CardTitle>Email Support</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="mb-4">We'll respond within 24 hours</p>
                      <a href="mailto:support@fitfriend.com" className="text-fitfriend-blue font-medium">
                        support@fitfriend.com
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="text-center">
                      <MessageSquare className="h-8 w-8 mx-auto text-fitfriend-blue mb-2" />
                      <CardTitle>Community</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="mb-4">Join our community forum</p>
                      <a href="/community" className="text-fitfriend-blue font-medium">
                        Visit Forum
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="p-6 border rounded-lg">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-fitfriend-blue mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Live Chat Support</h3>
                  <p className="mb-6">Our support team is available to chat in real-time.</p>
                  <Button size="lg" className="bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                    Start Chat Now
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="p-6 border rounded-lg">
                <div className="space-y-6">
                  {[
                    {
                      q: "How do I reset my password?",
                      a: "You can reset your password by clicking on the 'Forgot Password' link on the login page, or through your account settings."
                    },
                    {
                      q: "Can I use FitFriend on my mobile device?",
                      a: "Yes, FitFriend is fully responsive and works on all devices including smartphones and tablets."
                    },
                    {
                      q: "How does the AI workout generator work?",
                      a: "Our AI generator uses your fitness level, goals, available equipment, and time constraints to create personalized workout plans."
                    },
                    {
                      q: "How can I cancel my subscription?",
                      a: "You can cancel your subscription anytime through your account settings. Your access will continue until the end of your billing period."
                    }
                  ].map((item, i) => (
                    <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <Button variant="link" className="text-fitfriend-blue">
                      View all FAQs
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
