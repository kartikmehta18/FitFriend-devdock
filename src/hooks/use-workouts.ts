
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

export interface Exercise {
  id?: string;
  workout_id?: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number | null;
  duration?: number | null;
  notes?: string | null;
  order_index: number;
}

export interface Workout {
  id?: string;
  user_id?: string;
  name: string;
  description?: string | null;
  date?: string;
  duration: number;
  calories_burned?: number | null;
  completed: boolean;
  ai_generated: boolean;
  created_at?: string;
  exercises?: Exercise[];
}

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all workouts for the current user
  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Using type assertion to fix TypeScript error
      const { data, error } = await (supabase
        .from('workouts') as any)
        .select(`
          *,
          exercises (*)
        `)
        .order('date', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      
      // Explicitly cast data to Workout[] to ensure type safety
      setWorkouts(data as Workout[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new workout
  const createWorkout = async (workout: Workout, exercises: Exercise[] = []) => {
    try {
      setLoading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Add workout ID and user ID
      const workoutId = uuidv4();
      const workoutWithIds: Workout = {
        ...workout,
        id: workoutId,
        user_id: user.id,
      };
      
      // Insert workout using type assertion
      const { data, error } = await (supabase
        .from('workouts') as any)
        .insert(workoutWithIds)
        .select()
        .single();
        
      if (error) {
        throw new Error(error.message);
      }
      
      // Insert exercises if any
      if (exercises.length > 0) {
        const exercisesWithIds = exercises.map((exercise, index) => ({
          ...exercise,
          id: uuidv4(),
          workout_id: workoutId,
          order_index: exercise.order_index || index,
        }));
        
        // Using type assertion for exercises
        const { error: exerciseError } = await (supabase
          .from('exercises') as any)
          .insert(exercisesWithIds);
          
        if (exerciseError) {
          throw new Error(exerciseError.message);
        }
      }
      
      toast({
        title: 'Workout Created',
        description: 'Your workout has been successfully created',
      });
      
      // Refresh workouts
      await fetchWorkouts();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      console.error('Error creating workout:', err);
      
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a workout
  const updateWorkout = async (id: string, updates: Partial<Workout>) => {
    try {
      setLoading(true);
      
      // Using type assertion
      const { error } = await (supabase
        .from('workouts') as any)
        .update(updates)
        .eq('id', id);
        
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: 'Workout Updated',
        description: 'Your workout has been successfully updated',
      });
      
      // Refresh workouts
      await fetchWorkouts();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      console.error('Error updating workout:', err);
      
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete a workout
  const deleteWorkout = async (id: string) => {
    try {
      setLoading(true);
      
      // Using type assertion
      const { error } = await (supabase
        .from('workouts') as any)
        .delete()
        .eq('id', id);
        
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: 'Workout Deleted',
        description: 'Your workout has been successfully deleted',
      });
      
      // Refresh workouts
      await fetchWorkouts();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      console.error('Error deleting workout:', err);
      
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Complete a workout
  const completeWorkout = async (id: string) => {
    try {
      await updateWorkout(id, { completed: true });
    } catch (err) {
      console.error('Error completing workout:', err);
    }
  };

  // Load workouts on mount
  useEffect(() => {
    fetchWorkouts();
  }, []);

  return {
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    completeWorkout,
  };
}
