// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Add Deno type declaration
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fitnessLevel, goals, preferences, duration, focus } = await req.json();
    
    console.log("Received workout generation request with parameters:", { fitnessLevel, goals, preferences, duration, focus });

    // Construct the prompt for Gemini
    const prompt = `
      Generate a detailed workout routine with the following parameters:
      - Fitness level: ${fitnessLevel || 'Beginner'}
      - Goals: ${goals?.join(', ') || 'General fitness'}
      - Preferences: ${preferences || 'No specific preferences'}
      - Duration: ${duration || '30'} minutes
      - Focus areas: ${focus || 'Full body'}

      Format the response as a JSON object with the following structure:
      {
        "name": "Workout name",
        "description": "Brief description of the workout",
        "duration": duration in minutes (number),
        "caloriesBurned": estimated calories burned (number),
        "exercises": [
          {
            "name": "Exercise name",
            "sets": number of sets,
            "reps": number of reps,
            "notes": "Optional notes about form or technique"
          }
        ]
      }

      Include 4-8 exercises appropriate for the specified fitness level and goals.
      Provide realistic estimates for sets, reps, and calories burned.
    `;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    console.log("Received response from Gemini API");

    if (!response.ok) {
      console.error("Error from Gemini API:", data);
      throw new Error(`Gemini API error: ${data.error?.message || "Unknown error"}`);
    }

    // Extract the generated text
    const generatedText = data.candidates[0].content.parts[0].text;
    
    console.log("Raw generated text from Gemini:", generatedText);
    
    // Extract JSON from the text (Gemini might wrap it in markdown code blocks)
    let workoutJson;
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = generatedText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        workoutJson = JSON.parse(jsonMatch[1]);
      } else {
        // If not wrapped, try parsing directly
        workoutJson = JSON.parse(generatedText);
      }
      
      // Validate the workout structure
      if (!workoutJson.name || !workoutJson.description || !workoutJson.exercises || !Array.isArray(workoutJson.exercises)) {
        console.error("Invalid workout structure:", workoutJson);
        throw new Error("Generated workout has invalid structure");
      }
      
      // Ensure all required fields are present
      workoutJson = {
        name: workoutJson.name || "Custom Workout",
        description: workoutJson.description || "A personalized workout routine",
        duration: typeof workoutJson.duration === 'number' ? workoutJson.duration : parseInt(workoutJson.duration) || 30,
        caloriesBurned: typeof workoutJson.caloriesBurned === 'number' ? workoutJson.caloriesBurned : parseInt(workoutJson.caloriesBurned) || 200,
        exercises: workoutJson.exercises.map((exercise: any) => ({
          name: exercise.name || "Exercise",
          sets: typeof exercise.sets === 'number' ? exercise.sets : parseInt(exercise.sets) || 3,
          reps: typeof exercise.reps === 'number' ? exercise.reps : parseInt(exercise.reps) || 10,
          notes: exercise.notes || ""
        }))
      };
      
      console.log("Successfully parsed and validated workout data:", workoutJson);
    } catch (error) {
      console.error("Error parsing JSON from Gemini response:", error);
      console.log("Raw response:", generatedText);
      
      // Return the raw text if we can't parse JSON
      return new Response(
        JSON.stringify({ 
          error: "Could not parse workout data", 
          rawResponse: generatedText 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify(workoutJson),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-workout function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
