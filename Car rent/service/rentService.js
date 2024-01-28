const { Rent, Cars } = require('../schema/schems.js');
const { RENT_MESSAGE, ERROR_MESSAGE} = require('../constans.js');

const getAllRent = () => {
    const rent = Rent.find();
    return rent;
};

const getRentById = async (rentsId) => {
    const rent = Rent.findById(rentsId).populate('carsId').populate('userId'); 
    return rent;
};

const getAvailibleCars = async (req, res) => {

    try {
      const {startDate, endDate} = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ error: ERROR.START_AND_END_DATE_NOT_FOUND });
      }
  
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
  
      if (startDateTime >= endDateTime) {
        return res.status(400).json({ error: ERROR.INVALID_DATE });
      }
  
      const rentedCars = await Rent.find({
        $or: [
          { startDate: { $lte: endDateTime, $gte: startDateTime } },
          { endDate: { $gte: startDateTime, $lte: endDateTime } },
        ],
      }).distinct('carsId');
  
      const availableCars = await Cars.find({
        _id: { $nin: rentedCars },
      });
  
      res.status(200).send(availableCars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: ERROR.SERVER_ERROR });
    }
  }
  
const createRent = async ({startDate, endDate, userId, carsId}) => {
    try {
    const rent = await Rent.create({startDate, endDate, userId, carsId});
    return rent;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_RENT_CREATED);
    }
};

const deleteRent = async (rentsId) => {
    try {
    const del = Rent.findByIdAndDelete(rentsId);
    return del;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_RENT_DELETED);
    }
};

module.exports = { getAllRent, getRentById, getAvailibleCars, createRent, deleteRent};