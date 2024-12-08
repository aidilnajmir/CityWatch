import React, { useState } from 'react'; // Import useState for state management
import { Box, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('Login Attempt:', { email, password });
  
    try {
      const response = await axios.post('http://localhost/Citywatch/CityWatch-Backend/login.php', {
        email: email,
        password: password,
      });
  
      console.log('Backend Response:', response.data);
  
      if (response.data.success && response.data.user) {
        console.log('Login successful:', response.data);
  
        // Save user_id and username to localStorage
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('username', response.data.user.name || "Guest"); // Fallback for username
  
        navigate('/map'); // Redirect to /map on success
      } else {
        console.error('Login failed:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
    }
  };
  
  


  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box className="welcome-page">
      <Box component="img" src={logo} alt="CityWatch Logo" className="welcome-logo" />

      <Typography variant="h4" className="citywatch-title">
        CITYWATCH
      </Typography>

      <Typography variant="body1" className="welcome-title">
        Welcome back! Please enter your details.
      </Typography>

      <Box sx={{ width: '100%', marginTop: '16px' }}>
        <Typography variant="body2" className="text-field-label">Email</Typography>
        <TextInputBox
          text="Enter your email"
          fullWidth
          type="email"
          value={email} // Bind to email state
          onChange={(e) => {
            console.log('Email updated:', e.target.value); // Debug email input
            setEmail(e.target.value);
        }}
        />
      </Box>

      <Box sx={{ width: '100%', marginTop: '8px' }}>
        <Typography variant="body2" className="text-field-label">Password</Typography>
        <TextInputBox
          text="••••••••"
          type="password"
          fullWidth
          onChange={(e) => {
            console.log('Password updated:', e.target.value); // Debug password input
            setPassword(e.target.value);
        }}
        />
      </Box>

      <Box className="checkbox-link-container">
        <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
        <Link href="/forgot-password" sx={{ fontSize: '0.875rem' }}>Forgot password</Link>
      </Box>

      <StyledButton text="Sign in" onClick={handleLogin} fullWidth className="signin-button" />

      <Typography variant="body2" className="or-text">or</Typography>

      <StyledButton text="Register" onClick={handleRegister} fullWidth className="register-button" />
    </Box>
  );
};

export default LoginPage;