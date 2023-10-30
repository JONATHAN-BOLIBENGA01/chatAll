const mongoose = require('mongoose')
const userSchema =  mongoose.Schema({
    pseudo : {
        type: String
    }
})


module.exports = mongoose.model('User', userSchema)