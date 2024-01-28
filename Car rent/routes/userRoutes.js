const express = require('express');
const router = express.Router();
const { getAllUser, getUserById, createUser, createAdmin, changeUser, deleteUser, verifiedUser } = require('../service/userService.js'); 
const { USER_MESSAGE, ERROR_MESSAGE } = require('../constans.js');
const { isAuth } = require('../midleware/isAuth.js');
const { isAdminMiddleware } = require('../midleware/isAdmin.js');
const { ValidationError } = require('../customError.js');

router.get('/users', isAuth, isAdminMiddleware, async (req, res) => {
    try {
        const users = await getAllUser();
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.get('/users/:userId', isAuth, isAdminMiddleware, async (req, res) => {
    const userId = req.params.userId;
    try {
        const users = await getUserById(userId);
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error.message);
    }
});

router.post('/users', async (req, res) => { // Добавление пользователя
    const { username, email, isVerified, roles, activeRents } = req.body;
    const newUser = { username, email, isVerified, roles, activeRents };
    try {
        const user = await createUser(newUser);
    res.status(200).send(USER_MESSAGE.USER_CREATED);
    } catch (error) {
        if (error instanceof ValidationError) {
            res.status(400).send(ERROR_MESSAGE.E_USER_CREATED)
        }
    }
});

router.post('/users/admin', async (req, res) => { 
    const { username, email, isVerified, roles, activeRents } = req.body;
    const newUser = { username, email, isVerified, roles, activeRents };
    try {
        const user = await createAdmin(newUser);
    res.status(200).send(USER_MESSAGE.USER_CREATED);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CREATED, error.message);
    }
});

router.put('/users/:userId', isAuth, isAdminMiddleware, async (req, res) => {  
    const userId = req.params.userId;
    const { username, email, isVerified, roles, activeRents } = req.body;
    const newUser = { username, email, isVerified, roles, activeRents };
    try {
        const change = await changeUser(userId, newUser);
        res.status(200).send(USER_MESSAGE.USER_CHANGE);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CHANGE, error.message);
    }
});

router.put('/users/:userId/verify', isAuth, isAdminMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const { isVerified } = req.body;
    newVerify = { isVerified };
    try {
        const verify = await verifiedUser(userId, newVerify);
        res.status(200).send(USER_MESSAGE.USER_CHANGE);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CHANGE, error.message);
    }
});

router.delete('/users/:userId', isAuth, isAdminMiddleware, async (req, res) => {
    const userId = req.params.userId;
    try {
        const del = await deleteUser(userId);
        res.status(200).send(USER_MESSAGE.USER_DELETE);
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_DELETE, error.message);
    }
});


module.exports = router;