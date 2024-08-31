import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = ({ onDrawerOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {location.pathname === '/settings' ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={handleBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={onDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            IPA repo
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;