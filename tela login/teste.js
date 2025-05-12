export const login = [
  {
    email: 'larissa.academico@ifpb.edu.br',
    senha: 'atividade',
  },
  {
    email: 'jamylli.academico@ifpb.edu.br',
    senha: 'aula',
  },
  {
    email: 'lara.academico@ifpb.edu.br',
    senha: 'ifpb',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede envio padrão do formulário

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    const usuarioValido = login.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioValido) {
      // Redireciona para outra página
      window.location.href = "tela_inicial.html";
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });
});
