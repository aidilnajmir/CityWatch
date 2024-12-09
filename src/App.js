import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Public Pages
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminManagementPage from './pages/usermanagment'
// User Pages
import MapPage from './pages/MapPage';
import AllReportsPage from './pages/AllReportsPage';
import MyReportsPage from './pages/MyReportsPage';

// Layouts
import Layout from './components/layout';
import MobileLayout from './components/MobileLayout';
import AdminLayout from './components/AdminLayout';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="map" element={<MapPage />} />
            <Route path="all-reports" element={<AllReportsPage />} />
            <Route path="my-reports" element={<MyReportsPage />} />
            <Route path="user-info" element={<AdminManagementPage />} />

          </Route>

          {/* User Routes */}
          <Route
            path="/user"
            element={isMobile ? <MobileLayout /> : <Layout />}
          >
            <Route path="map" element={<MapPage />} />
            <Route path="all-reports" element={<AllReportsPage />} />
            <Route path="my-reports" element={<MyReportsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
