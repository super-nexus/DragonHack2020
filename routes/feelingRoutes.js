var express = require('express');
var router = express.Router();
var feelingCtrl = require('../controllers/feelingControler');

router.post("/addFeeling", feelingCtrl.addFeeling);
router.post("/getAll", feelingCtrl.getFeelings);

module.exports = router;