const getVilageFcstBaseTime = (HHMM) => {
  const HM = parseInt(HHMM, 10);
  let baseTime = [200, 500, 800, 1100, 1400, 1700, 2000, 2300];
  baseTime = baseTime.filter((time) => HM - time > 0 && HM - time <= 310);

  if (baseTime.length === 0) return '2300'; // 0000~0210 사이의 시간
  if (baseTime[0] < 1000) return `0${baseTime[0]}`; // HHMM 포메팅

  return baseTime[0];
};

// YYYYMMDDHH
const getTime = () => {
  const time = {};
  const dateRaw = new Date();
  dateRaw.setHours(dateRaw.getHours() + 9);
  const dateForWthrIdx = dateRaw.toISOString().replaceAll('-', '').split('T');
  dateRaw.setHours(dateRaw.getHours() - 1); // 예보확인을 위한 1시간 전의 시간
  const dateForFcst = dateRaw.toISOString().replaceAll('-', '').split('T');

  const YMD = dateForFcst[0];
  const HH = dateForFcst[1].split(':')[0];
  const YMDH = dateForWthrIdx[0] + dateForWthrIdx[1].split(':')[0];
  const HM = getVilageFcstBaseTime(dateForWthrIdx[1].replace(':', '').slice(0, 4));

  time.YMDH = parseInt(YMDH, 10);
  time.YMD = parseInt(YMD, 10);
  time.HH = `${HH}00`;
  time.HM = HM;
  return time;
};

exports.getTime = getTime;
