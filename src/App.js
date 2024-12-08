import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllReportsPage from './pages/AllReportsPage';
import MyReportsPage from './pages/MyReportsPage';
import TestAdminPage from './pages/TestAdminPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MapPage from './pages/MapPage';
import Layout from './components/layout'; 
import MobileLayout from './components/MobileLayout'; // Import Mobile Layout

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detect screen size on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const SelectedLayout = isMobile ? Layout : Layout;

  return (
    <Router>
      <div className="App">

        <SelectedLayout>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/all-reports" element={<AllReportsPage />} />
            <Route path="/my-reports" element={<MyReportsPage />} />
            <Route path="/admin" element={<TestAdminPage />} />
          </Routes>
        </SelectedLayout>

      </div>
    </Router>
  );
};

export default App;
