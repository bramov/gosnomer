const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = model('User', userSchema);

module.exports = User;
