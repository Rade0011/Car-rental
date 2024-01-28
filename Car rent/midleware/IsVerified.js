const { ERROR_MESSAGE } = require('../constans');
const { getUserById } = require('../service/userService.js')


const isVerifiedUser = async (req, res, next) => {
    try {
      const userId = req.headers.authorization
      const user = await getUserById(userId)
  
      if (!user.isVerified) {
        return res.status(400).send(ERROR_MESSAGE.E_VERIFIED)
      }
      return next()
    } catch (error) {
      console.log(ERROR_MESSAGE.E_SERVER);
    }
};

module.exports = { isVerifiedUser };
