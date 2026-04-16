import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bug, Wind, Droplets, Thermometer, Shield,
  AlertTriangle, Flag, BookOpen, Zap, MapPin, ChevronDown, ChevronUp
} from "lucide-react";
import type { HealthAlert } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  bug: <Bug className="h-5 w-5" />,
  wind: <Wind className="h-5 w-5" />,
  droplets: <Droplets className="h-5 w-5" />,
  thermometer: <Thermometer className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
};

const severityStyles: Record<string, string> = {
  critical: "gradient-card-danger",
  warning: "gradient-card-warning",
  moderate: "gradient-card-info",
  info: "gradient-card-success",
};

const severityBadge: Record<string, { label: string; className: string }> = {
  critical: { label: "Critical", className: "bg-danger text-danger-foreground" },
  warning: { label: "Warning", className: "bg-warning text-warning-foreground" },
  moderate: { label: "Moderate", className: "bg-info text-info-foreground" },
  info: { label: "Info", className: "bg-success text-success-foreground" },
};

export function AlertCard({ alert }: { alert: HealthAlert }) {
  const badge = severityBadge[alert.severity];
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={`${severityStyles[alert.severity]} border-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/70 backdrop-blur-sm">
            {iconMap[alert.icon] || <AlertTriangle className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm">{alert.title}</h3>
              <Badge className={`${badge.className} text-[10px] px-1.5 py-0 border-0`}>
                {badge.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>

            {/* Affected localities */}
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <MapPin className="h-3 w-3 text-primary shrink-0" />
              <span className="text-[10px] font-medium text-foreground/80">Affected areas:</span>
              {alert.localities.map((loc) => (
                <Badge key={loc} variant="outline" className="text-[9px] px-1.5 py-0 bg-background/40 border-foreground/15">
                  {loc}
                </Badge>
              ))}
            </div>

            {/* Expandable hotspot details */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[10px] font-medium text-primary hover:underline mb-2"
            >
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {expanded ? "Hide" : "View"} hotspot details
            </button>
            {expanded && (
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-2.5 mb-2 space-y-1.5">
                {alert.hotspots.map((spot) => (
                  <div key={spot} className="flex items-center gap-2 text-[11px] text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {spot}
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3">
              <span>{alert.timestamp}</span>
              <span>•</span>
              <span>{alert.affected}</span>
              <span>•</span>
              <span>{alert.source}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 bg-background/50 backdrop-blur-sm">
                <Flag className="h-3 w-3" /> Report Issue
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 bg-background/50 backdrop-blur-sm">
                <BookOpen className="h-3 w-3" /> Learn More
              </Button>
              <Button size="sm" className="h-7 text-xs gap-1">
                <Zap className="h-3 w-3" /> Take Action
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
