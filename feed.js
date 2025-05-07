function mostrarFormulario() {
    const form = document.getElementById("formularioPostagem");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function adicionarPostagem() {
    //Pega conteúdo da caixa de testo e tira espaços desnecessários
    const texto = document.getElementById("novaPostagemTexto").value.trim();
    if (!texto) return; //Esta linha vê se a mensagem esta vazia, similar aom (texto == "")

    const feed = document.querySelector(".feed"); //div onde estão as postagens

    const postHTML = `
        <div class="post">
            <div>
                <span class="username">@voce</span>
                <span class="timestamp">agora mesmo</span>
            </div>
            <div class="post-content">${texto}</div>
            <div class="actions">
                <button>Curtir</button>
                <button>Comentar</button>
            </div>
        </div>
    `;

    // Adiciona no topo
    feed.innerHTML += postHTML; 
    // Limpa o campo
    document.getElementById("novaPostagemTexto").value = ""; 
    // Esconde o Display
    document.getElementById("formularioPostagem").style.display = "none"; 
}
