"use client";

import { useState, useEffect } from "react";
import { VStack, Heading, Text, Input, Button } from "@chakra-ui/react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; timestamp: string }[]>([]);
  const [showBets, setShowBets] = useState<boolean>(false);

  // Define fetchMessages outside useEffect so it can be reused
  const fetchMessages = async () => {
    const res = await fetch("/api/get");

    if (res.status === 403) {
      console.warn("SHOW_BETS is disabled. Messages won't be displayed.");
      setShowBets(false);
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setMessages(data);
      setShowBets(true);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    if (res.ok) {
      setInput("");
      fetchMessages(); // Now fetchMessages is accessible here
    } else {
      alert("Error saving data.");
    }
  };

  return (
    <VStack gap={4} align="center" mt="50px">
      <Heading>Hello World</Heading>

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text" size="lg" required />
        <Button mt={3} colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>

      {/* Conditionally Show Messages */}
      {showBets && (
        <VStack gap={3} w="full" maxW="400px" textAlign="center">
          <Heading size="md">Database Entries</Heading>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <VStack key={index} p={2} borderWidth="1px" borderRadius="md" gap={1}>
                <Text fontSize="md">{msg.text}</Text>
                <Text fontSize="xs" color="gray.500">
                  {new Date(msg.timestamp).toLocaleString()}
                </Text>
              </VStack>
            ))
          ) : (
            <Text>No entries yet.</Text>
          )}
        </VStack>
      )}
    </VStack>
  );
}
