const mongoose = require('mongoose')

mongoose.connect('put your mongodb uri for to connect to db ', {
    useNewUrlParser : true ,  
    useUnifiedTopology: true 
})
   .then(()=> console.log('nous sommes connecter avec mongodb !'))
   .catch(()=>console.log("echec de la connexion avec mongodb !"))



module.exports = mongoose.connection