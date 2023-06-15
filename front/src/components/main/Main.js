import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { Button } from '@mui/material';
import * as Api from '../../lib/apis/api';
import { UserContext } from '../../contexts/context';
import Outfit from '../outfit/Outfits';
import Weather from '../weather/Weather';
import useMoveScroll from '../../hooks/useMoveScroll';
import 밤하늘 from '../../assets/night.png';
import 낮하늘 from '../../assets/sky.png';
import 맑음 from '../../assets/sun.png';

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
    backgroundImage: `url(${낮하늘})`,
    backgroundSizd: '100vh 100vh',
    position: 'relative',
  },
  styledBtn: {
    width: '16vh',
    position: 'absolute',
    top: '56%',
    left: '38%',
  },
  styledFont: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '3vh',
    padding: '0 0 0.5vh 0',
    margin: '0 0 0 0',
  },
  infoContainer: {
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
  const [temperature, setTemperature] = useState('');
  const [UV, setUV] = useState(null);
  const [currentWeather, setCurrentWeather] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext).userState;
  const classes = useStyles();
  const { area } = useContext(UserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // 전역에서 받아온 값이 있을 경우, 변경될 경우
  useEffect(() => {
    if (area && area !== '') {
      Api.get('/ultraSrtNcst', { area })
        .then((response) => {
          setCurrentWeather(response.Current);
          setTemperature(response.Current.T1H); // Current.T1H는 현재 기온을 뜻한다
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
    Api.get('/uvidx', { area })
      .then((response) => {
        setUV(response.h0); // h0는 현재 자외선 수치를 뜻한다
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [area]);

  // ref={element} 설정된 곳으로 스크롤 이동
  const { element, onMoveToElement } = useMoveScroll();

  const handleFavoriteClick = async () => {
    try {
      const response = await Api.post('/user/favorite', { area });
      console.log('즐겨찾기에 추가 완료', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <div className={classes.weatherContainer}>
        <div className={classes.weatherImageContainer}>
          <img src={맑음} alt="맑은 태양 이미지" style={{ width: '600px', marginBottom: '4vh' }} />
          <p className={classes.styledFont}>{temperature ? `${area}의 현재 기온은 ${temperature}℃입니다` : ''}</p>
          <p className={classes.styledFont}>{UV ? `현재 위치의 자외선 수치는 ${UV}입니다` : ''}</p>
          <Button variant="contained" onclick={handleFavoriteClick} className={classes.styledBtn}>
            즐겨찾기
          </Button>
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.weatherInfoContainer}>
            <Weather currentWeather={currentWeather} />
          </div>
          <div className={classes.outfitContainer}>
            <Outfit temperature={temperature} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
