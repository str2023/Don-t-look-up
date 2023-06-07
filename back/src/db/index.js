const mongoose = require('mongoose');
const User = require('./models/User');
const Weather = require('./models/Weather');

const DB_URL =
  process.env.MONGODB_URL ||
  'MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.';

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () =>
  console.log('\x1b[34mMongoDB 서버에 연결되었습니다.\x1b[0m', DB_URL),
);
db.on('error', (error) =>
  console.error(
    `\x1b[31mMongoDB 연결에 실패하였습니다.\x1b[0m..\n${DB_URL}\n${error}`,
  ),
);

module.exports = { User, Weather };
