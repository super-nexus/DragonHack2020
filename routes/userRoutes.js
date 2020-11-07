var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userControler');


router.post("/addUser", userCtrl.addUser);
router.post("/login", userCtrl.logIn);

module.exports = router;
