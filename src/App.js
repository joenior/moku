import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AppList from './components/AppList';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import Settings from './components/Settings';
import { Container, CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider, useColorScheme, createTheme } from '@mui/material/styles';

const App = () => {
  const { mode } = useColorScheme();
  const [resolvedMode, setResolvedMode] = useState(mode);
  const location = useLocation();

  useEffect(() => {
    if (mode === 'system') {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedMode(systemMode);
    } else {
      setResolvedMode(mode);
    }
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: resolvedMode || 'dark', // Default to dark mode if mode is not set
      text: {
        primary: resolvedMode === 'dark' ? '#ffffff' : '#000000',
        secondary: resolvedMode === 'dark' ? '#aaaaaa' : '#555555',
      },
      background: {
        default: resolvedMode === 'dark' ? '#121212' : '#ffffff',
        paper: resolvedMode === 'dark' ? '#1d1d1d' : '#f5f5f5',
      },
      action: {
        active: resolvedMode === 'dark' ? '#ffffff' : '#000000',
        hover: resolvedMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        selected: resolvedMode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.16)',
        disabled: resolvedMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        disabledBackground: resolvedMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      },
    },
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline /> {/* Ensures that the background color is applied */}
      {location.pathname !== '/' && <Header onDrawerOpen={handleDrawerOpen} />}
      <Container sx={{ pb: 8 }}> {/* Add padding to the bottom */}
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/apps" element={<AppList drawerOpen={drawerOpen} onDrawerClose={handleDrawerClose} onDrawerOpen={handleDrawerOpen} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
      <Footer /> {/* Ensure Footer is outside the Container */}
    </CssVarsProvider>
  );
};

export default App;