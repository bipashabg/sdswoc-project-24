// Gamepage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/gamepage.css'

const Gamepage = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    
    axios.get('http://localhost:3001/games')
      .then(res => {
        if (res.status === 200) {
          if (res.data.Status === "Success") {
            setAuth(true);
          } else {
            setAuth(false);
            setMessage(res.data.Error);
          }
        } else {
          setAuth(false);
          setMessage('An error occurred. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
        setMessage('An error occurred. Please try again.');
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {auth ? (
        <>
          <div>
            <a href="https://cdn.htmlgames.com/ColoringMandalas/" target="_blank" rel="noopener noreferrer">
              <button style={buttonStyle1}>Coloring Mandalas</button>
            </a>
          </div>
          <br />
          <div style={{ marginTop: '20px' }}>
            <a href="https://cdn.htmlgames.com/TetrisSlide/" target="_blank" rel="noopener noreferrer">
              <button style={buttonStyle2}>Tetris Slide</button>
            </a>
          </div>
        </>
      ) : (
        <div className='content-overlay1'>
          <h3>{message}</h3>
          <br />
          <h3>Login Now to view Unwind.</h3>
          <Link to="/Login" className='btn btn-primary'>Login</Link>
        </div>
      )}
    </div>
  );
 }

const buttonStyle1 = {
  fontSize: '18px',
  padding: '100px 100px',
  backgroundColor: '#3498db',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundImage: 'url(../../../public/mandala.jpg)', // Add the path to your background image
  backgroundSize: 'cover', // or 'contain' based on your preference
};

const buttonStyle2 = {
  fontSize: '18px',
  padding: '100px 132px',
  backgroundColor: '#2ecc71',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundImage: 'url(path/to/your/image.jpg)', // Add the path to your background image
  backgroundSize: 'cover',
};

export default Gamepage;
