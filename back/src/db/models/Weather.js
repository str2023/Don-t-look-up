const WeatherModel = require('../schemas/weather');

const create = async ({ newWeather }) => {
  const createdNewWeather = await WeatherModel.create(newWeather);
  return createdNewWeather;
};

const findByAddressName = async ({ addressName }) => {
  const weather = await WeatherModel.findOne({ addressName });
  return weather;
};

const findByAreaNo = async ({ areaNo }) => {
  const weather = await WeatherModel.findOne({ areaNo });
  return weather;
};

const update = async ({ addressName, newWeather }) => {
  const weather = await WeatherModel.findOneAndUpdate({ addressName }, newWeather);
  return weather;
};

module.exports = { create, findByAddressName, findByAreaNo, update };
