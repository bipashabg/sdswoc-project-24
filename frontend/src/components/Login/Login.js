import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../styles/Login.css'; // Import the CSS file for styling
import {Link, useNavigate} from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

function Login(){
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const {email, password } = values;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validation(values));

    try {
      await axios.post('http://localhost:3001/login', values);
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <Container className="glass-container">
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h2 className="text-center mb-4" style={{ color: '#EEE7DA' }}>Login</h2>
           
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{ color: '#EEE7DA' }}>Enter Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name='email'
                  value={email}
                  onChange={e => setValues({...values, email: e.target.value})} 
                  className='form-control rounded-0'
                  required
                />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
              </Form.Group>
              

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{ color: '#EEE7DA' }}>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name='password'
                  value={password}
                  onChange={e => setValues({...values, password: e.target.value})}
                  className='form-control rounded-0'
                  required
                />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check style={{ color: '#EEE7DA' }}
                  type="checkbox"
                  label="Keep me signed in"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              </Form.Group>

              <Button variant="primary" style={{ backgroundColor: '#7071E8' }} type="submit" block>
                Login
                <Link to="/Home"></Link>
              </Button>
            </Form>

            <div className="mt-3 text-center" style={{ color: '#EEE7DA' }}>
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup">Sign Up</Link>
            </div>

            <div className="mt-3 text-center">
            <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
