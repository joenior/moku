import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/apps':
        setValue(1);
        break;
      case '/settings':
        setValue(2);
        break;
      case '/help':
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="App Library"
        icon={<ListIcon />}
        component={Link}
        to="/apps"
      />
      <BottomNavigationAction
        label="Settings"
        icon={<SettingsIcon />}
        component={Link}
        to="/settings"
      />
      <BottomNavigationAction
        label="Help"
        icon={<HelpIcon />}
        component={Link}
        to="/help"
      />
    </BottomNavigation>
  );
};

export default Footer;