"use client";

import { useState } from "react";
import { VStack, Heading, Text, Button, Input, Box, HStack } from "@chakra-ui/react";
import bets from "../data/bets.js";

export default function Home() {
  const [selectedBets, setSelectedBets] = useState<{ betId: number; option: string; wager: number }[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [oddsFormat, setOddsFormat] = useState<"US" | "EU">("US");

  const handleBetSelection = (betId: number, option: string) => {
    if (option === "") {
      // If "Place a Bet" is selected, remove the bet from selectedBets
      setSelectedBets((prev) => prev.filter((bet) => bet.betId !== betId));
    } else {
      setSelectedBets((prev) => {
        const existingBet = prev.find((bet) => bet.betId === betId);
        if (existingBet) {
          return prev.map((bet) => (bet.betId === betId ? { ...bet, option } : bet));
        } else {
          return [...prev, { betId, option, wager: 0 }];
        }
      });
    }
  };

  const handleWagerChange = (betId: number, wager: number) => {
    setSelectedBets((prev) => {
      const newBets = prev.map((bet) => (bet.betId === betId ? { ...bet, wager } : bet));
      const newTotal = newBets.reduce((sum, bet) => sum + bet.wager, 0);

      if (newTotal > 100) {
        setError("You can't bet more than 100 points!");
        return prev;
      } else {
        setError("");
        setTotalPoints(newTotal);
        return newBets;
      }
    });
  };

  const handleExactScoreInput = (betId: number, value: string) => {
    if (!/^\d+-\d+$/.test(value)) {
      setError("Score must be in 'XX-YY' format.");
      return;
    }

    setError("");
    handleBetSelection(betId, value);
  };

  const handleSubmit = async () => {
    if (selectedBets.length < 5 || selectedBets.length > 15) {
      setError("You must select between 5 and 15 bets.");
      return;
    }
    if (totalPoints > 100) {
      setError("Total points exceed 100!");
      return;
    }

    const response = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedBets),
    });

    if (response.ok) {
      alert("Bets submitted successfully!");
      setSelectedBets([]);
      setTotalPoints(0);
    } else {
      alert("Error submitting bets.");
    }
  };

  const convertOddsToEU = (usOdds: string) => {
    const odds = parseFloat(usOdds);
    if (isNaN(odds)) return usOdds;
    return odds > 0 ? (odds / 100 + 1).toFixed(2) : (100 / Math.abs(odds) + 1).toFixed(2);
  };

  const calculatePotentialWinnings = (wager: number, odds: string) => {
    const parsedOdds = parseFloat(odds);
    if (isNaN(parsedOdds) || wager <= 0) return 0;
    return (wager * parseFloat(convertOddsToEU(odds))).toFixed(2);
  };

  return (
    <VStack gap={4} align="center" mt="50px">
      <HStack>
        <Text>US Odds</Text>
        <label className="switch">
          <input
            type="checkbox"
            checked={oddsFormat === "EU"}
            onChange={() => setOddsFormat(oddsFormat === "US" ? "EU" : "US")}
          />
          <span className="slider"></span>
        </label>
        <Text>EU Odds</Text>
      </HStack>

      <Heading>Place Your Bets</Heading>
      <Text>You have 100 points. Choose at least 5 bets and up to 15.</Text>
      <Text fontWeight="bold">Total Points: {totalPoints}/100</Text>

      {error && <Text color="red.500">{error}</Text>}

      {bets.map((bet) => (
        <Box key={bet.id} p={2} borderRadius="md" w="100%" maxW="500px">
          <Text fontWeight="bold">{bet.title}</Text>

          {bet.id === 15 ? (
            <Input
              placeholder="Enter exact score (e.g., 24-21)"
              onChange={(e) => handleExactScoreInput(bet.id, e.target.value)}
            />
          ) : (
            <select
              style={{ width: "100%", border: "1px solid #e4e4e7", borderRadius: "0.25rem", padding: "0.25rem" }}
              value={selectedBets.find((b) => b.betId === bet.id)?.option || ""}
              onChange={(e) => handleBetSelection(bet.id, e.target.value)}
            >
              <option value="">Place a Bet</option>
              {bet.options.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label} ({oddsFormat === "US" ? option.odds : "x" + convertOddsToEU(option.odds)})
                </option>
              ))}
            </select>
          )}

          {selectedBets.some((b) => b.betId === bet.id) && (
            <>
              <Input
                type="number"
                min={1}
                max={100}
                size={"xs"}
                placeholder="Enter wager"
                value={selectedBets.find((b) => b.betId === bet.id)?.wager || ""}
                onChange={(e) => handleWagerChange(bet.id, parseInt(e.target.value))}
                mt={2}
              />
              <Text fontSize="sm" color="green.500">
                Potential Winnings:{" "}
                {calculatePotentialWinnings(
                  selectedBets.find((b) => b.betId === bet.id)?.wager || 0,
                  bets
                    .find((b) => b.id === bet.id)
                    ?.options.find((opt) => opt.label === selectedBets.find((b) => b.betId === bet.id)?.option)?.odds ||
                    "0"
                )}{" "}
                points
              </Text>
            </>
          )}
        </Box>
      ))}

      <Button colorScheme="blue" disabled={selectedBets.length < 5 || totalPoints > 100} onClick={handleSubmit}>
        Submit Bets
      </Button>
    </VStack>
  );
}
