const LocationModel = require('../schemas/location');

const create = async ({ newLocation }) => {
  const createdNewLocation = await LocationModel.create(newLocation);
  return createdNewLocation;
};

const findByLocationName = async ({ locationName }) => {
  const location = await LocationModel.findOne({ locationName });
  return location;
};

const findByLocationNo = async ({ locationNo }) => {
  const location = await LocationModel.findOne({ locationNo });
  return location;
};

const update = async ({ locationNo, newLocation }) => {
  const location = await LocationModel.findOneAndUpdate({ locationNo }, newLocation);
  return location;
};

module.exports = { create, findByLocationName, findByLocationNo, update };
