// Funções de API

// Buscar todos os posts
async function fetchPosts() {
  const res = await fetch('/postagens');
  if (!res.ok) throw new Error('Erro ao carregar posts');
  return await res.json();
}

// Criar novo post
async function createPost(content) {
  const res = await fetch('/postagens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ autor: '@voce', conteudo: content })
  });
  if (!res.ok) throw new Error('Erro ao criar post');
  return await res.json();
}

// Atualizar post
async function updatePost(id, content) {
  const res = await fetch(`/postagens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ autor: '@voce', conteudo: content })
  });
  if (!res.ok) throw new Error('Erro ao atualizar post');
  return await res.json();
}

// Deletar post
async function deletePost(id) {
  const res = await fetch(`/postagens/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar post');
}

// Dar like
async function likePost(id, codEstudante) {
  const res = await fetch(`/postagens/${id}/like`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codEstudante })
  });
  if (!res.ok) throw new Error('Erro ao curtir post');
  return await res.json();
}

// Remover like
async function unlikePost(id, codEstudante) {
  const res = await fetch(`/postagens/${id}/like`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codEstudante })
  });
  if (!res.ok) throw new Error('Erro ao remover like');
  return await res.json();
}

// Buscar total de likes
async function fetchLikes(id) {
  const res = await fetch(`/postagens/${id}/likes`);
  if (!res.ok) throw new Error('Erro ao buscar likes');
  return await res.json();
}

// Funções de UI

function mostrarFormulario() {
  const form = document.getElementById("formularioPostagem");
  form.style.display = form.style.display === "none" ? "block" : "none";
  if (form.style.display === "block") {
    document.getElementById("novaPostagemTexto").focus();
  }
}

async function adicionarPostagem(event) {
  event.preventDefault();
  const textarea = document.getElementById("novaPostagemTexto");
  const texto = textarea.value.trim();

  if (!texto) {
    alert("Por favor, escreva algo antes de publicar!");
    return;
  }

  try {
    const newPost = await createPost(texto);
    renderPost(newPost, true);
    textarea.value = "";
    mostrarFormulario();
  } catch (e) {
    alert("Erro ao criar postagem!");
    console.error(e);
  }
}

async function renderPost(post, prepend = false) {
  const container = document.querySelector(".post-container");

  // Buscar likes do banco
  const likesData = await fetchLikes(post.id);

  const postHTML = `
    <div class="post" data-id="${post.id}">
      <div>
        <span class="username">
          <i class="bi bi-person-circle"></i>
          ${post.autor}
        </span>
        <span class="timestamp">${formatTime(post.time)}</span>
      </div>
      <div class="post-content">${post.conteudo}</div>
      <div class="actions">
        <div class="like-group">
          <button class="curtir" onclick="toggleCurtir(this, ${post.id})">
            <i class="bi bi-heart"></i>
          </button>
          <span class="likes-count">${likesData.likes} curtida(s)</span>
        </div>
        <button class="commentar">
          <i class="bi bi-chat-square-text"></i>
        </button>
      </div>
    </div>
  `;

  if (prepend) {
    container.insertAdjacentHTML("afterbegin", postHTML);
  } else {
    container.insertAdjacentHTML("beforeend", postHTML);
  }
}

function formatTime(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = now - postDate;

  if (diff < 60000) return 'agora mesmo';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
  return postDate.toLocaleDateString();
}

// Função que marca os corações já curtidos ao carregar a página
async function carregarCurtidas() {
  const codEstudante = 1; // substitua pelo usuário logado

  try {
    const postsCurtidos = await getPostsCurtidos(codEstudante); // array de IDs

    postsCurtidos.forEach(postId => {
      const button = document.querySelector(`.like-button[data-post-id="${postId}"]`);
      if (button) {
        const icon = button.querySelector('i');
        icon.classList.add('bi-heart-fill');  // adiciona coração cheio
        icon.classList.remove('bi-heart');    // remove coração vazio
      }
    });
  } catch (e) {
    console.error('Erro ao carregar curtidas:', e);
  }
}

// Função já existente para alternar coração ao clicar
async function toggleCurtir(button, postId) {
  const icon = button.querySelector('i');
  const isLiked = icon.classList.contains('bi-heart-fill');

  try {
    const codEstudante = 1;

    let data;
    if (isLiked) {
      data = await unlikePost(postId, codEstudante);
      icon.className = 'bi bi-heart';
    } else {
      data = await likePost(postId, codEstudante);
      icon.className = 'bi bi-heart-fill';
    }

    // Atualiza contador
    let likesCounter = button.parentElement.querySelector('.likes-count');
    likesCounter.textContent = `${data.likes} curtida(s)`;

  } catch (e) {
    console.error("Erro ao curtir:", e);
  }
}

// Chama ao carregar a página
window.addEventListener('DOMContentLoaded', carregarCurtidas);


// Inicialização

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector(".post-container");
  container.innerHTML = '';

  try {
    const posts = await fetchPosts();
    for (const post of posts) {
      await renderPost(post);
    }
  } catch (e) {
    console.error("Erro ao carregar posts:", e);
  }

  document.getElementById("formularioPostagem").addEventListener("submit", adicionarPostagem);
});