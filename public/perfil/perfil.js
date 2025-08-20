document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('.profile-info form');
    const userId = localStorage.getItem('userId'); // Supondo que o ID do usuário esteja salvo

    // Buscar dados do perfil no backend
    if (userId) {
        try {
            const response = await fetch(`/api/perfil/${userId}`);
            if (response.ok) {
                const dados = await response.json();
                document.getElementById('username').value = dados.Nome || '';
                document.getElementById('email').value = dados.Email || '';
                document.getElementById('password').value = dados.Senha || '';
                document.getElementById('institution').value = dados.Instituicao || '';
            } else {
                alert('Não foi possível carregar o perfil.');
            }
        } catch (error) {
            alert('Erro ao buscar perfil.');
        }
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const dadosPerfil = {
            Nome: document.getElementById('username').value,
            Email: document.getElementById('email').value,
            Senha: document.getElementById('password').value,
            Instituicao: document.getElementById('institution').value,
        };

        // Atualizar perfil no backend
        try {
            const response = await fetch(`/api/perfil/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosPerfil),
            });
            if (response.ok) {
                alert('Perfil salvo com sucesso!');
            } else {
                alert('Erro ao salvar perfil.');
            }
        } catch (error) {
            alert('Erro ao atualizar perfil.');
        }
    });
});