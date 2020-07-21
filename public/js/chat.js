socket = io();
const container = document.getElementById('container');
container.style.cssText = "display:none;";
let m = document.getElementById('m');
let long = 50;
let btn = document.getElementById('btn');
const houdini = document.getElementById('houdini');
let output = document.getElementById('output');
let nick = document.getElementById('nick');
let contact = document.getElementById('contact');
const ids = parseInt(Math.random() * 1000000);

output.style.cssText += "display:none;";
let users = [];

houdini.addEventListener('click', function(){
  
  //users
  let user = new Object();
  user.id = ids
  user.nick = nick.value
  users.push(user);

  //show message box send
  container.style.cssText ="display:flex;";
  document.getElementById('pr').style.cssText = "display:none;";
  m.focus();


  //function emit informacion user

  socket.emit('conectado', {
    list: users,
    nick: nick.value,
    id: socket.id,
    ids: ids
  });

  //show message box
  output.style.cssText += "display:block;";


});


console.log(ids);
m.addEventListener('keypress', function(){

  if(m.textContent.length > 0){
     if(event.keyCode === 13){
    socket.emit('mensaje', {
      menssage: m.textContent,
      name: nick.value,
      id: ids
  });
  m.textContent = "";
  }
 
  }
})
btn.addEventListener('click', function(){
  
   socket.emit('mensaje', {
       menssage: m.textContent,
       name: nick.value,
       id: ids
   });
  m.textContent = "";
})
  
socket.on('mensaje', function(data){
  if(ids == data.id){
    
    let mensaje = document.createElement('div');
    let pMenssage = document.createElement('p');
    mensaje.setAttribute('class','recibido');
    pMenssage.innerText += `${data.menssage}`;
    mensaje.appendChild(pMenssage);
    output.appendChild(mensaje);
    mensaje.focus();
  }else{

    let mensaje = document.createElement('div');
    let pMenssage = document.createElement('p');
    mensaje.setAttribute('class','enviado');
    pMenssage.innerText += `${data.menssage}`;
    mensaje.innerText += `${data.name}`;
    mensaje.appendChild(pMenssage);
    output.appendChild(mensaje);
    mensaje.focus();
  }
 
})
socket.on('conectado',function(data,users){
    for(var i =0; i < `${users.length}`; i++){
      
      if(`${data.id}` != `${users[i]}`){
        
        let contacto = document.createElement('li');
        contacto.setAttribute('class','contacto');
        contacto.setAttribute('id',`${data.id}`);
        contacto.innerText += `${data.nick}`;
        contact.appendChild(contacto);
      }
    }
    
})
socket.on('desconectado', function(datos){
  let contactremove = document.getElementById(`${datos}`);
  contact.removeChild(contactremove);
})