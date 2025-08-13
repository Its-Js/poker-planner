import React, { useEffect, useState } from "react";
import { cards } from "../data/cards";
import { weekRanges } from "../data/weekRanges";

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getCardForDate(date: Date) {
  const year = date.getFullYear();
  const leapYear = isLeapYear(year);
  const isLeapDay = leapYear && date.getMonth() === 1 && date.getDate() === 29;
  const isDec31 = date.getMonth() === 11 && date.getDate() === 31;

  let currentWeekData = null;
  for (const weekRange of weekRanges) {
    const weekStartDate = new Date(
      year,
      weekRange.start.month,
      weekRange.start.day
    );
    const weekEndDate = new Date(year, weekRange.end.month, weekRange.end.day);
    if (date >= weekStartDate && date <= weekEndDate) {
      currentWeekData = weekRange;
      break;
    }
  }

  if (!currentWeekData) currentWeekData = weekRanges[51]; // fallback

  const cardIndex = currentWeekData.weekNumber - 1;
  const weekStart = new Date(
    year,
    currentWeekData.start.month,
    currentWeekData.start.day
  );
  const weekEnd = new Date(
    year,
    currentWeekData.end.month,
    currentWeekData.end.day
  );

  if (isLeapDay) {
    return {
      name: "Joker",
      isJoker: true,
      rank: "J",
      suitSymbol: "♛",
      color: "red",
      weekNumber: 9,
      weekStart,
      weekEnd,
      isLeapDay: true,
    };
  }

  if (isDec31) {
    return {
      name: "Joker",
      isJoker: true,
      rank: "J",
      suitSymbol: "♛",
      color: "black",
      weekNumber: 52,
      weekStart,
      weekEnd,
      isLeapDay: false,
    };
  }

  return {
    ...cards[cardIndex],
    weekNumber: currentWeekData.weekNumber,
    isJoker: false,
    isLeapDay: false,
    weekStart,
    weekEnd,
  };
}

const fixedWeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

interface DayInfo {
  label: string;
  dateNum: string;
  inRange: boolean;
  isToday: boolean;
}

function seededRandom(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000;
  const rand = x - Math.floor(x);
  return Math.floor(rand * (max - min + 1)) + min;
}

export default function CardIsland() {
  const [today, setToday] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const timer = setInterval(() => setToday(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) {
    // Prevent server/client flicker by rendering nothing on server
    return null;
  }

  const card = getCardForDate(today);

  const dayName = today.toLocaleDateString("en-GB", { weekday: "short" });
  const dateDisplay = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  let weekNumberPart = "";
  let weekRangePart = "";

  if (card.isJoker) {
    weekNumberPart = `Joker: ${dateDisplay}`;
    weekRangePart = "";
  } else {
    weekNumberPart = `Week ${card.weekNumber} / 52`;
    weekRangePart = `${card.weekStart.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })} – ${card.weekEnd.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })}`;
  }

  // Week Grid setup
  const startDate = new Date(card.weekStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weekGrid: DayInfo[] = [];

  for (let i = 0; i < 21; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);

    const inRange = day >= card.weekStart && day <= card.weekEnd;
    const isToday = day.toDateString() === today.toDateString();

    weekGrid.push({
      label: fixedWeekDays[day.getDay()],
      dateNum: String(day.getDate()).padStart(2, "0"),
      inRange,
      isToday,
    });
  }

  // Fan cards
  const fanSize = 13;
  const halfFan = Math.floor(fanSize / 2);
  const currentIndex = (card.weekNumber ?? 1) - 1;
  const totalCards = 52;

  let startIdx = currentIndex - halfFan;
  let endIdx = currentIndex + halfFan;

  if (startIdx < 0) {
    endIdx += -startIdx;
    startIdx = 0;
  }
  if (endIdx > totalCards - 1) {
    startIdx -= endIdx - (totalCards - 1);
    endIdx = totalCards - 1;
    if (startIdx < 0) startIdx = 0;
  }

  const fanCards = cards.slice(startIdx, endIdx + 1);

  return (
    <>
      <div className="clock">
        <div className="date">
          {dayName} {dateDisplay}
        </div>
        <div id="time" className="time">
          {String(today.getHours()).padStart(2, "0")}:
          {String(today.getMinutes()).padStart(2, "0")}
        </div>
      </div>

      <div className="cal">
        <div className="week-number">
          <strong>{weekNumberPart}</strong>
          {!card.isJoker && ": "}
          <span className="week-range">{weekRangePart}</span>
        </div>

        <div className="week-grid">
          {weekGrid.slice(0, 7).map((day, i) => {
            const isWeekend = day.label === "sun" || day.label === "sat";
            return (
              <div
                key={`label-${i}`}
                className={`week-cell week-label ${isWeekend ? "weekend" : ""}`}
              >
                {day.label}
              </div>
            );
          })}
          {weekGrid.map((day, i) => (
            <div
              key={`day-${i}`}
              className={`week-cell ${!day.inRange ? "out-of-range" : ""} ${
                day.isToday ? "today" : ""
              }`}
            >
              {day.dateNum}
            </div>
          ))}
        </div>
      </div>

      <div className="card-fan-display">
        <div
          className="card-fan"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(13, 60px)`,
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {fanCards.map((c, i) => {
            const isCurrent = startIdx + i === currentIndex;
            const relativePos = i - halfFan;
            const seed = startIdx + i;
            const rotationDegree = seededRandom(seed, 1, 5);
            const rotation = relativePos < 0 ? -rotationDegree : rotationDegree;

            const isJokerCard = isCurrent && card.isJoker;

            return (
              <div
                key={`card-${i}`}
                className={`card ${isCurrent ? "current" : ""}`}
                style={{
                  transform: isCurrent
                    ? "translateY(-50px)"
                    : `rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <div className="card-corner">
                  <div className="card-rank">{isJokerCard ? "J" : c.rank}</div>
                  <div
                    className={`card-suit-symbol ${
                      isJokerCard ? card.color : c.suit?.toLowerCase()
                    }`}
                  >
                    {isJokerCard ? "♛" : c.suitSymbol}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
