import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/community.css';

const Community = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/communitypage')
      .then(res => {
        if (res.status === 200) {
          if (res.data.Status === "Success") {
            setAuth(true);
            setArticles(res.data.articles); // Set the articles from the backend
            console.log(articles);
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
    <div className="news-container">
      {auth ? (
        <div>
          <h1>Meditation and Relaxation News</h1>
          <ul className="articles-list">
            {articles.map((article, index) => (
              <li key={index} className="article-item">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </li>
            ))}
          </ul>
        </div>
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
};

export default Community;
