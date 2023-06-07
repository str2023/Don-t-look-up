const weatherRouter = require('express').Router();
const weatherService = require('../services/weatherService');
// const loginRequired = require('../middlewares/loginRequired');
const asyncHandler = require('../utils/asyncHandler');
const getArea = require('../middlewares/getArea');

// 자외선 지수 라우터. body에 위도, 경도 값이 들어온다.
weatherRouter.get(
  '/UVIdx',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UVIdx = await weatherService.getUVIdx({ Area });
    res.status(200).send(UVIdx);
  }),
);

weatherRouter.get(
  '/UltraSrtNcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UltraSrtNcst = await weatherService.getUltraSrtNcst({ Area });
    res.status(200).send(UltraSrtNcst);
  }),
);

weatherRouter.get(
  '/UltraSrtFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const UltraSrtFcst = await weatherService.getUltraSrtFcst({ Area });
    res.status(200).send(UltraSrtFcst);
  }),
);

weatherRouter.get(
  '/VilageFcst',
  getArea,
  asyncHandler(async (req, res, next) => {
    const { Area } = req.AreaInfo;
    const VilageFcst = await weatherService.getVilageFcst({ Area });
    res.status(200).send(VilageFcst);
  }),
);

module.exports = weatherRouter;
