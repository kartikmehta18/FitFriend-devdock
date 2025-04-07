import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Sparkles, Clock, Flame, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

interface FormValues {
  fitnessLevel: string;
  focus: string;
  duration: number;
  preferences: string;
  goals: string[];
}

const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
const focusAreas = ["Full body", "Upper body", "Lower body", "Core", "Cardio", "Strength", "Flexibility"];
const goalOptions = ["Weight loss", "Muscle gain", "Endurance", "Strength", "Flexibility", "General fitness"];

const WorkoutGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [durationValue, setDurationValue] = useState([30]);
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      fitnessLevel: "Beginner",
      focus: "Full body",
      duration: 30,
      preferences: "",
      goals: [],
    },
  });

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsGenerating(true);
      setGeneratedWorkout(null);
      data.goals = selectedGoals;
      data.duration = durationValue[0];
      
      console.log("Submitting workout generation request with data:", data);
      
      // Call the edge function to generate a workout
      const { data: workout, error } = await supabase.functions.invoke('generate-workout', {
        body: JSON.stringify(data),
      });

      console.log("Response from edge function:", { workout, error });

      if (error) {
        throw new Error(error.message);
      }

      if (!workout) {
        throw new Error("No workout generated");
      }

      console.log("Workout data to save:", workout);
      
      // Store the workout in state for display
      setGeneratedWorkout(workout);

      // Save the workout to Supabase using type assertion
      const { data: savedWorkout, error: saveError } = await (supabase
        .from('workouts') as any)
        .insert({
          id: uuidv4(),
          name: workout.name,
          description: workout.description,
          duration: workout.duration,
          calories_burned: workout.caloriesBurned,
          ai_generated: true,
          completed: false,
          date: new Date().toISOString().split('T')[0], // Add current date
        })
        .select()
        .single();

      console.log("Saved workout response:", { savedWorkout, saveError });

      if (saveError) {
        throw new Error(saveError.message);
      }

      // Save each exercise in the workout using type assertion
      const exercisesPromises = workout.exercises.map((exercise: any, index: number) => {
        return (supabase.from('exercises') as any).insert({
          workout_id: savedWorkout.id,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          notes: exercise.notes,
          order_index: index,
        });
      });

      const exerciseResults = await Promise.all(exercisesPromises);
      console.log("Exercise save results:", exerciseResults);

      toast({
        title: "Workout Generated!",
        description: "Your AI workout has been created and saved.",
      });

      // Reset form after successful generation
      form.reset();
      setSelectedGoals([]);
      setDurationValue([30]);
    } catch (error: any) {
      console.error("Error in workout generation:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Could not generate workout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-fitfriend-blue" />
            AI Workout Generator
          </CardTitle>
          <CardDescription>
            Create a personalized workout routine using our AI assistant
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fitnessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fitness Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your fitness level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fitnessLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="focus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Focus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select focus area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {focusAreas.map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormItem>
                <FormLabel>Duration (minutes)</FormLabel>
                <div className="pt-2 px-1">
                  <Slider
                    defaultValue={[30]}
                    min={10}
                    max={90}
                    step={5}
                    value={durationValue}
                    onValueChange={setDurationValue}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>10 min</span>
                    <span className="font-medium text-black dark:text-white">{durationValue[0]} min</span>
                    <span>90 min</span>
                  </div>
                </div>
              </FormItem>
              
              <FormItem>
                <FormLabel>Goals (select one or more)</FormLabel>
                <div className="flex flex-wrap gap-2 pt-2">
                  {goalOptions.map((goal) => (
                    <Badge
                      key={goal}
                      variant={selectedGoals.includes(goal) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedGoals.includes(goal) 
                          ? "bg-fitfriend-blue hover:bg-fitfriend-blue/90" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => toggleGoal(goal)}
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </FormItem>
              
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any special preferences, equipment available, or limitations..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Examples: "No jumping exercises", "Have access to dumbbells only", "Outdoor workout"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Workout...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Workout
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Display generated workout */}
      {generatedWorkout && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Your Generated Workout
            </CardTitle>
            <CardDescription>
              {generatedWorkout.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">{generatedWorkout.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-gray-500">{generatedWorkout.caloriesBurned} calories</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Exercises</h3>
              {generatedWorkout.exercises.map((exercise: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {exercise.sets} sets
                      </span>
                      <span className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {exercise.reps} reps
                      </span>
                    </div>
                  </div>
                  {exercise.notes && (
                    <p className="text-sm text-gray-500 mt-2">{exercise.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkoutGenerator;
