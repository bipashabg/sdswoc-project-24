import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/Signup.css'; // Import the CSS file for styling
import { Link, useNavigate} from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';



function Signup() {
  const [values, setValues] = useState({
    username: '',
    Fullname: '',
    email: '',
    password: ''
  });

  const { username, Fullname, email, password } = values;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validation(values));

    try {
      await axios.post('http://localhost:3001/signup', values);
      navigate('/Login'); // Navigate to login page immediately after successful signup
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="signup-page">
      <Container className="glass-container">
        <Row className="justify-content-md-center mt-5">
          <Col md={6} mx-auto>
            <h2 className="text-center mb-4" style={{ color: '#EEE7DA' }}>New user? Register here</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label style={{ color: '#EEE7DA' }}>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Set username"
                  value={username}
                  onChange={e => setValues({...values, username: e.target.value})}
                  className='form-control rounded-0'
                  required
                  name='username'
                />
                {errors.username && <span className='text-danger'>{errors.username}</span>}
              </Form.Group>

              <Form.Group controlId="formBasicFullname">
                <Form.Label style={{ color: '#EEE7DA' }}>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={Fullname}
                  onChange={e => setValues({...values, Fullname: e.target.value})}
                  className='form-control rounded-0'
                  required
                  name='Fullname'
                />
                {errors.Fullname && <span className='text-danger'>{errors.Fullname}</span>}
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ color: '#EEE7DA' }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setValues({...values, email: e.target.value})}
                  className='form-control rounded-0'
                  required
                  name='email'
                />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ color: '#EEE7DA' }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Set Password(8+ characters)"
                  value={password}
                  onChange={e => setValues({...values, password: e.target.value})}
                  className='form-control rounded-0'
                  required
                  name='password'
                />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
              </Form.Group>

              <Button variant="primary" style={{ backgroundColor: '#7071E8' }} type="submit" className="mt-3">
                  Sign Up
              </Button>

            </Form>

            <div className="mt-3 text-center">
              <p className="mb-0" style={{ color: '#EEE7DA' }}>Already have an account?</p>
              <Link to="/Login">Login</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
