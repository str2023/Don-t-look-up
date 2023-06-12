import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import 'react-datepicker/dist/react-datepicker.css';

function Intro() {
  const navigate = useNavigate();
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
    <div>
      <div className="banner">
        <h1>기후에 따른 옷차림 추천 당신의 기상 패션 가이드</h1>
        <button onClick={handleButtonClick}>시작하기</button>
        <Button variant="contained" color="primary" onClick={handleScrollToGraphs} style={{ margin: '0 auto' }}>
          더 알아보기
        </Button>
      </div>
      <div className="graphs-container">
        <div className="graph">
          <h2>기후 변화 데이터 차트</h2>
          {/* 첫번째 그래프 (년도별로 기후변화) 그래프는 ReCharts 이용예정/}
            </div>
            <div className="graph">
                <h2>전세계 온실가스 배출량 차트</h2>
                {/* 두번째 그래프 (전세계 년도별로 온실가스 배출량) */}
        </div>
      </div>
    </div>
  );
}

export default Intro;
