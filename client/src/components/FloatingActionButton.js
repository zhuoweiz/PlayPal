import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function FloatingActionButton() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      
      <Fab color="primary" aria-label="add" size="small" href="/createpost">
        <AddIcon />
      </Fab>
    </Box>
  );
}