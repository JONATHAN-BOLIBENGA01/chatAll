const mongoose = require('mongoose')

const  chatSchema = mongoose.Schema({
    _id_room: {
        type: String
    },
    sender:{
        type: String
    },

    receiver:{
        type: String
    },
    content:{
        type: String
    }

})


module.exports = mongoose.model('Chat', chatSchema)