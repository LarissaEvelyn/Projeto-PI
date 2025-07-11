// login.js

export const login = [
  {
    email: 'hysia.milena@academico.ifpb.edu.br',
    senha: 'escola'
  },
  {
    email: 'larissa.evelyn@academico.ifpb.edu.br',
    senha: 'atividade'
  },
  {
    email: 'lara.ramalho@academico.ifpb.edu.br',
    senha: 'ifpb'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('email').value.trim();
    const senhaInput = document.getElementById('password').value;

    const usuarioEncontrado = login.find(
      user => user.email === emailInput && user.senha === senhaInput
    );

    if (usuarioEncontrado) {
      alert('Login bem-sucedido!');
      // Salva no sessionStorage (opcional)
      sessionStorage.setItem('usuarioLogado', emailInput);
      // Redireciona para tela inicial
      window.location.href = '../pag_inicial/tela_inicial.html';
    } else {
      alert('E-mail ou senha incorretos!');
    }
  });
});
