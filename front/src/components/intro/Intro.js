import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  introContainer: {
    width: '100%',
    height: '100vh',
    backgroundImage: 'url("image")',
    backgroundSize: 'cover',
    color: 'white',
  },
  banner: {
    width: '100%',
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle: {
    fontSize: '3em',
  },
  button: {
    marginTop: '1em',
  },
  graphsContainer: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  graph: {
    width: '80%',
  },
  graphTitle: {
    fontSize: '2em',
    textAlign: 'center',
  },
  lineChart: {
    marginTop: '2em',
  }
}));

function Intro() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.PUBLIC_URL  }/carbonEmission.json`);
      
      const reshapedData = Object.entries(result.data).reduce((acc, [key, values]) => {
        Object.entries(values).forEach(([year, emission]) => {
          const existingYearObject = acc.find(obj => obj.year === year);
          if (existingYearObject) {
            existingYearObject[key] = emission;
          } else {
            acc.push({
              year,
              [key]: emission
            });
          }
        });
        return acc;
      }, []).sort((a, b) => a.year - b.year); // 년도를 오름차순으로 정렬

      setData(reshapedData);
    };
    
    fetchData();
  }, []);

  const handleButtonClick = () => {
    const loggedIn = sessionStorage.getItem('userToken');
    // 클릭시 로그인 했을때 바로 메인페이지로 이동
    if (loggedIn) {
      navigate('/main');
      // 아닐시 로그인페이지로 이동
    } else {
      navigate('/login');
    }
  };

const handleScrollToGraphs = () => {
  // 클릭시 아래의 그래프로 자동 스크롤

};



  return (
    <div className={classes.introContainer}>
      <div className={classes.banner}>
        <h1 className={classes.introTitle}>기후에 따른 옷차림 추천 당신의 기상 패션 가이드</h1>
        <button className={classes.button} onClick={handleButtonClick}>시작하기</button>
        <Button variant="contained" color="primary" onClick={handleScrollToGraphs} className={classes.button}>
          더 알아보기
        </Button>
      </div>

      <div className={classes.graphsContainer}>
        <div className={classes.graph}>
          <h2 className={classes.graphTitle}>전세계 온실가스 배출량 차트</h2>
          <LineChart
            className={classes.lineChart}
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Non-OECD" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="OECD" stroke="#82ca9d" />
          <Line type="monotone" dataKey="World" stroke="#ff7300" />
        </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Intro;
