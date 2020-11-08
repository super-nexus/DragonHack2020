var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userControler');


router.post("/addUser", userCtrl.addUser);
router.post("/login", userCtrl.logIn);
router.get('/logout', userCtrl.logOut);

module.exports = router;
