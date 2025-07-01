import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

// ✅ Dynamically load base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    console.log('🔁 handleLogin triggered');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;
      console.log('✅ Token received:', token);

      // Store token
      localStorage.setItem('token', token);

      // Decode role
      let decoded;
      try {
        decoded = jwtDecode(token);
        console.log('✅ Decoded payload:', decoded);
      } catch (decodeErr) {
        console.error('❌ Failed to decode token:', decodeErr);
        setErrorMsg('Invalid token format. Please try again.');
        return;
      }

      const userRole = decoded.role;
      console.log('🧭 Navigating to:', userRole);

      if (userRole === 'manager') {
        navigate('/manager/dashboard');
      } else if (userRole === 'employee') {
        navigate('/employee/dashboard');
      } else {
        console.warn('⚠️ Unrecognized role:', userRole);
        setErrorMsg('Unknown role. Access denied.');
      }

    } catch (err) {
      console.error('❌ Login error:', err);
      setErrorMsg(err.response?.data?.error || 'Login failed. Try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-login-gradient">
      <Card style={{ width: '24rem' }} className="p-4 shadow">
        <Card.Body>
          <h5 className="mb-4 text-center">🔐 Login to SmartLeave</h5>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. john@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
