import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WeatherCard from './WeatherCard';

const WeatherCardList = ({ areaArray }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    setAreas(() => {
      const newAreas = [...areaArray];
      return newAreas;
    });
  }, [areaArray]);

  return (
    <Box justifyContent="center">
      <Typography className="modelTitle" variant="h4">
        즐겨찾기
      </Typography>
      {areas.length === 0 && (
        <Typography variant="body2">
          즐겨찾기가 없습니다.
          <br />
          <br />
          현재 장소를 즐겨찾기해보세요.
        </Typography>
      )}
      {areas.length > 0 && (
        <Grid container maxWidth="xs" justifyContent="space-evenly">
          {areas.map((area) => (
            <Grid item key={area} p={2}>
              <WeatherCard area={area} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WeatherCardList;
