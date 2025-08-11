// src/data/cards.ts
export const suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
export const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

export const cards = suits.flatMap(suit =>
  ranks.map(rank => ({
    suit,
    rank,
    name: `${rank} of ${suit}`
  }))
);

export const jokers = [
  { name: 'Mid-Year Joker' },
  { name: 'New Year Joker' }
];
