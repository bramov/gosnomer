const express = require('express');
const router = express.Router();
const Record = require('./../../db/schemas/record.schema');

const setHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
}
router.get(
  '/all',
  async (req, res) => {
      const { date } = req.query;
      setHeaders(res);
      const records = await Record.find({date});
      res.json(records);
  }
)
router.post(
  '/edit',
  async (req, res) => {
    try {
      const { id, platenumber, automodel, additional, time, date } = req.body;
      const record = await Record.findOne({_id: id});
      console.log(date);
      if (platenumber === '' && automodel === '' && record) {
        await Record.deleteOne({_id: id});
      }
      if (record) {
        await Record.find({_id: id}).update({_id: id},
          {'$set': {
              platenumber,
              automodel,
              additional
            }})
      } else {
        const record = new Record({date, time, platenumber, automodel, additional})
        await record.save();
      }
      setHeaders(res);
      res.status(200).json({created: true});
    } catch(e) {
      console.error(e);
    }
  }
)

module.exports = router;
