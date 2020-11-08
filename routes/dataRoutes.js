var express = require('express');
var router = express.Router();
var postDataCtrl = require('../controllers/dataController/postDataCtrl');

router.post('/postData', postDataCtrl.postData);
router.post('/getData', postDataCtrl.getData);
router.post('/getDataByDate', postDataCtrl.getDataByDate);
router.post('/getCurrentData', postDataCtrl.getCurrentData);
router.post('/getFromDate', postDataCtrl.getDataFromDate);
router.delete('/delete', postDataCtrl.deleteAll);
router.post('/addIdeal', postDataCtrl.addIdeal);
router.post('/getIdeal', postDataCtrl.getIdeal);

module.exports = router;