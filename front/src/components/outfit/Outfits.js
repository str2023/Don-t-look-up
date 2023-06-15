import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import * as Api from '../../lib/apis/api';
import Top from './Top';
import Bottom from './Bottom';
import Outer from './Outer';
import Shoes from './Shoes';
import Items from './Items';

const useStyles = makeStyles((theme) => ({
  outfitContainer: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
}));

function Outfit({ weather, icon }) {
  const classes = useStyles();
  // props로 outfit을 받아오게 수정
  const [attire, setAttire] = useState(null);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getAttire = () => {
      if (weather.T1H !== null) {
        // 아래에 위치를 입력해서 가져온 temperature로 /outfit 입력해서 옷 정보를 가져온다
        Api.get('/outfit', { temp: weather.T1H })
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

    const getItems = () => {
      if (icon !== null) {
        Api.get('/outfit', { weatherCondition: icon })
          .then((data) => {
            try {
              if (data && data.item) {
                setItem(data.item);
              } else {
                console.error('Unexpected API');
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
    getItems();
  }, [weather.T1H, icon]); // 온도가 변경 될 시 getAttire()를 다시 실행

  return (
    <div>
      {attire && (
        <>
          <p>오늘의 옷차림</p>
          <div className={classes.outfitContainer}>
            <Top attire={attire} />
            <Outer attire={attire} />
            <Bottom attire={attire} />
            <Shoes attire={attire} />
            {item && <Items item={item} />}
          </div>
        </>
      )}
    </div>
  );
}

export default Outfit;
