const { User } = require('../schema/schems.js');
const { ROLES, USER_MESSAGE, ERROR_MESSAGE } = require('../constans.js');

const getAllUser = () => {
    const users = User.find();
    return users;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId);
    return user;
};

const createUser = async ({username, isVerified, roles, email, activeRents}) => { 
    try {
    const user =  await User.create({username, isVerified: false, roles: ROLES.DEFAULT, email, activeRents: []});
    return user;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CREATED, error);    }
};

const createAdmin = async ({username, isVerified, roles, email, activeRents}) => { 
    try {
    const user =  await User.create({username, isVerified: true, roles: ROLES.ADMIN, email, activeRents: []});
    return user;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CREATED, error);
    }
};

const verifiedUser = async (userId, {isVerified}) => { 
    try {
        const verify = await User.findByIdAndUpdate(userId, {isVerified: true});
        return verify;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CHANGE, error);
    }
};

const changeUser = async (userId, {username, isVerified, roles, email, activeRents}) => {    
    try {
    const change = await User.findByIdAndUpdate(userId, {username, isVerified, roles, email, activeRents}, { new: true});
    return change;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_CHANGE, error);
    }
};

const deleteUser = async (userId) => {
    try {
    const del = await User. findByIdAndDelete(userId);
    return del;
    } catch (error) {
        console.log(ERROR_MESSAGE.E_USER_DELETE, error);
    }
};

module.exports = { getAllUser, getUserById, createUser, changeUser, deleteUser, createAdmin, verifiedUser };

