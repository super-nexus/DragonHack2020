var express = require('express');
var router = express.Router();
var feelingCtrl = require('../controllers/feelingControler');

router.post("/addFeeling", feelingCtrl.addFeeling);

module.exports = router;