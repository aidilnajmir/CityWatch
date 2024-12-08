import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Header from './Header';
import Footer from './Footer';
import CreateReportModal from './Modal/CreateReportModal';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const MobileLayout = ({ children }) => {
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const openCreateReportModal = () => setShowCreateReportModal(true);
  const closeCreateReportModal = () => setShowCreateReportModal(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleNavbar}
          sx={{
            position: 'absolute',
            left: 10,
            top: 10,
            display: { xs: 'block', md: 'none' },
          }}
        >
          {isNavbarOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

      {/* Navbar Sliding Drawer */}
      <div
        className={`mobile-navbar ${isNavbarOpen ? 'open' : 'closed'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: isNavbarOpen ? 0 : '-100%',
          height: '100%',
          width: '240px',
          backgroundColor: '#fff',
          transition: 'left 0.3s ease-in-out',
          zIndex: 1200,
          boxShadow: isNavbarOpen ? '2px 0 5px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <Navbar openCreateReportModal={openCreateReportModal} />
      </div>

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          marginLeft: isNavbarOpen ? '240px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
        }}
      >
        {children}
      </main>

      <Footer />

      {/* Create Report Modal */}
      {showCreateReportModal && <CreateReportModal onClose={closeCreateReportModal} />}
    </div>
  );
};

export default MobileLayout;
