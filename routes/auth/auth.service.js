const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = async (password) => {
  const rounds = Number(process.env.SALT_ROUNDS);
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(password, salt);
}

const comparePasswords = (first, second) => {
  return bcrypt.compare(first, second)
}

const createAccessToken = (user) => {
  return jwt.sign(
    {
      name: user.nickname,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '5h'
    }
  );
}

module.exports = {
  encryptPassword,
  comparePasswords,
  createAccessToken,
}
