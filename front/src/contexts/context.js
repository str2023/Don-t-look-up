import React, { createContext, useReducer, useEffect, useState } from 'react';
import loginReducer from '../store/reducer/loginReducer';
import areaReducer from '../store/reducer/areaReducer';
import * as Api from '../lib/apis/api';

export const UserContext = createContext();

const ContextProvider = (props) => {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
    isLoggedIn: false,
  });

  const [area, setArea] = useReducer(areaReducer, '서울시');

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const data = await Api.get('/user/current');
      const currentUser = data;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });

      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return <UserContext.Provider value={{ userState, dispatch, area, setArea }}>{props.children}</UserContext.Provider>;
};

export default ContextProvider;
