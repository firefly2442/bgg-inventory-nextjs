import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import packageJson from '../package.json';

export default function Github() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <br></br>
      <Divider />
      <MuiLink color="inherit" href="https://github.com/firefly2442/bgg-inventory-nextjs/">
        bgg-inventory-nextjs - {packageJson.version}
      </MuiLink>
      <br></br>
      <MuiLink color="inherit" href="https://www.boardgamegeek.com">
        Data and images via BoardGameGeek
      </MuiLink>
    </Typography>
  );
}
