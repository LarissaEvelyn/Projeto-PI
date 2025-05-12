import { login as logins } from './pag1.js';

const form = document.querySelector('form');

form.onsubmit = function (event) {
    event.preventDefault();
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;
    let autenticado = false; // Flag para controlar o status de autenticação

    for (const login of logins) {
        console.log(senha, email, login.email, login.senha); // Apenas para debug (remover em produção)
        if (login.email === email && login.senha === senha) {
            alert("Bem-vindo");
            autenticado = true;
            window.location.href = '/dashboard.html'; // Redireciona após login
            return; // Sai da função imediatamente após login bem-sucedido
        }
    }

    if (!autenticado) {
        alert('Usuário ou senha inválidas');
    }
};
