// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllReportsPage from './pages/AllReportsPage';
import MyReportsPage from './pages/MyReportsPage';
import TestAdminPage from './pages/TestAdminPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/all-reports" element={<AllReportsPage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
          <Route path="/admin" element={<TestAdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
