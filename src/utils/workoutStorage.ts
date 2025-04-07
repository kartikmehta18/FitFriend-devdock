
// Utility to manage workout data in localStorage

// Types
export interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  duration: number; // in minutes
  caloriesBurned: number;
  exercises: Exercise[];
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number; // in kg, optional for bodyweight exercises
  duration?: number; // in minutes, for cardio exercises
}

// Key for localStorage
const WORKOUTS_STORAGE_KEY = 'fitfriend_workouts';
const USER_STATS_KEY = 'fitfriend_user_stats';

// Retrieve workouts from localStorage
export const getWorkouts = (): WorkoutSession[] => {
  const storedWorkouts = localStorage.getItem(WORKOUTS_STORAGE_KEY);
  return storedWorkouts ? JSON.parse(storedWorkouts) : [];
};

// Save workouts to localStorage
export const saveWorkouts = (workouts: WorkoutSession[]) => {
  localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(workouts));
};

// Add a new workout
export const addWorkout = (workout: WorkoutSession) => {
  const workouts = getWorkouts();
  workouts.push(workout);
  saveWorkouts(workouts);
  updateUserStats();
};

// Update an existing workout
export const updateWorkout = (updatedWorkout: WorkoutSession) => {
  const workouts = getWorkouts();
  const index = workouts.findIndex(w => w.id === updatedWorkout.id);
  if (index !== -1) {
    workouts[index] = updatedWorkout;
    saveWorkouts(workouts);
    updateUserStats();
  }
};

// Mark a workout as completed
export const completeWorkout = (workoutId: string) => {
  const workouts = getWorkouts();
  const workout = workouts.find(w => w.id === workoutId);
  
  if (workout) {
    workout.completed = true;
    saveWorkouts(workouts);
    updateUserStats();
  }
};

// Delete a workout
export const deleteWorkout = (workoutId: string) => {
  const workouts = getWorkouts();
  const updatedWorkouts = workouts.filter(w => w.id !== workoutId);
  saveWorkouts(updatedWorkouts);
  updateUserStats();
};

// User Stats Management
export interface UserStats {
  workoutsCompleted: number;
  averageCalories: number;
  minutesThisWeek: number;
  minutesLastWeek: number;
  streakDays: number;
  daysActive: number;
  caloriesBurned: number;
  distanceCovered: number;
  weightLifted: number;
}

// Get user stats
export const getUserStats = (): UserStats => {
  const storedStats = localStorage.getItem(USER_STATS_KEY);
  if (storedStats) {
    return JSON.parse(storedStats);
  }
  
  // Default stats
  return {
    workoutsCompleted: 0,
    averageCalories: 0,
    minutesThisWeek: 0,
    minutesLastWeek: 0,
    streakDays: 0,
    daysActive: 0,
    caloriesBurned: 0,
    distanceCovered: 0,
    weightLifted: 0
  };
};

// Save user stats
export const saveUserStats = (stats: UserStats) => {
  localStorage.setItem(USER_STATS_KEY, JSON.stringify(stats));
};

// Update user stats based on workout data
export const updateUserStats = () => {
  const workouts = getWorkouts();
  const stats = getUserStats();
  
  // Calculate completed workouts
  stats.workoutsCompleted = workouts.filter(w => w.completed).length;
  
  // Calculate calories burned
  const totalCalories = workouts
    .filter(w => w.completed)
    .reduce((sum, workout) => sum + workout.caloriesBurned, 0);
  stats.caloriesBurned = totalCalories;
  
  // Calculate average calories
  stats.averageCalories = stats.workoutsCompleted > 0 
    ? Math.round(totalCalories / stats.workoutsCompleted) 
    : 0;
  
  // Calculate active minutes this week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start of week
  startOfWeek.setHours(0, 0, 0, 0);
  
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  
  const thisWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= startOfWeek && w.completed;
  });
  
  const lastWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    return workoutDate >= startOfLastWeek && workoutDate < startOfWeek && w.completed;
  });
  
  stats.minutesThisWeek = thisWeekWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  stats.minutesLastWeek = lastWeekWorkouts.reduce((sum, workout) => sum + workout.duration, 0);
  
  // Calculate streak and active days
  const activeDates = workouts
    .filter(w => w.completed)
    .map(w => new Date(w.date).toDateString());
  
  // Remove duplicates
  const uniqueActiveDates = [...new Set(activeDates)];
  stats.daysActive = uniqueActiveDates.length;
  
  // Calculate streak (consecutive days)
  const sortedDates = uniqueActiveDates
    .map(dateStr => new Date(dateStr))
    .sort((a, b) => b.getTime() - a.getTime()); // Sort descending
  
  if (sortedDates.length > 0) {
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if worked out today
    const lastWorkoutDate = sortedDates[0];
    const dayDiff = Math.floor((today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff > 1) {
      // Streak broken
      stats.streakDays = 0;
    } else {
      // Calculate consecutive days
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const currentDate = sortedDates[i];
        const nextDate = sortedDates[i + 1];
        
        const diffTime = currentDate.getTime() - nextDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          streak++;
        } else {
          break;
        }
      }
      stats.streakDays = streak;
    }
  }
  
  // Save updated stats
  saveUserStats(stats);
  return stats;
};

// Initialize with sample data if empty
export const initializeWorkoutData = () => {
  const workouts = getWorkouts();
  if (workouts.length === 0) {
    // Current date for the first workout
    const today = new Date();
    
    // Yesterday's date for the second workout
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    // Two days ago for the third workout
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);
    
    const sampleWorkouts: WorkoutSession[] = [
      {
        id: '1',
        name: 'Morning HIIT',
        date: today.toISOString(),
        duration: 28,
        caloriesBurned: 320,
        completed: true,
        exercises: [
          { id: '1-1', name: 'Jumping Jacks', sets: 3, reps: 20 },
          { id: '1-2', name: 'Burpees', sets: 3, reps: 10 },
          { id: '1-3', name: 'Mountain Climbers', sets: 3, reps: 20 }
        ]
      },
      {
        id: '2',
        name: 'Upper Body Strength',
        date: yesterday.toISOString(),
        duration: 45,
        caloriesBurned: 280,
        completed: true,
        exercises: [
          { id: '2-1', name: 'Push-ups', sets: 3, reps: 15 },
          { id: '2-2', name: 'Dumbbell Curls', sets: 3, reps: 12, weight: 10 },
          { id: '2-3', name: 'Tricep Dips', sets: 3, reps: 12 }
        ]
      },
      {
        id: '3',
        name: 'Yoga Flow',
        date: twoDaysAgo.toISOString(),
        duration: 60,
        caloriesBurned: 220,
        completed: true,
        exercises: [
          { id: '3-1', name: 'Sun Salutation', sets: 1, reps: 10 },
          { id: '3-2', name: 'Warrior Poses', sets: 1, reps: 10 },
          { id: '3-3', name: 'Seated Forward Bend', sets: 1, reps: 5 }
        ]
      }
    ];
    
    saveWorkouts(sampleWorkouts);
    updateUserStats();
  }
};
