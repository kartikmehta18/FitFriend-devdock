
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowRight, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner of the home page. Fill out the required information and follow the verification steps sent to your email."
        },
        {
          question: "Is FitFriend available on mobile devices?",
          answer: "Yes, FitFriend is fully responsive and works on all devices including smartphones and tablets. We're also working on dedicated iOS and Android apps coming soon."
        },
        {
          question: "How do I set up my fitness profile?",
          answer: "After signing in, navigate to your profile page through the user menu. There, you can add your fitness goals, current stats, and preferences to get personalized workout recommendations."
        },
        {
          question: "Can I use FitFriend for free?",
          answer: "Yes, FitFriend offers a free tier with basic features. Premium features are available with our Pro and Elite subscription plans."
        }
      ]
    },
    {
      category: "Workouts & Tracking",
      questions: [
        {
          question: "How does the AI workout generator work?",
          answer: "Our AI workout generator creates personalized workout plans based on your fitness level, goals, available equipment, and time constraints. The more information you provide, the more tailored your workouts will be."
        },
        {
          question: "Can I create my own custom workouts?",
          answer: "Absolutely! You can create custom workouts by going to the Workouts page and clicking 'Create Workout'. From there, you can add exercises, sets, reps, and rest periods to design your perfect routine."
        },
        {
          question: "How do I track my progress?",
          answer: "Your progress is automatically tracked when you complete workouts. You can view detailed metrics and graphs in the Progress tab of your dashboard, showing improvements over time."
        },
        {
          question: "Can I export my workout data?",
          answer: "Yes, you can export your workout data in CSV format from the Account Settings page. This allows you to analyze your data in other applications or keep a backup."
        }
      ]
    },
    {
      category: "Community Features",
      questions: [
        {
          question: "How do I find workout partners?",
          answer: "Navigate to the Community page and use the 'Find Partners' feature. You can filter by location, fitness interests, and availability to find compatible workout buddies."
        },
        {
          question: "Is there a messaging system?",
          answer: "Yes, once you connect with other users, you can message them directly through our in-app messaging system. This helps coordinate workouts and share fitness tips."
        },
        {
          question: "Can I create or join fitness groups?",
          answer: "Yes, you can create and join fitness groups based on interests, goals, or location. Groups have their own feed and can organize group workouts or challenges."
        },
        {
          question: "Are there community challenges?",
          answer: "Yes, we regularly host community-wide fitness challenges with leaderboards and prizes. You can also create private challenges among friends."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I update my payment information?",
          answer: "You can update your payment information in the Billing section of your Account Settings. We support major credit cards and PayPal."
        },
        {
          question: "What is your refund policy?",
          answer: "We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied, contact our support team within 14 days of purchase for a full refund."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime through the Billing section in your Account Settings. Your access will continue until the end of your billing period."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption and secure payment processors. We never store your full credit card details on our servers."
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Find answers to the most common questions about FitFriend
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search for answers..." 
                  className="pl-10 pr-4 py-6 rounded-lg border border-gray-300 dark:border-gray-700 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto max-w-4xl">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem 
                        key={faqIndex} 
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border rounded-lg p-2 bg-white dark:bg-gray-900 shadow-sm"
                      >
                        <AccordionTrigger className="text-left font-medium px-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <span>{faq.question}</span>
                            <div className="flex-shrink-0 ml-2">
                              <PlusCircle className="h-5 w-5 accordion-icon-plus" />
                              <MinusCircle className="h-5 w-5 accordion-icon-minus" />
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-2 pb-4 text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl mb-6">No results found for "{searchQuery}"</p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Try different keywords or browse the categories below
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
            
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                If you couldn't find the answer to your question, our support team is here to help.
              </p>
              <Button 
                size="lg" 
                className="bg-fitfriend-blue hover:bg-fitfriend-blue/90"
                asChild
              >
                <a href="/contact">
                  Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
