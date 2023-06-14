import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import * as Api from '../../lib/apis/api';
import { UserContext } from '../../contexts/context';
import Outfit from '../outfit/Outfits';
import useMoveScroll from '../../hooks/useMoveScroll';

const useStyles = makeStyles((theme) => ({
  weatherContainer: {
    width: '100%',
    height: '100vh',
  },
  tempAndUVIdxContainer: {},
  weatherInfoContainer: {
    width: '100%',
    height: '48vh',
    backgroundColor: '#9BCDD2',
    display: 'grid',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  outfitContainer: {
    display: 'grid',
  },
}));

// 이상 스타일링 코드

function Main() {
  const [temperature, setTemperature] = useState('');
  const [UV, setUV] = useState(null);
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
        <div className={classes.weatherInfoContainer}>
          {/* <img src={소스} alt="날씨 이미지" /> */}
          <p>{temperature ? `${area}의 기온은 ${temperature}입니다` : ''}</p>
          <p>{UV ? `현재 위치의 자외선 수치는 ${UV}입니다` : ''}</p>
        </div>
        <div className={classes.outfitContainer}>
          <Outfit temperature={temperature} />
        </div>
      </div>
    </div>
  );
}

export default Main;
