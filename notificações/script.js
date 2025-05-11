const unReadMessagesCount = document.getElementById('num-of-notif');
const markAll = document.getElementById('mark-as-read');
const mainElement = document.querySelector('main');

const notifications = [
    { 
        text: "Hi Guys, I'm John", 
        photo: "person.jpeg",
        createdAt: Date.now() - 1000 * 60, // 1 minuto atrás
        unread: true 
    }, 
    { 
        text: "Hi Guys, I'm Lara", 
        photo: "person.jpeg",
        createdAt: Date.now() - 1000 * 60 * 5, // 5 minutos atrás
        unread: true 
    }, 
    { 
        text: "Hi Guys, I'm Josiel", 
        photo: "person.jpeg",
        createdAt: Date.now() - 1000 * 60 * 30, // 30 minutos atrás
        unread: true 
    }, 
    { 
        text: "Hi Guys, I'm Rafa", 
        photo: "person.jpeg",
        createdAt: Date.now() - 1000 * 60 * 60, // 1 hora atrás
        unread: false 
    },
    {
        text: "Hi Guys, I'm Ana",
        photo: "person.jpeg",
        createdAt: Date.now() - 1000 * 60 * 2, // 2 minutos atrás
        unread: true
    }
];

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

// Clear container first to avoid duplicates
mainElement.innerHTML = '';

// Limit the notifications to 5 and create HTML
const toDisplay = notifications.slice(0, 5);
let html = '';
toDisplay.forEach(notification => {
    html += createNotificationCard(notification);
});
mainElement.innerHTML = html;

// Select unread messages AFTER creating them
const unReadMessages = document.querySelectorAll('.unread');

// Update unread count
function updateUnreadCount() {
    const unReadMessagesCurrent = document.querySelectorAll('.unread');
    unReadMessagesCount.innerText = unReadMessagesCurrent.length;
}

// Add click listeners to unread notifications to mark them read
unReadMessages.forEach((message) => {
    message.addEventListener('click', () => {
        message.classList.remove('unread');
        updateUnreadCount();
    });
});

// Mark all as read button event
markAll.addEventListener('click', () => {
    const unreadCurrent = document.querySelectorAll('.unread');
    unreadCurrent.forEach(msg => msg.classList.remove('unread'));
    updateUnreadCount();
});

// Initialize unread count
updateUnreadCount();
