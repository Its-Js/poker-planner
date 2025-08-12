import { cards, jokers } from "../data/cards";

const suitSymbols: Record<string, string> = {
  Spades: "♠",
  Hearts: "♥",
  Clubs: "♣",
  Diamonds: "♦",
};

export function getCardForDate(date: Date): {
  name: string;
  suit?: string;
  rank?: string;
  suitSymbol?: string;
  weekNumber?: number;
  weekStart?: Date;
  weekEnd?: Date;
  isJoker?: boolean;
} {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1); // Jan 1

  // Handle Dec 31 as a special Joker day
  if (date.getMonth() === 11 && date.getDate() === 31) {
    return { ...jokers[0], isJoker: true };
  }

  const dayOfYear = Math.floor((+date - +startOfYear) / 86400000) + 1;
  let weekNumber = Math.floor((dayOfYear - 1) / 7);

  // Clamp to valid range
  if (weekNumber < 0) weekNumber = 0;
  if (weekNumber > 51) weekNumber = 51;

  const card = cards[weekNumber];

  // === Week display range: Sunday–Saturday ===
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - weekStart.getDay()); // Back to Sunday

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); // Forward to Saturday

  return {
    ...card,
    suitSymbol: suitSymbols[card.suit],
    weekNumber: weekNumber + 1,
    weekStart,
    weekEnd,
    isJoker: false,
  };
}
