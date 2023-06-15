import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  styledFontsm: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2.8vh',
    padding: '0',
    margin: '1.2vh 0 4vh 0',
  },
  styledFontmd1: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '4vh',
    padding: '0',
    margin: '2.8vh 0 0 0',
  },
  styledFontmd2: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '4vh',
    padding: '0',
    margin: '3.2vh 0 4vh 0',
  },
}));

function Weather({ currentWeather }) {
  const classes = useStyles();

  const [T1H, setT1H] = useState('');
  const [REH, setREH] = useState('');
  const [WSD, setWSD] = useState('');

  useEffect(() => {
    setT1H(currentWeather.T1H);
    setREH(currentWeather.REH);
    setWSD(currentWeather.WSD);
  }, [currentWeather]);

  return (
    <div>
      <T1HWrapper>
        <StyledDiv>기온 및 날씨</StyledDiv>
        <p className={classes.styledFontmd1}>{T1H}℃</p>
        <p className={classes.styledFontsm}>맑음</p>
      </T1HWrapper>
      <REHWrapper>
        <StyledDiv>습도</StyledDiv>
        <p className={classes.styledFontmd2}>{REH}%</p>
      </REHWrapper>
      <WSDWrapper>
        <StyledDiv>풍속</StyledDiv>
        <p className={classes.styledFontmd2}>{WSD}km/h</p>
      </WSDWrapper>
    </div>
  );
}

export default Weather;

const T1HWrapper = styled.div`
  width: 250px;
  text-align: center;
`;

const REHWrapper = styled.div`
  width: 250px;
  text-align: center;
`;

const WSDWrapper = styled.div`
  width: 250px;
  text-align: center;
`;

const StyledDiv = styled.div`
  width: 16vh;
  height: flex;
  background-color: #efefef;
  border-radius: 20px;
  box-shadow: 0px 0px 16px #f4f4f4;
  font-family: 'GmarketSansMedium';
  font-size: 16pt;
  color: #606060;
  margin: 2vh auto;
  padding: 0.8vh 2vh;
`;
