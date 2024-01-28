const { getUserById } = require('../service/userService.js');
const { ERROR_MESSAGE, ROLES } = require('../constans.js');

const isAdminMiddleware = async (req, res, next) => {
    try {
      const userId = req.headers.authorization; 
      const user = await getUserById(userId);
  
      if (!user.roles.includes(ROLES.ADMIN)) {
        return res.status(403).send(ERROR_MESSAGE.E_AUTHORIZATION);
      }
  
      next(); 
    } catch (error) {
      console.error(ERROR_MESSAGE.E_AUTHORIZATION);
      res.status(500).send(ERROR_MESSAGE.E_SERVER);
    }
  };
  
  module.exports = { isAdminMiddleware} ;
  