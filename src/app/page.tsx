"use client";

import { useState } from "react";
import { Button, Input, VStack, Heading } from "@chakra-ui/react";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    if (res.ok) {
      alert("Saved successfully!");
      setInput("");
    } else {
      alert("Error saving data.");
    }
  };

  return (
    <VStack gap={4} align="center" mt="50px">
      <Heading>Hello World</Heading>
      <form onSubmit={handleSubmit}>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text" size="lg" required />
        <Button mt={3} colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
    </VStack>
  );
}
