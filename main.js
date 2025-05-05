import { login } from './pag1.js';

const form = document.querySelector('#investment-form');

form.onsubmit = function (event) {
  event.preventDefault();
  const senha = document.getElementById('senha').value
  const email = document.getElementById('email').value

  for (const user of users) {
    if (user.email === email && user.senha === senha) {
        location.href = "html3"
    } else {
        alert('Usuário ou senha inválidas');
    }
}

}
