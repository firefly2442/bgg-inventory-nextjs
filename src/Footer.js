import React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import packageJson from '../package.json';

export default function Github() {
  return (
    <>
      <Divider />
      <Typography variant="body2" color="textSecondary" align="center">
        <MuiLink color="inherit" href="https://github.com/firefly2442/bgg-inventory-nextjs/">
          bgg-inventory-nextjs - {packageJson.version}
        </MuiLink>
        <br />
        <MuiLink color="inherit" href="https://www.boardgamegeek.com">
          Data and images via BoardGameGeek
        </MuiLink>
      </Typography>
    </>
  );
}
