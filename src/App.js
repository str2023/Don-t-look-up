// import logo from './logo.svg';
// import './App.css';
import React, { createContext, useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as Api from './lib/apis/api';
import loginReducer from './store/reducer/loginReducer';

import Header from './components/common/Header';
// import { IntroPage, LoginPage, RegisterPage, MainPage } from './pages';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import Main from './components/main/Main';
import Intro from './components/intro/Intro';
import User from './components/user/User';

export const UserStateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
    isLoggedIn: false,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get('user/current');
      const currentUser = res.data;

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

  return (
    <Router>
      <UserStateContext.Provider value={userState}>
        <DispatchContext.Provider value={dispatch}>
          <Header />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/main" element={<Main />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </DispatchContext.Provider>
      </UserStateContext.Provider>
    </Router>
  );
}

export default App;
