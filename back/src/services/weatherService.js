const api = require('../utils/api');
const { Weather } = require('../db');
const { getTime } = require('../utils/getTime');

// 자외선 지수
const getUVIdx = async ({ Area }) => {
  const areaNo = Area.No;
  const addressName = Area.Name;

  const time = getTime().YMDH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UVIdx.date - time < 3) {
      return weather.UVIdx;
    }
  } catch (err) {
    console.error('DB에 자외선지수 없음');
  }
  // 없다면 기상청 API 통신
  const res = await api.getUVIdx(areaNo, time);
  // 데이터 정제
  const { date, h0, h3, h6, h9, h12 } = res.data.response.body.items.item[0];
  [date, h0, h3, h6].forEach((value) => parseInt(value, 10));
  const UVIdx = { date, h0, h3, h6, h9, h12 };
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { areaNo, UVIdx };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, areaNo, UVIdx };
    await Weather.create({ newWeather });
  }
  return UVIdx;
};

// 초단기 실황
const getUltraSrtNcst = async ({ Area }) => {
  const nx = Area.x;
  const ny = Area.y;
  const addressName = Area.Name;

  const time = getTime();
  const date = time.YMD;
  const hour = time.HH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UltraSrtNcst.baseDate === date && weather.UltraSrtNcst.baseTime === parseInt(hour, 10)) {
      return weather.UltraSrtNcst;
    }
  } catch (err) {
    console.error('DB에 초단기실황 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getUltraSrtNcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  const data = res.data.response.body.items.item;
  // 데이터 정제
  const UltraSrtNcst = {
    baseDate: parseInt(data[0].baseDate, 10),
    baseTime: parseInt(data[0].baseTime, 10),
    Current: {},
  };
  data.forEach((obj) => {
    UltraSrtNcst.Current[obj.category] = parseInt(obj.obsrValue, 10);
  });
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { UltraSrtNcst };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, UltraSrtNcst };
    await Weather.create({ newWeather });
  }
  return UltraSrtNcst;
};

// 초단기 예보
const getUltraSrtFcst = async ({ Area }) => {
  const nx = Area.x;
  const ny = Area.y;
  const addressName = Area.Name;

  const time = getTime();
  const date = time.YMD;
  const hour = time.HH;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.UltraSrtFcst.baseDate === date && weather.UltraSrtFcst.baseTime === parseInt(hour, 10)) {
      return weather.UltraSrtFcst;
    }
  } catch (err) {
    console.error('DB에 초단기예보 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getUltraSrtFcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  const data = res.data.response.body.items.item;
  // 데이터 정제
  const UltraSrtFcst = {
    baseDate: parseInt(data[0].baseDate, 10),
    baseTime: parseInt(data[0].baseTime, 10),
    forecast: [],
  };
  const firstFcstTime = data[0].fcstTime;
  const firstCategory = data[0].category;
  data.forEach((obj) => {
    const { category, fcstDate } = obj;
    let { fcstValue, fcstTime } = obj;
    fcstTime = parseInt(fcstTime, 10);
    if (fcstTime < firstFcstTime) fcstTime += 2400;
    const idx = (fcstTime % firstFcstTime) / 100;
    if (firstCategory === category) {
      UltraSrtFcst.forecast.push({});
    }
    UltraSrtFcst.forecast[idx].fcstDate = parseInt(fcstDate, 10);
    UltraSrtFcst.forecast[idx].fcstTime = parseInt(obj.fcstTime, 10);
    if (fcstValue === '강수없음') fcstValue = 0;
    UltraSrtFcst.forecast[idx][category] = parseInt(fcstValue, 10);
  });
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { UltraSrtFcst };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, UltraSrtFcst };
    await Weather.create({ newWeather });
  }
  return UltraSrtFcst;
};

// 단기 예보
const getVilageFcst = async ({ Area }) => {
  const nx = Area.x;
  const ny = Area.y;
  const addressName = Area.Name;

  const time = getTime();
  const date = time.YMD;
  const hour = time.HM;
  // DB에 있는지 날씨 조회
  const weather = await Weather.findByAddressName({ addressName });
  try {
    if (weather.VilageFcst.baseDate === date && weather.VilageFcst.baseTime === parseInt(hour, 10)) {
      return weather.VilageFcst;
    }
  } catch (err) {
    console.error('DB에 단기예보 없음');
  }
  // 없다면 기상청 API 통신
  const url = '/getVilageFcst';
  const res = await api.getVilageFcst(url, date, hour, nx, ny);
  const data = res.data.response.body.items.item;
  // 데이터 정제
  const VilageFcst = {
    baseDate: parseInt(data[0].baseDate, 10),
    baseTime: parseInt(data[0].baseTime, 10),
    forecast: [{}],
  };
  let temp = data[0].fcstDate + data[0].fcstTime;
  data.forEach((obj) => {
    const { category, fcstDate, fcstTime } = obj;
    let { fcstValue } = obj;
    if (temp !== fcstDate + fcstTime) {
      VilageFcst.forecast.push({});
      temp = fcstDate + fcstTime;
    }
    VilageFcst.forecast.at(-1).fcstDate = parseInt(fcstDate, 10);
    VilageFcst.forecast.at(-1).fcstTime = parseInt(fcstTime, 10);
    if (fcstValue === '강수없음' || fcstValue === '적설없음') fcstValue = 0;
    VilageFcst.forecast.at(-1)[category] = parseInt(fcstValue, 10);
  });
  // DB에 삽입갱신
  if (weather) {
    const newWeather = { VilageFcst };
    await Weather.update({ addressName, newWeather });
  } else {
    const newWeather = { addressName, VilageFcst };
    await Weather.create({ newWeather });
  }
  return res.data.response.body.items.item;
};

module.exports = { getUVIdx, getUltraSrtNcst, getUltraSrtFcst, getVilageFcst };
