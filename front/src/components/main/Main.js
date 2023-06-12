import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../lib/apis/api';
import { UserContext } from '../../contexts/context';

function Main() {
  const [temperature, setTemperature] = useState('');
  const [UV, setUV] = useState(null);
  const [attire, setAttire] = useState(null);
  const [area, setArea] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext).userState;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const getAttire = () => {
      if (temperature !== null) {
        // 아래에 위치를 입력해서 가져온 temperature로 /outfit 입력해서 옷 정보를 가져온다
        Api.get('/outfit', { temp: temperature })
          .then((data) => {
            try {
              if (data && data.clothes && data.clothes.length > 0) {
                setAttire(data.clothes[0]);
              } else {
                console.error('Unexpected API ');
              }
            } catch (e) {
              console.error('There was an error!', e);
            }
          })
          .catch((error) => {
            console.error('There was an error!', error);
          });
      }
    };

    getAttire();
  }, [temperature]); // 온도가 변경 될 시 getAttire()를 다시 실행

  const getTemperature = () => {
    if (area !== '') {
      // UltraSrtNcst는 현재 위치의 기온을 호출한다
      Api.get('/ultraSrtNcst', { area })
        .then((response) => {
          setTemperature(response.data.Current.T1H); // Current.T1H는 현재 기온을 뜻한다
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  };

  const getUV = () => {
    if (area !== '') {
      // UVIdx는 현재 위치의 자외선수치를 호출한다
      Api.get('/uvidx', { area })
        .then((response) => {
          setUV(response.data.h0); // h0는 현재 자외선 수치를 뜻한다
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    }
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const getWeatherInfo = () => {
    getTemperature();
    getUV();
  };
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
      <input type="text" value={area} onChange={handleAreaChange} placeholder="위치를 입력해주세요" />
      <button onClick={getWeatherInfo}>날씨 정보 찾기</button>
      <button onClick={handleFavoriteClick}>즐겨찾기에 추가</button>
      <p>{temperature ? `현재 위치의 날씨 정보는 ${temperature}입니다` : ''}</p>
      <p>{UV ? `현재 위치의 자외선 수치는 ${UV}입니다` : ''}</p>
      {attire && (
        <>
          <p>Top: {attire.top.join(', ')}</p>
          <p>Bottom: {attire.bottom.join(', ')}</p>
          <p>Shoes: {attire.shoes.join(', ')}</p>
          <p>Outer: {attire.outer || 'None'}</p>
        </>
      )}
    </div>
  );
}

export default Main;
