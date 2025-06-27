import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const ProfileCard = ({ onLogout }) => {
  const token = localStorage.getItem('token');
  let name = '';
  let email = '';
  let role = '';

  if (token) {
    const decoded = jwtDecode(token);
    name = decoded.name || '';
    email = decoded.email || '';
    role = decoded.role || '';

    // If name includes the role (e.g., 'Suma Manager'), remove it
    if (name.toLowerCase().includes(role.toLowerCase())) {
      name = name.replace(new RegExp(`\\s*${role}`, 'i'), '').trim();
    }
  }

  return (
    <Card className="mb-4 shadow">
      <Card.Body>
        <Card.Title>👤 Account Info</Card.Title>
        <p>
          <strong>Name:</strong> {name}
          <br />
          <strong>Email:</strong> {email}
          <br />
          <strong>Role:</strong> {role}
        </p>
        <Button variant="outline-danger" size="sm" onClick={onLogout}>
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
