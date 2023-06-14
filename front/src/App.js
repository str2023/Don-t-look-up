import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import Main from './components/main/Main';
import Intro from './components/intro/Intro';
import User from './components/user/User';
import Favorite from './components/favorite/Favorite';
import ContextProvider from './contexts/context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <Router>
      <ContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/user" element={<User />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
