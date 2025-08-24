import { Card } from "@/components/ui/card";
import { MoonPhase } from "@/lib/moonPhase";

interface MoonPhaseCardProps {
  moonPhase: MoonPhase;
  date?: string;
  isToday?: boolean;
  className?: string;
}

export function MoonPhaseCard({ moonPhase, date, isToday = false, className = "" }: MoonPhaseCardProps) {
  // Convert the phase name (e.g., "Waxing Crescent") into a filename-friendly string (e.g., "waxing-crescent")
  const imageName = moonPhase.name.toLowerCase().replace(/ /g, "-");
  
  // Construct the direct path to the image in the 'public' folder ✅
  const moonImage = `/images/moon-${imageName}.png`;

  return (
    <Card className={`bg-gradient-card border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-glow-primary ${isToday ? 'ring-2 ring-primary shadow-glow-primary' : ''} ${className}`}>
      <div className="p-6 text-center space-y-4">
        {date && (
          <div className="text-sm font-medium text-muted-foreground">
            {date}
          </div>
        )}
        
        <div className="relative">
          <img 
            src={moonImage} 
            alt={moonPhase.name}
            className="w-20 h-20 mx-auto rounded-full shadow-cosmic"
          />
          <div className="absolute inset-0 rounded-full bg-cosmic-accent/10 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {moonPhase.name}
          </h3>
          <p className="text-sm text-cosmic-glow">
            {moonPhase.illumination}% Illuminated
          </p>
        </div>
      </div>
    </Card>
  );
}