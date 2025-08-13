import { cards } from '../data/cards';
import { weekRanges } from '../data/weekRanges'; // Import the single weekRanges array

export const getCardForDate = (date: Date) => {
    const year = date.getFullYear();
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; // Keep for isLeapDay check
    const startOfYear = new Date(year, 0, 1);

    // Find the current week based on the date
    let currentWeekData = null;
    for (const weekRange of weekRanges) { // Use the single weekRanges array
        const weekStartDate = new Date(year, weekRange.start.month, weekRange.start.day);
        const weekEndDate = new Date(year, weekRange.end.month, weekRange.end.day);

        if (date >= weekStartDate && date <= weekEndDate) {
            currentWeekData = weekRange;
            break;
        }
    }

    // If no week data found (should not happen for valid dates)
    if (!currentWeekData) {
        // Fallback to week 52
        currentWeekData = weekRanges[51];
    }

    const cardIndex = currentWeekData.weekNumber - 1;
    
    const weekStart = new Date(year, currentWeekData.start.month, currentWeekData.start.day);
    const weekEnd = new Date(year, currentWeekData.end.month, currentWeekData.end.day);

    const isLeapDay = isLeapYear && date.getMonth() === 1 && date.getDate() === 29;
    const isDec31 = date.getMonth() === 11 && date.getDate() === 31;

    if (isLeapDay) {
        return {
            name: 'Joker',
            isJoker: true,
            rank: 'J',
            suitSymbol: '♛',
            color: 'red',
            weekNumber: 9,
            weekStart,
            weekEnd,
            isLeapDay: true,
        };
    }

    if (isDec31) {
        return {
            name: 'Joker',
            isJoker: true,
            rank: 'J',
            suitSymbol: '♛',
            color: 'black',
            weekNumber: 52,
            weekStart,
            weekEnd,
            isLeapDay: false,
        };
    }

    return {
        ...cards[cardIndex],
        weekNumber: currentWeekData.weekNumber,
        isLeapDay: false,
        weekStart,
        weekEnd,
    };
};
