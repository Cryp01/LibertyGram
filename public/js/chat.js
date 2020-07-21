socket = io();
const container = document.getElementById('container');
container.style.cssText = "display:none;";
let m = document.getElementById('m');
let long = 50;
let btn = document.getElementById('btn');
const houdini = document.getElementById('houdini');
let output = document.getElementById('output');
let nick = document.getElementById('nick');


var responsiveMessage = function(len){
    if( window.innerWidth < 400){
      long += 30  
      m.style.cssText = "height:"+long+"px;";
    };
 

};

houdini.addEventListener('click', function(){
  
  container.style.cssText ="display:flex;";
  document.getElementById('pr').style.cssText = "display:none;";
  m.focus();
});
const ids = parseInt(Math.random() * 1000000);
console.log(ids);
btn.addEventListener('click', function(){
  
   socket.emit('mensaje', {
       menssage: m.textContent,
       name: nick.value,
       id: ids
   });
})
  
socket.on('mensaje', function(data){
  if(ids == data.id){

    output.innerHTML +=`<div class="recibido">
    <p class="mensage">
    
     ${data.menssage}
  
    </p></div>`
  
  }else{
    output.innerHTML +=`<div class="enviado">${data.name}
    <p class="mensage">
    
     ${data.menssage}
  
    </p></div>`
  }
 
})