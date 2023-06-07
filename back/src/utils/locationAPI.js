/* eslint-disable import/no-extraneous-dependencies */
const axios = require('axios');

// 카카오 로컬 API로 location 데이터 받아오기: area는 반드시 '시-구-동' 지번 주소로만
const getAddress = async ({ area }) => {
  const finalUrl = `https://dapi.kakao.com/v2/local/search/address.json?query="${area}"`;

  let info;

  try {
    info = await axios({
      method: 'GET',
      url: finalUrl,
      headers: {
        Authorization: `KakaoAK ${process.env.CLIENT_ID}`,
        'Content-type': 'application/json;charset=UTF-8',
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  const finalInfo = info.data.documents[0];

  return finalInfo;
};

module.exports = {
  getAddress,
};
