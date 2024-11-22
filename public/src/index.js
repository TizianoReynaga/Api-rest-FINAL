import {navbar} from './navbar.js'

document.querySelector('#contNav').innerHTML = navbar

let boton = document.querySelector('#ingresar')
boton.addEventListener('click', ()=>{
    let btn = document.querySelector('#user')
    boton.style.display='none';
    btn.style.display="block";
})
document.getElementById('ingresar').addEventListener('click', function () {
    window.location.href = './login.html'; 
});
let salir = document.querySelector('#salir')
salir.addEventListener('click', ()=>{
    let btn = document.querySelector('#user')

    boton.style.display='block';
    btn.style.display="none";

})

import {footer} from './footer.js'

document.querySelector('#contF').innerHTML = footer