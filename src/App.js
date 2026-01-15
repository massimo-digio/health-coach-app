import React, { useState } from "react";
import { Activity, Heart, MessageCircle, Flame, Moon, Zap } from "lucide-react";

const HealthCoachApp = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [trendPeriod, setTrendPeriod] = useState("1M");
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const data = {
    nutrition: {
      calories: { consumed: 2450, burned: 650, net: 1800, target: 2300 },
      macros: {
        carbs: { g: 220, pct: 36 },
        protein: { g: 200, pct: 33 },
        fat: { g: 85, pct: 31 },
      },
    },
    activity: {
      workouts: [
        { type: "Boxing", duration: 90, calories: 550, time: "18:00" },
      ],
      steps: 12500,
      activeMinutes: 145,
      restingHR: 52,
      hrv: 68,
      sleep: { duration: 7.5, quality: 85, deepSleep: 1.8 },
    },
    scores: { nutrition: 82, activity: 88, recovery: 75, performance: 85 },
    readiness: 78,
  };

  const weekly = {
    workoutsCompleted: 5,
    workoutsTarget: 6,
    avgCalories: 2280,
    avgProtein: 195,
    avgCarbs: 215,
    avgFat: 72,
    bodyFatChange: -0.5,
    weightChange: -0.6,
    calorieDeficit: 3200,
    avgDeficitPerDay: 457,
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMsg = {
      role: "user",
      content: inputMessage,
      file: selectedFile,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const aiResponse = {
      role: "assistant",
      content: generateCoachResponse(inputMessage),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages([...chatMessages, userMsg, aiResponse]);
    setInputMessage("");
    setSelectedFile(null);
  };

  const generateCoachResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes("meal") || q.includes("food") || q.includes("eat")) {
      return "Based on your current intake today (1,800 net calories), you have room for a solid evening meal. I'd recommend targeting 500-600 calories with 40-50g protein and complex carbs. Since you have boxing at 6 PM, make sure to eat at least 2 hours before or have a lighter pre-workout snack (banana + almonds) 90 minutes prior. Your protein is tracking great at 200g today, so focus on getting those carbs up to hit your 40% target.";
    }
    if (
      q.includes("workout") ||
      q.includes("train") ||
      q.includes("exercise")
    ) {
      return "You're at 5/6 workouts this week, which is solid! Your HRV is at 68ms and last night's sleep quality was 85%, so you're well-recovered for another session. I'd recommend fitting in that 6th workout tomorrow - either a gym session or a run. Your body is adapting well to the training load based on your resting HR of 52 bpm. Keep the intensity high and you'll continue seeing progress.";
    }
    if (
      q.includes("progress") ||
      q.includes("goal") ||
      q.includes("body fat")
    ) {
      return "You're making excellent progress! This week you lost 0.6kg and 0.5% body fat, which is exactly the sustainable pace we want. You've dropped from 18% to 17.2% body fat over the past 4 weeks. At this rate, you'll reach your 10-12% body fat goal in about 12-14 weeks. The key is your consistency - you're averaging a 457 cal/day deficit while keeping protein high at 195g average. This preserves muscle while burning fat. Stay the course!";
    }
    if (q.includes("sleep") || q.includes("recovery") || q.includes("tired")) {
      return "Your recovery metrics look solid. You got 7.5 hours last night with 85% quality and 1.8h of deep sleep, which is in the sweet spot. However, with another training session coming up, I'd push for 8 hours tonight. Some tips: cut screens 1 hour before bed, keep your room at 65-68°F, and consider a magnesium supplement if you're not already taking one. Your HRV at 68ms shows your body is handling the training load well.";
    }
    return "I'm here to help! I can give you advice on nutrition, training, recovery, or your progress toward your goals. What specific area would you like guidance on?";
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        type: file.type,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      });
    }
  };

  const trendData = {
    "1W": [
      { weight: 82.9, bodyFat: 17.4, avgCal: 2180, workouts: 0, deficit: 320 },
      { weight: 82.7, bodyFat: 17.3, avgCal: 2250, workouts: 1, deficit: 450 },
      { weight: 82.8, bodyFat: 17.3, avgCal: 2400, workouts: 1, deficit: 350 },
      { weight: 82.6, bodyFat: 17.2, avgCal: 2280, workouts: 0, deficit: 520 },
      { weight: 82.7, bodyFat: 17.3, avgCal: 2500, workouts: 1, deficit: 300 },
      { weight: 82.5, bodyFat: 17.2, avgCal: 2260, workouts: 1, deficit: 440 },
      { weight: 82.5, bodyFat: 17.2, avgCal: 2270, workouts: 1, deficit: 590 },
    ],
    "1M": [
      { weight: 83.7, bodyFat: 18.0, avgCal: 2350, workouts: 5, deficit: 2800 },
      { weight: 83.5, bodyFat: 17.9, avgCal: 2280, workouts: 6, deficit: 3100 },
      { weight: 83.1, bodyFat: 17.6, avgCal: 2420, workouts: 5, deficit: 2900 },
      { weight: 82.9, bodyFat: 17.4, avgCal: 2290, workouts: 6, deficit: 3400 },
      { weight: 82.7, bodyFat: 17.3, avgCal: 2350, workouts: 5, deficit: 3000 },
      { weight: 82.5, bodyFat: 17.2, avgCal: 2280, workouts: 5, deficit: 3200 },
    ],
    "3M": [
      {
        weight: 85.2,
        bodyFat: 19.1,
        avgCal: 2450,
        workouts: 18,
        deficit: 8200,
      },
      {
        weight: 84.8,
        bodyFat: 18.8,
        avgCal: 2520,
        workouts: 20,
        deficit: 9500,
      },
      {
        weight: 84.3,
        bodyFat: 18.5,
        avgCal: 2380,
        workouts: 22,
        deficit: 11500,
      },
      {
        weight: 84.1,
        bodyFat: 18.4,
        avgCal: 2480,
        workouts: 19,
        deficit: 10200,
      },
      {
        weight: 83.6,
        bodyFat: 18.0,
        avgCal: 2310,
        workouts: 24,
        deficit: 12800,
      },
      {
        weight: 83.3,
        bodyFat: 17.8,
        avgCal: 2400,
        workouts: 21,
        deficit: 11000,
      },
      {
        weight: 83.0,
        bodyFat: 17.6,
        avgCal: 2350,
        workouts: 23,
        deficit: 12200,
      },
      {
        weight: 82.8,
        bodyFat: 17.4,
        avgCal: 2450,
        workouts: 18,
        deficit: 10800,
      },
      {
        weight: 82.7,
        bodyFat: 17.3,
        avgCal: 2320,
        workouts: 22,
        deficit: 11900,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 20,
        deficit: 12000,
      },
    ],
    "6M": [
      {
        weight: 88.5,
        bodyFat: 21.3,
        avgCal: 2680,
        workouts: 12,
        deficit: 3200,
      },
      {
        weight: 88.0,
        bodyFat: 21.0,
        avgCal: 2720,
        workouts: 15,
        deficit: 5800,
      },
      {
        weight: 87.5,
        bodyFat: 20.7,
        avgCal: 2580,
        workouts: 18,
        deficit: 8800,
      },
      {
        weight: 87.2,
        bodyFat: 20.5,
        avgCal: 2650,
        workouts: 16,
        deficit: 7200,
      },
      {
        weight: 86.8,
        bodyFat: 20.2,
        avgCal: 2490,
        workouts: 20,
        deficit: 10400,
      },
      {
        weight: 86.4,
        bodyFat: 19.9,
        avgCal: 2560,
        workouts: 19,
        deficit: 9100,
      },
      {
        weight: 86.0,
        bodyFat: 19.7,
        avgCal: 2520,
        workouts: 18,
        deficit: 8800,
      },
      {
        weight: 85.6,
        bodyFat: 19.4,
        avgCal: 2450,
        workouts: 18,
        deficit: 8200,
      },
      {
        weight: 85.2,
        bodyFat: 19.1,
        avgCal: 2480,
        workouts: 20,
        deficit: 9500,
      },
      {
        weight: 84.8,
        bodyFat: 18.8,
        avgCal: 2380,
        workouts: 22,
        deficit: 11500,
      },
      {
        weight: 84.3,
        bodyFat: 18.5,
        avgCal: 2420,
        workouts: 21,
        deficit: 10800,
      },
      {
        weight: 84.1,
        bodyFat: 18.4,
        avgCal: 2350,
        workouts: 19,
        deficit: 10200,
      },
      {
        weight: 83.7,
        bodyFat: 18.0,
        avgCal: 2310,
        workouts: 24,
        deficit: 12800,
      },
      {
        weight: 83.4,
        bodyFat: 17.8,
        avgCal: 2390,
        workouts: 22,
        deficit: 11200,
      },
      {
        weight: 83.0,
        bodyFat: 17.6,
        avgCal: 2340,
        workouts: 23,
        deficit: 11900,
      },
      {
        weight: 82.7,
        bodyFat: 17.3,
        avgCal: 2430,
        workouts: 20,
        deficit: 10500,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 20,
        deficit: 12000,
      },
    ],
    YTD: [
      {
        weight: 85.2,
        bodyFat: 19.1,
        avgCal: 2450,
        workouts: 18,
        deficit: 8200,
      },
      {
        weight: 84.8,
        bodyFat: 18.8,
        avgCal: 2520,
        workouts: 20,
        deficit: 9500,
      },
      {
        weight: 84.3,
        bodyFat: 18.5,
        avgCal: 2380,
        workouts: 22,
        deficit: 11500,
      },
      {
        weight: 84.1,
        bodyFat: 18.4,
        avgCal: 2480,
        workouts: 19,
        deficit: 10200,
      },
      {
        weight: 83.6,
        bodyFat: 18.0,
        avgCal: 2310,
        workouts: 24,
        deficit: 12800,
      },
      {
        weight: 83.3,
        bodyFat: 17.8,
        avgCal: 2400,
        workouts: 21,
        deficit: 11000,
      },
      {
        weight: 83.0,
        bodyFat: 17.6,
        avgCal: 2350,
        workouts: 23,
        deficit: 12200,
      },
      {
        weight: 82.8,
        bodyFat: 17.4,
        avgCal: 2450,
        workouts: 18,
        deficit: 10800,
      },
      {
        weight: 82.7,
        bodyFat: 17.3,
        avgCal: 2320,
        workouts: 22,
        deficit: 11900,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 20,
        deficit: 12000,
      },
    ],
    "1Y": [
      { weight: 92.0, bodyFat: 23.5, avgCal: 2850, workouts: 8, deficit: 2400 },
      {
        weight: 91.2,
        bodyFat: 23.1,
        avgCal: 2780,
        workouts: 12,
        deficit: 4800,
      },
      {
        weight: 90.5,
        bodyFat: 22.8,
        avgCal: 2750,
        workouts: 16,
        deficit: 6800,
      },
      {
        weight: 89.8,
        bodyFat: 22.3,
        avgCal: 2680,
        workouts: 17,
        deficit: 7600,
      },
      {
        weight: 89.0,
        bodyFat: 21.9,
        avgCal: 2650,
        workouts: 18,
        deficit: 8600,
      },
      {
        weight: 88.3,
        bodyFat: 21.4,
        avgCal: 2590,
        workouts: 19,
        deficit: 9200,
      },
      {
        weight: 87.2,
        bodyFat: 20.8,
        avgCal: 2550,
        workouts: 20,
        deficit: 10200,
      },
      {
        weight: 86.5,
        bodyFat: 20.3,
        avgCal: 2510,
        workouts: 19,
        deficit: 9600,
      },
      {
        weight: 85.8,
        bodyFat: 19.9,
        avgCal: 2480,
        workouts: 19,
        deficit: 9800,
      },
      {
        weight: 85.0,
        bodyFat: 19.4,
        avgCal: 2420,
        workouts: 21,
        deficit: 10800,
      },
      {
        weight: 84.2,
        bodyFat: 18.7,
        avgCal: 2390,
        workouts: 22,
        deficit: 11200,
      },
      {
        weight: 83.4,
        bodyFat: 18.1,
        avgCal: 2340,
        workouts: 21,
        deficit: 11600,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 20,
        deficit: 12000,
      },
    ],
    "3Y": [
      {
        weight: 95.5,
        bodyFat: 25.2,
        avgCal: 3100,
        workouts: 65,
        deficit: 18000,
      },
      {
        weight: 93.8,
        bodyFat: 24.5,
        avgCal: 2980,
        workouts: 95,
        deficit: 32000,
      },
      {
        weight: 92.2,
        bodyFat: 23.8,
        avgCal: 2850,
        workouts: 110,
        deficit: 48000,
      },
      {
        weight: 89.8,
        bodyFat: 21.5,
        avgCal: 2650,
        workouts: 210,
        deficit: 95000,
      },
      {
        weight: 88.1,
        bodyFat: 20.7,
        avgCal: 2550,
        workouts: 168,
        deficit: 72000,
      },
      {
        weight: 86.5,
        bodyFat: 19.8,
        avgCal: 2480,
        workouts: 142,
        deficit: 58000,
      },
      {
        weight: 85.2,
        bodyFat: 18.9,
        avgCal: 2420,
        workouts: 78,
        deficit: 38000,
      },
      {
        weight: 84.0,
        bodyFat: 18.2,
        avgCal: 2360,
        workouts: 92,
        deficit: 44000,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 84,
        deficit: 48000,
      },
    ],
    MAX: [
      {
        weight: 98.2,
        bodyFat: 27.8,
        avgCal: 3400,
        workouts: 42,
        deficit: 8000,
      },
      {
        weight: 97.5,
        bodyFat: 27.3,
        avgCal: 3320,
        workouts: 56,
        deficit: 15000,
      },
      {
        weight: 96.8,
        bodyFat: 26.5,
        avgCal: 3250,
        workouts: 88,
        deficit: 28000,
      },
      {
        weight: 96.0,
        bodyFat: 25.9,
        avgCal: 3180,
        workouts: 72,
        deficit: 21000,
      },
      {
        weight: 95.5,
        bodyFat: 25.2,
        avgCal: 3100,
        workouts: 65,
        deficit: 18000,
      },
      {
        weight: 94.2,
        bodyFat: 24.6,
        avgCal: 2980,
        workouts: 98,
        deficit: 35000,
      },
      {
        weight: 92.8,
        bodyFat: 23.9,
        avgCal: 2850,
        workouts: 115,
        deficit: 52000,
      },
      {
        weight: 89.8,
        bodyFat: 21.5,
        avgCal: 2650,
        workouts: 210,
        deficit: 95000,
      },
      {
        weight: 87.8,
        bodyFat: 20.4,
        avgCal: 2520,
        workouts: 175,
        deficit: 68000,
      },
      {
        weight: 85.2,
        bodyFat: 18.9,
        avgCal: 2420,
        workouts: 78,
        deficit: 38000,
      },
      {
        weight: 83.6,
        bodyFat: 17.9,
        avgCal: 2340,
        workouts: 96,
        deficit: 46000,
      },
      {
        weight: 82.5,
        bodyFat: 17.2,
        avgCal: 2280,
        workouts: 84,
        deficit: 48000,
      },
    ],
  };

  const currentTrend = trendData[trendPeriod];

  const CircularScore = ({ score, size = 120 }) => {
    const r = (size - 16) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (score / 100) * c;
    const color =
      score >= 85
        ? "text-emerald-400"
        : score >= 70
        ? "text-amber-400"
        : "text-rose-400";

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-800"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="url(#g)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g">
              <stop offset="0%" className={color} stopColor="currentColor" />
              <stop
                offset="100%"
                className={score >= 85 ? "text-teal-400" : "text-orange-400"}
                stopColor="currentColor"
              />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${
              size >= 120 ? "text-3xl" : "text-2xl"
            } font-light ${color}`}
          >
            {score}
          </div>
        </div>
      </div>
    );
  };

  const TrendChart = ({ label, vals, unit, isPos }) => {
    const change = vals[vals.length - 1] - vals[0];
    const isGreen = isPos ? change > 0 : change < 0;
    const color = isGreen ? "rgb(52, 211, 153)" : "rgb(249, 115, 22)";
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const range = max - min || 1;
    const pts = vals
      .map(
        (v, i) =>
          `${(i / (vals.length - 1)) * 400},${95 - ((v - min) / range) * 85}`
      )
      .join(" ");

    return (
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-base font-light text-white">{label}</h4>
          <div className="text-right">
            <div className="text-lg font-light text-white">
              {vals[vals.length - 1].toFixed(1)} {unit}
            </div>
            <div
              className={`text-sm ${
                isGreen ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {change > 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}
            </div>
          </div>
        </div>
        <div className="relative h-32 bg-gray-900/50 rounded-xl p-3">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`g${label}`}>
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,100 ${pts} 400,100`} fill={`url(#g${label})`} />
            <polyline points={pts} fill="none" stroke={color} strokeWidth="2" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-white mb-2">Health Coach</h1>
          <p className="text-gray-500 text-sm">January 14, 2026</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 fixed left-0 right-0 z-40 w-full"
        style={{ top: "100px" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              ["today", "Today"],
              ["progress", "Progress"],
              ["coach", "Talk to Your Coach"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 border-b-2 font-light ${
                  activeTab === id
                    ? "border-white text-white"
                    : "border-transparent text-gray-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ paddingTop: "160px" }}>
        <div className="max-w-4xl mx-auto p-6">
          {activeTab === "today" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="flex flex-col items-center">
                  <CircularScore score={data.scores.performance} size={160} />
                  <div className="mt-6 text-center">
                    <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Performance Score
                    </div>
                    <div className="text-2xl font-light text-white">
                      Strong Day Overall
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center max-w-2xl mx-auto">
                  <p className="text-gray-300 text-sm">
                    Excellent boxing session and solid nutrition tracking.
                    You're slightly under calorie target but recovery looks
                    strong.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-xl font-light text-white">Nutrition</h3>
                    <CircularScore score={data.scores.nutrition} size={80} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {[
                    [
                      "Net",
                      data.nutrition.calories.net,
                      "of " + data.nutrition.calories.target,
                    ],
                    ["Consumed", data.nutrition.calories.consumed, "cal in"],
                    ["Burned", data.nutrition.calories.burned, "cal out"],
                  ].map(([label, val, sub]) => (
                    <div key={label}>
                      <div className="text-sm text-gray-500 mb-2">{label}</div>
                      <div className="text-3xl font-light text-white">
                        {val}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{sub}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    [
                      "Carbs",
                      data.nutrition.macros.carbs,
                      "from-yellow-400 to-amber-500",
                    ],
                    [
                      "Protein",
                      data.nutrition.macros.protein,
                      "from-blue-400 to-cyan-500",
                    ],
                    [
                      "Fat",
                      data.nutrition.macros.fat,
                      "from-purple-400 to-pink-500",
                    ],
                  ].map(([name, d, color]) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{name}</span>
                        <span className="text-white">
                          {d.g}g · {d.pct}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${color} h-2 rounded-full`}
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-4 border border-indigo-800/30">
                  <p className="text-gray-300 text-sm">
                    💪 You're{" "}
                    <span className="font-semibold text-white">
                      500 cal under
                    </span>{" "}
                    but protein is{" "}
                    <span className="font-semibold text-emerald-400">
                      crushing it at 200g
                    </span>
                    . Add a carb snack 90 min before boxing.
                  </p>
                  <div className="mt-3 pt-3 border-t border-indigo-800/30">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">💡 PRO TIP:</span>{" "}
                      Post-workout, hit 40-50g protein within 2 hours.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-xl font-light text-white">Activity</h3>
                    <CircularScore score={data.scores.activity} size={80} />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">
                    Total Calories Burned
                  </div>
                  <div className="text-4xl font-light text-orange-400">
                    {data.nutrition.calories.burned}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-700">
                  {[
                    ["Steps", data.activity.steps.toLocaleString()],
                    ["Active Min", data.activity.activeMinutes],
                    ["Rest HR", data.activity.restingHR],
                    ["HRV", data.activity.hrv],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div className="text-sm text-gray-500 mb-1">{l}</div>
                      <div className="text-2xl font-light text-white">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                  <div className="text-sm text-gray-400 uppercase mb-3">
                    Today's Workouts
                  </div>
                  {data.activity.workouts.map((w, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-5 border border-indigo-800/50"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="text-lg font-light text-white">
                            {w.type}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {w.duration} min · {w.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-light text-orange-400">
                            {w.calories}
                          </div>
                          <div className="text-xs text-gray-400">cal</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-4 border border-indigo-800/30">
                  <p className="text-gray-300 text-sm">
                    🔥{" "}
                    <span className="font-semibold text-white">
                      Beast mode!
                    </span>{" "}
                    90-min boxing burned{" "}
                    <span className="font-semibold text-orange-400">
                      550 calories
                    </span>
                    . Resting HR of 52 shows elite fitness.
                  </p>
                  <div className="mt-3 pt-3 border-t border-indigo-800/30">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">💡 PRO TIP:</span> HRV at
                      68ms is solid. Schedule that 6th workout tomorrow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Moon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-xl font-light text-white">Recovery</h3>
                    <CircularScore score={data.scores.recovery} size={80} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {[
                    [
                      "Sleep",
                      data.activity.sleep.duration + "h",
                      data.activity.sleep.deepSleep + "h deep",
                    ],
                    ["Quality", data.activity.sleep.quality + "%", ""],
                    ["Readiness", data.readiness, "Oura score"],
                  ].map(([l, v, s]) => (
                    <div key={l}>
                      <div className="text-sm text-gray-500 mb-1">{l}</div>
                      <div className="text-3xl font-light text-white">{v}</div>
                      <div className="text-sm text-gray-400 mt-1">{s}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-4 border border-purple-800/30">
                  <p className="text-gray-300 text-sm">
                    😴{" "}
                    <span className="font-semibold text-white">
                      Solid recovery!
                    </span>{" "}
                    7.5h sleep with 85% quality. Push for 8 hours tonight.
                  </p>
                  <div className="mt-3 pt-3 border-t border-purple-800/30">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">💡 PRO TIP:</span> Cut
                      screens 1hr before bed. Keep room at 65-68°F.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <h3 className="text-2xl font-light text-white mb-8">
                  Weekly Summary
                </h3>
                <div className="grid grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-700">
                  {[
                    [
                      weekly.workoutsCompleted + "/" + weekly.workoutsTarget,
                      "Workouts",
                      "text-white",
                    ],
                    [
                      "-" + weekly.bodyFatChange + "%",
                      "Body Fat",
                      "text-emerald-400",
                    ],
                    [weekly.avgCalories, "Avg Calories", "text-white"],
                    [
                      weekly.calorieDeficit,
                      "Weekly Deficit",
                      "text-orange-400",
                    ],
                  ].map(([v, l, c]) => (
                    <div key={l} className="text-center">
                      <div className={`text-4xl font-light mb-2 ${c}`}>{v}</div>
                      <div className="text-xs text-gray-500 uppercase">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-700">
                  {[
                    [weekly.avgProtein, "Avg Protein"],
                    [weekly.avgCarbs, "Avg Carbs"],
                    [weekly.avgFat, "Avg Fat"],
                  ].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <div className="text-3xl font-light text-white">{v}g</div>
                      <div className="text-xs text-gray-500 uppercase">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    [
                      "✅ Wins",
                      [
                        "5 sessions",
                        "Protein: 195g",
                        "Lost 0.5% fat",
                        "Tracked daily",
                      ],
                      "emerald",
                    ],
                    [
                      "⚠️ Improve",
                      ["Hit 6 workouts", "More carbs", "Less fat"],
                      "amber",
                    ],
                  ].map(([title, items, color]) => (
                    <div
                      key={title}
                      className={`bg-gradient-to-br from-${color}-900/30 to-${color}-900/30 rounded-2xl p-5 border border-${color}-800/50`}
                    >
                      <div className="font-light text-white mb-3">{title}</div>
                      <div className="space-y-2 text-sm text-gray-300">
                        {items.map((item, i) => (
                          <div key={i} className="flex gap-2">
                            <div
                              className={`w-1 h-1 rounded-full bg-${color}-400 mt-2`}
                            ></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-4 border border-indigo-800/30">
                  <p className="text-gray-300 text-sm">
                    📊{" "}
                    <span className="font-semibold text-white">
                      Excellent week!
                    </span>{" "}
                    {weekly.avgDeficitPerDay} cal/day deficit drove -0.6kg and
                    -0.5% body fat.
                  </p>
                  <div className="mt-3 pt-3 border-t border-indigo-800/30">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">💡 PRO TIP:</span> Stay
                      consistent for 10-12% in 12-14 weeks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <h3 className="text-2xl font-light text-white mb-4">
                  What Your Trend Looks Like
                </h3>
                <div className="flex gap-2 mb-8">
                  {["1W", "1M", "3M", "6M", "YTD", "1Y", "3Y", "MAX"].map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => setTrendPeriod(p)}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          trendPeriod === p
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
                <div className="space-y-8">
                  {[
                    [
                      "Body Weight",
                      currentTrend.map((d) => d.weight),
                      "kg",
                      false,
                    ],
                    [
                      "Body Fat %",
                      currentTrend.map((d) => d.bodyFat),
                      "%",
                      false,
                    ],
                    [
                      "Avg Calories",
                      currentTrend.map((d) => d.avgCal),
                      "cal",
                      false,
                    ],
                    [
                      "Deficit",
                      currentTrend.map((d) => d.deficit),
                      "cal",
                      true,
                    ],
                    ["Workouts", currentTrend.map((d) => d.workouts), "", true],
                  ].map(([label, vals, unit, isPos]) => (
                    <TrendChart
                      key={label}
                      label={label}
                      vals={vals}
                      unit={unit}
                      isPos={isPos}
                    />
                  ))}
                </div>
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-4 border border-indigo-800/30 mt-8">
                  <p className="text-gray-300 text-sm">
                    📈{" "}
                    <span className="font-semibold text-white">
                      Rock-solid trend!
                    </span>{" "}
                    Steady progress without plateaus.
                  </p>
                  <div className="mt-3 pt-3 border-t border-indigo-800/30">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">💡 PRO TIP:</span> This pace
                      preserves muscle!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "coach" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light text-white mb-2">
                      Daily Summary Assessment
                    </h3>
                    <p className="text-sm text-gray-400 mb-6">
                      January 14, 2026
                    </p>

                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-5 border border-indigo-800/30">
                        <p className="font-medium text-white mb-3">
                          🎯 Overall Performance Score: 82/100 - Strong Day
                        </p>
                        <p>
                          You're executing well! Your boxing session was intense
                          (550 calories, 90 minutes), your protein intake is
                          stellar at 200g, and recovery metrics from last night
                          show you're adapting to the training load. You're
                          slightly under your calorie target by 500 calories,
                          which isn't ideal long-term, but one day won't hurt.
                          The big picture: you're{" "}
                          <span className="font-semibold text-emerald-400">
                            down 0.5% body fat this week
                          </span>{" "}
                          and{" "}
                          <span className="font-semibold text-white">
                            on pace to reach 10-12% body fat in 12-14 weeks
                          </span>
                          .
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-2xl p-5 border border-emerald-800/30">
                        <p className="font-medium text-white mb-3">
                          📈 Progress Context (Last 4 Weeks)
                        </p>
                        <p>
                          You've dropped{" "}
                          <span className="font-semibold text-emerald-400">
                            1.2kg and 0.8% body fat
                          </span>{" "}
                          over the past month. Your weekly calorie deficit
                          averages{" "}
                          <span className="font-semibold text-white">
                            3,100 calories
                          </span>
                          , which is driving sustainable fat loss. You're
                          maintaining{" "}
                          <span className="font-semibold text-white">
                            5-6 training sessions per week
                          </span>{" "}
                          consistently. This is textbook progress - not too fast
                          (which would sacrifice muscle), not too slow (which
                          would be frustrating). Your resting heart rate has
                          improved from 56 to 52 bpm, showing cardiovascular
                          adaptation.
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-5 border border-purple-800/30">
                        <p className="font-medium text-white mb-3">
                          💪 What's Working Best
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Protein consistency:
                            </span>{" "}
                            Averaging 195g daily - this is why you're losing
                            fat, not muscle
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Training intensity:
                            </span>{" "}
                            Your sessions are quality over quantity. 550-cal
                            boxing sessions show real effort
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Tracking discipline:
                            </span>{" "}
                            7 days of consistent logging - this awareness drives
                            results
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Sleep quality:
                            </span>{" "}
                            85% sleep quality and 1.8h deep sleep support
                            recovery
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-2xl p-5 border border-amber-800/30">
                        <p className="font-medium text-white mb-3">
                          ⚠️ Areas Needing Attention
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Calorie intake:
                            </span>{" "}
                            You're consistently 300-500 cal under target. This
                            will slow metabolism over time
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Carb intake:
                            </span>{" "}
                            At 36% vs 40% target. You need more fuel for boxing
                            intensity
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Workout frequency:
                            </span>{" "}
                            Hit that 6th workout to maximize weekly deficit
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-white">
                              Sleep duration:
                            </span>{" "}
                            7.5h is okay but 8h would optimize recovery with
                            your training load
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-2xl p-5 border border-indigo-800/30">
                        <p className="font-medium text-white mb-3">
                          🎯 Next Steps to Accelerate Progress
                        </p>
                        <p>
                          <span className="font-semibold text-white">
                            Today:
                          </span>{" "}
                          Add a carb-rich evening meal (50-60g carbs, 40g
                          protein) to get closer to your target.{" "}
                          <span className="font-semibold text-white">
                            Tomorrow:
                          </span>{" "}
                          Schedule that 6th workout - your recovery metrics
                          support it.{" "}
                          <span className="font-semibold text-white">
                            This Week:
                          </span>{" "}
                          Focus on hitting 2,300 net calories consistently to
                          keep metabolism strong while continuing fat loss.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-700">
                <h3 className="text-xl font-light text-white mb-4">
                  Chat with Your Coach
                </h3>

                <div className="bg-black/30 rounded-2xl h-96 overflow-y-auto p-4 mb-4 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <MessageCircle className="w-16 h-16 text-gray-600 mb-4" />
                      <p className="text-gray-400 text-sm mb-2">
                        Ask me anything about your training, nutrition, or
                        progress!
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {[
                          "How should I eat today?",
                          "Should I train tomorrow?",
                          "Am I on track?",
                          "Tips for better sleep?",
                        ].map((q) => (
                          <button
                            key={q}
                            onClick={() => setInputMessage(q)}
                            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 ${
                            msg.role === "user"
                              ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                              : "bg-gray-800 text-gray-100 border border-gray-700"
                          }`}
                        >
                          {msg.file && msg.file.preview && (
                            <img
                              src={msg.file.preview}
                              alt="Uploaded"
                              className="rounded-lg mb-2 max-w-full"
                            />
                          )}
                          {msg.file && !msg.file.preview && (
                            <div className="bg-gray-700 rounded-lg p-2 mb-2 text-xs">
                              📎 {msg.file.name}
                            </div>
                          )}
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                          <p className="text-xs opacity-60 mt-2">
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3">
                  {selectedFile && (
                    <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between border border-gray-700">
                      <div className="flex items-center gap-3">
                        {selectedFile.preview ? (
                          <img
                            src={selectedFile.preview}
                            alt="Preview"
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xs">
                            📎
                          </div>
                        )}
                        <span className="text-sm text-gray-300">
                          {selectedFile.name}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileSelect}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl cursor-pointer transition-colors flex items-center justify-center border border-gray-700"
                    >
                      <span className="text-xl">📎</span>
                    </label>

                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Ask your coach anything..."
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
                    />

                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() && !selectedFile}
                      className="px-6 py-3 bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCoachApp;
