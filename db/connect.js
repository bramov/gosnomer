const mongoose = require('mongoose');
const MONGO_CONNECTION_STRING  = process.env.MONGO_STRING;

const connectToDB = () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => console.error(err));

  const db = mongoose.connection;
  db.once('open', async () => {
    console.log('successfully connected')
  });
};

module.exports = { connectToDB };
