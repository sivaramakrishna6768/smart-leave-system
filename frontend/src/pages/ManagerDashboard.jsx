import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Badge,
  Alert,
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import ProfileCard from '../components/ProfileCard';

const ManagerDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const fetchLeaves = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/leave/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch leave requests');
    }
  };

  const updateStatus = async (id, status) => {
    setError('');
    setSuccess('');
    try {
      await axios.put(
        `${apiBaseUrl}/leave/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(`Leave ${status.toLowerCase()} successfully.`);
      fetchLeaves(); // Refresh after update
    } catch (err) {
      console.error(err);
      setError('Failed to update leave status');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="bg-login-gradient min-vh-100 py-5">
      <Container>
        <Row>
          <Col md={4}>
            {user && <ProfileCard user={user} onLogout={handleLogout} />}
          </Col>

          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h4 className="mb-4 text-center">📋 Manage Leave Requests</h4>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {leaves.length === 0 ? (
                  <p className="text-muted text-center">No leave requests found.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaves.map((leave) => (
                        <tr key={leave._id}>
                          <td>{leave.employeeId?.email || 'Unknown'}</td>
                          <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                          <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                          <td>{leave.reason}</td>
                          <td>
                            <Badge
                              bg={
                                leave.status === 'Pending'
                                  ? 'warning'
                                  : leave.status === 'Approved'
                                  ? 'success'
                                  : 'danger'
                              }
                            >
                              {leave.status}
                            </Badge>
                          </td>
                          <td>
                            {leave.status === 'Pending' ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="success"
                                  className="me-2"
                                  onClick={() => updateStatus(leave._id, 'Approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => updateStatus(leave._id, 'Rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Badge
                                bg={
                                  leave.status === 'Approved' ? 'success' : 'danger'
                                }
                              >
                                {leave.status}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManagerDashboard;

