// cadastro.js
document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const instituicao = document.getElementById('instituicao').value.trim();

    if (!email || !password || !telefone || !instituicao) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    await fetch(`/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha:password, instituicao, telefone })
            });

    alert('Cadastro realizado com sucesso!');
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    // Verifica se o usuário já está cadastrado
    const response = await fetch('/verificar-cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.cadastrado) {
      alert('Usuário já cadastrado! Redirecionando para login...');
      window.location.href = '/login/login.html'; // ajuste o caminho se necessário
    } else {
      // Aqui você pode prosseguir com o cadastro normalmente
      // Por exemplo, enviar os outros dados para a rota de cadastro
      form.submit(); // ou chame sua função de cadastro
    }
  });
});