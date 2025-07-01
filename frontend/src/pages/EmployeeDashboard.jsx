import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Container,
  Form,
  Button,
  Table,
  Badge,
  Row,
  Col,
  Card,
  Alert,
} from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';

const EmployeeDashboard = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Fetch leave history
  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const userId = user?.id;
        const response = await axios.get(`${apiBaseUrl}/leave/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaveData(response.data);
      } catch (err) {
        console.error('Error fetching leave history:', err);
        setError('Failed to fetch leave history');
      }
    };

    if (token) fetchLeaveHistory();
  }, [token, user]);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!startDate || !endDate || !reason) {
      setError('All fields are required');
      return;
    }

    try {
      await axios.post(
        `${apiBaseUrl}/leave`,
        { startDate, endDate, reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Leave applied successfully!');
      setStartDate('');
      setEndDate('');
      setReason('');

      // Refresh leave history
      const userId = user?.id;
      const response = await axios.get(`${apiBaseUrl}/leave/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLeaveData(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to apply for leave');
    }
  };

  return (
    <div className="bg-login-gradient min-vh-100 py-5">
      <Container>
        <Row>
          <Col md={4}>
            {user && <ProfileCard user={user} onLogout={handleLogout} />}
          </Col>

          <Col md={8}>
            <Card className="shadow mb-4">
              <Card.Body>
                <h4 className="mb-4 text-center">📝 Apply for Leave</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleApplyLeave}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Col>
                    <Col>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Reason for leave"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="w-100" variant="primary">
                    Submit Leave Request
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card className="shadow">
              <Card.Body>
                <h4 className="mb-3 text-center">📋 Your Leave History</h4>
                {leaveData.length === 0 ? (
                  <p className="text-muted text-center">No leave records found.</p>
                ) : (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveData.map((leave) => (
                        <tr key={leave._id}>
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

export default EmployeeDashboard;
