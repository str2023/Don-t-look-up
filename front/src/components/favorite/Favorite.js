import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherCardList from '../weatherCard/WeatherCardList';
import { UserContext } from '../../contexts/context';
import * as Api from '../../lib/apis/api';

function Favorite() {
  const [change, setChange] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.isLoggedIn) {
      navigate('/login');
    }
  }, [navigate, userState.isLoggedIn]);

  const getFavorite = useCallback(async () => {
    try {
      const res = await Api.get('/user/favorite');
      setFavorite(() => {
        const newFavorite = { ...res };
        return newFavorite;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getFavorite();
  }, [change, getFavorite]);

  return userState.isLoggedIn && <WeatherCardList favorite={favorite} setFavorite={setFavorite} setChange={setChange} change={change} />;
}

export default Favorite;
