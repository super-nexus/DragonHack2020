var SensorData = require("../../db/models/SensorData");
var Ideal = require('../../db/models/Ideal');

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

var deleteAll = (req, res) => {
    SensorData.remove({}, (err, doc) => {
        if(!err){ res.send("OK")}
    });
};

var getData = (req, res) => {
    SensorData.find({},null, {limit: 20}, (err, docs) => {
        res.send(docs);
    })
};

var getDataByDate = (req, res) => {
    let date = req.body.date;
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

let getDataFromDate = (req, res) => {
    let sentDate = req.body.date;

    let fromm = new Date(sentDate);
    let to = new Date();

    SensorData.find({'time.date':{
            "$gte": fromm,
            "$lte": to
        }}, (err, docs) => {
        if(!err){
            res.send(docs);
        }
    })

};

let addIdeal = (req, res) => {
    let ideal = req.body;
    console.log(ideal);
    Ideal.remove({}, (err, succ) => {
       if(!err){
           new Ideal(ideal).save((error, obj) => {
               res.status(200).send("OK");
           })
       }
    });
};

let getIdeal = (req, res) => {
    Ideal.find({}, (err, docs) => {
        if(!err){
            res.send(docs[0]);
        }
    });
};


module.exports = {
    postData,
    getData,
    getDataByDate,
    getDataFromDate,
    getCurrentData,
    deleteAll,
    addIdeal,
    getIdeal
};