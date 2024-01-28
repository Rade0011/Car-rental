const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    rentStatus: String
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    isVerified: Boolean,
    roles: String,
    activeRents: Array
});

const rentSchema = new mongoose.Schema ({
    startDate: Date,
    endDate: Date,
    cancelationDate: Date,
    userId: { type: 'ObjectId', ref: 'user'},
    carsId: { type: 'ObjectId', ref: 'cars'}
})

const Cars = mongoose.model('cars', carsSchema);
const User = mongoose.model('user', userSchema);
const Rent = mongoose.model('rent', rentSchema);

module.exports = { Cars, User, Rent};