import React, { useEffect, useState } from 'react';
import { CssBaseline, List, ListItemButton, ListItemAvatar, ListItemText, Avatar, ListSubheader, Paper, Typography, InputBase, Box, Modal, Backdrop, Fade, Button, Stack, Drawer, Skeleton, Pagination } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const repoUrls = [
  { title: "YouTube Mod", url: "https://raw.githubusercontent.com/YTLitePlus/YTLitePlus-Altstore/main/apps.json" },
  { title: "RandomBlock1", url: "https://randomblock1.com/altstore/apps.json" },
  { title: "CyPwn", url: "https://api.allorigins.win/raw?url=https://ipa.cypwn.xyz/cypwn.json" },
  { title: "Wuxu Complete Plus", url: "https://wuxu1.github.io/wuxu-complete-plus.json" },
  { title: "BurritoSource", url: "https://api.allorigins.win/raw?url=https://burritosoftware.github.io/altstore/channels/burritosource.json" },
  { title: "AppTesters", url: "https://repo.apptesters.org/" },
  { title: "TrollStore IPAs", url: "https://raw.githubusercontent.com/swaggyP36000/TrollStore-IPAs/main/apps_esign.json" },
  { title: "Yippee", url: "https://api.allorigins.win/raw?url=https://repo.yippee.rip/" },
  { title: "Binnichtaktiv", url: "https://api.allorigins.win/raw?url=https://binnichtaktiv.signapp.me/repo/esign.json" },
  { title: "EeveeSpotify", url: "https://raw.githubusercontent.com/whoeevee/EeveeSpotify/swift/repo.json" },
  { title: "Enmity Mod", url: "https://enmity-mod.github.io/repo/altstore.json" },
  { title: "AIO Yippee", url: "https://api.allorigins.win/raw?url=https://aio.yippee.rip/repo.json" }
];

const AppList = ({ drawerOpen, onDrawerClose, onDrawerOpen }) => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [open, setOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState(''); // Default URL is empty
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (repoUrl) {
      setLoading(true);
      fetch(repoUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setApps(data.apps);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [repoUrl]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (app) => {
    setSelectedApp(app);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApp(null);
  };

  const convertSizeToMB = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert bytes to MB and round to 2 decimal places
  };

  const handleRepoUrlChange = (url) => {
    setRepoUrl(url);
    onDrawerClose();
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApps = filteredApps.sort((a, b) => new Date(b.versionDate) - new Date(a.versionDate));

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(date);
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const d = new Date(date);
    return d.getDate() === yesterday.getDate() &&
           d.getMonth() === yesterday.getMonth() &&
           d.getFullYear() === yesterday.getFullYear();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedApps = sortedApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleImageError = (e) => {
    e.target.src = 'https://therealfoxster.github.io/altsource-viewer/common/assets/img/generic_app.jpeg';
  };

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme /> {/* Enable color scheme for scrollbar */}
      <Drawer anchor="left" open={drawerOpen} onClose={onDrawerClose}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6">Change Repo URL</Typography>
          <List>
            {repoUrls.map((repo, index) => (
              <ListItemButton key={index} onClick={() => handleRepoUrlChange(repo.url)}>
                <ListItemText primary={repo.title} />
              </ListItemButton>
            ))}
          </List>
          <Button onClick={onDrawerClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Drawer>
      <Paper square sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          App List
        </Typography>
        <Box sx={{ p: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
        </Box>
        {repoUrl === '' ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">
              Please choose your repo first
            </Typography>
            <Button variant="contained" color="primary" onClick={onDrawerOpen} sx={{ mt: 2 }}>
              Choose Repo
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {loading ? (
                Array.from(new Array(10)).map((_, index) => (
                  <Box key={index} sx={{ p: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={60} />
                  </Box>
                ))
              ) : (
                paginatedApps.map((app, index) => (
                  <React.Fragment key={index}>
                    {index === 0 && isToday(app.versionDate) && (
                      <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                        Today
                      </ListSubheader>
                    )}

                    {index === 0 && isYesterday(app.versionDate) && (
                      <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                        Yesterday
                      </ListSubheader>
                    )}

                    <ListItemButton onClick={() => handleOpen(app)}>
                      <ListItemAvatar>
                        <Avatar
                          alt="App Icon"
                          src={app.iconURL}
                          onError={handleImageError}
                          sx={{ borderRadius: '8px' }} // Apply rounded corners
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={app.name}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                            sx={{ whiteSpace: 'pre-line' }} // Ensure new lines are respected
                          >
                            {app.localizedDescription.split('\n')[0]} {/* Take only the first line */}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </React.Fragment>
                ))
              )}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Pagination
                count={Math.ceil(sortedApps.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Paper>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }} // Use 'slots' to specify the Backdrop component
        slotProps={{
          backdrop: {
            timeout: 500, // Set the timeout directly in slotProps
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            maxHeight: '80vh', // Set maximum height
            overflowY: 'auto', // Enable vertical scrolling
            bgcolor: 'background.paper', 
            border: '2px solid #000', 
            boxShadow: 24, 
            p: 4,
            '&::-webkit-scrollbar': { width: '0.4em' }, // Custom scrollbar width
            '&::-webkit-scrollbar-track': { boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)' }, // Custom scrollbar track
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'darkgrey', outline: '1px solid slategrey' } // Custom scrollbar thumb
          }}>
            {selectedApp && (
              <>
                <Typography variant="h6" component="h2">
                  {selectedApp.name}
                </Typography>
                <Typography sx={{ mt: 2, whiteSpace: 'pre-line' }}>
                  {selectedApp.localizedDescription}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Version: {selectedApp.version}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Size: {convertSizeToMB(selectedApp.size)} MB
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={selectedApp.downloadURL}
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  Download
                </Button>
                <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default AppList;