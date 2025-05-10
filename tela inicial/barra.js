const data = [ 
    { 
                title: "Voluntariado em Educação", 
                description: "Programa de voluntariado para auxiliar em projetos educacionais em comunidades carentes.", 
                category: "voluntariado",
                link: "#"
            },
            { 
                title: "Olimpíada de Matemática", 
                description: "Competição anual de matemática para estudantes do ensino médio.", 
                category: "olimpiadas",
                link: "#"
            },
            { 
                title: "Projeto de Extensão em Tecnologia", 
                description: "Levar conhecimento tecnológico para escolas públicas da região.", 
                category: "extensao",
                link: "#"
            },
            { 
                title: "Pesquisa em Inteligência Artificial", 
                description: "Grupo de pesquisa focado em aplicações de IA na educação.", 
                category: "pesquisa",
                link: "#"
            },
            { 
                title: "Workshop de Carreiras", 
                description: "Evento anual que reúne profissionais de diversas áreas para orientação vocacional.", 
                category: "eventos",
                link: "#"
            },
            { 
                title: "Estágio em Pesquisa Científica", 
                description: "Oportunidade para estudantes participarem de projetos de pesquisa acadêmica.", 
                category: "estagios",
                link: "#"
            }
        ];

const cardContainer=document.querySelector(".card-container")
const searchInput=document.querySelector("#searchInput");

const displayData= data => {
    cardContainer.innerHTML = "";
    data.forEach(e => {
        cardContainer.innerHTML +=`
        <div class= "card">
            <h3>${e.title}</h3>
            <p>${e.description}</>p
        </div>
        `
        
    })
}  
searchInput.addEventListener("keyup", (e) => {
    const seach =data.filter(i => i.title.toLocaleLowerCase().includes(e.target.valeu.toLocaleLowerCase()))
    divsplayData(seach);
})

window.addEventListener("load",displayData.bind(null,data))