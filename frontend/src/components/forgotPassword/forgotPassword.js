import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import '../../styles/forgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Send a request to the backend to initiate the "forgot password" process
    try {
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setShowAlert(true);
      } else {
        // Handle error response from the server
        console.error('Error initiating forgot password:', response.status);
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
  };

  return (
    <div className="forgot-password-page">
      <Container className="glass-container d-flex align-items-center">
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {showAlert && (
              <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
                Password reset instructions sent to your email.
              </Alert>
            )}
            <Form onSubmit={handleForgotPassword}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit" block>
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
