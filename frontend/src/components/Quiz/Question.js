// Question.js
import React from 'react';

const Question = ({ question, value, onChange }) => {
  const renderDots = (numDots) => {
    const dots = Array.from({ length: numDots }, (_, index) => (
      <span key={index} className={index <= value ? 'dot filled' : 'dot'} />
    ));
    return dots;
  };

  return (
    <div className="question-container">
      <p>Q. {question}</p>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="4"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
        />
        <div className="dots-container">{renderDots(5)}</div>
      </div>
      <div className="slider-values">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
      </div>
    </div>
  );
};

export default Question;