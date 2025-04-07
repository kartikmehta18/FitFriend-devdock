
// Mock data for dashboard components

export const userStats = {
  workoutsCompleted: 42,
  averageCalories: 320,
  minutesThisWeek: 185,
  minutesLastWeek: 145,
  streakDays: 7,
  daysActive: 12,
  caloriesBurned: 4250,
  distanceCovered: 32.5,
  weightLifted: 3500,
};

export const upcomingWorkouts = [
  {
    id: 1,
    name: "HIIT Cardio Burn",
    time: "Today, 5:30 PM",
    duration: "30 min",
    intensityLevel: "High",
    caloriesBurn: 350,
  },
  {
    id: 2,
    name: "Upper Body Strength",
    time: "Tomorrow, 7:00 AM",
    duration: "45 min",
    intensityLevel: "Medium",
    caloriesBurn: 280,
  },
  {
    id: 3,
    name: "Yoga Flow",
    time: "Thu, 6:00 PM",
    duration: "60 min",
    intensityLevel: "Low",
    caloriesBurn: 220,
  },
];

export const fitnessBuddies = [
  {
    id: 1,
    name: "Emma R.",
    workouts: 38,
    avatar: "E",
    goals: ["Weight Loss", "Strength"],
    location: "New York",
  },
  {
    id: 2,
    name: "Jason M.",
    workouts: 52,
    avatar: "J",
    goals: ["Muscle Gain", "HIIT"],
    location: "Boston",
  },
  {
    id: 3,
    name: "Sarah L.",
    workouts: 45,
    avatar: "S",
    goals: ["Marathon", "Endurance"],
    location: "Chicago",
  },
];

export const recentActivities = [
  {
    id: 1,
    type: "workout",
    name: "Morning HIIT",
    time: "Today, 7:15 AM",
    duration: "28 min",
    calories: 320,
  },
  {
    id: 2,
    type: "achievement",
    name: "5-Day Streak",
    time: "Yesterday",
    description: "You've worked out for 5 days in a row!",
  },
  {
    id: 3,
    type: "community",
    name: "Emma R. joined your group",
    time: "2 days ago",
    description: "You now have 3 buddies with similar goals",
  },
];
