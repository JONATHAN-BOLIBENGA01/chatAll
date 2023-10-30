const mongoose = require('mongoose')
const  roomSchema = mongoose.Schema({
    _id_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    },
})

module.exports = mongoose.model('Room', roomSchema)