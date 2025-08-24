// Moon phase calculation utilities
export interface MoonPhase {
  phase: number; // 0-1, where 0 and 1 are new moon
  name: string;
  emoji: string;
  illumination: number; // 0-100%
  image: string;
}

// Calculate moon phase based on date
export function getMoonPhase(date: Date): MoonPhase {
  // Known new moon date: January 11, 2024
  const knownNewMoon = new Date(2024, 0, 11);
  const lunarCycle = 29.530588853; // Days in a lunar cycle

  const timeDiff = date.getTime() - knownNewMoon.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  // Calculate phase position (0-1)
  let phase = (daysDiff % lunarCycle) / lunarCycle;
  if (phase < 0) phase += 1;

  return getPhaseDetails(phase);
}

function getPhaseDetails(phase: number): MoonPhase {
  const illumination = Math.round(50 * (1 - Math.cos(2 * Math.PI * phase)));

  if (phase < 0.0625 || phase >= 0.9375) {
    return {
      phase,
      name: "New Moon",
      emoji: "🌑",
      illumination,
      image: "/images/moon-new.png"
    };
  } else if (phase < 0.1875) {
    return {
      phase,
      name: "Waxing Crescent",
      emoji: "🌒",
      illumination,
      image: "/images/moon-waxing-crescent.png"
    };
  } else if (phase < 0.3125) {
    return {
      phase,
      name: "First Quarter",
      emoji: "🌓",
      illumination,
      image: "/images/moon-first-quarter.png"
    };
  } else if (phase < 0.4375) {
    return {
      phase,
      name: "Waxing Gibbous",
      emoji: "🌔",
      illumination,
      image: "/images/moon-waxing-gibbous.png"
    };
  } else if (phase < 0.5625) {
    return {
      phase,
      name: "Full Moon",
      emoji: "🌕",
      illumination,
      image: "/images/moon-full.png"
    };
  } else if (phase < 0.6875) {
    return {
      phase,
      name: "Waning Gibbous",
      emoji: "🌖",
      illumination,
      image: "/images/moon-waning-gibbous.png"
    };
  } else if (phase < 0.8125) {
    return {
      phase,
      name: "Third Quarter",
      emoji: "🌗",
      illumination,
      image: "/images/moon-third-quarter.png"
    };
  } else {
    return {
      phase,
      name: "Waning Crescent",
      emoji: "🌘",
      illumination,
      image: "/images/moon-waning-crescent.png"
    };
  }
}

// Get moon phases for the next N days
export function getMoonPhasesForDays(startDate: Date, days: number): Array<{ date: Date; moonPhase: MoonPhase }> {
  const phases = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    phases.push({
      date,
      moonPhase: getMoonPhase(date)
    });
  }

  return phases;
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

export function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Moon luck messages for each phase
export const moonLuckMessages: Record<string, string> = {
  "New Moon": "A fresh start is coming—set your intentions today.",
  "Waxing Crescent": "Energy is building—small steps bring luck.",
  "First Quarter": "Decision time arrives—trust your instincts for success.",
  "Waxing Gibbous": "Progress accelerates—your efforts are about to pay off.",
  "Full Moon": "Your efforts shine—luck favors bold moves.",
  "Waning Gibbous": "Share your wisdom—helping others brings good fortune.",
  "Third Quarter": "Release and reflect—clearing space invites new opportunities.",
  "Waning Crescent": "Let go of what no longer serves you—peace brings luck."
};

// Get moon phases for a full month (30 days)
export function getMoonPhasesForMonth(startDate: Date = new Date()): Array<{ date: Date; moonPhase: MoonPhase; luck: string }> {
  const phases = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const moonPhase = getMoonPhase(date);
    phases.push({
      date,
      moonPhase,
      luck: moonLuckMessages[moonPhase.name] || "The moon whispers secrets of good fortune."
    });
  }

  return phases;
}

// Get calendar grid for current month
export function getCalendarGrid(year: number, month: number): Array<{ date: Date | null; moonPhase: MoonPhase | null; luck: string | null }> {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

  const calendar = [];
  const current = new Date(startDate);

  // Generate 6 weeks (42 days) to fill calendar grid
  for (let i = 0; i < 42; i++) {
    if (current.getMonth() === month) {
      const moonPhase = getMoonPhase(current);
      calendar.push({
        date: new Date(current),
        moonPhase,
        luck: moonLuckMessages[moonPhase.name] || "The moon whispers secrets of good fortune."
      });
    } else {
      calendar.push({
        date: new Date(current),
        moonPhase: null,
        luck: null
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return calendar;
}
