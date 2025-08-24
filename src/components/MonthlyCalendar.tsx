import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCalendarGrid } from "@/lib/moonPhase";
import { MoonDayModal } from "./MoonDayModal";

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<{
    date: Date;
    moonPhase: any;
    luck: string;
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarData = getCalendarGrid(year, month);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(month - 1);
      } else {
        newDate.setMonth(month + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date | null) => {
    if (!date) return false;
    return date.getMonth() === month;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Calendar Header */}
      <Card className="bg-cosmic-card/50 border-cosmic-accent/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('prev')}
            className="text-cosmic-glow hover:bg-cosmic-accent/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <h2 className="text-3xl font-bold text-foreground">
            {MONTH_NAMES[month]} {year}
          </h2>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth('next')}
            className="text-cosmic-glow hover:bg-cosmic-accent/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS_OF_WEEK.map(day => (
            <div
              key={day}
              className="p-3 text-center font-semibold text-cosmic-silver/70 text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((dayData, index) => {
            const { date, moonPhase, luck } = dayData;
            const isCurrentMonthDay = isCurrentMonth(date);
            const isTodayDate = isToday(date);
            
            return (
              <Card
                key={index}
                className={`
                  relative aspect-square p-2 cursor-pointer transition-all duration-300
                  ${isCurrentMonthDay 
                    ? 'bg-cosmic-card/70 border-cosmic-accent/30 hover:bg-cosmic-accent/20 hover:scale-105 hover:shadow-glow-primary' 
                    : 'bg-cosmic-card/20 border-cosmic-accent/10 text-cosmic-silver/40'
                  }
                  ${isTodayDate ? 'ring-2 ring-cosmic-glow shadow-glow-primary' : ''}
                `}
                onClick={() => {
                  if (isCurrentMonthDay && date && moonPhase && luck) {
                    setSelectedDay({ date, moonPhase, luck });
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  {/* Date Number */}
                  <span className={`
                    text-sm font-medium
                    ${isCurrentMonthDay ? 'text-foreground' : 'text-cosmic-silver/40'}
                    ${isTodayDate ? 'text-cosmic-glow font-bold' : ''}
                  `}>
                    {date?.getDate()}
                  </span>
                  
                  {/* Moon Phase Icon */}
                  {isCurrentMonthDay && moonPhase && (
                    <div className="w-6 h-6 relative group">
                      <img
                        src={moonPhase.image}
                        alt={moonPhase.name}
                        className="w-full h-full object-contain transition-transform group-hover:scale-110"
                      />
                      {isTodayDate && (
                        <div className="absolute -inset-1 bg-cosmic-glow/20 rounded-full animate-pulse" />
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Moon Day Modal */}
      <MoonDayModal
        isOpen={!!selectedDay}
        onClose={() => setSelectedDay(null)}
        date={selectedDay?.date || null}
        moonPhase={selectedDay?.moonPhase || null}
        luck={selectedDay?.luck || null}
      />
    </div>
  );
}