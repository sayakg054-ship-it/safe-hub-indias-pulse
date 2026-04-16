import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Shield, Activity, ChevronRight } from "lucide-react";
import { indianCities } from "@/lib/data";

interface CitySelectorProps {
  onSelectCity: (city: string) => void;
  userName?: string;
  onSignOut?: () => void;
}

export function CitySelector({ onSelectCity, userName, onSignOut }: CitySelectorProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return indianCities.slice(0, 12);
    return indianCities.filter(c =>
      c.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }, [query]);

  const popularCities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gradient-hero relative overflow-hidden">
      {/* User bar */}
      {userName && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <span className="text-primary-foreground/80 text-sm font-medium">Hi, {userName}!</span>
          {onSignOut && (
            <Button variant="ghost" size="sm" onClick={onSignOut} className="text-primary-foreground/70 hover:bg-background/10 h-8 px-2">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-background/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-background/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Logo */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-background/10 backdrop-blur-sm mb-6 animate-float">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-3 tracking-tight">
          SafeHub
        </h1>
        <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-md mx-auto">
          Stay informed about health hazards, air quality, and disease outbreaks in your city across India.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter your city name..."
            className="h-14 pl-12 pr-4 text-base rounded-2xl border-0 bg-background shadow-xl focus-visible:ring-2 focus-visible:ring-background/50"
          />
        </div>

        {/* Popular cities */}
        {!query && (
          <div className="mb-6">
            <p className="text-xs text-primary-foreground/60 mb-3 uppercase tracking-wider font-medium">Popular Cities</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCities.map(city => (
                <Button
                  key={city}
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelectCity(city)}
                  className="rounded-full bg-background/15 text-primary-foreground border-0 hover:bg-background/25 backdrop-blur-sm gap-1.5"
                >
                  <MapPin className="h-3 w-3" /> {city}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search results */}
        {query && (
          <div className="bg-background rounded-2xl shadow-xl overflow-hidden text-left">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                No cities found. Try a different name.
              </div>
            ) : (
              filtered.map(city => (
                <button
                  key={city}
                  onClick={() => onSelectCity(city)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-foreground hover:bg-accent transition-colors border-b border-border last:border-0"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="flex-1 text-left font-medium">{city}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))
            )}
          </div>
        )}

        {/* Stats */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            { label: "Cities", value: "100+", icon: MapPin },
            { label: "Active Alerts", value: "500+", icon: Activity },
            { label: "Users Safe", value: "10K+", icon: Shield },
          ].map(s => (
            <div key={s.label} className="text-center">
              <s.icon className="h-4 w-4 mx-auto text-primary-foreground/60 mb-1" />
              <div className="text-xl font-bold text-primary-foreground">{s.value}</div>
              <div className="text-[10px] text-primary-foreground/60 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
