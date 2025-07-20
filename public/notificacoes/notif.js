const unReadMessagesCount = document.getElementById('num-of-notif');
const markAll = document.getElementById('mark-as-read');
const mainElement = document.querySelector('main');

// Função para converter timestamps em tempo relativo
function getRelativeTime(createdAt) {
    const now = Date.now();
    const diff = now - createdAt;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return 'agora mesmo';
}

// Criação do card de notificação
function createNotificationCard(notification) {
    return `
        <div class="notificationCard ${notification.unread ? 'unread' : ''}">
            <img src="${notification.photo}" alt="photo">
            <div class="description">
                <p>${notification.text}</p>
                <p class="notif-time">${getRelativeTime(notification.createdAt)}</p>
            </div>
        </div>
    `;
}

// Atualiza a contagem de notificações não lidas
function updateUnreadCount() {
    const unReadMessagesCurrent = document.querySelectorAll('.unread');
    unReadMessagesCount.innerText = unReadMessagesCurrent.length;
}

// Adiciona eventos de click para marcar como lidas
function addCardEventListeners() {
    const unReadMessages = document.querySelectorAll('.unread');

    unReadMessages.forEach((message) => {
        message.addEventListener('click', () => {
            message.classList.remove('unread');
            updateUnreadCount();
        });
    });

    markAll.addEventListener('click', () => {
        const unreadCurrent = document.querySelectorAll('.unread');
        unreadCurrent.forEach(msg => msg.classList.remove('unread'));
        updateUnreadCount();
    });
}

//  Busca as notificações do backend
fetch('/api/notificacoes')
    .then(response => response.json())
    .then(notifications => {
        mainElement.innerHTML = '';

        // Limita a 5 notificações
        const toDisplay = notifications.slice(0, 5);
        let html = '';
        toDisplay.forEach(notification => {
            html += createNotificationCard(notification);
        });

        mainElement.innerHTML = html;

        // Atualiza contagem e eventos
        updateUnreadCount();
        addCardEventListeners();
    })
    .catch(err => console.error('Erro ao buscar notificações:', err));
