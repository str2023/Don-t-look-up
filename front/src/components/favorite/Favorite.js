import React, { useContext } from 'react';
import WeatherCardList from '../weatherCard/WeatherCardList';
import { UserContext } from '../../contexts/context';

function Favorite() {
  const { userState } = useContext(UserContext);
  const { user, isLoggedIn } = userState;

  return <WeatherCardList areaArray={user.favorite} />;
}

export default Favorite;
