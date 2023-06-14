import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { UserContext } from '../../contexts/context';
import * as API from '../../lib/apis/api';

// 현재 위치의 주소를 얻어오는 버튼

const CurrentPostButton = () => {
  const { setArea } = useContext(UserContext);

  const getCurrentPost = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도
          const addressInfo = await API.get('/location', { lat, lon });
          setArea(addressInfo.locationName);
        },
        () => alert('위치권한을 확인해주세요'),
      );
    }
  };

  return (
    <Button color="inherit" onClick={getCurrentPost}>
      현위치로 설정
    </Button>
  );
};

export default CurrentPostButton;
