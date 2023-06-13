/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Api from '../../lib/apis/api';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function WeatherCard({ area }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //
  useMemo(async () => {
    const weatherInfo = await Api.get('/ultraSrtNcst', { area });
    const { PTY, T1H, REH, WSD } = weatherInfo.Current;
    const uvIndex = await Api.get('/uvidx', { area });
  }, [area]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader avatar={<Avatar alt="맑음" src={`${process.env.PUBLIC_URL}/sunny.png`} />} title={area} />
      <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          강수형태:{PTY},기온:{T1H}, 습도:{REH}, 풍속:{WSD}, 자외선지수:{uvIndex}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="기상정보문 보기">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>기상정보문</CardContent>
      </Collapse>
    </Card>
  );
}
