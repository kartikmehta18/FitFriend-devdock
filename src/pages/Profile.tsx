
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, User, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Profile form schema
const profileFormSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").optional(),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  weight: z.union([
    z.number().min(30, "Weight must be at least 30").max(500, "Weight must be less than 500"),
    z.string().transform((val) => (val === "" ? undefined : Number(val)))
  ]).optional(),
  height: z.union([
    z.number().min(100, "Height must be at least 100 cm").max(250, "Height must be less than 250 cm"),
    z.string().transform((val) => (val === "" ? undefined : Number(val)))
  ]).optional(),
  fitness_level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
});

// Account form schema
const accountFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  current_password: z.string().min(6, "Password must be at least 6 characters").optional(),
  new_password: z.string().min(6, "Password must be at least 6 characters").optional(),
  confirm_password: z.string().min(6, "Password must be at least 6 characters").optional(),
}).refine((data) => {
  if (data.new_password && !data.current_password) {
    return false;
  }
  return true;
}, {
  message: "Current password is required to set a new password",
  path: ["current_password"]
}).refine((data) => {
  if (data.new_password && data.new_password !== data.confirm_password) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirm_password"]
});

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/dashboard");
          return;
        }
        
        setUser(user);
        
        // Fetch user profile data
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
        } else {
          setProfile(profileData);
          
          // Fix type conversion here - convert empty strings to undefined, strings to numbers
          profileForm.reset({
            full_name: profileData.full_name || "",
            username: profileData.username || "",
            weight: profileData.weight ? Number(profileData.weight) : undefined,
            height: profileData.height ? Number(profileData.height) : undefined,
            fitness_level: (profileData.fitness_level as "beginner" | "intermediate" | "advanced" | undefined),
          });
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "",
      username: "",
      weight: undefined,
      height: undefined,
      fitness_level: undefined,
    },
  });
  
  // Account form
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });
  
  // Update account email/password
  const handleAccountUpdate = async (values: z.infer<typeof accountFormSchema>) => {
    try {
      setUpdating(true);
      
      // Update email if changed
      if (values.email && values.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: values.email,
        });
        
        if (error) {
          toast({
            title: "Error updating email",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Email update initiated",
          description: "Please check your inbox for a confirmation email",
        });
      }
      
      // Update password if provided
      if (values.current_password && values.new_password) {
        const { error } = await supabase.auth.updateUser({
          password: values.new_password,
        });
        
        if (error) {
          toast({
            title: "Error updating password",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated",
        });
        
        accountForm.reset({
          email: values.email,
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      }
    } catch (error: any) {
      console.error("Error updating account:", error);
      toast({
        title: "Update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };
  
  // Update profile data
  const handleProfileUpdate = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.full_name,
          username: values.username,
          weight: values.weight,
          height: values.height,
          fitness_level: values.fitness_level,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Refresh profile data
      const { data: updatedProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
        
      setProfile(updatedProfile);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-fitfriend-blue" />
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container px-4 mx-auto py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 text-2xl">
                    <AvatarFallback className="bg-fitfriend-purple text-white">
                      {user?.email ? user.email.substring(0, 2).toUpperCase() : <User />}
                    </AvatarFallback>
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} />
                  </Avatar>
                  
                  <div className="text-center space-y-1">
                    <h3 className="font-semibold text-lg">{profile?.full_name || "FitFriend User"}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    {profile?.username && (
                      <p className="text-sm text-gray-500">@{profile.username}</p>
                    )}
                  </div>
                  
                  <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col space-y-2">
                      {profile?.fitness_level && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Fitness Level:</span>
                          <span className="text-sm font-medium">{profile.fitness_level}</span>
                        </div>
                      )}
                      {profile?.height && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Height:</span>
                          <span className="text-sm font-medium">{profile.height} cm</span>
                        </div>
                      )}
                      {profile?.weight && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Weight:</span>
                          <span className="text-sm font-medium">{profile.weight} kg</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile tabs */}
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your profile information and account settings</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="profile">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                  </TabsList>
                  
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-4 pt-4">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="height"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Height (cm)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter height in cm"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                    value={field.value === undefined ? "" : field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (kg)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter weight in kg"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                                    value={field.value === undefined ? "" : field.value}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={profileForm.control}
                          name="fitness_level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fitness Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your fitness level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="submit"
                          className="w-full md:w-auto bg-fitfriend-blue hover:bg-fitfriend-blue/90"
                          disabled={updating}
                        >
                          {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          <Save className="mr-2 h-4 w-4" />
                          Save Profile
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  {/* Account Tab */}
                  <TabsContent value="account" className="space-y-4 pt-4">
                    <Form {...accountForm}>
                      <form onSubmit={accountForm.handleSubmit(handleAccountUpdate)} className="space-y-4">
                        <FormField
                          control={accountForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="your.email@example.com" 
                                  defaultValue={user?.email || ""}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <h3 className="text-md font-medium mb-2">Change Password</h3>
                          
                          <FormField
                            control={accountForm.control}
                            name="current_password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                              control={accountForm.control}
                              name="new_password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={accountForm.control}
                              name="confirm_password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full md:w-auto bg-fitfriend-blue hover:bg-fitfriend-blue/90"
                          disabled={updating}
                        >
                          {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          <Save className="mr-2 h-4 w-4" />
                          Save Account
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
