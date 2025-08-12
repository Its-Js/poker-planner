// src/data/cards.ts

export const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
export const suitSymbols: Record<string, string> = {
  Spades: '♠',
  Hearts: '♥',
  Clubs: '♣',
  Diamonds: '♦'
};

export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Regular cards with weekNumber 1 to 52
export const cards = suits.flatMap((suit, suitIndex) =>
  ranks.map((rank, rankIndex) => {
    const weekNumber = suitIndex * 13 + rankIndex + 1;
    return {
      suit,
      rank,
      name: `${rank} of ${suit}`,
      suitSymbol: suitSymbols[suit],
      weekNumber
    };
  })
);

// Jokers linked to fixed dates
export const jokers = [
  {
    name: 'Mid-Year Joker',
    date: { month: 6, day: 29 },  // July 29 (month 0-based in JS Date, so 6 = July)
  },
  {
    name: 'New Year Joker',
    date: { month: 11, day: 31 }, // Dec 31
  }
];
