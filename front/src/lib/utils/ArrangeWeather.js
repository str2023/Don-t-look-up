import * as Api from '../apis/api';

async function ArrangeWeather({ area }) {
  let weather = {};
  let icon = '';
  let weatherInfo;
  let uvIndex;
  let wthrInfo;
  let weatherFcst;
  let sky;

  try {
    weatherInfo = await Api.get('/ultraSrtNcst', { area });
    uvIndex = await Api.get('/uvidx', { area });
    wthrInfo = await Api.get('/wthrInfo', { area });
    weatherFcst = await Api.get('/ultraSrtFcst', { area });
    sky = weatherFcst.forecast[0].SKY;
  } catch (err) {
    console.log(err);
  }

  weather = { ...weatherInfo.Current, uvIndex: uvIndex.h0, wthrInfo: wthrInfo.t1.slice(0, -4), sky };

  switch (weather.PTY) {
    case 0:
      icon = '맑음';
      if (weather.sky in [2, 3]) {
        icon = '구름';
      } else if (weather.sky === 4) {
        icon = '흐림';
      }
      break;
    case 1:
      if (weather.RN1 >= 15) icon = '강한 비';
      icon = '비';
      break;
    case 2:
      icon = '비눈';
      break;
    case 3:
      icon = '눈';
      break;
    case 5:
      icon = '빗방울';
      break;
    case 6:
      icon = '빗방울눈날림';
      break;
    case 7:
      icon = '눈날림';
      break;
    default:
      icon = 'sunny';
  }

  return { weather, icon };
}

export default ArrangeWeather;
