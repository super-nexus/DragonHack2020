var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    res.render("login", {});
});

router.get('/index', (req, res) => {
    res.render('index', {});
});

module.exports = router;
