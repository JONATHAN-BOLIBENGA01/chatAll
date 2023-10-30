const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jbolibenga:21.24jbw@apijs.g1nmvt8.mongodb.net/roomdiscork', {
    useNewUrlParser : true ,  
    useUnifiedTopology: true 
})
   .then(()=> console.log('nous sommes connecter avec mongodb !'))
   .catch(()=>console.log("echec de la connexion avec mongodb !"))



module.exports = mongoose.connection