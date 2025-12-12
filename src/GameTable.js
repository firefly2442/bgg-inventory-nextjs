import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GameTable({ games }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Min Players</TableCell>
            <TableCell>Max Players</TableCell>
            <TableCell>Playing Time Minutes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((row) => (
            <TableRow key={row.objectid}>
              <TableCell>
                <a
                  target="_blank"
                  href={`https://www.boardgamegeek.com/boardgame/${row.objectid}/`}
                  rel="noopener noreferrer"
                >
                  {row.objectname}
                </a>
              </TableCell>
              <TableCell>{row.minplayers}</TableCell>
              <TableCell>{row.maxplayers}</TableCell>
              <TableCell>{row.playingtime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
