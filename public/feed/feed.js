// Gerenciador de posts
const PostManager = {
    storageKey: 'searchAcademyPosts',

    init() {
        if (!this.getPosts().length) {
            this.addPost({
                author: '@SearchAcademy',
                content: 'Seja Bem-Vindo(a) ao Feed!! 😁'
            });
        }
    },

    getPosts() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch (e) {
            console.error("Erro ao ler posts:", e);
            return [];
        }
    },

    addPost(postData) {
        const posts = this.getPosts();
        const newPost = {
            id: Date.now(),
            author: postData.author || '@voce',
            content: postData.content,
            time: this.getCurrentTime(),
            likes: 0,
            liked: false
        };

        posts.unshift(newPost);
        this.savePosts(posts);
        return newPost;
    },

    savePosts(posts) {
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
    },

    toggleLike(postId) {
        const posts = this.getPosts();
        const post = posts.find(p => p.id === postId);

        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.savePosts(posts);
            return post;
        }
        return null;
    },

    getCurrentTime() {
        const now = new Date();
        const diff = new Date() - now;

        if (diff < 60000) return 'agora mesmo';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
        return now.toLocaleDateString();
    }
};

// Inicializa o PostManager
PostManager.init();

// Funções de UI
function mostrarFormulario() {
    const form = document.getElementById("formularioPostagem");
    form.style.display = form.style.display === "none" ? "block" : "none";
    if (form.style.display === "block") {
        document.getElementById("novaPostagemTexto").focus();
    }
}

function adicionarPostagem(event) {
    event.preventDefault();
    const textarea = document.getElementById("novaPostagemTexto");
    const texto = textarea.value.trim();

    if (!texto) {
        alert("Por favor, escreva algo antes de publicar!");
        return;
    }

    const newPost = PostManager.addPost({ content: texto });
    renderPost(newPost);

    textarea.value = "";
    mostrarFormulario();
    window.dispatchEvent(new Event('postsUpdated'));
}

function renderPost(post) {
    const container = document.querySelector(".post-container");

    const postHTML = `
        <div class="post" data-id="${post.id}">
            <div>
                <span class="username">
                    <i class="bi bi-person-circle"></i>
                    ${post.author}
                </span>
                <span class="timestamp">${post.time}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="actions">
                <button class="curtir" onclick="toggleCurtir(this, ${post.id})">
                    <i class="bi ${post.liked ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
                <button class="commentar">
                    <i class="bi bi-chat-square-text"></i>
                </button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML("afterbegin", postHTML);
}

function toggleCurtir(button, postId) {
    const updatedPost = PostManager.toggleLike(postId);
    if (updatedPost) {
        const icon = button.querySelector('i');
        icon.className = `bi ${updatedPost.liked ? 'bi-heart-fill' : 'bi-heart'}`;

        // Atualiza contador de likes (se existir)
        const likesCounter = button.closest('.post').querySelector('.likes-count');
        if (likesCounter) {
            likesCounter.textContent = `${updatedPost.likes} curtida${updatedPost.likes !== 1 ? 's' : ''}`;
        }
    }
}

// Carrega posts ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    const posts = PostManager.getPosts();
    const container = document.querySelector(".post-container");

    // Limpa o post estático de boas-vindas
    container.innerHTML = '';

    // Renderiza todos os posts
    posts.forEach(post => renderPost(post));

    // Configura o formulário
    document.getElementById("formularioPostagem").addEventListener("submit", adicionarPostagem);
});

// Atualiza quando posts são modificados em outras abas
window.addEventListener('storage', (e) => {
    if (e.key === PostManager.storageKey) {
        const container = document.querySelector(".post-container");
        container.innerHTML = '';
        PostManager.getPosts().forEach(post => renderPost(post));
    }
});