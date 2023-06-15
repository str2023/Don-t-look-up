import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, CardActions, CardContent, CardHeader, Card, Typography, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as Api from '../../lib/apis/api';
import './ActivityCard.css';

const ActivityCard = (props) => {
  const { temp, wx, area } = props;
  const [tryActivity, setTryActivity] = useState('');
  const [activity, setActivity] = useState('');
  const [randomIdx, setRandomIdx] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleActivityFavorite = () => {
    console.log(tryActivity[randomIdx]);
    if (!isFavorite) {
      const activityData = { temp, wx, area, activity: tryActivity[randomIdx] };
      try {
        const res = Api.post('/activity', activityData);
      } catch (err) {
        console.log(err);
      }
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    getActivity();
  }, [getActivity]);

  return (
    <Card sx={{ display: 'inline-block', paddingInline: 3, paddingBlock: 1 }} className={isFavorite ? 'activityOut' : 'activityIn'}>
      <CardHeader
        avatar={<Avatar alt="활동" src={`${process.env.PUBLIC_URL}/${wx}.png`} />}
        title={activity[0] ? `${area}의 이웃들은 지금 ${activity[0]} 중이에요!` : `${area}의 이웃들은 지금 무엇을 하고 있을까요?`}
      />
      {/* <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" /> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {!isFavorite ? `오늘 날씨에 [${tryActivity[randomIdx]}] 어떠세요?` : '좋아요!'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleActivityFavorite}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ActivityCard;
