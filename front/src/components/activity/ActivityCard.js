/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, CardActions, CardContent, CardHeader, Card, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import * as Api from '../../lib/apis/api';
import './ActivityCard.css';

const ActivityCard = (props) => {
  const { temp, wx, area } = props;
  const [tryActivity, setTryActivity] = useState('');
  const [activity, setActivity] = useState('');
  const [randomIdx, setRandomIdx] = useState(0);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  const getActivity = useCallback(async () => {
    try {
      const { activities, tryActivities } = await Api.get('/activity', { temp, wx, area });
      if (activities.length > 0) {
        setActivity(() => {
          const newActivity = [...activities];
          return newActivity;
        });
      }
      if (tryActivities.length > 0) {
        setTryActivity(() => {
          const newTryActivity = [...tryActivities];
          return newTryActivity;
        });
        setRandomIdx(Math.floor(Math.random() * tryActivities.length));
      }
    } catch (err) {
      console.log(err);
    }
  }, [area, temp, wx]);

  const handleThumbUp = async () => {
    if (!thumbUp) {
      const activityData = { temp, wx, area, activity: tryActivity[randomIdx] };
      try {
        await Api.post('/activity', activityData);
      } catch (err) {
        console.log(err);
      }
      setThumbUp(true);
    }
  };

  const handleThumbDown = () => {
    setThumbDown(true);
  };

  const comment = () => {
    if (!thumbUp) {
      if (tryActivity.length > 0) {
        return `오늘 날씨에 [${tryActivity[randomIdx]}] 어떠세요?`;
      }
      if (thumbDown) {
        return '고마워요!';
      }
      return '정보가 없어서 알 수가 없네요 ㅠㅠ';
    }
    return '좋아요!';
  };

  useEffect(() => {
    getActivity();
    // setTimeout(() => {
    //   setThumbUp(true);
    // }, 5000);
  }, [getActivity]);

  return (
    tryActivity.length > 0 && (
      <Card sx={{ display: 'inline-block', paddingInline: 3, paddingBlock: 1 }} className={thumbUp || thumbDown ? 'activityOut' : 'activityIn'}>
        <CardHeader
          avatar={<Avatar alt="활동" src={`${process.env.PUBLIC_URL}/${wx}.png`} uriencoding="utf-8" variant="square" />}
          title={activity[0] ? `${area}의 이웃들은 이런 날씨에 ${activity[0]} 많이 해요!` : `${area}의 이웃들은 지금 무엇을 하고 있을까요?`}
        />
        {/* <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" /> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <CardContent>
            <Typography variant="h6">{!thumbDown ? comment() : '고마워요!'}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="thumbUp" onClick={handleThumbUp}>
              {thumbUp ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
            </IconButton>
            <IconButton aria-label="thumbDown" onClick={handleThumbDown}>
              {thumbDown ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    )
  );
};

export default ActivityCard;
