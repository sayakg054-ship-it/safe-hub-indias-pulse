import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin, ArrowLeft, Bell, Activity, Brain, Bot, Trophy,
  Thermometer, Wind, Droplets, LogOut, User
} from "lucide-react";
import { getAlertsForCity } from "@/lib/data";
import { AlertCard } from "@/components/AlertCard";
import { QuizSection } from "@/components/QuizSection";
import { ChatBot } from "@/components/ChatBot";

interface DashboardProps {
  city: string;
  onBack: () => void;
  userName?: string;
  onSignOut?: () => void;
}

export function Dashboard({ city, onBack, userName, onSignOut }: DashboardProps) {
  const alerts = getAlertsForCity(city);
  const hash = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const aqi = hash % 200 + 100;
  const temp = hash % 8 + 35;
  const humidity = hash % 30 + 50;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero px-4 pb-6 pt-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-primary-foreground hover:bg-background/10 gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="flex items-center gap-2">
              {userName && (
                <span className="text-primary-foreground/80 text-sm font-medium">Hi, {userName}</span>
              )}
              {onSignOut && (
                <Button variant="ghost" size="icon" onClick={onSignOut} className="text-primary-foreground/70 hover:bg-background/10 h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
              <Badge className="bg-background/15 text-primary-foreground border-0 backdrop-blur-sm gap-1">
                <Bell className="h-3 w-3" /> {alerts.length} Alerts
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary-foreground/80" />
            <h1 className="text-2xl font-bold text-primary-foreground">{city}</h1>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Wind, label: "AQI", value: aqi.toString(), sub: aqi > 200 ? "Poor" : "Moderate" },
              { icon: Thermometer, label: "Temp", value: `${temp}°C`, sub: "Feels hot" },
              { icon: Droplets, label: "Humidity", value: `${humidity}%`, sub: "High" },
            ].map(s => (
              <div key={s.label} className="bg-background/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <s.icon className="h-4 w-4 mx-auto text-primary-foreground/70 mb-1" />
                <div className="text-lg font-bold text-primary-foreground">{s.value}</div>
                <div className="text-[10px] text-primary-foreground/60">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 -mt-2">
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="alerts" className="gap-1.5 text-xs">
              <Activity className="h-3.5 w-3.5" /> Alerts
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-1.5 text-xs">
              <Trophy className="h-3.5 w-3.5" /> Quiz
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-1.5 text-xs">
              <Bot className="h-3.5 w-3.5" /> AI Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-3 pb-8">
            {alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="quiz" className="pb-8">
            <QuizSection />
          </TabsContent>

          <TabsContent value="chat" className="pb-8">
            <ChatBot />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
