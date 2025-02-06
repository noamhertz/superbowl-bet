const bets = [
  {
    id: 1,
    title: "Game Leaders Parlay - Most Pass / Rec / Rush Yards",
    options: [
      { label: "Patrick Mahomes / Travis Kelce / Saquon Barkley", odds: "+500" },
      { label: "Patrick Mahomes / A.J. Brown / Saquon Barkley", odds: "+550" },
      { label: "Jalen Hurts / A.J. Brown / Saquon Barkley", odds: "+700" },
      { label: "Patrick Mahomes / Xavier Worthy / Saquon Barkley", odds: "+800" },
      { label: "Patrick Mahomes / DeVonta Smith / Saquon Barkley", odds: "+1200" },
      { label: "Jalen Hurts / DeVonta Smith / Saquon Barkley", odds: "+1200" },
      { label: "Patrick Mahomes / Marquise Brown / Saquon Barkley", odds: "+1600" },
      { label: "Patrick Mahomes / Dallas Goedert / Saquon Barkley", odds: "+1600" },
      { label: "Jalen Hurts / Dallas Goedert / Saquon Barkley", odds: "+1800" },
      { label: "Jalen Hurts / Travis Kelce / Saquon Barkley", odds: "+3000" },
    ],
  },
  {
    id: 2,
    title: "Super Bowl MVP [All Bets Action]",
    options: [
      { label: "Patrick Mahomes", odds: "+120" },
      { label: "Saquon Barkley", odds: "+260" },
      { label: "Jalen Hurts", odds: "+350" },
      { label: "Travis Kelce", odds: "+1500" },
      { label: "Xavier Worthy", odds: "+2800" },
      { label: "A.J. Brown", odds: "+3500" },
      { label: "Kareem Hunt", odds: "+6000" },
      { label: "Chris Jones", odds: "+6000" },
      { label: "DeVonta Smith", odds: "+6500" },
      { label: "Jalen Carter", odds: "+7000" },
    ],
  },
  {
    id: 3,
    title: "Phi total team touchdowns",
    options: [
      { label: "Over 2.5", odds: "-160" },
      { label: "Under 2.5", odds: "+124" },
    ],
  },
  {
    id: 4,
    title: "KC total team touchdowns",
    options: [
      { label: "Over 2.5", odds: "-166" },
      { label: "Under 2.5", odds: "+130" },
    ],
  },
  {
    id: 5,
    title: "KC Chiefs Total Points Bands",
    options: [
      { label: "21-30", odds: "+120" },
      { label: "11-20", odds: "+220" },
      { label: "31-40", odds: "+330" },
      { label: "0-10", odds: "+1400" },
      { label: "41-50", odds: "+1800" },
      { label: "51+", odds: "+7500" },
    ],
  },
  {
    id: 6,
    title: "PHI Eagles Total Points Bands",
    options: [
      { label: "21-30", odds: "+120" },
      { label: "11-20", odds: "+205" },
      { label: "31-40", odds: "+360" },
      { label: "0-10", odds: "+1300" },
      { label: "41-50", odds: "+1900" },
      { label: "51+", odds: "+8000" },
    ],
  },
  {
    id: 7,
    title: "Who will win?",
    options: [
      { label: "PHI Eagles", odds: "+100" },
      { label: "KC Chiefs", odds: "-120" },
    ],
  },
  {
    id: 8,
    title: "Over/Under total points",
    options: [
      { label: "Over 48.5", odds: "-110" },
      { label: "Under 48.5", odds: "-110" },
    ],
  },
  {
    id: 9,
    title: "First TD Scorer Odds",
    options: [
      { label: "Patrick Mahomes", odds: "+1800" },
      { label: "Isiah Pacheco", odds: "+1700" },
      { label: "DeVonta Smith", odds: "+1700" },
      { label: "Marquise Brown", odds: "+1700" },
      { label: "A.J. Brown", odds: "+1200" },
    ],
  },
  {
    id: 10,
    title: "Anytime TD Scorer Odds",
    options: [
      { label: "Patrick Mahomes", odds: "+310" },
      { label: "Marquise Brown", odds: "+270" },
      { label: "Isiah Pacheco", odds: "+265" },
      { label: "DeVonta Smith", odds: "+240" },
    ],
  },
  {
    id: 11,
    title: "2+ Touchdowns Odds",
    options: [
      { label: "Marquise Brown", odds: "+2500" },
      { label: "Patrick Mahomes", odds: "+2500" },
      { label: "DeVonta Smith", odds: "+2000" },
    ],
  },
  {
    id: 12,
    title: "KC Chiefs 1st Drive Result",
    options: [
      { label: "Punt", odds: "+140" },
      { label: "Field Goal Attempt", odds: "+330" },
      { label: "Touchdown", odds: "+195" },
    ],
  },
  {
    id: 13,
    title: "PHI Eagles 1st Drive Result",
    options: [
      { label: "Punt", odds: "+130" },
      { label: "Field Goal Attempt", odds: "+360" },
      { label: "Touchdown", odds: "+205" },
    ],
  },
  {
    id: 14,
    title: "Betting Odds for Margin of Victory",
    options: [
      { label: "KC Win By 1-6 points", odds: "+250" },
      { label: "KC Win By 7-12 points", odds: "+425" },
      { label: "PHI Win By 1-6 points", odds: "+270" },
      { label: "PHI Win By 7-12 points", odds: "+475" },
    ],
  },
  {
    id: 15,
    title: "Guess exact correct score",
    options: [{ label: "Exact Score", odds: "+10000" }],
  },
];

export default bets;
