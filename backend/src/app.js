const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv');

const taskRouter = require('./routes/taskRouter');

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use('/api', taskRouter);

module.exports = app