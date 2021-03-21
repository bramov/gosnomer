const express = require('express');
const router = express.Router();
const User = require('./../../db/schemas/user.schema');
const { encryptPassword, comparePasswords, createAccessToken } = require("./auth.service");

router.post(
  '/register',
  async (req, res) => {
    const { nickname, password } = req.body;
    const encryptedPass = await encryptPassword(password);
    const user = new User({nickname, password: encryptedPass});
    try {
      await user.save();
      res.status(201).json({message: 'created!'})
    } catch(e) {
      console.error(e);
    }
  }
)
router.post(
  '/login',
  async (req, res) => {
    const { nickname, password } = req.body;
    console.log(nickname, password);
    const user = await User.findOne( { nickname} );
    console.log(user);
    if (!user) {
      res.status(404).json({message: 'not found'});
    }
    const validPass = await comparePasswords(password, user.password);
    if (!validPass) {
      res.status(401).json({ message: 'wrong password'})
    } else {
      const token = createAccessToken(user);
      res.status(200).json({ token });
    }

  }
)

module.exports = router;
