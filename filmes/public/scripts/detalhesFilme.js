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
    genero.innerHTML = `<strong>Genero:</strong> ${filme.genero}`;
    dataLancamento.innerHTML = `<strong>Data Lançamento:</strong> ${filme.data_lancamento}`;
    duracao.innerHTML = `<strong>Duração:</strong> ${filme.duracao} minutos`;
    sinopse.innerHTML = `<strong>Sinopse:</strong> ${filme.sinopse}`;
    trailerLink.href = filme.trailer_url;
};
