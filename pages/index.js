import React from 'react';
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
} from '@mui/material';

import GameTable from '../src/GameTable';
import Footer from '../src/Footer';
import games from '../allgames';

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

var tags = [];
for (var g in games) {
  for (var tag in games[g].tags) {
    if (!tags.includes(games[g].tags[tag])) {
      tags.push(games[g].tags[tag]);
    }
  }
}
tags = tags.sort();

export default function Index() {
  const [filtertags, setTag] = React.useState([]);

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Board Game Inventory ({games.length})
        </Typography>

        <InputLabel htmlFor="select-players">How many players do you have?</InputLabel>
        <NativeSelect id="select-players" defaultValue="4">
          {[...Array(12).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </NativeSelect>

        <InputLabel htmlFor="select-minutes" sx={{ mt: 2 }}>
          How many minutes do you have to play?
        </InputLabel>
        <NativeSelect id="select-minutes" defaultValue="60">
          {[15,30,45,60,90,120,150,180,210,240,300].map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </NativeSelect>

        <FormControl
          sx={(theme) => ({
            m: 1,
            minWidth: 120,
            maxWidth: 300,
          })}
        >
          <InputLabel id="tag-multiple-checkbox-label">Tags</InputLabel>
          <Select
            labelId="tag-multiple-checkbox-label"
            id="tag-multiple-checkbox"
            multiple
            value={filtertags}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={filtertags.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <GameTable />
        <Footer />
      </Box>
    </Container>
  );
}
