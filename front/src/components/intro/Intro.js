import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from '../../8595-weather-app-animation.json';


function Intro() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
  <Box sx={{
    width: '100%',
    height: '100vh',
    color: 'white',
    backgroundColor: '#BDDFF8',
  }}>
    <Lottie animationData={animationData} 
    style={{ 
      position: 'absolute', 
      top: 0, left: 0, 
      height: '100%', 
      width: '100%', 
      zIndex: -1 }} />
    <Box sx={{
      width: '100%',
      height: '94vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography sx={{ fontSize: '4em', color: '#fff', fontFamily: 'GmarketSansMedium' }}>
        기후에 따른 옷차림 추천
      </Typography>
      <Typography sx={{ fontSize: '4em', color: '#fff', fontFamily: 'GmarketSansMedium' }}>
        당신의 기상 패션 가이드
      </Typography>
      <Button 
        variant="contained" 
        size="large"
        color='primary'
        onClick={handleButtonClick} 
        sx={{ marginTop: '1em', fontSize: '2em', }}  // Increase font size using fontSize in sx property
      >
        시작하기
      </Button>
      <Button variant="contained" color="primary" onClick={handleScrollToGraphs} sx={{ marginTop: '1em' }}>
        더 알아보기
      </Button>
    </Box>

    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#70C0AC',
    }}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '40%' }}>
          <Typography sx={{ fontSize: '2em', textAlign: 'center', fontFamily: 'GmarketSansMedium', }}>
            전세계 온실가스 배출량 차트
          </Typography>
          <LineChart
            width={800}
            height={600}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            sx={{ marginTop: '2em' }}
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
        </Box>
        <Box sx={{ 
        width: '40%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center' 
        }}>
          <Typography sx={{ 
            fontSize: '1.5em', 
            textAlign: 'center', 
            fontFamily: 'GmarketSansMedium', 
          }}>
            온실가스로 인해
            기후변화가 계속 일어나고 있습니다
            어리쿵 저리쿵쿵
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);
}

export default Intro;
