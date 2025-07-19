import React from "react";
import {
  Container,
  Typography,
  Box,
  NativeSelect,
  InputLabel,
  MenuItem,
  Input,
  ListItemText,
  FormControl,
  Select,
  Checkbox,
} from "@mui/material";

import GameTable from "../src/GameTable";
import Footer from "../src/Footer";
import games from "../allgames/allgames";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Gather unique tags from games
let tags = [];
for (let g in games) {
  for (let tag of games[g].tags) {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
}
tags = tags.sort();

const playtimeOptions = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 300];

export default function Index() {
  const [filterTags, setFilterTags] = React.useState([]);
  const [selectedPlayers, setSelectedPlayers] = React.useState(4);
  const [selectedMinutes, setSelectedMinutes] = React.useState(90);

  const handleTagChange = (event) => {
    setFilterTags(event.target.value);
  };

  const handlePlayersChange = (event) => {
    setSelectedPlayers(Number(event.target.value));
  };

  const handleMinutesChange = (event) => {
    setSelectedMinutes(Number(event.target.value));
  };

  // Filter games based on players, minutes, and tags
  const filteredGames = games.filter((game) => {
    const matchesPlayers =
      game.minplayers <= selectedPlayers && game.maxplayers >= selectedPlayers;

    const matchesMinutes = game.playingtimemins <= selectedMinutes;

    // If no tags selected, don't filter by tags
    const matchesTags =
      filterTags.length === 0 ||
      filterTags.every((tag) => game.tags.includes(tag));

    return matchesPlayers && matchesMinutes && matchesTags;
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
            id="select-players"
            value={selectedPlayers}
            onChange={handlePlayersChange}
            sx={{ width: "100%" }}
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
            id="select-minutes"
            value={selectedMinutes}
            onChange={handleMinutesChange}
            sx={{ width: "100%" }}
          >
            {playtimeOptions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        {/* Tags */}
        <FormControl sx={{ minWidth: 120, maxWidth: 300 }}>
          <InputLabel id="tag-multiple-checkbox-label">Tags</InputLabel>
          <Select
            labelId="tag-multiple-checkbox-label"
            id="tag-multiple-checkbox"
            multiple
            value={filterTags}
            onChange={handleTagChange}
            input={<Input />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            sx={{ width: "100%" }}
          >
            {tags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filterTags.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <GameTable games={filteredGames} />
        <Footer />
      </Box>
    </Container>
  );
}
