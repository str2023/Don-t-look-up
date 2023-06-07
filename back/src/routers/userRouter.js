const userRouter = require('express').Router();
const userService = require('../services/userService');
const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');

userRouter.post(
  '/user/register',
  asyncHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request) 에서 데이터 가져오기
    const { email, password, nickName, birthDate, gender } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      email,
      password,
      nickName,
      birthDate,
      gender,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  }),
);

userRouter.post(
  '/user/login',
  asyncHandler(async (req, res, next) => {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  }),
);

userRouter.get(
  '/user/current',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserInfo({
      userId,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  }),
);

module.exports = userRouter;
