var express = require('express');
var router = express.Router();
var indexCtrl = require("../controllers/indexControler");

router.get('/login', (req, res) => {
    res.render("login", {});
});

router.get('/index', indexCtrl.index);

router.get("/office", indexCtrl.office);
module.exports = router;
