import { login as logins } from './login.js';

const form = document.querySelector('form');

form.onsubmit = function (event) {
    event.preventDefault();
    const senha = document.getElementById('senha').value
    const email = document.getElementById('email').value

    for (const login of logins) {
        console.log(senha,email,login.email,login.senha)
        if (login.email == email && login.senha == senha) {
            alert("Bem-vindo");
        }
    }
    alert('Usuário ou senha inválidas');

}
