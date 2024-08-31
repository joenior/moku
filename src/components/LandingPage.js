import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <Container style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the App List
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Discover and download the best apps.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/apps">
          View App List
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;