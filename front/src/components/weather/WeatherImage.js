/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import ArrangeWeather from '../../lib/utils/ArrangeWeather';

import 낮맑음이미지 from '../../assets/낮_맑음.png';
import 밤맑음이미지 from '../../assets/밤_맑음.png';
import 낮구름이미지 from '../../assets/낮_구름.png';
import 밤구름이미지 from '../../assets/밤_구름.png';
import 흐림이미지 from '../../assets/흐림.png';
import 비이미지 from '../../assets/비.png';
import 강한비이미지 from '../../assets/강한비.png';
import 빗방울이미지 from '../../assets/빗방울.png';
import 비눈이미지 from '../../assets/비눈.png';
import 눈이미지 from '../../assets/눈.png';
import 눈날림이미지 from '../../assets/눈날림.png';
import 빗방울눈날림이미지 from '../../assets/빗방울눈날림.png';

const WeatherImage = ({ icon }) => {
  const [weatherImg, setWeatherImg] = useState('');
  const today = new Date();

  const hours = today.getHours();

  const images = {
    낮맑음: 낮맑음이미지,
    밤맑음: 밤맑음이미지,
    낮구름: 낮구름이미지,
    밤구름: 밤구름이미지,
    흐림: 흐림이미지,
    비: 비이미지,
    '강한 비': 강한비이미지,
    빗방울: 빗방울이미지,
    비눈: 비눈이미지,
    눈: 눈이미지,
    눈날림: 눈날림이미지,
    빗방울눈날림: 빗방울눈날림이미지,
  };

  const getIcon = useCallback(async () => {
    setWeatherImg(icon);
  });

  useEffect(() => {
    getIcon();
  }, [getIcon]);

  if (weatherImg === '맑음') {
    if (hours >= 7 && hours <= 18) {
      setWeatherImg('낮맑음');
    } else {
      setWeatherImg('밤맑음');
    }
  } else if (weatherImg === '구름') {
    if (hours >= 7 && hours <= 18) {
      setWeatherImg('낮구름');
    } else {
      setWeatherImg('밤구름');
    }
  }

  return <img src={images[weatherImg]} alt={weatherImg} style={{ width: '760px', margin: '0 0 4.4vh 0' }} />;
};

export default WeatherImage;
