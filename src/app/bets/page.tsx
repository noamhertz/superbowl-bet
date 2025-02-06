"use client";

import { useState, useEffect } from "react";
import { VStack, Heading, Text, Box, Spinner } from "@chakra-ui/react";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const response = await fetch("/api/bets");
        if (!response.ok) throw new Error("Failed to fetch bets.");
        const data = await response.json();
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

  return (
    <VStack gap={4} align="center" mt="50px">
      <Heading>All Bets</Heading>
      {loading ? <Spinner /> : error ? <Text color="red.500">{error}</Text> : null}

      {bets.length === 0 && !loading ? (
        <Text>No bets have been placed yet.</Text>
      ) : (
        bets.map((bet: StoredBet, index) => (
          <Box key={index} borderWidth="1px" p={4} borderRadius="md" w="100%" maxW="500px">
            <Text fontWeight="bold">Bettor: {bet.bettorName}</Text>
            <Text>Placed at: {new Date(bet.timestamp).toLocaleString()}</Text>
            <Text>Bets:</Text>
            <ul>
              {bet.bets.map((b: Bet, i: number) => (
                <li key={i}>
                  {b.option} - {b.wager} points (Odds: {b.odds})
                </li>
              ))}
            </ul>
          </Box>
        ))
      )}
    </VStack>
  );
}
