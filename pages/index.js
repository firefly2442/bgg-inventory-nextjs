import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import GameTable from '../src/GameTable';
import Footer from '../src/Footer';
import games from '../allgames';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

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
        // keep unique array of items
        if (!tags.includes(games[g].tags[tag])) {
          tags.push(games[g].tags[tag]);
        }
    }
}
tags = tags.sort(); // alphabetize

export default function Index() {
  const classes = useStyles();
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
        <InputLabel htmlFor="select">How many players do you have?</InputLabel>
        <NativeSelect id="select" value="4">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </NativeSelect>
        <InputLabel htmlFor="select">How many minutes do you have to play?</InputLabel>
        <NativeSelect id="select" value="60">
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
          <option value="60">60</option>
          <option value="90">90</option>
          <option value="120">120</option>
          <option value="150">150</option>
          <option value="180">180</option>
          <option value="210">210</option>
          <option value="240">240</option>
          <option value="300">300</option>
        </NativeSelect>
        <FormControl className={classes.formControl}>
          <InputLabel id="tag-mutiple-checkbox-label">Tags</InputLabel>
          <Select
            labelId="tag-mutiple-checkbox-label"
            id="tag-mutiple-checkbox"
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
