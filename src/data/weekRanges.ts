// src/data/weekRanges.ts

interface DateTuple {
  month: number; // 0-indexed
  day: number;
}

interface WeekRange {
  weekNumber: number;
  start: DateTuple;
  end: DateTuple;
}

export const weekRanges: WeekRange[] = [
  
    { weekNumber: 1, start: { month: 0, day: 1 }, end: { month: 0, day: 7 } },
    { weekNumber: 2, start: { month: 0, day: 8 }, end: { month: 0, day: 14 } },
    { weekNumber: 3, start: { month: 0, day: 15 }, end: { month: 0, day: 21 } },
    { weekNumber: 4, start: { month: 0, day: 22 }, end: { month: 0, day: 28 } },

    { weekNumber: 5, start: { month: 0, day: 29 }, end: { month: 1, day: 4 } },
    { weekNumber: 6, start: { month: 1, day: 5 }, end: { month: 1, day: 11 } },
    { weekNumber: 7, start: { month: 1, day: 12 }, end: { month: 1, day: 18 } },
    { weekNumber: 8, start: { month: 1, day: 19 }, end: { month: 1, day: 25 } },

    { weekNumber: 9, start: { month: 1, day: 26 }, end: { month: 2, day: 4 } },
    { weekNumber: 10, start: { month: 2, day: 5 }, end: { month: 2, day: 11 } },
    { weekNumber: 11, start: { month: 2, day: 12 }, end: { month: 2, day: 18 } },
    { weekNumber: 12, start: { month: 2, day: 19 }, end: { month: 2, day: 25 } },

    { weekNumber: 13, start: { month: 2, day: 26 }, end: { month: 3, day: 1 } },
    { weekNumber: 14, start: { month: 3, day: 2 }, end: { month: 3, day: 8 } },
    { weekNumber: 15, start: { month: 3, day: 9 }, end: { month: 3, day: 15 } },
    { weekNumber: 16, start: { month: 3, day: 16 }, end: { month: 3, day: 22 } },

    { weekNumber: 17, start: { month: 3, day: 23 }, end: { month: 3, day: 29 } },
    { weekNumber: 18, start: { month: 3, day: 30 }, end: { month: 4, day: 6 } },
    { weekNumber: 19, start: { month: 4, day: 7 }, end: { month: 4, day: 13 } },
    { weekNumber: 20, start: { month: 4, day: 14 }, end: { month: 4, day: 20 } },

    { weekNumber: 21, start: { month: 4, day: 21 }, end: { month: 4, day: 27 } },
    { weekNumber: 22, start: { month: 4, day: 28 }, end: { month: 5, day: 3 } },
    { weekNumber: 23, start: { month: 5, day: 4 }, end: { month: 5, day: 10 } },
    { weekNumber: 24, start: { month: 5, day: 11 }, end: { month: 5, day: 17 } },

    { weekNumber: 25, start: { month: 5, day: 18 }, end: { month: 5, day: 24 } },
    { weekNumber: 26, start: { month: 5, day: 25 }, end: { month: 6, day: 1 } },
    { weekNumber: 27, start: { month: 6, day: 2 }, end: { month: 6, day: 8 } },
    { weekNumber: 28, start: { month: 6, day: 9 }, end: { month: 6, day: 15 } },

    { weekNumber: 29, start: { month: 6, day: 16 }, end: { month: 6, day: 22 } },
    { weekNumber: 30, start: { month: 6, day: 23 }, end: { month: 6, day: 29 } },
    { weekNumber: 31, start: { month: 6, day: 30 }, end: { month: 7, day: 5 } },
    { weekNumber: 32, start: { month: 7, day: 6 }, end: { month: 7, day: 12 } },

    { weekNumber: 33, start: { month: 7, day: 13 }, end: { month: 7, day: 19 } },
    { weekNumber: 34, start: { month: 7, day: 20 }, end: { month: 7, day: 26 } },
    { weekNumber: 35, start: { month: 7, day: 27 }, end: { month: 8, day: 2 } },
    { weekNumber: 36, start: { month: 8, day: 3 }, end: { month: 8, day: 9 } },

    { weekNumber: 37, start: { month: 8, day: 10 }, end: { month: 8, day: 16 } },
    { weekNumber: 38, start: { month: 8, day: 17 }, end: { month: 8, day: 23 } },
    { weekNumber: 39, start: { month: 8, day: 24 }, end: { month: 8, day: 30 } },
    { weekNumber: 40, start: { month: 9, day: 1 }, end: { month: 9, day: 7 } },

    { weekNumber: 41, start: { month: 9, day: 8 }, end: { month: 9, day: 14 } },
    { weekNumber: 42, start: { month: 9, day: 15 }, end: { month: 9, day: 21 } },
    { weekNumber: 43, start: { month: 9, day: 22 }, end: { month: 9, day: 28 } },
    { weekNumber: 44, start: { month: 9, day: 29 }, end: { month: 10, day: 4 } },

    { weekNumber: 45, start: { month: 10, day: 5 }, end: { month: 10, day: 11 } },
  { weekNumber: 46, start: { month: 10, day: 12 }, end: { month: 10, day: 18 } },
  { weekNumber: 47, start: { month: 10, day: 19 }, end: { month: 10, day: 25 } },
  { weekNumber: 48, start: { month: 10, day: 26 }, end: { month: 11, day: 2 } },

  { weekNumber: 49, start: { month: 11, day: 3 }, end: { month: 11, day: 9 } },
  { weekNumber: 50, start: { month: 11, day: 10 }, end: { month: 11, day: 16 } },
  { weekNumber: 51, start: { month: 11, day: 17 }, end: { month: 11, day: 23 } },
  { weekNumber: 52, start: { month: 11, day: 24 }, end: { month: 11, day: 31 } }];