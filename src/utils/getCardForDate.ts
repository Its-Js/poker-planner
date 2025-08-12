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
  const dayOfYear = Math.floor((+date - +startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  const isLeap = new Date(year, 1, 29).getMonth() === 1;
  const totalDays = isLeap ? 366 : 365;

  const july29Day = isLeap ? 211 : 210; // 29 July day of year
  if (dayOfYear === july29Day) {
    return { ...jokers[0], isJoker: true };
  }
  if (dayOfYear === totalDays) {
    return { ...jokers[1], isJoker: true };
  }

  const weekNumber = Math.floor((dayOfYear - 1) / 7);
  const card = cards[weekNumber];

  if (!card) {
    throw new Error("No card found for week number " + (weekNumber + 1));
  }

  const weekStart = new Date(startOfYear);
  weekStart.setDate(weekStart.getDate() + weekNumber * 7);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return {
    ...card,
    suitSymbol: suitSymbols[card.suit],
    weekNumber: weekNumber + 1,
    weekStart,
    weekEnd,
    isJoker: false,
  };
}
