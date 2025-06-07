function scrollCategories(direction) {
  const container = document.getElementById("categoriesContainer");
  const scrollAmount = 300; // Ajuste este valor conforme necessário
  
  container.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });
}

// Gerenciador de Posts
class PostManager {
  constructor() {
    this.storageKey = 'searchAcademyPosts';
    this.maxPreviewPosts = 3;
    this.initPosts();
  }

  initPosts() {
    if (!localStorage.getItem(this.storageKey)) {
      const defaultPost = {
        id: Date.now(),
        author: '@SearchAcademy',
        content: 'Seja Bem-Vindo(a) ao Feed!! 😁',
        time: this.formatTime(new Date()),
        likes: 0
      };
      localStorage.setItem(this.storageKey, JSON.stringify([defaultPost]));
    }
  }

  getPosts() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }

  getRecentPosts(count = this.maxPreviewPosts) {
    return this.getPosts().slice(0, count);
  }

  addPost(newPost) {
    const posts = this.getPosts();
    const post = {
      id: Date.now(),
      ...newPost,
      time: this.formatTime(new Date()),
      likes: 0
    };
    posts.unshift(post);
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
    this.dispatchUpdateEvent();
    return post;
  }

  formatTime(date) {
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'agora mesmo';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    return date.toLocaleDateString();
  }

  dispatchUpdateEvent() {
    window.dispatchEvent(new CustomEvent('postsUpdated'));
  }
}

// Renderizador do Feed
class FeedRenderer {
  constructor(containerId, postManager) {
    this.container = document.getElementById(containerId);
    this.postManager = postManager;
    this.setupEventListeners();
    this.renderPosts();
  }

  renderPosts() {
    const posts = this.postManager.getRecentPosts();

    if (posts.length === 0) {
      this.container.innerHTML = `
        <div class="post-preview empty-state">
          <i class="bi bi-chat-square-text"></i>
          <p>Nenhuma postagem ainda. Seja o primeiro!</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = posts.map(post => `
      <div class="post-preview" data-id="${post.id}">
        <div class="post-header">
          <i class="bi bi-person-circle"></i>
          <span class="post-author">${post.author}</span>
          <span class="post-time">${post.time}</span>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-stats">
          <span class="likes-count">${post.likes} curtida${post.likes !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `).join('');
  }

  highlightNewPost(postId) {
    const postElement = this.container.querySelector(`[data-id="${postId}"]`);
    if (postElement) {
      postElement.classList.add('new-post');
      setTimeout(() => postElement.classList.remove('new-post'), 1500);
    }
  }

  setupEventListeners() {
    window.addEventListener('postsUpdated', () => {
      this.renderPosts();
      // Destaca o último post adicionado
      const posts = this.postManager.getRecentPosts(1);
      if (posts.length > 0) {
        this.highlightNewPost(posts[0].id);
      }
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.post-preview')) {
        window.location.href = '../feed/feed.html';
      }
    });

    // Atualiza quando o storage é modificado em outras abas
    window.addEventListener('storage', (e) => {
      if (e.key === this.postManager.storageKey) {
        this.renderPosts();
      }
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const postManager = new PostManager();
  new FeedRenderer('recentPostsContainer', postManager);
});