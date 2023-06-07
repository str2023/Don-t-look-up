const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../db/models/User');

// register로 접근하여 인가코드 받기
const getKakaoRegisterURL = () => {
  const config = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_REGISTER_URI,
    response_type: 'code',
  };

  const finalUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code`;

  return finalUrl;
};

// login으로 접근하여 인가코드 받기
const getKakaoLoginURL = () => {
  const config = {
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_LOGIN_URI,
    response_type: 'code',
  };

  const finalUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code`;

  return finalUrl;
};

// register/callback 으로 접근하여 엑세스 토큰 받기
const getKakaoRegisterToken = async (req, res) => {
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_REGISTER_URI,
    code: req.query.code,
  };

  let kakaoToken; // 사용자 동의 후 받아온 인가코드로 토큰을 발급받아 kakaoToken에 저장
  try {
    kakaoToken = await axios({
      method: 'POST',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${config.client_id}&client_secret=${config.client_secret}&redirect_uri=${config.redirect_uri}&code=${config.code}`,
      headers: {
        'content-type': 'Content-type: application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`토큰 가져오기 에러: ${err.data}`);
  }
  console.log(kakaoToken); // 성공적으로 토큰이 받아와진 경우, [object Object]로 출력

  const accessToken = kakaoToken.data.access_token; // 인증에 사용될 엑세스/어드민 토큰을 따로 저장

  return accessToken;
};

// login/callback으로 접근하여 엑세스 토큰 받기
const getKakaoLoginToken = async (req, res) => {
  const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_LOGIN_URI,
    code: req.query.code,
  };

  let kakaoToken; // 사용자 동의 후 받아온 인가코드로 토큰을 발급받아 kakaoToken에 저장
  try {
    kakaoToken = await axios({
      method: 'POST',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${config.client_id}&client_secret=${config.client_secret}&redirect_uri=${config.redirect_uri}&code=${config.code}`,
      headers: {
        'content-type': 'Content-type: application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`토큰 가져오기 에러: ${err.data}`);
  }
  console.log(kakaoToken); // 성공적으로 토큰이 받아와진 경우, [object Object]로 출력

  const accessToken = kakaoToken.data.access_token; // 인증에 사용될 엑세스/어드민 토큰을 따로 저장

  return accessToken;
};

// 엑세스 토큰으로 유저 정보 받아오기
const getKakaoUserInfo = async ({ accessToken }) => {
  let kakaoUser; // 엑세스 토큰을 통해 받아온 사용자 정보를 kakaoUser에 저장
  try {
    kakaoUser = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    console.log(`사용자 정보 가져오기 에러: ${err.data}`);
  }
  console.log(kakaoUser.data); // 가져온 정보값 콘솔창에서 확인

  const kakaoUserInfo = JSON.parse(JSON.stringify(kakaoUser.data)); // 가져온 값의 연결을 끊고 문자열 json파일로 만들기

  return kakaoUserInfo;
};

// 카카오 유저 정보로 유저정보 저장하기
const addKakaoUser = async ({ email, password, nickName, birthDate, gender }) => {
  const hashedPassword = await bcrypt.hash(password, 10); // pw 해쉬화
  const numberedGender = gender === 'female' ? 1 : 0; // 성별 숫자화: 여성- 1 / 남성 -0

  const newUser = {
    email,
    password: hashedPassword,
    nickName,
    birthDate,
    gender: numberedGender,
  };

  const createdNewUser = await User.create({ newUser }); // 카카오 정보로 newUser 생성
  createdNewUser.errorMessage = null;

  return createdNewUser;
};

// 저장된 카카오 유저 정보 불러오기
const getKakaoUser = async ({ email }) => {
  const user = await User.findByEmail({ email });

  if (!user) {
    const errorMessage = '해당 카카오 계정은 가입 내역이 없습니다. 다시 한 번 확인해주세요.';
    return { errorMessage };
  }

  const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
  const token = jwt.sign({ userId: user.id }, secretKey);
  const { id, nickName, birthDate, gender } = user;

  const loginKakaoUser = {
    token,
    id,
    email,
    nickName,
    birthDate,
    gender,
    errorMessage: null,
  };

  return loginKakaoUser;
};

module.exports = {
  getKakaoRegisterURL,
  getKakaoLoginURL,
  getKakaoRegisterToken,
  getKakaoLoginToken,
  getKakaoUserInfo,
  addKakaoUser,
  getKakaoUser,
};
