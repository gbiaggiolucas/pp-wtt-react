const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();

require('./config/db');

const userRouter = require('./routes/userRouter');
const timeRouter = require('./routes/timeRouter');

app.set('port', process.env.PORT || 3001);

// Middleware
app.use(cors()); // Adiciona CORS para aceitar requisições de origens diferentes
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', timeRouter);

module.exports = app;
