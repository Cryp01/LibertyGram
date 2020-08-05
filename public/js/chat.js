


socket = io();
const container = document.getElementById('container');
// container.style.cssText = "display:none;";
const form = document.getElementById('form')
let input = document.getElementById('input');
let long = 50;
let btn = document.getElementById('btn');
const houdini = document.getElementById('houdini');
let output = document.getElementById('output');
// let nick = document.getElementById('nick');
let contUser = document.getElementById('contUser');
const ids = parseInt(Math.random() * 1000000);

let nick = 'glow'+ids;

// const form = document.getElementById('form')
//         form.addEventListener('submit',(e)=>{
//             e.preventDefault()

//             const input = document.getElementById('msg').value
            
//             const contChat = document.querySelector('.cont-chat')
//             const msg = document.createElement('div')
//             msg.innerHTML =
//             `
//             <div class="msg sent">
//                 <p class="message sent">${input}</p>
//             </div>
//             `

//             contChat.appendChild(msg)
//             form.reset()
//         })

// output.style.cssText += "display:none;";
let users = [];

(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded',function(){


      console.log('Ready!!123');

      console.log('im online');

      //users
      let user = new Object();
      user.id = ids;
      user.nick = nick.value;
      
      users.push(user);

      //function emit informacion user

      socket.emit('conectado', {
        list: users,
        nick: nick.value,
        id: socket.id,
        ids: ids
      });

  
    })();

})

      


// houdini.addEventListener('click', function(){
  
//   //users
//   let user = new Object();
//   user.id = ids
//   user.nick = nick.value
//   users.push(user);

//   //show message box send
//   container.style.cssText ="display:flex;";
//   document.getElementById('pr').style.cssText = "display:none;";
//   m.focus();


//   //function emit informacion user

//   socket.emit('conectado', {
//     list: users,
//     nick: nick.value,
//     id: socket.id,
//     ids: ids
//   });

//   //show message box
//   output.style.cssText += "display:block;";


// });


console.log(ids);
// m.addEventListener('keypress', function(){

//   if(m.textContent.length > 0){
//      if(event.keyCode === 13){
//     socket.emit('mensaje', {
//       menssage: m.textContent,
//       name: nick.value,
//       id: ids
//   });
//   m.textContent = "";
//   }
 
//   }
// })

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  console.log('mensaje enviado');

  const input = document.getElementById('input').value

  socket.emit('mensaje', {
    menssage: input,
    name: nick.value,
    id: ids
});

form.reset()
            
  // const contChat = document.querySelector('.cont-chat')
  // const msg = document.createElement('div')
  // msg.innerHTML =
  //   `
  //   <div class="msg sent">
  //   <p class="message sent">${input}</p>
  //   </div>
  //   `

  // contChat.appendChild(msg) 
})

// btn.addEventListener('click', function(){
  
//    socket.emit('mensaje', {
//        menssage: m.textContent,
//        name: nick.value,
//        id: ids
//    });
//   m.textContent = "";
// })
  
socket.on('mensaje', function(data){
  if(ids == data.id){
    let msg = document.createElement('div');
    let message = document.createElement('p');
    msg.setAttribute('class','msg sent');
    message.setAttribute('class','message sent');
    message.innerText += `${data.menssage}`;
    msg.appendChild(message);
    output.appendChild(msg);
    console.log('Enviando mensaje');
    msg.focus();
  }
  else{
    let msg = document.createElement('div');
    let message = document.createElement('p');
    // let nameMessage = document.createElement('p');
    msg.setAttribute('class','msg received');
    message.setAttribute('class','message received');
    // nameMessage.setAttribute('class','name-enviado');
    // mensaje.setAttribute('class','enviado');
    message.innerText += `${data.menssage}`;
    // nameMessage.innerText += `${data.name}`;
    // msg.appendChild(nameMessage);
    msg.appendChild(message);
    output.appendChild(msg);
    console.log('recibiendo mensaje');
    msg.focus();
  }
})

socket.on('conectado',function(data,users){
    for(var i =0; i < `${users.length}`; i++){
      
      if(`${data.id}` != `${users[i]}`){
        console.log('new user online');
        
        let userOn = document.createElement('div');

        userOn.setAttribute('class','userOn medium black');
        userOn.setAttribute('id',`${data.id}`);

        userOn.innerText += `
        <img src="img/on.png" alt="on">
        <p>${data.nick}</p>`
        ;
        contUser.appendChild(userOn);
      }
    }  

})

// socket.on('desconectado', function(datos){
//   let contactremove = document.getElementById(`${datos}`);
//   contUser.removeChild(contactremove);
// })

