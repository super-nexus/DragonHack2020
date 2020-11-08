let Feeling = require('../db/models/Feeling');

const addFeeling = (req, res) =>{
  let data = req.body;
  if(req.cookies['userId']) {
      data.userId = req.cookies['userId'];
      new Feeling(data).save(data, (err, returnedData) => {
          if (err) {
              console.error("Error when adding feeling");
              console.error(err);
              res.status(400).send("Unable to add feeling");
          } else {
              res.status(200).send("OK");
          }
      })
  }
};

const getFeelings = (req, res) => {
    Feeling.find({}, (err, docs) => {
        if(!err){
            res.status(200).send(docs);
        }
        else{
            console.error("Error when obtaining all feelings docs", err);
        }
    })
};

module.exports = {
    addFeeling,
    getFeelings
};