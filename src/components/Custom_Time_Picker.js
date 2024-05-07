import React, { useState } from 'react';

const CustomTimePicker = ({ value, onChange }) => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    onChange(`${e.target.value}:${minutes}:${seconds}`);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
    onChange(`${hours}:${e.target.value}:${seconds}`);
  };

  const handleSecondsChange = (e) => {
    setSeconds(e.target.value);
    onChange(`${hours}:${minutes}:${e.target.value}`);
  };


  return (
    <div>
      <input type="number" min="0" max="23" value={hours} onChange={handleHoursChange} /> :
      <input type="number" min="0" max="59" value={minutes} onChange={handleMinutesChange} /> :
      <input type="number" min="0" max="59" value={seconds} onChange={handleSecondsChange} />
    </div>
  );
};

export default CustomTimePicker;
