/* eslint-disable camelcase */
const axios = require('axios');

const getUVIdx = async (areaNo, time) => {
  console.log('자외선 API 요청');
  const url = 'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4';
  return axios.get(url, {
    params: {
      serviceKey: process.env.WEATHER_DKEY,
      pageNo: 1,
      numOfRows: 10,
      dataType: 'JSON',
      areaNo,
      time,
    },
  });
};

const getVilageFcst = async (url, date, hour, nx, ny) => {
  console.log(`${url} API 요청`);
  return axios.get(url, {
    baseURL: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0',
    params: {
      serviceKey: process.env.WEATHER_DKEY,
      pageNo: 1,
      numOfRows: 1000,
      dataType: 'JSON',
      base_date: date,
      base_time: hour,
      nx,
      ny,
    },
  });
};

module.exports = { getUVIdx, getVilageFcst };
