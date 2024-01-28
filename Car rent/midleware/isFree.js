const { ERROR_MESSAGE } = require('../constans');
const { getCarsById } = require('../service/carsService');


const isFreeCars = async (req, res, next) => {
    try {
      const carsId = req.body.carsId
      const cars = await getCarsById(carsId)
  
      if (cars.rentStatus === "close") {
        return res.status(400).send(ERROR_MESSAGE.E_CLOSEAUTO)
      }
      return next()
    } catch (error) {
      console.log(ERROR_MESSAGE.E_SERVER);
    }
};

module.exports = { isFreeCars };
