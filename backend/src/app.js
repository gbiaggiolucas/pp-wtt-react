const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv');

const userRouter = require('./routes/userRouter');

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use('/api', userRouter);

module.exports = app