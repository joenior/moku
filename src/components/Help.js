import React from 'react';
import { Container, Typography } from '@mui/material';

const Help = () => {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Help
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Here you can find help about sideloading apps.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        (This page is still under construction)
      </Typography>
    </Container>
  );
};

export default Help;