import React, { useState, useEffect } from 'react';

function Weather({ currentWeather }) {
  const [T1H, setT1H] = useState('');
  const [REH, setREH] = useState('');
  const [WSD, setWSD] = useState('');
  const wx = '맑음';

  useEffect(() => {
    setT1H(currentWeather.T1H);
    setREH(currentWeather.REH);
    setWSD(currentWeather.WSD);
  }, [currentWeather]);

  return (
    <div>
      <div style={{ backgroundColor: '#000', width: '8vh', height: '8vh' }} />
      <p>{T1H}℃</p>

      <p>습도</p>
      <p>{REH}%</p>
      <p>풍속</p>
      <p>{WSD}km/h</p>
    </div>
  );
}

export default Weather;
