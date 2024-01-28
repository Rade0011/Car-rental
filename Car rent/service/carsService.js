const { Cars } = require('../schema/schems.js');
const { CARS_MESSAGE, ERROR_MESSAGE } = require('../constans.js');


const getAllCars = () => {
    const cars = Cars.find();
    return cars;
};

const getCarsById = async (carsId) => {
    const car = await Cars.findById(carsId);
    return car;
};

const createCar = async ({model, brand, price, rentStatus}) => {
    try {
    const car = await Cars.create({model, brand, price, rentStatus: 'free'});
    } catch (error) {
        console.log(ERROR_MESSAGE.E_CAR_CREATED);
        res.status(505).send(ERROR_MESSAGE.E_SERVER);
    }
};

const changeCar = async (carsId, {model, brand, price, rentStatus}) => {
    try {
    const change = await Cars.findByIdAndUpdate(carsId, {model, brand, price, rentStatus: 'free'}, {new: true});
    return change;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_CAR_CHANGE);
        res.status(505).send(ERROR_MESSAGE.E_SERVER);
    }
};

const changeRentStatus = async (carsId) => { 
    try {
    const change = await Cars.findByIdAndUpdate(carsId, {rentStatus: "close"}, {new: true});
    return change;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_RENT_STATUS);
        res.status(505).send(ERROR_MESSAGE.E_SERVER);
    }
};

const deleteCar = async (carsId) => {
    try {
    const del = await Cars.findByIdAndDelete(carsId);
    return del;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_CAR_DELETE);
        res.status(505).send(ERROR_MESSAGE.E_SERVER);
    }
};

module.exports = { getAllCars, getCarsById, createCar, changeCar, deleteCar, changeRentStatus };