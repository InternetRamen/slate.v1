const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
/* GET home page. */
const config = require("../config.json")
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/api/list', function(req, res, next) {
  let body = req.body;
  if (body.secret !== config.secret) {
    res.sendStatus(401)
  } else {
    if (!body) {
      res.sendStatus(400)
    } else {
      let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../public/data/links.json")))
      if (data.body.some(val => val.name === body.name)) {
        res.sendStatus(304)
      } else {
        data.body.push({name: body.name, location: body.location})
        fs.writeFileSync(path.resolve(__dirname, "../public/data/links.json"), JSON.stringify(data, null, 4))
        res.sendStatus(201)
      }

    }
  }

})
module.exports = router;
