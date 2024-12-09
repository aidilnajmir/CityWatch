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
  Business,
  Map,
  Assessment,
  Description,
  People,
  Settings,
  Logout,
  ExpandLess,
  ExpandMore,
  Menu,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const [openReports, setOpenReports] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState('Department Name');
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  // Toggle Navbar
  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  // Close Navbar on Navigation
  const handleNavigate = (path) => {
    setIsNavbarOpen(false); 
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
      {/* Hamburger Menu Button */}
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
            {/* Department Name */}
            <ListItem>
              <ListItemIcon sx={iconStyle}>
                <Business />
              </ListItemIcon>
              <ListItemText primary={departmentName} />
            </ListItem>

            <Divider />

            {/* Navigation Items */}
            <ListItemButton onClick={() => handleNavigate('/admin/map')}>
              <ListItemIcon sx={iconStyle}>
                <Map />
              </ListItemIcon>
              <ListItemText primary="Map" />
            </ListItemButton>

            <ListItemButton onClick={() => handleNavigate('/admin/statistics')}>
              <ListItemIcon sx={iconStyle}>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Statistics" />
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
                <ListItemButton onClick={() => handleNavigate('/admin/all-reports')}>
                  <ListItemIcon sx={iconStyle}>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary="View Reports" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={() => handleNavigate('/admin/user-info')}>
              <ListItemIcon sx={iconStyle}>
                <People />
              </ListItemIcon>
              <ListItemText primary="User Information" />
            </ListItemButton>
          </List>
        </Box>

        {/* Bottom Section: Settings and Log Out */}
        <Box sx={{ marginTop: '25rem' }}>
          <Divider />
          <List>
            <ListItemButton onClick={() => handleNavigate('/admin/settings')}>
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

export default AdminNavbar;
