// importation de quelque dependance 

const express = require('express')
const { createServer } = require("http")
const { Server } = require("socket.io")
const { Socket } = require('dgram')
const db = require('./models/db')
const routeRoom = require('./routes/room')

//importation des tous le models 

const User = require('./models/user')
const Chat = require('./models/chat')
const Room = require('./models/room')
const { error } = require('console')
const user = require('./models/user')


const app = express()

const httpServer = createServer(app)
const io = new Server(httpServer, {})

// midelhwaire

app.use(express.static(__dirname + '/public'))
app.use('/', routeRoom)


// partie socket
const connectedUsers = []

io.on('connection', (socket)=> {
  socket.on('pseudo',(pseudo) => {
    User.findOne({pseudo: pseudo}).then((user)=>{
      if(user){
        socket.pseudo = pseudo
        socket.broadcast.emit('newUser', pseudo)
      }else{
        const user = new User()
        user.pseudo = pseudo
        user.save()

        socket.pseudo = pseudo
        socket.broadcast.emit('newUser', pseudo)
        socket.broadcast.emit('newUserInDb', pseudo)

      }
      connectedUsers.push(socket)
      Chat.find({receiver : 'all'}).then((message)=>{
        socket.emit('oldMessages', message)
      })
    })
      
  })

  socket.on('oldWhispers', (pseudo)=>{
    Chat.find({receiver : pseudo}).then((messages)=>{
       socket.emit('oldWhispers', messages)
      }
    ).catch()
  })

  socket.on('newMessage', (message, receiver)=>{
    if(receiver === "all"){
      let chat = new Chat()
      chat.receiver = "all"
      chat.content = message
      chat.sender = socket.pseudo
       chat.save()
    
      socket.broadcast.emit('newMessageAll', {message: message, pseudo: socket.pseudo})
    }else{
      
      User.findOne({pseudo : receiver}).then((user)=>{
        
        if(!user){
          return false
        }else{
          
        socketReceiver = connectedUsers.find(socket => socket.pseudo === user.pseudo)
      
        if(socketReceiver){
          socketReceiver.emit('whisper', {sender: socket.pseudo, message : message})
        }
  
        
        let chat = new Chat()
        chat.receiver = receiver
        chat.content = message
        chat.sender = socket.pseudo
        chat.save()
        }

    
      })
    }
    


  })

  socket.on('writting',(pseudo)=>{ 
    socket.broadcast.to(socket.channel).emit('writting', pseudo); 
  }); 
     
    socket.on('notWritting',(pseudo)=>{
      socket.broadcast.to(socket.channel).emit('notWritting', pseudo); 
    }); 

  socket.on('disconnect', ()=> {
    const index = connectedUsers.indexOf(socket)
    if(index > -1){
      connectedUsers.splice(index, 1)
    }
    socket.broadcast.emit('quitUser', socket.pseudo)
  })

})



httpServer.listen(2004, ()=> console.log(" serveur lancer au port 2004"))




