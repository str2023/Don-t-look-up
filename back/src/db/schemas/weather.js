const { Schema, model } = require('mongoose');

const WeatherCodeSchema = new Schema({
  fcstDate: Number,
  fcstTime: Number,
  POP: Number, // 강수확률
  PTY: Number, // 강수형태코드값 (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  //               (단기)  없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
  PCP: Number, // 1시간 강수량  mm
  RN1: Number, // 1시간 강수량  mm
  T1H: Number, // 기온	℃
  TMP: Number, // 1시간 기온
  TMN: Number, // 일 최저기온
  TMX: Number, // 일 최고기온
  SNO: Number, // 1시간 신적설
  SKY: Number, //	하늘상태 코드값 맑음(1), 구름많음(3), 흐림(4)
  REH: Number, // 습도  %
  VEC: Number, // 풍향  deg
  WSD: Number, // 풍속  m/s
});

const WeatherSchema = new Schema(
  {
    addressName: {
      type: String,
      required: true,
    },
    areaNo: {
      type: Number,
    },
    UltraSrtNcst: {
      baseDate: Number,
      baseTime: Number,
      Current: WeatherCodeSchema,
    },
    UltraSrtFcst: {
      baseDate: Number,
      baseTime: Number,
      forecast: [WeatherCodeSchema],
    },
    VilageFcst: {
      baseDate: Number,
      baseTime: Number,
      forecast: [WeatherCodeSchema],
    },
    UVIdx: {
      date: Number,
      h0: Number,
      h3: Number,
      h6: Number,
      h9: Number,
      h12: Number,
    },
  },
  {
    timestamps: true,
  },
);

const WeatherModel = model('Weather', WeatherSchema);
module.exports = WeatherModel;
