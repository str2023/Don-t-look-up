import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';
import * as Api from '../../lib/apis/api';
import 낮평년기온 from '../../assets/mthd/낮_평년기온.png';
import 밤평년기온 from '../../assets/mthd/밤_평년기온.png';

const useStyles = makeStyles((theme) => ({
  description1: {
    textAlign: 'center',
    fontSize: '2.4vh',
    margin: '2vh 0',
    padding: '0',
  },
  description2: {
    textAlign: 'center',
    fontSize: '2.4vh',
    margin: '0',
    padding: '0',
  },
}));

const WeatherMthd = ({ area }) => {
  const classes = useStyles();
  const [method, setMethod] = useState(null);
  const [method1, setMethod1] = useState(null);
  const [method2, setMethod2] = useState(null);

  const getMethod = useCallback(() => {
    if (area != null) {
      Api.get('/weatherMthd', { area }).then((data) => {
        try {
          if (typeof data === 'string') {
            setMethod('평년 기온');
          } else if (typeof data === 'object') {
            setMethod(data);
            setMethod1(data['0']);
            setMethod2(data['1']);
          }
        } catch (err) {
          console.error('there was an error!', err);
        }
      });
    }
  }, [area]);

  useEffect(() => {
    getMethod();
  }, [getMethod]);

  return (
    <div>
      <MethodWrapper>
        <StyledDiv>행동방침</StyledDiv>
        {method === '평년 기온' && (
          <>
            <p className={classes.description1}>(1)</p>
            <p className={classes.description2}>평년과 같은 날씨를 유지합니다.</p>
            <p className={classes.description2}>바깥에서 활동하기 좋아요!</p>
            <img
              src={parseInt(new Date().getHours(), 10) >= 7 && parseInt(new Date().getHours(), 10) <= 19 ? 낮평년기온 : 밤평년기온}
              alt="행동방침 이미지"
            />
          </>
        )}
      </MethodWrapper>
    </div>
  );
};

export default WeatherMthd;

const MethodWrapper = styled.div`
  width: 780px;
  margin: auto;
  display: grid;
  justify-contents: center;
  align-items: center;
`;

const StyledDiv = styled.div`
  width: 12vh;
  height: flex;
  background-color: #efefef;
  border-radius: 20px;
  box-shadow: 0px 0px 16px #f4f4f4;
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 16pt;
  color: #606060;
  margin: 2vh auto;
  padding: 0.8vh 2vh;
`;
