/* eslint-disable consistent-return */
const locationAPI = require('../utils/locationAPI');
const Location = require('../db/models/Location');
const LLC2DFS = require('../utils/llc2dfs');

// 카카오 로컬 API를 호출하여 지도->위경도->좌표 순으로 데이터를 변환하여 locationData에 저장
const getAddressInfo = async ({ area }) => {
  const addressInfo = await locationAPI.getAddress({ area }); // API 통신으로 로컬정보 받아오기
  const changedXY = await LLC2DFS(addressInfo.y, addressInfo.x); // 로컬정보 중, 위-경도를 XY좌표로 바꾸기

  const locationNo = addressInfo.address.h_code;
  // DB 조회를 위해 locationNo 변수 정의

  const locationData = {
    locationName: addressInfo.address.address_name, // weather: addressName
    locationNo,
    si: addressInfo.address.region_1depth_name,
    gu: addressInfo.address.region_2depth_name,
    dong: addressInfo.address.region_3depth_name,
    x: changedXY.x,
    y: changedXY.y,
  };

  // DB에 있는지 조회: 행정번호
  const location = await Location.findByLocationNo({ locationNo });

  try {
    // 있으면 해당 정보 불러오기
    if (locationNo === location.locationNo) {
      return location;
    }
  } catch (err) {
    // 없으면 새로 저장하고 불러오기
    console.error('DB에 해당 지역 없음');
  }

  if (!location) {
    const newLocation = locationData;
    await Location.create({ newLocation });
  }
  return locationData;
};

module.exports = {
  getAddressInfo,
};
