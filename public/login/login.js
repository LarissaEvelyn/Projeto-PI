// login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const senhaInput = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, senha: senhaInput })
      });

      const data = await response.json();

      if (response.ok && data.sucesso) {
        alert('Login bem-sucedido!');
        sessionStorage.setItem('usuarioLogado', emailInput);
        window.location.href = '../tela_inicial/tela_inicial.html';
      } else {
        alert(data.mensagem || 'E-mail ou senha incorretos!');
      }
    } catch (error) {
      alert('Erro ao tentar logar. Tente novamente mais tarde.');
    }
  });
});