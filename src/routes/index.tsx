import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CitySelector } from "@/components/CitySelector";
import { Dashboard } from "@/components/Dashboard";
import { AuthPage } from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, profile, loading, displayName, signUp, signIn, signOut, updateCity } = useAuth();
  const [city, setCity] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="text-primary-foreground text-lg animate-pulse">Loading SafeHub...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthPage
        onAuth={async (action, email, password, name) => {
          if (action === "signup") {
            await signUp(email, password, name || "");
          } else {
            await signIn(email, password);
          }
        }}
      />
    );
  }

  const handleSelectCity = (c: string) => {
    setCity(c);
    updateCity(c);
  };

  if (city) {
    return <Dashboard city={city} onBack={() => setCity(null)} userName={displayName} onSignOut={signOut} />;
  }

  return <CitySelector onSelectCity={handleSelectCity} userName={displayName} onSignOut={signOut} />;
}
