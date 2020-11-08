const axios = require('axios');
const Feeling = require('../db/models/Feeling');
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

    if(uid)
        axios.post("http://localhost:3000/data/getIdeal").then(ideal => {
            axios.post("http://localhost:3000/data/getCurrentData").then( currData => {
                let avg = ideal.data;
                let curr = currData.data;
                
                let officeObj = {}
                
                if(curr.temperature >= (avg.tempAverage - 0.5) && curr.temperature <= (avg.tempAverage + 0.5)){
                    officeObj.temperature = {
                        average: avg.tempAverage,
                        clas: 'ok',
                        text: 'OK'
                    }
                }
                else if(curr.temperature < (avg.tempAverage - 0.5)){
                    officeObj.temperature = {
                        average: avg.tempAverage,
                        clas: 'low',
                        text: 'LOW'
                    }
                }
                else{
                    officeObj.temperature = {
                        average: avg.tempAverage,
                        clas: 'high',
                        text: 'HIGH'
                    }
                }
                
                if(curr.humidity <= (avg.humiAverage + 1) && curr.humidity >= (avg.humiAverage - 1)){
                    officeObj.humidity = {
                        average: avg.humiAverage,
                        clas: 'ok',
                        text: 'OK'
                    }
                }
                else if(currData.humidity < (avg.humiAverage - 1)){
                    officeObj.humidity = {
                        average: avg.humiAverage,
                        clas: 'low',
                        text: 'LOW'
                    }
                }
                else{
                    officeObj.humidity = {
                        average: avg.humiAverage,
                        clas: 'high',
                        text: 'HIGH'
                    }
                }

                if(curr.brightness <= (avg.brightAverage + 50 ) && curr.brightness >= (avg.brightAverage - 50)){
                    officeObj.brightness = {
                        average: avg.brightAverage,
                        clas: 'ok',
                        text: 'OK'
                    }
                }
                else if(curr.brightness < (avg.brightAverage - 50)){
                    officeObj.brightness = {
                        average: avg.brightAverage,
                        clas: 'low',
                        text: 'LOW'
                    }
                }
                else{
                    officeObj.brightness = {
                        average: avg.brightAverage,
                        clas: 'high',
                        text: 'HIGH'
                    }
                }

                if(curr.noise <= (avg.noiseAverage + 4) && curr.noise >= (avg.noise - 4)) {
                    officeObj.humidity = {
                        average: avg.humiAverage,
                        clas: 'ok',
                        text: 'OK'
                    }
                }
                else if(curr.noise < (avg.noiseAverage- 4)){
                    officeObj.noise = {
                        average: avg.noiseAverage,
                        clas: 'low',
                        text: 'LOW'
                    }
                }
                else{
                    officeObj.noise = {
                        average: avg.noiseAverage,
                        clas: 'high',
                        text: 'HIGH'
                    }
                }
                res.render('office', officeObj);
            }).catch((err) => {
                console.error(err);
            })
        }).catch(err => {
            res.status(404).send("error when obtaining optimal data");
        });
    else{
        res.redirect('/login');
    }
};

module.exports = {
    index,
    office
};