import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // To get the current route
import Navbar from './Navbar/Navbar';
import Header from './Header';
import Footer from './Footer';
import CreateReportModal from './Modal/CreateReportModal'; // Import the modal component

const Layout = ({ children }) => {
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const location = useLocation(); // Get the current route

  const openCreateReportModal = () => setShowCreateReportModal(true);
  const closeCreateReportModal = () => setShowCreateReportModal(false);

  // Define overflow behavior based on the route
  const getContentStyle = () => {
    if (location.pathname === '/map') {
      return { flex: 1, overflow: 'hidden', padding: '0' }; // No scrollbars for the map
    }
    return { flex: 1, overflowY: 'auto', padding: '20px' }; // Scrollbars for other pages
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header  style={{ backgroundColor: '#6941C6', color: '#fff', padding: '1rem' }} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Navbar  openCreateReportModal={openCreateReportModal} /> {/* Pass modal handler to Navbar */}
        <div style={getContentStyle()}>
          {children}
        </div>
      </div>
      <Footer />

      {/* Render the Create Report Modal */}
      {showCreateReportModal && (
        <CreateReportModal onClose={closeCreateReportModal} />
      )}
    </div>
  );
};

export default Layout;
