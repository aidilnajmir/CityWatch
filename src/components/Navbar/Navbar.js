import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css';

const Navbar = () => {
  const [openReports, setOpenReports] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleReportsClick = () => {
    setOpenReports(!openReports);
    navigate('/all-reports');
  };

  const handleNavigateToMap = () => {
    navigate('/map'); // Navigate to the Maps page
  };

  const iconStyle = { color: '#4f378a' };

  return (
    <Box className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {/* User Profile */}
          <ListItem>
            <ListItemIcon sx={iconStyle}>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="User Name" />
          </ListItem>

          <Divider />

          {/* Map Section */}
          <ListItemButton onClick={handleNavigateToMap}>
            <ListItemIcon sx={iconStyle}>
              <Map />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ListItemButton>

          {/* Reports Section with Nested Menu */}
          <ListItemButton onClick={handleReportsClick}>
            <ListItemIcon sx={iconStyle}>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openReports ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openReports} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItemButton>
                <ListItemIcon sx={iconStyle}>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Create Report" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={iconStyle}>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="My Reports" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={iconStyle}>
                  <ListAlt />
                </ListItemIcon>
                <ListItemText primary="All Reports" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Statistics Section */}
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom Section: Settings and Log Out */}
      <Box sx={{ marginTop: 'auto' }}> {/* Push to the bottom of the navbar */}
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;
