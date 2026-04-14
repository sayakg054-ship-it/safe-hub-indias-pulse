export const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai",
  "Kolkata", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore",
  "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad",
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot",
  "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior",
  "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh",
  "Guwahati", "Solapur", "Hubli", "Mysore", "Tiruchirappalli", "Bareilly",
  "Aligarh", "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar",
  "Salem", "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur",
  "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack",
  "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur",
  "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola",
  "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi",
  "Ulhasnagar", "Jammu", "Sangli", "Mangalore", "Erode", "Belgaum",
  "Kurnool", "Ambattur", "Rajahmundry", "Tirunelveli", "Malegaon",
  "Gaya", "Udaipur", "Kakinada", "Davanagere", "Kozhikode", "Shimla",
  "Gangtok", "Imphal", "Aizawl", "Itanagar", "Shillong", "Kohima",
  "Agartala", "Port Blair", "Panaji", "Puducherry", "Daman", "Silvassa"
];

export type AlertSeverity = "critical" | "warning" | "moderate" | "info";

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: string;
  icon: string;
  timestamp: string;
  affected: string;
  source: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export function getAlertsForCity(city: string): HealthAlert[] {
  const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const alerts: HealthAlert[] = [
    {
      id: "1",
      title: `Dengue Outbreak Alert`,
      description: `${Math.floor(hash % 50 + 20)} new dengue cases reported in ${city} in the last 7 days. Stagnant water breeding sites identified in multiple wards.`,
      severity: hash % 3 === 0 ? "critical" : "warning",
      category: "Disease Outbreak",
      icon: "bug",
      timestamp: "2 hours ago",
      affected: `${Math.floor(hash % 5 + 3)} wards`,
      source: "Municipal Health Dept."
    },
    {
      id: "2",
      title: `Air Quality Index: ${hash % 200 + 100}`,
      description: `AQI in ${city} is currently at ${hash % 200 + 100} (${hash % 200 + 100 > 200 ? 'Poor' : 'Moderate'}). PM2.5 levels elevated due to construction and vehicular emissions.`,
      severity: hash % 200 + 100 > 200 ? "critical" : "moderate",
      category: "Air Quality",
      icon: "wind",
      timestamp: "Live",
      affected: "Entire city",
      source: "CPCB India"
    },
    {
      id: "3",
      title: `Water Contamination Warning`,
      description: `Elevated coliform levels detected in water supply for zones 3-7 of ${city}. Boil water advisory in effect.`,
      severity: "warning",
      category: "Water Safety",
      icon: "droplets",
      timestamp: "5 hours ago",
      affected: "Zones 3-7",
      source: "Water Authority"
    },
    {
      id: "4",
      title: `Heat Wave Advisory`,
      description: `Temperatures in ${city} expected to reach ${hash % 8 + 40}°C. Vulnerable populations urged to stay indoors between 11 AM - 4 PM.`,
      severity: "warning",
      category: "Weather",
      icon: "thermometer",
      timestamp: "Today",
      affected: "All areas",
      source: "IMD"
    },
    {
      id: "5",
      title: `COVID-19 Update`,
      description: `${Math.floor(hash % 30 + 5)} new cases in ${city}. Vaccination drive ongoing at ${Math.floor(hash % 10 + 5)} centers.`,
      severity: "info",
      category: "Pandemic",
      icon: "shield",
      timestamp: "Today",
      affected: "All areas",
      source: "Health Ministry"
    }
  ];
  return alerts;
}

export function getDailyQuiz(): QuizQuestion[] {
  return [
    {
      id: "q1",
      question: "What is the most effective way to prevent dengue?",
      options: [
        "Taking antibiotics",
        "Eliminating stagnant water",
        "Wearing warm clothes",
        "Eating spicy food"
      ],
      correctAnswer: 1,
      explanation: "Dengue mosquitoes breed in stagnant water. Removing all standing water sources is the most effective prevention.",
      points: 10
    },
    {
      id: "q2",
      question: "An AQI above 200 is considered:",
      options: ["Good", "Satisfactory", "Poor", "Very Poor"],
      correctAnswer: 3,
      explanation: "AQI above 200 is 'Very Poor' and can cause respiratory issues, especially for sensitive groups.",
      points: 10
    },
    {
      id: "q3",
      question: "During a heat wave, you should:",
      options: [
        "Exercise outdoors at noon",
        "Drink caffeinated beverages",
        "Stay hydrated with ORS and water",
        "Wear dark, tight clothing"
      ],
      correctAnswer: 2,
      explanation: "Staying hydrated with ORS and water is crucial during heat waves to prevent heat stroke and dehydration.",
      points: 10
    },
    {
      id: "q4",
      question: "Which mask type is most effective against air pollution?",
      options: ["Cloth mask", "Surgical mask", "N95 mask", "No mask needed"],
      correctAnswer: 2,
      explanation: "N95 masks filter at least 95% of airborne particles including PM2.5, making them most effective against pollution.",
      points: 10
    },
    {
      id: "q5",
      question: "Boil water advisory means you should boil water for at least:",
      options: ["30 seconds", "1 minute", "5 minutes", "10 minutes"],
      correctAnswer: 1,
      explanation: "Boiling water for at least 1 minute kills most pathogens. At higher altitudes, boil for 3 minutes.",
      points: 10
    }
  ];
}
