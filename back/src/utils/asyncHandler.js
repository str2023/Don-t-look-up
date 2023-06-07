/*
 * request handler를 async function으로 작성하면서
 * try ~ catch, next를 자동으로 할 수 있도록 구성
 * ref) Node_js와_mongoDB_II_Lecture_02_수정
 */
const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res);
  } catch (err) {
    next(err);
  }
};

module.exports = asyncHandler;
