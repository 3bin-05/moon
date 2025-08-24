import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonPhaseCard } from "./MoonPhaseCard";
import { getMoonPhasesForDays, formatDate } from "@/lib/moonPhase";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface SevenDayForecastProps {
  className?: string;
}

export function SevenDayForecast({ className = "" }: SevenDayForecastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const forecastData = getMoonPhasesForDays(tomorrow, 7);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          size="lg"
          className="bg-cosmic-card/50 border-cosmic-accent/30 text-foreground hover:bg-cosmic-accent/20 hover:border-cosmic-accent/50 transition-all duration-300"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Next 7 Days Forecast
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in slide-in-from-top-5 duration-500">
          {forecastData.map((data, index) => (
            <MoonPhaseCard
              key={index}
              moonPhase={data.moonPhase}
              date={formatDate(data.date)}
              className="transform transition-all duration-300 hover:scale-105"
            />
          ))}
        </div>
      )}
    </div>
  );
}