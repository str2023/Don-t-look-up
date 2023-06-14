import React, { useState, useEffect } from 'react';
import * as Api from '../../lib/apis/api';
import Top from './Top';
import Bottom from './Bottom';
import Outer from './Outer';
import Shoes from './Shoes';

function Outfit({ temperature }) {
  // props로 outfit을 받아오게 수정
  const [attire, setAttire] = useState(null);

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

  return (
    <div>
      {attire && (
        <>
          <p>오늘의 옷차림</p>
          <Top attire={attire} />
          <Outer attire={attire} />
          <Bottom attire={attire} />
          <Shoes attire={attire} />
        </>
      )}
    </div>
  );
}

export default Outfit;
