"use client";

import { useState, useEffect } from "react";
import { HStack, Heading, Text, Box } from "@chakra-ui/react";
import { bets as betsData } from "../../data/bets";

interface Bet {
  betId: number;
  option: string;
  wager: number;
  odds: string;
}

interface StoredBet {
  bettorName: string;
  bets: Bet[];
  timestamp: string;
}

export default function BetsPage() {
  const [bets, setBets] = useState<StoredBet[]>([]);
  const [correctBets, setCorrectBets] = useState<{ [betId: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertOddsToEU = (usOdds: string) => {
    const odds = parseFloat(usOdds);
    if (isNaN(odds)) return usOdds;
    return odds > 0 ? (odds / 100 + 1).toFixed(2) : (100 / Math.abs(odds) + 1).toFixed(2);
  };

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await fetch("/api/bets");
        if (!response.ok) throw new Error("Failed to fetch bets.");
        const data: StoredBet[] = await response.json();
        setBets(data);
      } catch (error) {
        console.error("Error fetching bets:", error);
        setError("Error loading bets.");
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  // Function to calculate winnings for each bettor
  const calculateWinnings = (bet: Bet) => {
    const correctOption = correctBets[bet.betId];
    if (!correctOption || bet.option !== correctOption) return 0; // Lost bet

    const oddsValue = parseFloat(bet.odds); // Convert to number
    if (isNaN(oddsValue)) return 0; // Handle invalid odds

    // Different formula for negative vs positive odds
    return oddsValue > 0
      ? bet.wager * (oddsValue / 100 + 1) // Positive Odds (+XXX)
      : bet.wager * (100 / Math.abs(oddsValue) + 1); // Negative Odds (-XXX)
  };

  // Function to calculate total points per bettor
  const calculateTotalPoints = (bettor: StoredBet) => {
    return Math.round(bettor.bets.reduce((total, bet) => total + calculateWinnings(bet), 0));
  };

  // Rank bettors by total points
  const rankedBettors = [...bets]
    .map((bettor) => ({ ...bettor, totalPoints: calculateTotalPoints(bettor) }))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <HStack gap={6} align="flex-start" w="100vw" p={4}>
      {/* Left Side - Mark Correct Bets */}
      <Box w="40%" p={4} borderWidth="1px" borderRadius="md">
        <Heading size="md" mb={4}>
          Mark Correct Bets
        </Heading>

        {betsData.map((bet) => (
          <Box key={bet.id} mb={4}>
            <Text fontWeight="bold">
              {bet.id}. {bet.title}
            </Text>

            {bet.id === 15 ? (
              // ✅ Input field for Exact Score bet
              <input
                type="text"
                placeholder="Enter exact score (e.g., 24-21 KC or 31-28 KC)"
                value={correctBets[bet.id] || ""}
                onChange={(e) => setCorrectBets({ ...correctBets, [bet.id]: e.target.value })} // Allow free typing
                onBlur={(e) => {
                  const value = e.target.value.toUpperCase().trim(); // Normalize input format
                  if (!/^\d{2}-\d{2} (KC|PHI)$/.test(value) && value !== "") {
                    alert("Score must be in 'XX-YY KC' or 'XX-YY PHI' format."); // Show validation error
                    setCorrectBets((prev) => ({ ...prev, [bet.id]: "" })); // Reset invalid input
                  } else {
                    setCorrectBets((prev) => ({ ...prev, [bet.id]: value })); // Save valid input
                  }
                }}
                style={{
                  width: "100%",
                  border: "1px solid #e4e4e7",
                  borderRadius: "0.25rem",
                  padding: "0.25rem",
                }}
              />
            ) : (
              // ✅ Regular dropdown for other bets
              <select
                style={{ width: "100%", border: "1px solid #e4e4e7", borderRadius: "0.25rem", padding: "0.25rem" }}
                value={correctBets[bet.id] || ""}
                onChange={(e) => setCorrectBets({ ...correctBets, [bet.id]: e.target.value })}
              >
                <option value="">Select correct option</option>
                {bet.options.map((option: { label: string; odds: string }) => (
                  <option key={option.label} value={option.label}>
                    {option.label} ({option.odds})
                  </option>
                ))}
              </select>
            )}
          </Box>
        ))}
      </Box>

      {/* Right Side - Bettors Table */}
      <Box w="60%" p={4} borderWidth="1px" borderRadius="md">
        <Heading size="md" mb={4}>
          Bettors & Rankings
        </Heading>

        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e4e4e7" }}>
                <th style={{ padding: "8px" }}>Rank</th>
                <th style={{ padding: "8px" }}>Bettor</th>
                <th style={{ padding: "8px" }}>Total Winnings</th>
                <th style={{ padding: "8px" }}>Bets</th>
              </tr>
            </thead>
            <tbody>
              {rankedBettors.map((bettor, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e4e4e7",
                    backgroundColor: index === 0 ? "#FFF0CC" : "transparent", // Gold for first place
                    fontWeight: index === 0 ? "bold" : "normal",
                  }}
                >
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    {index === 0 ? "🏆" : index + 1} {/* Show 🏆 for 1st place */}
                  </td>
                  <td style={{ padding: "8px" }}>{bettor.bettorName}</td>
                  <td
                    style={{
                      padding: "8px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "black", // Dark gold text for 1st place
                    }}
                  >
                    {bettor.totalPoints.toFixed(0)} pts
                  </td>
                  <td style={{ padding: "8px" }}>
                    {bettor.bets.map((bet, i) => (
                      <p key={i} style={{ margin: "4px 0" }}>
                        {bet.betId}. {bet.option} - {bet.wager} pts ({`${bet.odds}/x${convertOddsToEU(bet.odds)}`}) →{" "}
                        {correctBets[bet.betId] ? (correctBets[bet.betId] === bet.option ? "✅ Won" : "❌ Lost") : ""}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Box>
    </HStack>
  );
}
