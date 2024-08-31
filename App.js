// App.js
import React from 'react';
import Header from './components/Header';
import AppList from './components/AppList';
import Footer from './components/Footer';
import { Container } from '@mui/material';

function App() {
  return (
    <div>
      <Header />
      <Container>
        <AppList />
      </Container>
      <Footer />
    </div>
  );
}

export default App;