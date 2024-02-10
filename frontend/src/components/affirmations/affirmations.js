import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/affirmations.css';

function Affirmations() {
  const [auth, setAuth] = useState(false);
  const [advice, setAdvice] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/positive')
      .then(res => {
        if (res.status === 200) {
          console.log('Response: ', res.data)
          if (res.data.Status === "Success") {
            setAuth(true);
          } else {
            setAuth(false);
          }
        } else {
          setAuth(false);
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
      });
  }, []);

  const fetchAdvice = () => {
    fetch("https://type.fit/api/quotes")
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomAdvice = data[randomIndex].text;
        setAdvice(randomAdvice);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="affirmation-app">
      {auth ? (
        <div className="affirmation-card">
          <h1 className="affirmation-heading">{advice}</h1>
          <button className="affirmation-button" onClick={fetchAdvice}>
            <span>Generate another quote.</span>
          </button>
        </div>
      ) : (
        <div className='content-overlay1'>
          <h3>Login Now to view Unwind.</h3>
          <Link to="/Login" className='btn btn-primary'>Login</Link>
        </div>
      )}
    </div>
  );
}

export default Affirmations;
