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
