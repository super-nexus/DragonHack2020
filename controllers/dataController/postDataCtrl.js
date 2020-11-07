var SensorData = require("../../db/models/SensorData");

var postData = (req, res) => {
    var data = req.body;
    const newSensorData = new SensorData(data);
    console.log(data);
    newSensorData.save((err, newSensorData)=> {
        if (err){
            console.log("There was an error");
            console.log(err);
            res.status(400).send("ERROR");
        }
        else {
            res.send("OK");
        }
    });
};

var getData = (req, res) => {
    SensorData.findByDate({}, (err, docs) => {
        res.send(docs);
    })
};

var getDataByDate = (req, res) => {
    var date = new Date(req.body.date);
    date = date.toISOString().slice(0, 10);

    SensorData.find({
        'time.date': date
    },null, {sort: {
            'date.hour': -1,
            'date.minute': -1
        }}, (err, docs) => {
        res.send(JSON.stringify(docs));
    })
};

var getCurrentData = (req, res) => {
    SensorData.find({}, null, {sort: {_id: -1}, limit: 1}, (err, docs) => {
        if(err){
            console.error("There was an error");
            console.error(err);
            res.status(400).send("ERROR");
        }
        else {
            res.send(docs[0]);
        }
    });
};


module.exports = {
    postData,
    getData,
    getDataByDate,
    getCurrentData
};