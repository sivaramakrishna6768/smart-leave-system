import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      userRole = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Transparent navbar style for full-width fixed top with white text
  const navbarStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
  };

  return (
    <Navbar expand="lg" style={navbarStyle} className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: 'white', fontWeight: 'bold' }}>
          SmartLeave
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          {!userRole && (
            <>
              <Nav.Link
                as={Link}
                to="/login"
                style={{ color: 'white', fontSize: '0.95rem' }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/register"
                style={{ color: 'white', fontSize: '0.95rem' }}
              >
                Register
              </Nav.Link>
            </>
          )}
          {userRole && (
            <>
              <span style={{ color: 'white', fontSize: '0.95rem', marginRight: '10px' }}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
              <Button
                size="sm"
                variant="outline-light"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
