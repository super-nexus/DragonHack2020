let User = require('../db/models/User');

let addUser = (req, res) => {
    let user = req.body;
    let usersUsername = user.username;

    User.find({username: usersUsername}, (err, docs) => {
       if(err){
           console.error("Error validating username");
           console.error(err);
           res.status(400).send("Unable to validate username");
       }
       else{
           if(docs.length == 0){
               new User(user).save((err, userDoc) => {
                   if(err){
                       console.error("Error adding user");
                       console.error(err);
                       res.status(400).send("Unable to add user");
                   }else{
                       res.status(200).send("OK");
                   }
               })
           }
           else{
               res.status(200).send("User already exists");
           }
       }
    });

}

let logIn = (req, res) => {

    let user = req.body;

    User.find({username: user.username, password: user.password}, (err, docs) => {
        if(err){
            console.error("Error when logging in user");
            console.error(err);
            res.render("login", {error: true, errorMessage: "Unable to login user"});
        }
        else{
            if(docs.length === 1){
                res.redirect("/index");
            }
            else{
                res.status(200).render("login", {error: true, errorMessage: "Incorrect username or password"});
            }
        }
    })
};

module.exports = {
    addUser,
    logIn
};