
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would send this data to your backend
      console.log("Form submitted:", values);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-fitfriend-blue" />,
      title: "Email Us",
      details: [
        "info@fitfriend.com",
        "support@fitfriend.com"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-fitfriend-blue" />,
      title: "Call Us",
      details: [
        "+1 (800) 555-1234",
        "+1 (800) 555-5678"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6 text-fitfriend-blue" />,
      title: "Visit Us",
      details: [
        "123 Fitness Avenue",
        "Healthville, CA 90210"
      ]
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
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                We'd love to hear from you. Our team is always here to help.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-gray-600 dark:text-gray-400">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-8">
                    {isSuccess ? (
                      <div className="text-center py-12">
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Message Sent!</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Thank you for reaching out. We've received your message and will get back to you shortly.
                        </p>
                        <Button onClick={() => setIsSuccess(false)} className="bg-fitfriend-blue hover:bg-fitfriend-blue/90">
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john.doe@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input placeholder="How can we help you?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please provide details about your inquiry..." 
                                    className="min-h-32" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Your message will be sent to our support team.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-fitfriend-blue hover:bg-fitfriend-blue/90"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" /> 
                                Send Message
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Location</h2>
            
            <div className="rounded-lg overflow-hidden shadow-lg max-w-5xl mx-auto h-96 bg-gray-200">
              {/* In a real application, you would embed a map here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700">
                <MapPin className="h-12 w-12 text-gray-500" />
                <span className="ml-2 text-lg text-gray-600 dark:text-gray-400">Map Placeholder</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
