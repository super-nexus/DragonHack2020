const axios = require('axios');
const Feeling = require('../db/models/Feeling');
const fs = require('fs');

const index = (req, res) => {

    uid = req.cookies['userId'];
    if(uid) {
        axios.post("http://localhost:3000/data/getCurrentData").then(response => {
            console.log(response.data);

            Feeling.find({userId: uid, 'time.date': new Date().toISOString().slice(0, 10)}, (err, docs) => {
                if(err){
                    console.error("Error when trying to validate feeling");
                    console.error(err);
                }
                else {
                    if(docs.length === 1){
                        response.data.feelingClicked = true;
                    }
                    else{
                        response.data.feelingClicked = false;
                    }
                    res.render('index', response.data);
                }
            });

        }, error => {
            console.error("Error when fetching currentData");
            console.error(error);
        })
    }else{
        res.redirect("/login");
    }
};

const office = (req, res) => {
    uid = req.cookies['userId'];

    if(uid){
        let idealData = fs.readFileSync("../db/storage.txt");
        let idealDataJson = JSON.parse(idealData);
        res.render('office', idealDataJson);
    }
    else{
        res.redirect('/login');
    }
}

module.exports = {
    index,
    office
};