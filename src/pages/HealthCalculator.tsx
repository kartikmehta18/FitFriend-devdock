
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, Calculator, Weight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HealthCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bmi");
  
  // BMI Calculator
  const [bmiValues, setBmiValues] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: "male",
  });

  const [bmiResult, setBmiResult] = useState<null | {
    bmi: number;
    category: string;
    healthRisk: string;
    idealWeight: number;
  }>(null);

  // TDEE Calculator
  const [tdeeValues, setTdeeValues] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: "male",
    activityLevel: "moderate",
  });

  const [tdeeResult, setTdeeResult] = useState<null | {
    bmr: number;
    tdee: number;
    maintenanceCalories: number;
    weightLossCalories: number;
    weightGainCalories: number;
  }>(null);

  // Body Fat Calculator
  const [bodyFatValues, setBodyFatValues] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: "male",
    neck: 36,
    waist: 80,
    hip: 90, // only used for female
  });

  const [bodyFatResult, setBodyFatResult] = useState<null | {
    bodyFatPercentage: number;
    fatMass: number;
    leanMass: number;
    category: string;
  }>(null);

  // Calculate BMI
  const calculateBMI = () => {
    const { weight, height, age, gender } = bmiValues;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = "";
    let healthRisk = "";

    if (bmi < 18.5) {
      category = "Underweight";
      healthRisk = "Risk of nutritional deficiency and osteoporosis";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = "Normal weight";
      healthRisk = "Low risk";
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = "Overweight";
      healthRisk = "Moderate risk of developing heart disease, high blood pressure, stroke, diabetes";
    } else {
      category = "Obese";
      healthRisk = "High risk of developing heart disease, high blood pressure, stroke, diabetes";
    }

    // Ideal weight (Devine formula)
    let idealWeight;
    if (gender === "male") {
      idealWeight = 50 + 2.3 * ((height - 152.4) / 2.54);
    } else {
      idealWeight = 45.5 + 2.3 * ((height - 152.4) / 2.54);
    }

    setBmiResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      healthRisk,
      idealWeight: parseFloat(idealWeight.toFixed(1)),
    });

    toast({
      title: "BMI Calculated",
      description: `Your BMI is ${bmi.toFixed(1)} - ${category}`,
    });
  };

  // Calculate TDEE
  const calculateTDEE = () => {
    const { weight, height, age, gender, activityLevel } = tdeeValues;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE based on activity level
    let activityMultiplier;
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "veryActive":
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.55;
    }

    const tdee = bmr * activityMultiplier;
    
    setTdeeResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenanceCalories: Math.round(tdee),
      weightLossCalories: Math.round(tdee * 0.8), // 20% deficit
      weightGainCalories: Math.round(tdee * 1.15), // 15% surplus
    });

    toast({
      title: "TDEE Calculated",
      description: `Your daily energy expenditure is ${Math.round(tdee)} calories`,
    });
  };

  // Calculate Body Fat
  const calculateBodyFat = () => {
    const { weight, height, gender, neck, waist, hip } = bodyFatValues;
    const heightCm = height;

    let bodyFatPercentage;
    if (gender === "male") {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(heightCm)) - 450;
    }

    // Cap it at reasonable values
    bodyFatPercentage = Math.max(3, Math.min(bodyFatPercentage, 70));

    // Calculate fat mass and lean mass
    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    // Determine category
    let category = "";
    if (gender === "male") {
      if (bodyFatPercentage < 6) category = "Essential fat";
      else if (bodyFatPercentage < 14) category = "Athletic";
      else if (bodyFatPercentage < 18) category = "Fitness";
      else if (bodyFatPercentage < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFatPercentage < 14) category = "Essential fat";
      else if (bodyFatPercentage < 21) category = "Athletic";
      else if (bodyFatPercentage < 25) category = "Fitness";
      else if (bodyFatPercentage < 32) category = "Average";
      else category = "Obese";
    }

    setBodyFatResult({
      bodyFatPercentage: parseFloat(bodyFatPercentage.toFixed(1)),
      fatMass: parseFloat(fatMass.toFixed(1)),
      leanMass: parseFloat(leanMass.toFixed(1)),
      category,
    });

    toast({
      title: "Body Fat Calculated",
      description: `Your estimated body fat percentage is ${bodyFatPercentage.toFixed(1)}%`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Health & Fitness Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Use our advanced calculators to estimate your BMI, daily calorie needs, and body composition to help guide your fitness journey.
            </p>
          </div>
          
          <Tabs 
            defaultValue="bmi" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="bmi" className="flex items-center justify-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>BMI Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="tdee" className="flex items-center justify-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Calorie Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="bodyFat" className="flex items-center justify-center gap-2">
                <Weight className="h-4 w-4" />
                <span>Body Fat Calculator</span>
              </TabsTrigger>
            </TabsList>
            
            {/* BMI Calculator */}
            <TabsContent value="bmi" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-fitfriend-blue" />
                    Body Mass Index (BMI) Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate your BMI to determine if you're at a healthy weight for your height.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="weight"
                            type="number"
                            value={bmiValues.weight}
                            onChange={(e) => setBmiValues({ ...bmiValues, weight: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">kg</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="height"
                            type="number"
                            value={bmiValues.height}
                            onChange={(e) => setBmiValues({ ...bmiValues, height: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="age"
                            type="number"
                            value={bmiValues.age}
                            onChange={(e) => setBmiValues({ ...bmiValues, age: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">years</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup
                          value={bmiValues.gender}
                          onValueChange={(value) => setBmiValues({ ...bmiValues, gender: value })}
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      {bmiResult ? (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-fitfriend-blue mb-2">
                              {bmiResult.bmi}
                            </div>
                            <div className="text-lg font-medium">{bmiResult.category}</div>
                          </div>
                          
                          <div className="mt-6 space-y-3">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Health Risk:</div>
                              <div>{bmiResult.healthRisk}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Ideal Weight:</div>
                              <div>{bmiResult.idealWeight} kg</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calculator className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">Fill in your details and click calculate to see your BMI results</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={calculateBMI} 
                    className="w-full bg-fitfriend-blue hover:bg-fitfriend-blue/90 text-white"
                  >
                    Calculate BMI
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* TDEE Calculator */}
            <TabsContent value="tdee" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-fitfriend-green" />
                    Total Daily Energy Expenditure (TDEE) Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate your daily calorie needs based on your activity level and personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tdee-weight">Weight (kg)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="tdee-weight"
                            type="number"
                            value={tdeeValues.weight}
                            onChange={(e) => setTdeeValues({ ...tdeeValues, weight: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">kg</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="tdee-height">Height (cm)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="tdee-height"
                            type="number"
                            value={tdeeValues.height}
                            onChange={(e) => setTdeeValues({ ...tdeeValues, height: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="tdee-age">Age</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="tdee-age"
                            type="number"
                            value={tdeeValues.age}
                            onChange={(e) => setTdeeValues({ ...tdeeValues, age: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">years</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup
                          value={tdeeValues.gender}
                          onValueChange={(value) => setTdeeValues({ ...tdeeValues, gender: value })}
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="tdee-male" />
                            <Label htmlFor="tdee-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="tdee-female" />
                            <Label htmlFor="tdee-female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label>Activity Level</Label>
                        <RadioGroup
                          value={tdeeValues.activityLevel}
                          onValueChange={(value) => setTdeeValues({ ...tdeeValues, activityLevel: value })}
                          className="space-y-2 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="sedentary" id="sedentary" />
                            <Label htmlFor="sedentary">Sedentary (little or no exercise)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light">Light (exercise 1-3 days/week)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate">Moderate (exercise 3-5 days/week)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active">Active (exercise 6-7 days/week)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veryActive" id="veryActive" />
                            <Label htmlFor="veryActive">Very Active (hard exercise daily)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      {tdeeResult ? (
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-fitfriend-green mb-2">
                              {tdeeResult.tdee}
                            </div>
                            <div className="text-lg font-medium">Daily Calories</div>
                          </div>
                          
                          <div className="space-y-4 mt-6">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Basal Metabolic Rate (BMR):</div>
                              <div>{tdeeResult.bmr} calories/day</div>
                              <div className="text-xs text-gray-500 mt-1">Calories your body needs at complete rest</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500 mb-1">To Maintain Weight:</div>
                              <div>{tdeeResult.maintenanceCalories} calories/day</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500 mb-1">To Lose Weight:</div>
                              <div>{tdeeResult.weightLossCalories} calories/day</div>
                              <div className="text-xs text-gray-500 mt-1">20% calorie deficit</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-500 mb-1">To Gain Weight:</div>
                              <div>{tdeeResult.weightGainCalories} calories/day</div>
                              <div className="text-xs text-gray-500 mt-1">15% calorie surplus</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Activity className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">Fill in your details and click calculate to see your daily calorie needs</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={calculateTDEE} 
                    className="w-full bg-fitfriend-green hover:bg-fitfriend-green/90 text-white"
                  >
                    Calculate Calories
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Body Fat Calculator */}
            <TabsContent value="bodyFat" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Weight className="h-5 w-5 text-fitfriend-purple" />
                    Body Fat Percentage Calculator
                  </CardTitle>
                  <CardDescription>
                    Estimate your body fat percentage using the U.S. Navy method.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="bf-weight">Weight (kg)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="bf-weight"
                            type="number"
                            value={bodyFatValues.weight}
                            onChange={(e) => setBodyFatValues({ ...bodyFatValues, weight: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">kg</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bf-height">Height (cm)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="bf-height"
                            type="number"
                            value={bodyFatValues.height}
                            onChange={(e) => setBodyFatValues({ ...bodyFatValues, height: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup
                          value={bodyFatValues.gender}
                          onValueChange={(value) => setBodyFatValues({ ...bodyFatValues, gender: value })}
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="bf-male" />
                            <Label htmlFor="bf-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="bf-female" />
                            <Label htmlFor="bf-female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label htmlFor="neck">Neck Circumference (cm)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="neck"
                            type="number"
                            value={bodyFatValues.neck}
                            onChange={(e) => setBodyFatValues({ ...bodyFatValues, neck: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="waist">Waist Circumference (cm)</Label>
                        <div className="flex items-center mt-2">
                          <Input
                            id="waist"
                            type="number"
                            value={bodyFatValues.waist}
                            onChange={(e) => setBodyFatValues({ ...bodyFatValues, waist: Number(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="ml-2 text-gray-500">cm</span>
                        </div>
                      </div>
                      
                      {bodyFatValues.gender === "female" && (
                        <div>
                          <Label htmlFor="hip">Hip Circumference (cm)</Label>
                          <div className="flex items-center mt-2">
                            <Input
                              id="hip"
                              type="number"
                              value={bodyFatValues.hip}
                              onChange={(e) => setBodyFatValues({ ...bodyFatValues, hip: Number(e.target.value) })}
                              className="flex-1"
                            />
                            <span className="ml-2 text-gray-500">cm</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      {bodyFatResult ? (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-fitfriend-purple mb-2">
                              {bodyFatResult.bodyFatPercentage}%
                            </div>
                            <div className="text-lg font-medium">Body Fat</div>
                            <div className="mt-2 text-sm text-gray-500">{bodyFatResult.category}</div>
                          </div>
                          
                          <div className="mt-6 space-y-3">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Fat Mass:</div>
                              <div>{bodyFatResult.fatMass} kg</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Lean Mass:</div>
                              <div>{bodyFatResult.leanMass} kg</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Weight className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">Fill in your details and click calculate to estimate your body fat</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={calculateBodyFat} 
                    className="w-full bg-fitfriend-purple hover:bg-fitfriend-purple/90 text-white"
                  >
                    Calculate Body Fat
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HealthCalculator;
