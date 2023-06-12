const loginReducer = (userState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('%c로그인!', 'color: #d93d1a;');
      return {
        ...userState,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      console.log('%c로그아웃!', 'color: #d93d1a;');
      return {
        ...userState,
        user: null,
        isLoggedIn: false,
      };
    default:
      return userState;
  }
};

export default loginReducer;
