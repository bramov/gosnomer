const { Schema, model } = require('mongoose');

const recordSchema = new Schema ({
  date: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false
  },
  platenumber: {
    type: String,
    required: false
  },
  automodel: {
    type: String,
    required: false
  },
  additional: {
    type: String,
    required: false
  }
})

const Record = model('Record', recordSchema);

module.exports = Record;
