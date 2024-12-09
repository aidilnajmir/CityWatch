import React, { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminNavbar from './AdminNavbar/AdminNavbar';
import Footer from './Footer';

const AdminLayout = () => {
  const [showCreateReportModal, setShowCreateReportModal] = useState(false);
  const location = useLocation();

  // Functions to manage report modal
  const openCreateReportModal = () => setShowCreateReportModal(true);
  const closeCreateReportModal = () => setShowCreateReportModal(false);

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ['/admin/login', '/admin/register', '/admin/forgot-password'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Define overflow behavior based on route
  const getContentStyle = () => {
    if (location.pathname === '/admin/map') {
      return { flex: 1, overflow: 'hidden', padding: '0' }; 
    }
    return { flex: 1, overflowY: 'auto', padding: '20px' };
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AdminHeader style={{ backgroundColor: '#6941C6', color: '#fff', padding: '1rem' }} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {!shouldHideNavbar && (
          <AdminNavbar openCreateReportModal={openCreateReportModal} />
        )}

        <div style={getContentStyle()}>
          <Outlet />
        </div>
      </div>

      <Footer />

      
    </div>
  );
};

export default AdminLayout;
