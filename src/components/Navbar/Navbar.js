import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
} from '@mui/material';
import {
  AccountCircle,
  Map,
  Assessment,
  Settings,
  Logout,
  ExpandLess,
  ExpandMore,
  Description,
  AddCircle,
  ListAlt,
  Menu,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ openCreateReportModal }) => {
  const [openReports, setOpenReports] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  // Fetch username on load
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'Guest';
    setUsername(storedUsername);
  }, []);

  // Toggle Navbar
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Close Navbar on Navigation
  const handleNavigate = (path) => {
    setIsNavbarOpen(false); // Auto-close navbar
    navigate(path);
  };

  // Close Navbar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };

    if (isNavbarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isNavbarOpen]);

  const iconStyle = { color: '#4f378a' };

  return (
    <>
      <IconButton
        className="hamburger-menu"
        onClick={toggleNavbar}
        aria-label="Toggle Navbar"
        sx={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1200,
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Menu />
      </IconButton>

      <Box
        ref={navbarRef}
        className={`navbar ${isNavbarOpen ? 'open' : 'closed'}`}
        sx={{
          position: { xs: 'fixed', md: 'relative' },
          display: { xs: isNavbarOpen ? 'flex' : 'none', md: 'flex' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <List>
            <ListItem>
              <ListItemIcon sx={iconStyle}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={username} />
            </ListItem>

            <Divider />

            <ListItemButton onClick={() => handleNavigate('/map')}>
              <ListItemIcon sx={iconStyle}>
                <Map />
              </ListItemIcon>
              <ListItemText primary="Map" />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenReports(!openReports)}>
              <ListItemIcon sx={iconStyle}>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Reports" />
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openReports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItemButton onClick={openCreateReportModal}>
                  <ListItemIcon sx={iconStyle}>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Create Report" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavigate('/my-reports')}>
                  <ListItemIcon sx={iconStyle}>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="My Reports" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavigate('/all-reports')}>
                  <ListItemIcon sx={iconStyle}>
                    <ListAlt />
                  </ListItemIcon>
                  <ListItemText primary="All Reports" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={() => handleNavigate('/statistics')}>
              <ListItemIcon sx={iconStyle}>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItemButton>
          </List>
        </Box>

        <Box sx={{ marginTop: 'auto' }}>
          <Divider />
          <List>
            <ListItemButton onClick={() => handleNavigate('/settings')}>
              <ListItemIcon sx={iconStyle}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/logout')}>
              <ListItemIcon sx={iconStyle}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
