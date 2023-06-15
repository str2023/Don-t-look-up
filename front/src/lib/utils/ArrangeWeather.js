import * as Api from '../apis/api';

async function ArrangeWeather({ area }) {
  let weather = {};
  let icon = '';
  let sky;
  let outfit;

  try {
    const [weatherInfo, uvIndex, wthrInfo, weatherFcst] = await Promise.all([
      Api.get('/ultraSrtNcst', { area }),
      Api.get('/uvidx', { area }),
      Api.get('/wthrInfo', { area }),
      Api.get('/ultraSrtFcst', { area }),
    ]);

    switch (weatherInfo.Current.PTY) {
      case 0:
        icon = '맑음';
        if (weatherFcst.forecast[0].SKY in [2, 3]) {
          icon = '구름';
        } else if (weatherFcst.forecast[0].SKY === 4) {
          icon = '흐림';
        }
        break;
      case 1:
        if (weatherInfo.Current.RN1 >= 15) icon = '강한 비';
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
        icon = '보통';
    }

    outfit = await Api.get('/outfit', { temp: weatherInfo.Current.T1H, wx: icon });
    sky = weatherFcst.forecast[0].SKY;

    weather = { ...weatherInfo.Current, uvIndex: uvIndex.h0, wthrInfo: wthrInfo.t1.slice(0, -4), sky, outfit };
  } catch (err) {
    console.log(err);
  }

  return { weather, icon };
}

export default ArrangeWeather;
