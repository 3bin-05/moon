import { MoonPhaseCard } from "@/components/MoonPhaseCard";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { getMoonPhase, formatFullDate } from "@/lib/moonPhase";
import { useState, useEffect } from "react";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaysMoonPhase, setTodaysMoonPhase] = useState(() => getMoonPhase(new Date()));

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setTodaysMoonPhase(getMoonPhase(today));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-cosmic relative overflow-hidden">
      {/* Cosmic background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--cosmic-accent)_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--cosmic-glow)_0%,_transparent_50%)] opacity-10" />
      
      {/* Live Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating stars with varied sizes and animations */}
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-cosmic-glow rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Moving particles across screen */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-cosmic-accent/60 rounded-full animate-float-across"
            style={{
              left: `-10px`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Cosmic dust clouds */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute rounded-full bg-cosmic-glow/5 animate-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${20 + Math.random() * 15}s`
            }}
          />
        ))}
        
        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-0.5 bg-gradient-to-r from-cosmic-accent to-transparent animate-shooting-star"
            style={{
              left: `${Math.random() * 50}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 15 + 5}s`,
              animationDuration: `2s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-lunar bg-clip-text text-transparent mb-4">
            🌙 Moon Phase Tracker
          </h1>
          <p className="text-xl text-cosmic-glow/80 max-w-2xl mx-auto">
            Discover today's lunar phase and explore the celestial dance of the moon through the coming week
          </p>
        </header>

        {/* Today's Moon Phase - Hero Section */}
        <section className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground mb-2">Today's Moon Phase</h2>
              <p className="text-lg text-cosmic-silver/70">{formatFullDate(currentDate)}</p>
            </div>
            
            <MoonPhaseCard
              moonPhase={todaysMoonPhase}
              isToday={true}
              className="max-w-md mx-auto scale-110 shadow-glow-primary"
            />
          </div>
        </section>

        {/* Interactive 30-Day Moon Calendar */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Interactive Moon Calendar</h2>
            <p className="text-lg text-cosmic-silver/70 max-w-2xl mx-auto">
              Click on any day to discover your moon luck and explore the lunar cycles
            </p>
          </div>
          <MonthlyCalendar />
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border/30">
          <p className="text-cosmic-silver/60">
            Powered by astronomical calculations • Built with cosmic precision
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
