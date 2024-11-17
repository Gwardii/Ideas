import React from 'react';
import { Avatar, Box, Link, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

// Sample object
const data = {
  linkedin: [
    { name: 'John Doe', directLink: 'https://www.linkedin.com/in/johndoe/' },
    { name: 'Jane Smith', directLink: 'https://www.linkedin.com/in/janesmith/' },
    // Add more personas as needed
  ]
};

const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: '#fff'
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const renderPersonas = (personas) => personas.map((persona, index) => (
  <List>
    <ListItem key={index} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link href={persona.directLink} target="_blank" rel="noopener">
            {persona.name}
          </Link>
        }
      />
    </ListItem>
  </List>
))

type PersonasProps = {
  personas: { linkedin: { name: string, directLink: string }[] }
};

export const Personas = ({ personas }: PersonasProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m: 2 }}>
      <Typography variant="h6" gutterBottom>
        LinkedIn
      </Typography>
      {renderPersonas(personas.linkedin)}
      <Typography variant="h6" gutterBottom>
        Orcid
      </Typography>
      {renderPersonas(personas.orcid)}
      <Typography variant="h6" gutterBottom>
        ResearchGate
      </Typography>
      {renderPersonas(personas.researchgate)}
    </Box>
  );
};
