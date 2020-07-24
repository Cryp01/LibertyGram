socket = io();

//variables
const btn = document.getElementById('btn');
const video  = document.createElement('video');
const lienzo = document.getElementById('preview'); 
const context = lienzo.getContext('2d');

context.width = 300;
context.height = 150;

//config elementos
video.setAttribute('src','""');
video.setAttribute('autoplay','true');


//funciones
function loadCam(stream){
    video.srcObject = stream;
    console.log('camara activada');
}

function errCam(){
    console.log('error camara');
}
function emitir(video,context){
    context.drawImage(video,0,0,context.width,context.height);

    socket.emit('streaming',{
        image: document.getElementById('preview').toDataURL('image/webp'),
        id: socket.id

    });
}
btn.addEventListener('click', () =>{
     navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if(navigator.getUserMedia){
        navigator.getUserMedia({video:true}, loadCam,errCam)
    }
    var delay = setInterval(() =>{
        emitir(video,context);
    }, 0)
});

socket.on('streaming', (data) =>{
    if(`${data.id}` === socket.id){
        if(!document.body.contains(document.getElementById('receptor'))){
    
            let receptor = document.createElement('div');
            receptor.setAttribute('id','receptor');
            receptor.setAttribute('class','card');
            let img = document.createElement('img');
            document.getElementById('container').appendChild(receptor);
            img.setAttribute('src','');
            img.setAttribute('id','play2');
            img.style.cssText ="height:100%"
            receptor.appendChild(img);   
        }
           document.getElementById('play2').src = `${data.image}`
    
       }else{
           
        if(!document.body.contains(document.getElementById('emisor'))){
            let emisor = document.createElement('div');
            emisor.setAttribute('id','emisor');
            emisor.setAttribute('class','card');
            document.getElementById('container').appendChild(emisor);
            let img2 = document.createElement('img');
            img2.setAttribute('src','');
            img2.setAttribute('id','play1');
            img2.style.cssText ="height:100%"
            emisor.appendChild(img2);
        }
    
           document.getElementById('play1').src = `${data.image}`
    
       }
    
})
