function mostrarFormulario() {
    const form = document.getElementById("formularioPostagem");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function adicionarPostagem() {
    const texto = document.getElementById("novaPostagemTexto").value.trim();
    if (!texto) return;

    const postContainer = document.querySelector(".post-container");
    
    const postHTML = `
        <div class="post">
            <div>
                <span class="username">
                    <i class="bi bi-person-circle"></i>
                    @voce
                </span>
                <span class="timestamp">agora mesmo</span>
            </div>
            <div class="post-content">${texto}</div>
            <div class="actions">
                <button class="curtir" onclick="toggleCurtir(this)">
                    <i class="bi bi-heart" ></i>
                </button>
                <button class="commentar">
                    <i class="bi bi-chat-square-text"></i>
                </button>
            </div>
        </div>
    `;

    postContainer.insertAdjacentHTML("afterbegin", postHTML);
    document.getElementById("novaPostagemTexto").value = "";
    document.getElementById("formularioPostagem").style.display = "none";
}

function toggleCurtir(botao) {
    const icone = botao.querySelector('i');
    botao.classList.toggle('curtido'); // Adiciona/remove classe
    
    // Alterna entre ícone cheio e vazio
    if (botao.classList.contains('curtido')) {
        icone.classList.replace('bi-heart', 'bi-heart-fill'); // Ícone cheio
    } else {
        icone.classList.replace('bi-heart-fill', 'bi-heart'); // Ícone vazio
    }
}