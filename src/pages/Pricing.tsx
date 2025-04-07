
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      description: "Basic features for individuals just starting their fitness journey.",
      price: "$0",
      period: "forever",
      features: [
        { included: true, text: "Basic workout tracking" },
        { included: true, text: "Community forum access" },
        { included: true, text: "Basic health calculator" },
        { included: false, text: "AI workout generation" },
        { included: false, text: "Partner matching" },
        { included: false, text: "Custom workout plans" },
        { included: false, text: "Progress analytics" },
      ],
      buttonText: "Start for Free",
      highlight: false,
    },
    {
      name: "Pro",
      description: "Advanced features for fitness enthusiasts looking to level up.",
      price: "$9.99",
      period: "per month",
      features: [
        { included: true, text: "Everything in Free" },
        { included: true, text: "AI workout generation" },
        { included: true, text: "Partner matching" },
        { included: true, text: "Custom workout plans" },
        { included: true, text: "Progress analytics" },
        { included: false, text: "Priority support" },
        { included: false, text: "Nutrition planning" },
      ],
      buttonText: "Get Pro",
      highlight: true,
    },
    {
      name: "Elite",
      description: "Premium features for serious athletes and fitness professionals.",
      price: "$19.99",
      period: "per month",
      features: [
        { included: true, text: "Everything in Pro" },
        { included: true, text: "Priority support" },
        { included: true, text: "Nutrition planning" },
        { included: true, text: "Personalized coaching" },
        { included: true, text: "Goal setting workshops" },
        { included: true, text: "Advanced performance metrics" },
        { included: true, text: "Early access to new features" },
      ],
      buttonText: "Get Elite",
      highlight: false,
    },
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
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choose the plan that best fits your fitness journey. No hidden fees.
              </p>
            </div>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`border ${
                    plan.highlight 
                      ? 'border-fitfriend-blue shadow-lg dark:border-fitfriend-blue/70' 
                      : 'border-gray-200 dark:border-gray-700'
                  } relative`}
                >
                  {plan.highlight && (
                    <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-fitfriend-blue text-white">
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400"> / {plan.period}</span>
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 dark:text-gray-600 mt-0.5 mr-2" />
                          )}
                          <span className={feature.included ? '' : 'text-gray-400 dark:text-gray-500'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${
                        plan.highlight 
                          ? 'bg-fitfriend-blue hover:bg-fitfriend-blue/90' 
                          : ''
                      }`}
                      variant={plan.highlight ? 'default' : 'outline'}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Can I cancel my subscription at any time?",
                  a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
                },
                {
                  q: "Is there a difference in features between monthly and annual plans?",
                  a: "No, the features are identical. Annual plans simply offer a discount compared to paying monthly."
                },
                {
                  q: "How do I upgrade my plan?",
                  a: "You can upgrade your plan anytime from your account settings. The price difference will be prorated for your current billing period."
                },
                {
                  q: "Do you offer discounts for teams or gyms?",
                  a: "Yes, we offer special pricing for fitness centers and teams. Please contact our sales team for more information."
                }
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
