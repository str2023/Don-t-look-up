import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import Lottie from 'lottie-react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import animationData from '../../Banner.json';
import tempData from '../../assets/data/koreaTemp.json';
import carbonData from '../../assets/data/carbonEmission.json';
import downArrow from "../../assets/lottie/down_arrow.json";


function Intro() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [carbonEmissionData, setCarbonEmissionData] = useState([]);
  const [tempChangeData, setTempChangeData] = useState([]);
  const graphsContainerRef = useRef(null);
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const chartWidth = viewportWidth * 0.3; 
  const chartHeight = viewportHeight * 0.3; 


  useEffect(() => {
    try {
      const years = Object.keys(carbonData['Non-OECD']).filter(year => year >= '2005' && year <= '2021');

    const reshapedCarbonEmissionData = years.map(year => ({
      year,
      'Non-OECD': carbonData['Non-OECD'][year],
      'OECD': carbonData.OECD[year],
      'World': carbonData.World[year],
    }));

    setCarbonEmissionData(reshapedCarbonEmissionData);



      const reshapedTempChangeData = tempData
        .filter((item) => item['년'] >= '1982' && item['년'] <= '2022')
        .map((item) => ({
          year: item['년'],
          temp: item['평균기온(℃)'],
        }));
      setTempChangeData(reshapedTempChangeData);
    } catch (error) {
      console.error('Data 처리 오류:', error);
      setCarbonEmissionData([]);
      setTempChangeData([]);
    }
  }, []);


  const handleButtonClick = () => {

      navigate('/main');

  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  const handleScrollToGraphs = () => {
    // 클릭시 아래의 그래프로 자동 스크롤
    if (graphsContainerRef.current) {
      graphsContainerRef.current.scrollIntoView({ behavior: 'smooth' }); 
    }
  };



return (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      color: 'white',
      backgroundColor: '#BDDFF8',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
        sx={{
          width: '100%',
          height: '96vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Lottie
          animationData={animationData}
          style={{
            position: 'absolute',
            top: 0,
            left: 32,
            height: '100%',
            width: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

      <Box
        sx={{
          width: '100%',
          height: '94vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 2,
        }}
      >
        <Typography
          sx={{ 
            fontSize: '2.5em', 
            color: '#fff', 
            fontFamily: 'GmarketSansMedium', 
            position: 'absolute', 
            top: '5em',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          기후에 따른 옷차림 추천
        </Typography>
        <Typography
          sx={{ 
            fontSize: '2.5em', 
            color: '#fff', 
            fontFamily: 'GmarketSansMedium', 
            position: 'absolute', 
            top: '7em',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          당신의 기상 패션 가이드
        </Typography>

      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleButtonClick}
        sx={{ marginTop: '1em', fontSize: '2em' }}
      >
        시작하기
      </Button>
      <Box
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          bottom: '1em', 
          width: '100%',
        }}
      >
        <Box
          onClick={handleScrollToGraphs}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="text"
            color="primary"
            sx={{ 
              fontSize: '1.2em', 
              fontWeight: '800', 
              fontFamily: 'GmarketSansMedium',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleScrollToGraphs}
          >
            더 알아보기
            <KeyboardDoubleArrowDownIcon 
              sx={{ 
                marginLeft: '0.5em',
              }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
    <Box
      ref={graphsContainerRef}
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#70C0AC',
        position: 'relative',
      }}
    >
      <Box
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          top: '2em', 
          width: '100%',
        }}
      >
        <Box
          onClick={handleScrollToTop}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="text"
            color="success"
            sx={{ 
              fontSize: '1.2em', 
              fontWeight: '800', 
              fontFamily: 'GmarketSansMedium',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleScrollToTop}
          >
            위로
            <KeyboardDoubleArrowDownIcon 
              sx={{ 
                marginLeft: '0.5em',
                transform: 'rotate(180deg)'
              }}
            />
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              
          <Box sx={{ width: '30%', margin: '2em', }}>
              
                <Typography sx={{ fontSize: '2em', textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>
                  전세계 온실가스 배출량 차트
                </Typography>

                <LineChart width={chartWidth} height={chartHeight} data={carbonEmissionData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }} sx={{ marginTop: '2em' }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: '년도', position: 'insideBottomLeft', offset: -10, style: {fontSize: '1.2rem'} }} />
                  <YAxis label={{ value: '온실가스 배출량 (T)', angle: -90, position: 'insideLeft', offset: -10, style: {fontSize: '1.2rem'} }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Non-OECD" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="OECD" stroke="#82ca9d" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="World" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
            </Box>
            
            <Box
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '2em',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.6em',
                  textAlign: 'center',
                  fontFamily: 'GmarketSansMedium',
                }}
              >
                계속 증가하는 온실가스 배출량 때문에 세계에서는<br /> 지구 온난화로 인한 기후변화를 겪고 있습니다. <br />
                지난 40년간 대한민국의 연평균 기온이 상승하면서<br /> 대한민국의 기후는 예전과 많이 달라졌습니다. <br />
                이런 변화 속에서 매일 어떤 옷을 입을지<br /> 결정하는 것은 어려운 일입니다.
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '30%', margin: '2em', }}>
            <Typography sx={{ fontSize: '2em', textAlign: 'center', fontFamily: 'GmarketSansMedium' }}>
              대한민국 기온 변화
            </Typography>
            <LineChart width={chartWidth} height={chartHeight} data={tempChangeData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }} sx= {{ marginTop: '2em' }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: '년도', position: 'insideBottomLeft', offset: -10, style: {fontSize: '1.2rem'}  }} />
              <YAxis domain={[10, 16]} label={{ value: '평균 기온 (°C)', angle: -90, position: 'insideLeft', style: {fontSize: '1.2rem'} }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </Box>
          <Box
              sx={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '2em',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.6em',
                  textAlign: 'center',
                  fontFamily: 'GmarketSansMedium',
                }}
              >
                저희 돈룩업은 실시간 기상 정보를 바탕으로 <br />
                최적의 옷차림을 추천해드립니다. <br />
                이로써, 여러분이 날씨에 따른 옷차림을 <br />
                고민하는 시간을 절약하고, <br />
                기후변화에 적응하는데 도움을 줄 수 있습니다.<br />
                지금 바로 시작해보세요!
              </Typography>
              <Button
                variant="contained"
                size="large"
                color="success"
                onClick={handleButtonClick}
                sx={{ marginTop: '1em', fontSize: '2em' }}
              >
                시작하기
              </Button>
            </Box>
          </Box>
      </Box>
    </Box>
  );

}

export default Intro;
