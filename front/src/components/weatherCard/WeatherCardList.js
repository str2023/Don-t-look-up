/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useContext, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLongPress } from 'use-long-press'; // 롱클릭시 이벤트 라이브러리
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import WeatherCard from './WeatherCard';
import * as Api from '../../lib/apis/api';
import { UserContext } from '../../contexts/context';
import 밤하늘 from '../../assets/night.png';
import 낮하늘 from '../../assets/sky.png';

const useStyles = makeStyles(() => ({
  favoriteBackground: {
    backgroundImage: `url(${parseInt(new Date().getHours(), 10) > 7 && parseInt(new Date().getHours(), 10) < 19 ? 낮하늘 : 밤하늘})`,
    backgroundSize: 'cover',
    height: '100vh',
    padding: 20,
  },
}));

const WeatherCardList = (props) => {
  const [areaKey, setAreaKey] = useState('');
  const { area } = useContext(UserContext);
  const { favorite, setChange, change } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const callback = useCallback(async () => {
    if (window.confirm('해당 주소를 즐겨찾기에서 제외하시겠습니까?')) {
      try {
        await Api.delete('/user/favorite', { area: areaKey });
        setChange(!change);
        enqueueSnackbar(`${areaKey}가 즐겨찾기에서 제외되었습니다!`, { variant: 'success' });
      } catch (err) {
        console.log(err);
      }
    }
  }, [areaKey, change, enqueueSnackbar, setChange]);

  const onDeleteFavorite = useLongPress(callback, {
    onStart: (e) => setAreaKey(e.currentTarget.getAttribute('data-key')),
    threshold: 1000,
  });

  const handleAddFavorite = async () => {
    if (Object.values(favorite).find((v) => v === area)) {
      enqueueSnackbar(`${area}는 이미 즐겨찾기 중입니다!`, { variant: 'warning' });
    } else {
      try {
        await Api.post('/user/favorite', { area });
        setChange(!change);
        enqueueSnackbar(`${area}가 즐겨찾기되었습니다!`, { variant: 'success' });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box justifyContent="center" className={classes.favoriteBackground}>
      <Typography className="modelTitle" color="#ffeb76" variant="h3" align="center" style={{ fontFamily: 'GmarketSansMedium' }}>
        즐겨찾기
      </Typography>
      {Object.keys(favorite).length === 0 && (
        <Typography variant="h6" align="center" p={10}>
          즐겨찾기가 없습니다.
          <br />
          <br />
          현재 위치를 즐겨찾기해보세요.
        </Typography>
      )}
      {Object.keys(favorite).length > 0 && (
        <Grid container maxWidth="xs" justifyContent="space-evenly">
          {Object.values(favorite).map((value) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Grid item key={value} p={2} data-key={value} {...onDeleteFavorite()}>
              <WeatherCard area={value} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box textAlign="center">
        <StyledBtn onClick={handleAddFavorite}>추가하기</StyledBtn>
      </Box>
    </Box>
  );
};

export default WeatherCardList;

const StyledBtn = styled.button`
  width: 16vh;
  height: flex;
  background-color: #4a8bd1;
  border-radius: 20px;
  border: 0px;
  box-shadow: 0px 0px 16px #f4f4f4;
  font-family: 'GmarketSansMedium';
  font-size: 16pt;
  text-align: center;
  color: #1d2556;
  margin: 2vh auto;
  padding: 0.8vh 2vh;
  &:hover {
    background-color: #345bb2;
    color: #efefef;
  }
`;
