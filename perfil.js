export const perfil = [
    {
        name: 'Hysia Milena',
        email: 'hysia.milena@academico.ifpb.edu.br',
        passwd: 'escola',
        institution: 'ifpb',
        resume: './Hysia.pdf',
    },
    {
        name: 'Larissa Evelyn',
        email: 'larissa.evelyn@academico.ifpb.edu.br',
        passwd: 'atividade',
        institution: 'ifpb',
        resume: './Larisa.pdf',
    },
    {
        name: 'Lara Ramalho',
        email: 'lara.ramalho@academico.ifpb.edu.br',
        passwd: 'ifpb',
        institution: 'ifpb',
        resume: './Lara.pdf',
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.profile-info form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dadosPerfil = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            institution: document.getElementById('institution').value,
        };
        
        perfil.push(dadosPerfil);
        
        alert('Perfil salvo com sucesso!');
        console.log('Dados salvos:', perfil);
    });
});