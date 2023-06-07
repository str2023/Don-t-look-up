const locationService = require('../services/locationService');

const getArea = async (req, res, next) => {
  const { area } = req.body;

  const areaInfo = await locationService.getAddressInfo({ area });

  const Area = {
    Name: areaInfo.locationName,
    No: areaInfo.locationNo,
    x: areaInfo.x,
    y: areaInfo.y,
  };

  req.AreaInfo = { Area };
  next();
  console.log(Area);
};

module.exports = getArea;
