const kakaoRouter = require('express').Router();
const Kakao = require('../services/kakaoService');

// localhost:5001/oauth/register 접속 시, 카카오 로그인 url로 redirect되는 라우터
kakaoRouter.get('/register', (req, res) => {
  const kakaoURL = Kakao.getKakaoRegisterURL();

  console.log(`서버: ${kakaoURL}로 리다이렉트`);
  res.redirect(kakaoURL);
});

// localhost:5001/oauth/login 접속 시, 카카오 로그인 url로 redirect되는 라우터
kakaoRouter.get('/login', (req, res) => {
  const kakaoURL = Kakao.getKakaoLoginURL();

  console.log(`서버: ${kakaoURL}로 리다이렉트`);
  res.redirect(kakaoURL);
});

// 로그인 이후 /oauth/register/callback 으로 redirect 되었을 때 토큰을 받아오는 라우터
kakaoRouter.get('/register/callback', async (req, res) => {
  const accessToken = await Kakao.getKakaoRegisterToken(req, res);
  const kakaoUserInfo = await Kakao.getKakaoUserInfo({ accessToken });

  // 카카오 사용자 정보를 정제하여 loginInfo에 저장
  const { email } = kakaoUserInfo.kakao_account;
  const password = `${kakaoUserInfo.id}${Math.random().toString(36).slice(2)};`; // pw는 유저id + 랜덤 문자열 조합
  const nickName = kakaoUserInfo.properties.nickname;
  const birthDate = kakaoUserInfo.kakao_account.birthday;
  const { gender } = kakaoUserInfo.kakao_account;

  const newUser = await Kakao.addKakaoUser({
    email,
    password,
    nickName,
    birthDate,
    gender,
  });

  res.status(200).json(newUser);
  console.log(newUser);
  console.log(`Say hi to new user ${newUser.nickName}!`);
});

kakaoRouter.get('/login/callback', async (req, res) => {
  const accessToken = await Kakao.getKakaoLoginToken(req, res);
  const kakaoUserInfo = await Kakao.getKakaoUserInfo({ accessToken });

  // 카카오 사용자 정보를 정제하여 loginInfo에 저장
  const { email } = kakaoUserInfo.kakao_account;

  const loggedInKakaoUser = await Kakao.getKakaoUser({ email });

  res.status(200).send(loggedInKakaoUser);
  console.log(loggedInKakaoUser);
  console.log(`Say hi to our user ${loggedInKakaoUser.nickName}!`);
});

module.exports = kakaoRouter;
