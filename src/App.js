// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import GoogleMapsPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AllReportsPage from './pages/AllReportsPage';
import MyReportsPage from './pages/MyReportsPage';

const App = () => {
  return (
  
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map" element={<GoogleMapsPage />} />
          <Route path="/all-reports" element={<AllReportsPage />} />
          <Route path="/my-reports" element={<MyReportsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
