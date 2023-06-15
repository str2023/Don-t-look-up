import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  styledFontsm: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '2vh',
  },
  styledFontmd: {
    fontFamily: 'GmarketSansMedium',
    fontSize: '4vh',
  },
}));

function Weather({ currentWeather }) {
  const classes = useStyles();

  const [T1H, setT1H] = useState('');
  const [REH, setREH] = useState('');
  const [WSD, setWSD] = useState('');
  const wx = '맑음';

  useEffect(() => {
    setT1H(currentWeather.T1H);
    setREH(currentWeather.REH);
    setWSD(currentWeather.WSD);
  }, [currentWeather]);

  return (
    <div>
      <T1HWrapper>
        <Chip label="기온 및 날씨" />
        <p className={classes.styledFontmd}>{T1H}℃</p>
        <p className={classes.styledFontmd}>맑음</p>
      </T1HWrapper>
      <REHWrapper>
        <Chip label="습도" />
        <p className={classes.styledFontmd}>{REH}%</p>
      </REHWrapper>
      <WSDWrapper>
        <Chip label="풍속" />
        <p className={classes.styledFontmd}>{WSD}km/h</p>
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
