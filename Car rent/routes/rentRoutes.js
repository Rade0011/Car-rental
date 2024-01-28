const express = require('express');
const router = express.Router();
const { getAllRent, getRentById, getAvailibleCars, createRent, deleteRent } = require('../service/rentService.js');
const { RENT_MESSAGE, ERROR_MESSAGE } = require('../constans.js');
const { isAuth } = require('../midleware/isAuth.js');
const { isVerifiedUser } = require('../midleware/IsVerified.js');
const { isAdminMiddleware } = require('../midleware/isAdmin.js');
const { changeRentStatus } = require('../service/carsService.js');
const { isFreeCars } = require('../midleware/isFree.js');
const { isCarsAvailible } = require('../midleware/isCarsAvailible.js');


router.get('/rents', isAdminMiddleware, isAuth, async (req, res) => {
    try {
        const rents = await getAllRent();
        res.status(200).json(rents);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.get('/rents/:rentsId', isAuth, async (req, res) => {
    const rentsId = req.params.rentsId;
    try {
        const rents = await getRentById(rentsId);
        res.status(200).json(rents);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.get('/available', getAvailibleCars);  

router.post('/rents', isAuth, isVerifiedUser, isCarsAvailible, async (req, res) => {
    carsId = req.body.carsId;
    const { startDate, endDate, userId } = req.body //
    try {
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        if (startTime >= endTime) {
            res.status(400).send(ERROR_MESSAGE.E_DATA);
        }
        const rents = await createRent(req.body);
        const changeStatus = await changeRentStatus(carsId);
        res.status(200).send(RENT_MESSAGE.RENT_CREATED);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_RENT_CREATED);
    }
});

router.delete('/rents/:rentsId', isAuth, isAdminMiddleware, async (req, res) => {
    const rentsId = req.params.rentsId;
    try {
        const del = await deleteRent(rentsId);
        res.status(200).json(RENT_MESSAGE.RENT_DELETED);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_RENT_DELETED);
    }
});

module.exports = router;






