import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../../styles/virtualretreat.css';
import axios from 'axios';

const videos = [
  '/videos/vs1.mp4',
  '/videos/vs2.mp4',
  '/videos/vs3.mp4',
  '/videos/vs4.mp4',
  '/videos/vs5.mp4',
  '/videos/vs6.mp4',
  '/videos/vs7.mp4',
  '/videos/vs8.mp4',
];

const playlists = [
  '37i9dQZF1DWZqd5JICZI0u', // Playlist 1
  '37i9dQZF1DX2DjEOgyULQF', // Playlist 2
];

function DraggableWidget({ children }) {
  const widgetRef = useRef(null);
  const [isDragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - widgetRef.current.getBoundingClientRect().left;
    const offsetY = e.clientY - widgetRef.current.getBoundingClientRect().top;

    const handleMouseMove = (e) => {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={widgetRef}
      className="draggable-widget"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
      }}
    >
      <div className="widget-header" onMouseDown={handleMouseDown}>
        <div className="draggable-cursor" onMouseUp={() => setDragging(false)}>
          &#9758;
        </div>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  );
}

function VirtualRetreat() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  const [message, setMessage] = useState('');

  useEffect(() => {

    axios.get('http://localhost:3001/virtual')
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

  const currentVideo = videos[currentVideoIndex];
  const currentPlaylistId = playlists[currentPlaylistIndex];

  const handleToggleVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleTogglePlaylist = () => {
    setCurrentPlaylistIndex((prevIndex) => (prevIndex + 1) % playlists.length);
  };

  return (
    <div className="virtual-retreat-container">
      {auth ? (
        <>
          <ReactPlayer url={currentVideo} playing={true} loop={true} muted={true} width="100%" height="100%" />
          <button className="toggle-button" onClick={handleToggleVideo}>
            Shuffle Visual
          </button>
          <button className="toggle-button1" onClick={handleTogglePlaylist}>
            Change Playlist
          </button>
          <DraggableWidget>
            <div className="spotify-widget-container">
              <iframe
                title="Spotify Playlist"
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${currentPlaylistId}?utm_source=generator`}
                width="100%"
                height="352"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </DraggableWidget>
        </>
      ) : (
        <div className='content-overlay1'>
          <h3>Login Now to access Virtual Retreat.</h3>
          <Link to="/Login" className='btn btn-primary'>Login</Link>
        </div>
      )}
    </div>
  );
}

export default VirtualRetreat;
