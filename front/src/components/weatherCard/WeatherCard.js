/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Collapse, CardActions, CardContent, CardHeader, Card, Divider, Typography, CardActionArea } from '@mui/material';
import './WeatherCard.css';
import ArrangeWeather from '../../lib/utils/ArrangeWeather';

export default function WeatherCard({ area }) {
  const [expanded, setExpanded] = useState(false);
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('sunny');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getWeather = useCallback(async () => {
    const data = await ArrangeWeather({ area });
    const wthrInfoLine = data.weather.wthrInfo.replace(/\n/g, ' ');
    setIcon(data.icon);
    setWeather(() => {
      const newWeather = { ...data.weather, wthrInfoLine };
      return newWeather;
    });
  }, [area]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardHeader avatar={<Avatar alt="맑음" src={`${process.env.PUBLIC_URL}/${icon}.png`} uriencoding="utf-8" />} title={area} />
        <CardContent>
          <Typography variant="h5" align="center">
            날씨: {icon}
            <br />
            기온: {weather.T1H}도
            <br />
            습도: {weather.REH}%
            <br />
            풍속: {weather.WSD}m/s
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider variant="middle" />
      <CardActionArea>
        <CardActions disableSpacing className="flow-text">
          <Typography className="flow-wrap" onClick={handleExpandClick} aria-expanded={expanded}>
            {weather.wthrInfoLine}
          </Typography>
        </CardActions>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="text">
          <pre>{weather.wthrInfo}</pre>
        </CardContent>
      </Collapse>
    </Card>
  );
}
