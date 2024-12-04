import React from 'react';
import { Box } from '@mui/material';
import AdminHeader from '../components/AdminHeader';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import Footer from '../components/Footer';

const TestAdminPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Use full viewport height
      }}
    >
      <AdminHeader />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <AdminNavbar />
        <Box sx={{ flex: 1, padding: 2 }}>
          {/* Main content goes here */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TestAdminPage;