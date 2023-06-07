const { Schema, model } = require('mongoose');

const LocationSchema = new Schema({
  locationName: {
    type: String,
  },
  locationNo: {
    type: Number,
    required: true,
    default: 1100000000, // 서울
  },
  si: {
    type: String,
    default: '서울특별시',
  },
  gu: {
    type: String,
    default: '',
  },
  dong: {
    type: String,
    default: '',
  },
  x: {
    // 기상청 API 호출 시, x좌표(nx)
    type: Number,
    required: true,
    default: 55,
  },
  y: {
    // 기상청 API 호출 시, y좌표(ny)
    type: Number,
    required: true,
    default: 127,
  },
});

const LocationModel = model('Location', LocationSchema);
module.exports = LocationModel;
