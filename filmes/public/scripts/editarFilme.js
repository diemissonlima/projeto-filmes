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
    const id = document.getElementById('id');
    const titulo = document.getElementById('titulo');
    const genero = document.getElementById('genero');
    const dataLancamento = document.getElementById('dataLancamento');
    const duracao = document.getElementById('duracao');
    const sinopse = document.getElementById('sinopse');
    const trailerLink = document.getElementById('trailerURL');

    id.value = filme.id;
    titulo.value = filme.titulo;
    genero.value = filme.genero;
    dataLancamento.value = filme.data_lancamento;
    duracao.value = filme.duracao;
    sinopse.value = filme.sinopse;
    trailerLink.value = filme.trailer_url;
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editarFilmForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const id = document.getElementById("id").value; // Obtém o ID do filme
        const capa = document.getElementById("capa").files[0]; // Obtém o arquivo da capa
        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const dataLancamento = document.getElementById("dataLancamento").value;
        const duracao = document.getElementById("duracao").value;
        const sinopse = document.getElementById("sinopse").value;
        const trailerURL = document.getElementById("trailerURL").value;

        const formData = new FormData();
        formData.append("id", id); // Adiciona o ID do filme ao FormData
        formData.append("capa", capa); // Adiciona o arquivo da capa ao FormData
        formData.append("titulo", titulo);
        formData.append("genero", genero);
        formData.append("data_lancamento", dataLancamento);
        formData.append("duracao", duracao);
        formData.append("sinopse", sinopse);
        formData.append("trailer_url", trailerURL);

        try {
            const response = await fetch("http://localhost/api/routes/filmes/editar.php", {
                method: "POST", // Método POST para enviar os dados
                body: formData, // Enviando os dados do FormData
            });

            if (response.ok) {
                alert("Filme atualizado com sucesso!");
                window.location.href = "listaFilmes.html"; // Redireciona para a lista de filmes
            } else {
                alert("Erro ao atualizar filme. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao atualizar filme:", error);
            alert("Erro ao atualizar filme. Tente novamente.");
        };
    });
});
