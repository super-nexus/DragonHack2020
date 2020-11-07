var SensorData = require("../../db/models/SensorData");

var postData = (req, res) => {
    var data = req.body;
    const newSensorData = new SensorData(data);
    newSensorData.save((err, newSensorData)=> {
        if (err){
            console.log("There was an error");
            console.log(err);
        }
        else {
            res.status(200).send("OK");
        }
    });

    res.send(JSON.stringify(data));
};

var getData = (req, res) => {
    SensorData.findByDate('2020-11-07', (err, docs) => {
        res.send(docs);
    })
};

var getDataByDate = (req, res) => {
    var date = req.body.date;

    SensorData.find({
        time: date
    }, (err, docs) => {
        res.send(JSON.stringify(docs));
    })
};


module.exports = {
    postData,
    getData,
    getDataByDate
};