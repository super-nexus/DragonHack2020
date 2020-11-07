const axios = require('axios');

const index = (req, res) => {

    console.log(req.cookies);
    if(req.cookies["userId"]) {
        axios.post("http://localhost:3000/data/getCurrentData").then(response => {
            console.log(response.data);
            res.render('index', response.data);
        }, error => {
            console.error("Error when fetching currentData");
            console.error(error);
        })
    }else{
        res.redirect("/login");
    }
};


module.exports = {
    index
};