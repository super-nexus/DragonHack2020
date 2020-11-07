var express = require('express');
var router = express.Router();
var postDataCtrl = require('../controllers/dataController/postDataCtrl');

router.post('/postData', postDataCtrl.postData);
router.post('/getData', postDataCtrl.getData);
router.post('/getDataByDate', postDataCtrl.getDataByDate);

module.exports = router;