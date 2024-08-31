import React from 'react';
import { Box, Select, MenuItem, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

const Settings = () => {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Select Theme
      </Typography>
      <Select value={mode} onChange={(event) => setMode(event.target.value)}>
        <MenuItem value="system">System</MenuItem>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </Box>
  );
};

export default Settings;