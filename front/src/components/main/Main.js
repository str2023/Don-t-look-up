import React, { useState, useEffect, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { keyframes } from 'styled-components';

import { UserContext } from '../../contexts/context';
import Outfit from '../outfit/Outfits';
import Weather from '../weather/Weather';
import WeatherImage from '../weather/WeatherImage';
import useMoveScroll from '../../hooks/useMoveScroll';
import ArrangeWeather from '../../lib/utils/ArrangeWeather';
import 밤하늘 from '../../assets/night.png';
import 낮하늘 from '../../assets/sky.png';
import ActivityCard from '../activity/ActivityCard';
import WeatherMthd from '../method/WeatherMthd';

const useStyles = makeStyles((theme) => ({
  weatherContainer: {
    width: '100%',
    height: 'flex',
    display: 'inline-block',
    justifyContent: 'center',
    alignContent: 'center',
  },
  weatherImageContainer: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundImage: `url(${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? 낮하늘 : 밤하늘})`,
    backgroundSize: 'cover',
    position: 'relative',
  },
  infoContainer: {
    height: 'flex',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '10px',
    padding: '3.2vh 6vh 3.2vh 6vh',
    margin: '6vh auto 0 auto',
  },
  sentence1: {
    width: '76vh',
    height: '12vh',
    borderRadius: '20px',
    backgroundColor: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#42bff5' : '#20273f'}`,
    color: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#20273f' : '#efefef'}`,
    margin: '4.8vh auto',
    fontSize: '3.2vh',
    display: 'grid',
    textAlign: 'center',
    alignItems: 'center',
  },
  styledFont1: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2.6vh',
    margin: '0 0 4vh 0',
    color: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#20273f' : '#efefef'}`,
  },
  styledFont2: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2.6vh',
    margin: '0 0 0 0',
  },
  styledFont3: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '3.2vh',
    fontWeight: '600',
    margin: '2vh 0 0 0',
    color: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#20273f' : '#efefef'}`,
  },
  styledFont4: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2.4vh',
    fontWeight: '100',
    color: `${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? '#20273f' : '#efefef'}`,
    opacity: '80%',
    margin: '0 0 3.2vh 0',
  },
  detailContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top',
    marginTop: '4vh',
  },
  weatherInfoContainer: {
    alignContent: 'center',
  },
  outfitContainer: {
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
}));

// 이상 스타일링 코드

function Main() {
  const [icon, setIcon] = useState('');
  const [weather, setWeather] = useState('');
  const classes = useStyles();
  const { area } = useContext(UserContext);

  const getWeather = useCallback(async () => {
    let data;
    try {
      data = await ArrangeWeather({ area });
    } catch (err) {
      alert('날씨 정보를 불러오는 데 문제가 발생하였습니다.');
      console.log(err);
    }
    setIcon(data.icon);
    setWeather(() => {
      const newWeather = { ...data.weather, ...data.uvIndex, ...data.outfit };
      return newWeather;
    });
  }, [area]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  // ref={element} 설정된 곳으로 스크롤 이동
  const { element, onMoveToElement } = useMoveScroll();

  return (
    <div>
      <ActivityCard temp={weather.T1H} wx={icon} area={area} />
      <div className={classes.weatherContainer}>
        <div className={classes.weatherImageContainer}>
          <p className={classes.styledFont1}>{`${area}의 현재 날씨는 ... < ${icon} >`}</p>
          <WeatherImage icon={icon} />
          <div className={classes.infoContainer}>
            <p className={classes.styledFont2}>{weather.T1H ? `${area}의 현재 기온은 ${weather.T1H}℃입니다` : ''}</p>
            <p className={classes.styledFont2}>{weather.uvIndex ? `현재 위치의 자외선 수치는 ${weather.uvIndex}㎽.sec/c㎡ 입니다` : ''}</p>
          </div>
        </div>

        <div className={classes.sentence1}>
          <p className={classes.styledFont3}>오늘의 날씨를 견디기 위한 옷차림</p>
          <p className={classes.styledFont4}>날씨를 바꿀 수 없다면 옷차림을 바꾸자!</p>
        </div>

        <div className={classes.detailContainer}>
          <div className={classes.weatherInfoContainer}>
            <Weather currentWeather={weather} />
          </div>
          <div className={classes.outfitContainer}>
            <Outfit weather={weather} icon={icon} />
          </div>
        </div>

        <div className={classes.sentence1}>
          <p className={classes.styledFont3}>오늘의 날씨를 견디기 위한 행동방침</p>
          <p className={classes.styledFont4}>날씨를 바꿀 수는 없지만 현명하게 대응할 순 있다!</p>
        </div>

        <WeatherMthd area={area} />
      </div>
    </div>
  );
}

export default Main;

const animation = keyframes`
  from {
    transform: translate(0, 100)
  }
  to {
    transform: translate(0, 0)
  }
`;
