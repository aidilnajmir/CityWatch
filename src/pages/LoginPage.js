import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import StyledButton from '../components/StyledButton';
import TextInputBox from '../components/TextInputBox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CityWatch.png';
import './styles/LoginPage.css';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', { email, password });
      
      const response = await axios.post(
        'http://localhost/Citywatch/CityWatch-Backend/login.php',
        {
          email: email,
          password: password,
        }
      );

      console.log('Backend Response:', response.data);

      if (response.data.success && response.data.user) {
        const user = response.data.user;

        // Save details to localStorage
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('username', user.name || 'Guest');
        localStorage.setItem('usertype', user.usertype); 

        console.log('User Info Stored:', {
          id: user.id,
          name: user.name,
          usertype: user.usertype,
        });

        // Navigate based on the user type
        if (user.usertype === 'admin') {
          console.log('Redirecting to Admin Layout');
          navigate('/admin/all-reports'); 
        } else if (user.usertype === 'User') {
          console.log('Redirecting to User Layout');
          navigate('/user/map'); 
        } else {
          console.error('Invalid user type:', user.usertype);
          alert('Invalid user type detected.');
        }
      } else {
        console.error('Login failed:', response.data.message);
        alert(response.data.message || 'Login failed. Please try again.');
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box sx={{ width: '100%', marginTop: '8px' }}>
        <Typography variant="body2" className="text-field-label">Password</Typography>
        <TextInputBox
          text="••••••••"
          type="password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box className="checkbox-link-container">
        <FormControlLabel control={<Checkbox />} label="Remember for 30 days" />
        <Link href="/forgot-password" sx={{ fontSize: '0.875rem' }}>Forgot password</Link>
      </Box>

      <StyledButton
        text="Sign in"
        onClick={handleLogin}
        fullWidth
        className="signin-button"
      />

      <Typography variant="body2" className="or-text">or</Typography>

      <StyledButton
        text="Register"
        onClick={handleRegister}
        fullWidth
        className="register-button"
      />
    </Box>
  );
};

export default LoginPage;
