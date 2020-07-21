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

output.style.cssText += "display:none;";

houdini.addEventListener('click', function(){
  
  container.style.cssText ="display:flex;";
  document.getElementById('pr').style.cssText = "display:none;";
  m.focus();

  socket.emit('conectado', {
    nick: nick.value
  })
  output.style.cssText += "display:block;";
});

const ids = parseInt(Math.random() * 1000000);
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
socket.on('conectado',function(data){
    let contacto = document.createElement('li');
    contacto.setAttribute('class','contacto');
    contacto.innerText += `${data.nick}`;
    
    contact.appendChild(contacto);
})