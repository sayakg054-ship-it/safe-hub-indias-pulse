import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CitySelector } from "@/components/CitySelector";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeHub — Health & Safety Alerts for Indian Cities" },
      { name: "description", content: "Stay informed about dengue outbreaks, air quality, water safety, and health hazards in your city across India." },
      { property: "og:title", content: "SafeHub — Health & Safety Alerts" },
      { property: "og:description", content: "Real-time health alerts, daily quizzes, and AI-powered safety guidance for Indian cities." },
    ],
  }),
  component: Index,
});

function Index() {
  const [city, setCity] = useState<string | null>(null);

  if (city) {
    return <Dashboard city={city} onBack={() => setCity(null)} />;
  }

  return <CitySelector onSelectCity={setCity} />;
}
