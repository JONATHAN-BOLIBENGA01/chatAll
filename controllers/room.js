const User = require('../models/user')

exports.getRoom = (req, res, next)=> {
    User.find().then((users)=>{
        res.render('index.ejs', {
            users : users
        })
    })
    
}