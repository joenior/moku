import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Moku App Library
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Discover and download the best apps to sideload on your iOS device.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/apps">
          Get Started
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;