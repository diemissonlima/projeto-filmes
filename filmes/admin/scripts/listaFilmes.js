let filmes = []; // variável global para armazenar os filmes

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
        filmes = data['dados']; // armazena os filmes na variável global
        mostrarFilmes(data['dados']);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

// função para exibir os filmes na tabela
function mostrarFilmes(filmes) {
    const tabela = document.querySelector('tbody');
    tabela.innerHTML = ''; // limpa a tabela antes de adicionar os filmes

    filmes.forEach(filme => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="http://localhost/api/public/uploads/${filme.capa}" alt="${filme.titulo}" style="width: 50px; height: 50px;">
            </td>
            <td>${filme.titulo}</td>
            <td>${formatarGenero(filme.generos)}</td>
            <td>
                <a href="${filme.trailer_url}" target="_blank" class="btn btn-primary btn-sm">Assistir</a>
            </td>
            <td>${converterData(filme.data_lancamento)}</td>
            <td>${filme.duracao} minutos</td>
            <td>
                <a href="editarFilme.html?id=${filme.id}" class="btn btn-warning btn-sm"><strong>Editar</strong></a>
                <a href="listaFilmes.html" class="btn btn-danger btn-sm" onclick="excluirFilme(${filme.id})"><strong>Excluir</strong></a>
            </td>`;
        tabela.appendChild(tr);
    });
};

function formatarGenero(generosLista) {
    let generoFormatado = generosLista[0];

    if (generosLista.length === 2) {
        generoFormatado = `${generosLista[0] + `/` + generosLista[1]}`;
    } 
    if (generosLista.length === 3) {
        generoFormatado = `${generosLista[0] + `/` + generosLista[1] + `/` + generosLista[2]}`;
    }
    return generoFormatado;
};

async function excluirFilme(id) {
    if (!confirm("Tem certeza que deseja excluir?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost/api/routes/filmes/excluir.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert("Erro ao excluir o filme: " + data.error);
        }
    } catch (error) {
        console.error('Erro ao excluir o filme:', error);
        alert("Erro ao excluir o filme.");
    }
}

// remove acentos da string para permitir um filtro que desconsidere o uso de acentos
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

function converterData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`; // formato desejado: dd/mm/yyyy
}

buscarDados(); // chama a função para buscar os dados ao carregar a página
buscarGeneros(); // chama a função para buscar os gêneros ao carregar a página
