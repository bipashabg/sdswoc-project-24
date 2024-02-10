import React, { useState, useEffect } from 'react';
import '../../styles/breathingexercise.css'; // Import your CSS file for styling

const themes = [
  { name: 'Light', backgroundColor: '#f0f0f0', textColor: '#333', circleColor: '#3498db' },
  { name: 'Dark', backgroundColor: '#333', textColor: '#fff', circleColor: '#3498db' },
  { name: 'Green', backgroundColor: '#B3FFAE', textColor: '#fff', circleColor: '#FF7D7D' },
  { name: 'Purple', backgroundColor: '#E26EE5', textColor: '#27005D', circleColor: '#49108B' },
];

const BreathingAnimation = () => {
  const [breathing, setBreathing] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBreathing((prevBreathing) => !prevBreathing);
    }, 4000); // Change text every 4 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, []);

  const toggleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  const currentTheme = themes[themeIndex];

  return (
    <div className={`breathing-animation ${breathing ? 'inhale' : 'exhale'}`} style={{ backgroundColor: currentTheme.backgroundColor, color: currentTheme.textColor }}>
      <div className="circle" style={{ backgroundColor: currentTheme.circleColor }}>
        <p>{breathing ? 'Inhale' : 'Exhale'}</p>
      </div>
      <button className="theme-toggle-button" onClick={toggleTheme}>Change Theme</button>
    </div>
  );
};

export default BreathingAnimation;
