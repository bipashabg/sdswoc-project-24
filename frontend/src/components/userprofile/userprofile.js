import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/userprofile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({ Fullname: '', username: '', date_of_joining: '', last_online: '', depression: '', anxiety: '', stress: '', created_at: '' });
  const [username, setUsername] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [depression, setDepression] = useState('');
  const [anxiety, setAnxiety] = useState('');
  const [stress, setStress] = useState('');
  const [createdat, setCreatedat] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [lastOnline, setLastOnline] = useState('');
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  axios.defaults.withCredentials = true;


  useEffect(() => {
    axios.get('http://localhost:3001/profile')
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          console.log('Response from /profile:', data);

          if (data.Status === "Success") {
            setAuth(true);
            setUserData({
              Fullname: data.Fullname || '',
              username: data.username || '',
              date_of_joining: data.date_of_joining || '',
              last_online: data.last_online || '',
              about_me: data.about_me || '',

              depression: data.depression || '',
              anxiety: data.anxiety || '',
              stress: data.stress || '',
              created_at: data.created_at || '',
            });
            
            //Set the state
            setUsername(data.username || '');
            setAboutMe(data.about_me || ''); // Update the aboutMe state here
            setDateOfJoining(data.date_of_joining || '');
            setLastOnline(data.last_online || '');
            setDepression(data.depression || '');
            setAnxiety(data.anxiety || '');
            setStress(data.stress || '');
            setCreatedat(data.created_at || '');
      } else {
        setAuth(false);
        setMessage(data.Error || 'An error occurred. Please try again.');
      }
    } else {
      setAuth(false);
      setMessage('An error occurred. Please try again.');
    }
  })
  .catch(err => {
    console.log('Error fetching /profile:', err);
    setAuth(false);
    setMessage('An error occurred. Please try again.');
  });
}, []);


  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleSaveAboutMe = () => {
      console.log('Save button clicked');
    // Make an API call to save the aboutMe to the database
    const { username } = userData; 
    // Check if aboutMe is not empty before making the API call
  if (aboutMe.trim() === '') {
    console.error('About Me cannot be empty.');
    return;
  }

  console.log('username:', username);
  console.log('aboutMe:', aboutMe);

  axios.post('http://localhost:3001/updateAboutMe', { username, aboutMe })
  .then(res => {
    if (res.status === 200 && res.data.Status === 'Success') {
      setIsEditing(false);

      // Update userData state with the new about_me value
      setUserData(prevUserData => ({
        ...prevUserData,
        about_me: aboutMe,
      }));
    } else {
      console.error(res.data.Error || 'Failed to update about me.');
    }
  })
  .catch(err => {
    console.error('An error occurred while updating about me:', err);
  });
};

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Card>
            {/*<Card.Img variant="top" src="path-to-profile-image" />*/}
            <Card.Body>
              <Card.Title>{userData.Fullname}</Card.Title>
              <Card.Text>{userData.username}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {!auth && (
            <Card>
              <Card.Body>
                <Card.Title>{message}</Card.Title>
                <Card.Text>{userData.about_me}</Card.Text>
                <Link to="/login">
                  <Button variant="primary">Login</Button>
                </Link>
              </Card.Body>
            </Card>
          )}
          {auth && (
            <>
              <Card>
                <Card.Body>
                  <Card.Title>About Me:</Card.Title>
                  {isEditing ? (
                    <>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={aboutMe}
                          onChange={handleAboutMeChange}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={() => handleSaveAboutMe()}>
                          Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Card.Text>{aboutMe}</Card.Text>
                      <Button variant="link" onClick={() => setIsEditing(true)}>
                        Edit
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
              {/* Add more Card components for additional sections */}
              <Card>
                <Card.Body>
                  <Card.Title>Last online:</Card.Title>
                  {userData.last_online}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Mental Health Quiz History:</Card.Title>
                      <Card.Text>Depression: {userData.depression}</Card.Text>
                      <Card.Text>Stress: {userData.stress}</Card.Text>
                      <Card.Text>Anxiety: {userData.anxiety}</Card.Text>
                      <Card.Text>Taken at: {userData.created_at}</Card.Text>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Date of Joining:</Card.Title>
                  <Card.Text>{userData.date_of_joining}</Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;