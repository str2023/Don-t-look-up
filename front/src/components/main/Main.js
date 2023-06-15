import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { keyframes } from 'styled-components';
import * as Api from '../../lib/apis/api';
import { UserContext } from '../../contexts/context';
import Outfit from '../outfit/Outfits';
import Weather from '../weather/Weather';
import WeatherImage from '../weather/WeatherImage';
import useMoveScroll from '../../hooks/useMoveScroll';
import ArrangeWeather from '../../lib/utils/ArrangeWeather';
import 밤하늘 from '../../assets/night.png';
import 낮하늘 from '../../assets/sky.png';

const useStyles = makeStyles((theme) => ({
  weatherContainer: {
    width: '100%',
    height: 'flex',
  },
  weatherImageContainer: {
    width: '100%',
    height: '100vh',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundImage: `url(${밤하늘})`,
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
  },
  styledFont: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2.6vh',
    margin: '0 0 0 0',
  },
  outfitIntro: {
    backgroundColor: '#47b4e6',
    height: '4vh',
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
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext).userState;
  const classes = useStyles();
  const { area } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

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
      <div className={classes.weatherContainer}>
        <div className={classes.weatherImageContainer}>
          <WeatherImage icon={icon} />
          <div className={classes.infoContainer}>
            <p className={classes.styledFont}>{weather.T1H ? `${area}의 현재 기온은 ${weather.T1H}℃입니다` : ''}</p>
            <p className={classes.styledFont}>{weather.uvIndex ? `현재 위치의 자외선 수치는 ${weather.uvIndex}㎽.sec/c㎡ 입니다` : ''}</p>
          </div>
        </div>

        <div className={classes.detailContainer}>
          <div className={classes.outfitIntro}>오늘의 날씨를 견디기 위한 옷차림</div>
          <div className={classes.weatherInfoContainer}>
            <Weather currentWeather={weather} />
          </div>
          <div className={classes.outfitContainer}>
            <Outfit weather={weather} icon={icon} />
          </div>
        </div>
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
