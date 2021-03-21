const express = require('express');
const recordsRouter = require('./routes/records/records.router');
const authRouter = require('./routes/auth/auth.router');
const cors = require('cors');
const formData = require('express-form-data');
require('dotenv').config();
const { connectToDB } = require('./db/connect');
const buildPath = __dirname + '/client/build/';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(buildPath));
app.use(formData.parse());
app.use('/auth', authRouter);
app.use('/records', recordsRouter);



const port = process.env.PORT || 4000;
app.get('/', async (req, res) => {
  try {
    res.sendFile(buildPath + 'index.html');
  } catch (e) {
    res.status(500);
  }
});
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
  connectToDB();
});
