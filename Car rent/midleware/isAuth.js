const { ERROR_MESSAGE } = require('../constans');
const { getUserById } = require('../service/userService.js')

const isAuth = (req, res, next) => {
    const userId = req.headers.authorization;
    const user = getUserById(userId);
    if (!user) {
    return res.status(400).send(ERROR_MESSAGE.E_AUTHORIZATION);
  }
  next();
}

module.exports = { isAuth };
