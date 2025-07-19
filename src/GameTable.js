import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import games from '../allgames/allgames';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

export default function GameTable() {
  const classes = useStyles();

  return (
    //https://material-ui.com/components/tables/#table
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Min Players</TableCell>
            <TableCell>Max Players</TableCell>
            <TableCell>Playing Time Minutes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <a target="_blank" href={"https://www.boardgamegeek.com/"+row.type+"/"+row.id+"/"} rel="noopener noreferrer">
                  <img src={"./thumbnails/" + row.id + row.thumbnailextension} alt={row.name} title={row.name} />
                </a>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.tags}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.minplayers}</TableCell>
              <TableCell>{row.maxplayers}</TableCell>
              <TableCell>{row.playingtimemins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
