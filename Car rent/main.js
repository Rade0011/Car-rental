require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const url = process.env.DB_CONNECTION_URL; 
const port = process.env.PORT;
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const userRoutes = require('./routes/userRoutes.js');
const carsRoutes = require('./routes/carsRoute.js');
const rentRoutes = require('./routes/rentRoutes.js');
const cors = require('./midleware/cors.js');
const app = express();

app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', carsRoutes);
app.use('/', rentRoutes)
app.use(cors); 

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});