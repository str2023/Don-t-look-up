const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

const addUser = async ({ email, nickName, password, birthDate, gender }) => {
  // 이메일 중복 확인
  const user = await User.findByEmail({ email });
  if (user) {
    const errorMessage = '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
    return { errorMessage };
  }

  // 비밀번호 해쉬화
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { email, nickName, password: hashedPassword };

  // db에 저장
  const createdNewUser = await User.create({ newUser });
  createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

  return createdNewUser;
};

const getUser = async ({ email, password }) => {
  const user = await User.findByEmail({ email });
  if (!user) {
    const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해주세요.';
    return { errorMessage };
  }

  // 비밀번호 일치 여부 확인
  const correctPasswordHash = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
  if (!isPasswordCorrect) {
    const errorMessage = '비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.';
    return { errorMessage };
  }

  // 로그인 성공 -> JWT 웹 토큰 생성
  const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
  const token = jwt.sign({ userId: user.id }, secretKey);

  // 반환할 loginuser 객체를 위한 변수 설정
  const { id, nickName } = user;

  const loginUser = {
    token,
    id,
    email,
    nickName,
    errorMessage: null,
  };

  return loginUser;
};

const getUsers = async () => {
  const users = await User.findAll();
  return users;
};

const setUser = async ({ userId, toUpdate }) => {
  // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
  let user = await User.findById({ userId });

  // db에서 찾지 못한 경우, 에러 메시지 반환
  if (!user) {
    const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해주세요.';
    return { errorMessage };
  }

  // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
  if (toUpdate.nickName) {
    const fieldToUpdate = 'nickName';
    const newValue = toUpdate.nickName;
    user = await User.update({ userId, fieldToUpdate, newValue });
  }

  if (toUpdate.password) {
    const fieldToUpdate = 'password';
    const newValue = await bcrypt.hash(toUpdate.password, 10);
    user = await User.update({ userId, fieldToUpdate, newValue });
  }

  if (toUpdate.birthDate) {
    const fieldToUpdate = 'birthDate';
    const newValue = toUpdate.birthDate;
    user = await User.update({ userId, fieldToUpdate, newValue });
  }

  if (toUpdate.gender) {
    const fieldToUpdate = 'gender';
    const newValue = toUpdate.gender;
    user = await User.update({ userId, fieldToUpdate, newValue });
  }

  return user;
};
const getUserInfo = async ({ userId }) => {
  const user = await User.findById({ userId });

  // db에서 찾지 못한 경우, 에러 메시지 반환
  if (!user) {
    const errorMessage = '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해주세요.';
    return { errorMessage };
  }

  return user;
};

const removeUser = async ({ userId }) => {
  const user = await User.remove({ userId });

  if (!user) {
    const errorMessage = `회원 정보가 존재하지 않습니다.`;
    return { errorMessage };
  }

  return { user };
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  setUser,
  getUserInfo,
  removeUser,
};
