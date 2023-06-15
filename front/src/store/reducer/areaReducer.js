const areaReducer = (selectedArea, action) => {
  switch (action.type) {
    case 'AREA_SELECT':
      sessionStorage.setItem('selectedArea', action.payload);
      console.log(`${action.payload} 지역 선택`);
      return action.payload;

    case 'AREA_DESELECT':
      sessionStorage.removeItem('selectedArea');
      console.log('지역 선택 해제');
      return '서울시';

    default:
      return selectedArea;
  }
};

export default areaReducer;
