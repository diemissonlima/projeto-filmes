let filmes = []; // variável global para armazenar os filmes

// chama a função para buscar os dados assim que a página carrega
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
        filmesLista = data['dados']; // armazena os filmes na variável global
        filmes = filmesLista; // armazena os filmes na variável global para uso no filtro
        mostrarFilmes(filmesLista); // chama a função para exibir os filmes na página
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

// função para exibir os dados na página
function mostrarFilmes(filmesLista) {
    const listaFilmes = document.getElementById('listaFilmes');
    listaFilmes.innerHTML = ''; // limpa a lista antes de adicionar novos filmes

    filmesLista.forEach(filme => {
        // cria o cartão para cada filme
        const card = document.createElement('div');
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mt-3', 'mb-3', 'px-2');
        
        card.innerHTML = `
                <div class="card">
                    <a href="detalhesFilme.html?id=${filme.id}">
                        <img src="http://localhost/api/public/uploads/${filme.capa}" alt="${filme.titulo}" class="card-img-top" >
                    </a>
                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center"><strong>${filme.titulo}</strong></h5>
                    </div>
                </div>
                `;

        // adiciona o cartão à lista de filmes
        listaFilmes.appendChild(card);
    });
};

function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

// função para filtrar os filmes
function filtrarFilmes() {
    const nomeFiltro = removerAcentos(document.getElementById('filtroNome').value.toLowerCase());
    const generoFiltro = document.getElementById('filtroGenero').value;

    const filmesFiltrados = filmes.filter(filme => {
        const nomeMatch = removerAcentos(filme.titulo.toLowerCase()).includes(nomeFiltro);
        const generoMatch = generoFiltro ? filme.generos.includes(generoFiltro) : true;

        console.log(filmes);

        return nomeMatch && generoMatch;
    });

    mostrarFilmes(filmesFiltrados); // atualiza a exibição dos filmes
}

async function buscarGeneros() {
    try {
        const response = await fetch('http://localhost/api/routes/generos/listar.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        generosLista = data['dados']; // armazena os filmes na variável global
        listarGeneros(generosLista);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

function listarGeneros(generos) {
    const tabela = document.getElementById("filtroGenero");
    tabela.innerHTML = ""; // limpa a tabela antes de adicionar os novos filmes

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // deixe o valor vazio para indicar "todos"
    defaultOption.textContent = "Filtrar por gênero...";
    defaultOption.selected = true; // define como selecionado
    tabela.appendChild(defaultOption); // adiciona a opção padrão

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.nome; // atribui o ID do gênero como valor
        option.textContent = genero.nome; // atribui o nome do gênero como texto
        tabela.appendChild(option); // adiciona a opção à tabela                
    });
};

buscarDados(); // chama a função para buscar os dados ao carregar a página
buscarGeneros(); // chama a função para buscar os gêneros ao carregar a página
