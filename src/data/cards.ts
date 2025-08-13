// src/data/cards.ts

export const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];

export const suitSymbols: Record<string, string> = {
  Spades: '♠',
  Hearts: '♥',
  Clubs: '♣',
  Diamonds: '♦',
};

export const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Week-based cards: 52 weeks, in order of suits
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
