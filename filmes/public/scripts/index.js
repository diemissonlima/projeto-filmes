let filmes = []; // Variável global para armazenar os filmes

// Chama a função para buscar os dados assim que a página carrega
async function buscarDados() {
    try {
        const response = await fetch('http://localhost/api/routes/filmes/listar.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        filmesLista = data['dados']; // Armazena os filmes na variável global
        mostrarFilmes(filmesLista); // Chama a função para exibir os filmes na página
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

// Função para exibir os dados na página
function mostrarFilmes(filmesLista) {
    const listaFilmes = document.getElementById('listaFilmes');
    listaFilmes.innerHTML = ''; // Limpa a lista antes de adicionar novos filmes

    filmesLista.forEach(filme => {
        // Cria o cartão para cada filme
        const card = document.createElement('div');
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mt-3', 'mb-3', 'px-2');
        
        card.innerHTML = `
                <div class="card">
                    <a href="detalhesFilme.html?id=${filme.id}">
                        <img src="http://localhost/api/public/uploads/${filme.capa}" alt="${filme.titulo}" class="card-img-top" >
                    </a>
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${filme.titulo}</h5>
                    </div>
                </div>
                `;

        // Adiciona o cartão à lista de filmes
        listaFilmes.appendChild(card);
    });
};

// Função para filtrar os filmes
function filtrarFilmes() {
    const nomeFiltro = document.getElementById('filtroNome').value.toLowerCase();
    const generoFiltro = document.getElementById('filtroGenero').value;

    const filmesFiltrados = filmes.filter(filme => {
        const nomeMatch = filme.titulo.toLowerCase().includes(nomeFiltro);
        const generoMatch = generoFiltro ? filme.genero === generoFiltro : true;

        return nomeMatch && generoMatch;
    });

    mostrarFilmes(filmesFiltrados); // Atualiza a exibição dos filmes
}

// Chama a função para buscar os dados ao carregar a página
buscarDados();
