/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, Collapse, CardActions, CardContent, CardHeader, Card, Divider, Typography, CardActionArea, Grid, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './WeatherCard.css';
import { useNavigate } from 'react-router-dom';
import ArrangeWeather from '../../lib/utils/ArrangeWeather';
import { UserContext } from '../../contexts/context';

export default function WeatherCard({ area }) {
  const { setArea } = useContext(UserContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('sunny');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleWeatherClick = () => {
    setArea({
      type: 'AREA_SELECT',
      payload: area,
    });
    navigate('/main');
  };

  const getWeather = useCallback(async () => {
    let data;
    try {
      data = await ArrangeWeather({ area });
    } catch (err) {
      console.log(err);
    }
    const wthrInfoLine = data.weather.wthrInfo.replace(/\n/g, ' ');
    setIcon(data.icon);
    setWeather(() => {
      const newWeather = { ...data.weather, wthrInfoLine, ...data.outfit };
      return newWeather;
    });
  }, [area]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  const isWeather = Object.keys(weather).length > 0;

  return (
    <Card sx={{ maxWidth: 400 }}>
      {isWeather ? (
        <>
          <CardActionArea onClick={handleWeatherClick}>
            <CardHeader
              avatar={<Avatar alt="날씨" src={`${process.env.PUBLIC_URL}/${icon}.png`} uriencoding="utf-8" />}
              title={area}
              style={{ fontFamily: 'GmarketSansMedium', fontSize: '2vh', lineHeight: '160%' }}
            />
            <CardContent>
              <Grid container>
                <Grid item p={2}>
                  <Typography variant="h5" style={{ fontFamily: 'GmarketSansMedium', lineHeight: '160%' }}>
                    날씨: {icon}
                    <br />
                    기온: {weather.T1H}도
                    <br />
                    습도: {weather.REH}%
                    <br />
                    풍속: {weather.WSD}m/s
                  </Typography>
                </Grid>
                <Divider variant="middle" orientation="vertical" flexItem />
                <Grid item p={2}>
                  <Typography variant="h5" style={{ fontFamily: 'GmarketSansMedium', lineHeight: '160%' }}>
                    상의: {weather.outfit?.clothes?.[0]?.top[0]}
                    <br />
                    하의: {weather.outfit?.clothes?.[0]?.bottom[0]}
                    <br />
                    신발: {weather.outfit?.clothes?.[0]?.shoes[0]}
                    <br />
                    준비물: {weather.outfit?.item?.[0]?.top[0]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <Divider variant="middle" />
          <CardActionArea>
            <CardActions disableSpacing className="flow-text">
              <Typography
                className="flow-wrap"
                onClick={handleExpandClick}
                aria-expanded={expanded}
                style={{ fontFamily: 'GmarketSansMedium', lineHeight: '160%', color: '#89d1eb' }}
              >
                {weather.wthrInfoLine}
              </Typography>
            </CardActions>
          </CardActionArea>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className="text" p={2}>
              <pre>{weather.wthrInfo}</pre>
            </CardContent>
          </Collapse>
        </>
      ) : (
        <Box width={400} height={304}>
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
}
