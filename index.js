"use strict";
const express = require("express");
const cors = require('cors');
const app = express();
const authenticateUser = require('./src/middlewares/authentication');

require("dotenv").config();
// app.use(cors());
// Sadece belirli bir kökene izin ver
const corsOptions = {
  origin: '*', // İzin verilen domain
};
app.use(cors(corsOptions));
// const corsOptions = {
//   origin: '*'  // Tüm domainlerden erişime izin ver
// };
// app.use(cors());


const PORT = process.env.PORT || 8000;

require('express-async-errors');
require('./src/configs/dbConnection');
app.use(express.json());

app.get('/', function (req, res) {
  res.send(' --GOALTRACk--');
});

// Whitelist endpoint'ler (kayit ve giris)
app.use('/auth', require('./src/routes/auth'));
app.use('/user', require('./src/routes/user'));


// Korunan endpoint'ler
app.use('/todo',authenticateUser, require('./src/routes/todo'));
app.use('/notes',authenticateUser, require('./src/routes/notes'));
app.use('/chain',authenticateUser, require('./src/routes/chain'));
app.use('/events',authenticateUser, require('./src/routes/event'));



app.use(require('./src/middlewares/errorHandler'));

app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT));
