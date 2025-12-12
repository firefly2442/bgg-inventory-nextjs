import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@mui/material";

import GameTable from "../src/GameTable";
import Footer from "../src/Footer";
import Papa from "papaparse";

const playtimeOptions = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 300];

export default function Index() {
  const [games, setGames] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState(4);
  const [selectedMinutes, setSelectedMinutes] = useState(90);

  // Generic CSV loader
  const loadCsv = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch CSV");
      const text = await res.text();

      // Remove BOM if present
      const cleanedText = text.replace(/^\uFEFF/, "");

      const parsed = Papa.parse(cleanedText, { header: true }).data;

      setGames(parsed);
    } catch (err) {
      console.error("Error loading CSV:", err);
    }
  };

  useEffect(() => {
    loadCsv("/collection.csv");
  }, []);

  // Filter games based on players and minutes
  const filteredGames = games.filter((game) => {
    const matchesPlayers =
      game.minplayers <= selectedPlayers && game.maxplayers >= selectedPlayers;
    const matchesMinutes = game.playingtime <= selectedMinutes;
    return matchesPlayers && matchesMinutes;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Board Game Inventory ({filteredGames.length})
        </Typography>

        {/* Players */}
        <FormControl sx={{ minWidth: 120, maxWidth: 300 }}>
          <InputLabel htmlFor="select-players">How many players do you have?</InputLabel>
          <NativeSelect
            value={selectedPlayers}
            onChange={(e) => setSelectedPlayers(Number(e.target.value))}
          >
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        {/* Minutes */}
        <FormControl sx={{ minWidth: 120, maxWidth: 300 }}>
          <InputLabel htmlFor="select-minutes">How many minutes do you have to play?</InputLabel>
          <NativeSelect
            value={selectedMinutes}
            onChange={(e) => setSelectedMinutes(Number(e.target.value))}
          >
            {playtimeOptions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        {/* Game Table */}
        <GameTable games={filteredGames} />

        <Footer />
      </Box>
    </Container>
  );
}
