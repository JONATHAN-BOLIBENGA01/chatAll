const socket = io.connect('http://localhost:2004')


 // On demande le pseudo de la personne 
while(!pseudo){ 
  var pseudo = prompt("entrer votre pseudo ")
} 
socket.emit('pseudo', pseudo) 
socket.emit('oldWhispers', pseudo)
document.title = pseudo + ' - ' + document.title

socket.on('newUser', (pseudo)=>{
    createElementFunction('newUser', pseudo)
})

socket.on('newUserInDb', (pseudo)=>{
    newOptions = document.createElement('option')
    newOptions.textContent = pseudo
    newOptions.value = pseudo
})

socket.on('oldWhispers', (messages)=>{
    messages.forEach(message => {
        createElementFunction('oldWhispers', message)
    })
})

socket.on('newMessageAll',(content)=>{ 
    createElementFunction('newMessageAll', content) 
})

socket.on('whisper', (content)=>{
    createElementFunction('whisper', content)
})

socket.on('oldMessages', (messages)=>{
    messages.forEach(message=>{  
        if(message.sender === pseudo){ 
        createElementFunction('oldMessagesMe', message)
        }else{ 
         createElementFunction('oldMessages', message)
        } 
    })
})

socket.on('writting',(pseudo)=>{ 
    document.getElementById('isWritting').textContent = pseudo + ' est en train d\'écrire' 
}); 

socket.on('notWritting', () =>{ 
   document.getElementById('isWritting',).textContent = ' '
})

socket.on('quitUser',(message) => { 
    createElementFunction('quitUser', message)
})


    
    //Quand on soumet le formulaire 
document.getElementById('chatForm').addEventListener('submit', (e)=>{ 
      e.preventDefault(); 
     
    // On récupère la valeur dans l'input et on met le input a 0 
    const textInput = document.getElementById('msgInput').value
    const receiver = document.getElementById('receiverInput').value
    document.getElementById('msgInput').value =''
    
    if(textInput.length > 0){ 
  
      socket.emit('newMessage',textInput, receiver)
      if(receiver === "all")
         createElementFunction('newMessageMe',textInput) 
        
        }else{ 
        return false
    } 
}) 

 function createElementFunction(element, content){
    
    const newElement = document.createElement("div")
    switch(element){
        
        case 'newMessageMe': 
            newElement.classList.add(element, 'message'); 
            newElement.innerHTML = pseudo + ': ' + content; 
           document.getElementById('msgContainer').appendChild(newElement)
            break; 
 
        case 'newMessageAll': 
            newElement.classList.add(element, 'message'); 
            newElement.innerHTML = content.pseudo + ': ' + content.message
            document.getElementById('msgContainer').appendChild(newElement) 
            break; 
  
        case 'whisper': 
            newElement.classList.add(element, 'message'); 
            newElement.textContent = content.sender + 'vous a  chuchoté : ' + content.message
            document.getElementById('msgContainer').appendChild(newElement)
            break
 
        case 'newUser': 
            newElement.classList.add(element, 'message'); 
            newElement.textContent = content + ' a rejoint le chat' 
            document.getElementById('msgContainer').appendChild(newElement) 
            break; 
  
        case 'quitUser': 
            newElement.classList.add(element, 'message') 
            newElement.textContent = content + ' a quitté le chat' 
            document.getElementById('msgContainer').appendChild(newElement) 
            break; 
  
        case 'oldMessages': 
            newElement.classList.add(element, 'message'); 
            newElement.innerHTML = content.sender + ': ' + content.content 
           document.getElementById('msgContainer').appendChild(newElement); 
            break; 

        case 'oldMessagesMe': 
           newElement.classList.add('newMessageMe', 'message'); 
           newElement.innerHTML = content.sender + ': ' + content.content; 
           document.getElementById('msgContainer').appendChild(newElement); 
           break; 
  
        case 'oldWhispers': 
            newElement.classList.add(element, 'message'); 
            newElement.textContent = content.sender + ' vous a ecrit : ' + content.content; 
            document.getElementById('msgContainer').appendChild(newElement); 
            break; 
    }

   
 }
       

 