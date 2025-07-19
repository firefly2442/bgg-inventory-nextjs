import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import games from '../allgames/allgames';

export default function GameTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                <a
                  target="_blank"
                  href={`https://www.boardgamegeek.com/${row.type}/${row.id}/`}
                  rel="noopener noreferrer"
                >
                  <img
                    src={`./thumbnails/${row.id}${row.thumbnailextension}`}
                    alt={row.name}
                    title={row.name}
                  />
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
