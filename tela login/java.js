// main.js - Arquivo principal da aplicação
import { users } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');

    // Função para exibir mensagens de erro
    function showError(message) {
        // Remove erros anteriores
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Cria elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.marginTop = '10px';
        errorElement.style.fontSize = '14px';
        errorElement.textContent = message;

        // Insere após o botão
        loginForm.appendChild(errorElement);
    }

    // Função para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Função para validar senha
    function isValidPassword(password) {
        return password.length >= 6;
    }

    // Função para redirecionar com base no perfil
    function redirectUser(role) {
        switch(role) {
            case 'admin':
                window.location.href = '/admin/dashboard.html';
                break;
            case 'student':
                window.location.href = '/aluno/area.html';
                break;
            default:
                window.location.href = '/';
        }
    }

    // Evento de submit do formulário
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obter valores
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validações básicas
        if (!email || !password) {
            showError('Por favor, preencha todos os campos.');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Por favor, insira um e-mail válido.');
            return;
        }

        if (!isValidPassword(password)) {
            showError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Simular delay de rede
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Autenticando...';

        // Simular requisição assíncrona
        setTimeout(() => {
            // Verificar credenciais
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Em produção, usar JWT ou sessão segura
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }));
                
                redirectUser(user.role);
            } else {
                showError('E-mail ou senha incorretos. Tente novamente.');
                passwordInput.value = '';
                passwordInput.focus();
            }

            submitButton.disabled = false;
            submitButton.textContent = 'Entrar';
        }, 1500); // Simula 1.5s de delay de rede
    });

    // Feedback visual para campos
    emailInput.addEventListener('input', () => {
        if (!isValidEmail(emailInput.value.trim())) {
            emailInput.style.borderColor = '#e74c3c';
        } else {
            emailInput.style.borderColor = '#e0e0e0';
        }
    });

    passwordInput.addEventListener('input', () => {
        if (!isValidPassword(passwordInput.value)) {
            passwordInput.style.borderColor = '#e74c3c';
        } else {
            passwordInput.style.borderColor = '#e0e0e0';
        }
    });
});
