import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom'; // Use Outlet for route rendering
import Navbar from './Navbar/Navbar';
import Header from './Header';
import Footer from './Footer';
import CreateReportModal from './Modal/CreateReportModal'; 

const Layout = () => {
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const location = useLocation(); 

  const openCreateReportModal = () => setShowCreateReportModal(true);
  const closeCreateReportModal = () => setShowCreateReportModal(false);
  const hideNavbarRoutes = ['/login', '/register', '/forgot-password'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Define overflow behavior based on the route
  const getContentStyle = () => {
    if (location.pathname === '/user/map') {
      return { flex: 1, overflow: 'hidden', padding: '0' }; 
    }
    return { flex: 1, overflowY: 'auto', padding: '20px' }; 
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header style={{ backgroundColor: '#6941C6', color: '#fff', padding: '1rem' }} />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!shouldHideNavbar && (
          <Navbar openCreateReportModal={openCreateReportModal} /> 
        )}
        <div style={getContentStyle()}>
          {/* Render the active route's component */}
          <Outlet />
        </div>
      </div>
      
      <Footer />

      {showCreateReportModal && (
        <CreateReportModal onClose={closeCreateReportModal} />
      )}
    </div>
  );
};

export default Layout;
