import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Business,
  Map,
  Assessment,
  Description,
  People,
  Settings,
  Logout,
} from '@mui/icons-material';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const iconStyle = { color: '#4f378a' };

  return (
    <Box className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {/* Department Name */}
          <ListItem>
            <ListItemIcon sx={iconStyle}>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Department Name" />
          </ListItem>

          <Divider />

          {/* Map Section */}
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Map />
            </ListItemIcon>
            <ListItemText primary="Map" />
          </ListItemButton>

          {/* Statistics Section */}
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>

          {/* Reports Section */}
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <Description />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>

          {/* User Information Section */}
          <ListItemButton>
            <ListItemIcon sx={iconStyle}>
              <People />
            </ListItemIcon>
            <ListItemText primary="User Information" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom Section: Settings and Log Out */}
      <Box sx={{ marginTop: 'auto' }}>
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

export default AdminNavbar;
