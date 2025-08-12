// src/data/cards.ts

export const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];

export const suitSymbols: Record<string, string> = {
  Spades: '♠',
  Hearts: '♥',
  Clubs: '♣',
  Diamonds: '♦',
};

export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Week-based cards: 52 weeks
export const cards = suits.flatMap((suit, suitIndex) =>
  ranks.map((rank, rankIndex) => {
    const weekNumber = suitIndex * 13 + rankIndex + 1;
    return {
      suit,
      rank,
      name: `${rank} of ${suit}`,
      suitSymbol: suitSymbols[suit],
      weekNumber,
      isJoker: false,
    };
  })
);

// Special Joker cards
export const jokers = [
  {
    name: 'Dec30 Joker',
    isJoker: true,
    suit: undefined,
    rank: 'JOKER',
    suitSymbol: '♛',
    date: { month: 11, day: 30 }, // Dec 30
  },
  {
    name: 'Dec31 Joker',
    isJoker: true,
    suit: undefined,
    rank: 'JOKER',
    suitSymbol: '♛',
    date: { month: 11, day: 31 }, // Dec 31
  },
];

// Optionally export full deck including jokers (only used when needed)
export const fullDeck = [...cards, ...jokers];
