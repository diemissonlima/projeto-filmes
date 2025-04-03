document.addEventListener("DOMContentLoaded", () => {
    // Obter ID do filme a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get('id');

    if (!filmeId) {
        alert("ID do filme não encontrado na URL.");
        return;
    }

    // URL da API
    const API_URL = `http://localhost/api/routes/filmes/listar.php?id=${filmeId}`;

    buscarDetalhesFilme(API_URL);
});

async function buscarDetalhesFilme(url_api) {
    try {
        const response = await fetch(url_api, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        mostrarDetalhesFilme(data['dados'][0]);

    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
    }
};

function mostrarDetalhesFilme(filme) { 
    const img = document.getElementById('capa');
    const titulo = document.getElementById('titulo');
    const genero = document.getElementById('genero');
    const dataLancamento = document.getElementById('dataLancamento');
    const duracao = document.getElementById('duracao');
    const sinopse = document.getElementById('sinopse');
    const trailerLink = document.getElementById('trailerURL');

    img.src = `http://localhost/api/public/uploads/${filme.capa}`;
    img.style.width = "500px";
    img.style.height = "600px";
    titulo.innerHTML = filme.titulo;
    genero.innerHTML = `<strong>Genero:</strong> ${filme.generos[0]}`;
    if (filme.generos.length === 2) {
        genero.innerHTML = `<strong>Genero:</strong> ${filme.generos[0] + `/` + filme.generos[1]}`;
    } 
    if (filme.generos.length === 3) {
        genero.innerHTML = `<strong>Genero:</strong> ${filme.generos[0] + `/` + filme.generos[1] + `/` + filme.generos[2]}`;
    }
    dataLancamento.innerHTML = `<strong>Data Lançamento:</strong> ${converterData(filme.data_lancamento)}`;
    duracao.innerHTML = `<strong>Duração:</strong> ${filme.duracao} minutos`;
    sinopse.innerHTML = `<strong>Sinopse:</strong> ${filme.sinopse}`;
    trailerLink.href = filme.trailer_url;
};

function converterData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`; // formato desejado: dd/mm/yyyy
}
