(function(){
    'use strict';
    document.addEventListener('DOMContentLoaded',function(){
        console.log('Ready!!');

        // HandleOpen
        const open = document.getElementById('open');
        open.addEventListener('click', ()=>{
            const on = document.querySelector('.on');
            on.classList.toggle('active');
            if(on.classList.contains('active')){
                open.src='img/close.png'
            }else{
                open.src='img/open.png'
            }
        })

        // HandleChat
        const form = document.getElementById('form')
        form.addEventListener('submit',(e)=>{
            e.preventDefault()

            const input = document.getElementById('msg').value
            
            const contChat = document.querySelector('.cont-chat')
            const msg = document.createElement('div')
            msg.innerHTML =
            `
            <div class="msg sent">
                <p class="message sent">${input}</p>
            </div>
            `

            contChat.appendChild(msg)
            form.reset()
        })

        // HandleDark
        const btnDark = document.querySelector('.circle')
        btnDark.addEventListener('click',()=>{

            document.querySelector('.on').classList.toggle('bg-darkBlue')
            
            document.querySelector('.nav').classList.toggle('bg-darkBlue')
            document.querySelector('.on h2').classList.toggle('white')
            document.querySelector('.cont-dark h3').classList.toggle('white')
            document.querySelector('body').classList.toggle('bg-darkGray')

            const usersON = document.querySelectorAll('.userOn p')
            usersON.forEach(p => {
                p.classList.toggle('white')
            });

            const msgsR = document.querySelectorAll('.message.received')
            msgsR.forEach(msg => {
                msg.classList.toggle('lessGray')
            });
            
        })
   
    });
})();