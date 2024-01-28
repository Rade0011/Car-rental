const { Rent } = require('../schema/schems.js');
const { ERROR_MESSAGE } = require('../constans.js');
const mongoose = require('mongoose');

const isCarsAvailible = async (req, res, next) => {
  try {
    const {carsId, startDate, endDate} = req.body;
    const id = new mongoose.Types.ObjectId(carsId);
    const availible = await Rent.aggregate([
      {
        $match: {
          cars: id,
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        },
      },
    ]);

    if(availible.length < 0) {
      return res.status(400).send(ERROR_MESSAGE.E_CARAVAILIBLE);
    };
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).send(ERROR_MESSAGE.E_SERVER);
  }
};

module.exports = { isCarsAvailible };