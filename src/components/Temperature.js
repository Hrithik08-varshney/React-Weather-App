import React from 'react';

const Temperature = ({ temp }) => {
  return (
    <div className="temperature">
      <p>Temperature: {temp} °C</p>
    </div>
  );
};

export default Temperature;
