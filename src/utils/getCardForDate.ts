// src/utils/getCardForDate.ts
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
} {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1); // Jan 1
  const dayOfYear = Math.floor((+date - +startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  const isLeap = new Date(year, 1, 29).getMonth() === 1;
  const totalDays = isLeap ? 366 : 365;

  const july29Day = isLeap ? 211 : 210;
  if (dayOfYear === july29Day) return jokers[0]; // Mid-Year Joker
  if (dayOfYear === totalDays) return jokers[1]; // New Year Joker

  const weekNumber = Math.floor((dayOfYear - 1) / 7);
  const card = cards[weekNumber];

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
  };
}
