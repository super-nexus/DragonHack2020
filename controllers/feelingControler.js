let Feeling = require('../db/models/Feeling');

const addFeeling = (req, res) =>{
  let data = req.body;
  console.log(JSON.stringify(data));
  data.userId = '5fa707186098775190a5a02f';
      new Feeling(data).save((err, returnedData) => {
          if (err) {
              console.error("Error when adding feeling");
              console.error(err);
              res.status(400).send("Unable to add feeling");
          } else {
              res.status(200).send("OK");
          }
      })

};

const deleteFeeling = (req, res) => {
    Feeling.remove({}, (err, data) => {
        res.send("OK");
    });
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

const getTodaysFeelings = (req, res) => {

    let todaysDate = new Date().toISOString().slice(0,10)

    Feeling.find({'time.date' : todaysDate}, (err, docs) => {
       if(err){
           console.error('Error when getting todays feelings');
           console.error(err)
       }
       else{
           res.status(200).send(docs);
       }
    });

}

module.exports = {
    addFeeling,
    getFeelings,
    getTodaysFeelings,
    deleteFeeling
};