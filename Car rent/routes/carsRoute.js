const express = require('express');
const router = express.Router();
const { getAllCars, getCarsById, createCar, changeCar, deleteCar } = require('../service/carsService.js');
const { CAR_MESSAGE, ERROR_MESSAGE} = require('../constans.js');
const { isAuth } = require('../midleware/isAuth.js');
const { isAdminMiddleware } = require('../midleware/isAdmin.js');
const { ValidationError } = require('../customError.js');

router.get('/cars', async (req, res) => {
    try {
        const cars = await getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.get('/cars/:carsId', async (req, res) => {
    const carsId = req.params.carsId
    try {
        const cars = await getCarsById(carsId);
        res.status(200).json(cars);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.post('/cars', isAuth, isAdminMiddleware,  async (req, res) => {
    const { brand, model, price, rentStatus} = req.body;
    const newCar = { brand, model, price, rentStatus};
    try {
        const cars = await createCar(newCar);
        res.status(200).send(CAR_MESSAGE.CAR_CREATED)
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).send(ERROR_MESSAGE.E_CAR_CREATED)
        }
    }
});

router.put('/cars/:carsId', isAuth, isAdminMiddleware, async (req, res) => {  
    const carsId = req.params.carsId;
    const { brand, model, price, rentStatus} = req.body;
    const newCar = { brand, model, price, rentStatus};
    try {
        const change = await changeCar(carsId, newCar);
        res.status(200).send(CAR_MESSAGE.CAR_CHANGE);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_CAR_CHANGE);
        res.status(400).send(ERROR_MESSAGE.E_SERVER);
    }
});

router.delete('/cars/:carsId', isAuth, isAdminMiddleware, async (req, res) => {
    const carsId = req.params.carsId;
    authId = req.headers.authorization;
    try {
        const del = await deleteCar(carsId);
        res.status(200).send(CAR_MESSAGE.CAR_DELETE);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_CAR_DELETE);
        res.status(400).send(ERROR_MESSAGE.E_SERVER);
    }
});

module.exports = router;


