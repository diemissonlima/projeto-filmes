document.addEventListener("DOMContentLoaded", () => {
    // Obter ID do filme a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const generoId = urlParams.get('id');

    if (!generoId) {
        alert("ID do genero não encontrado na URL.");
        return;
    }

    // URL da API
    const API_URL = `http://localhost/api/routes/generos/listar.php?id=${generoId}`;
    buscarDetalhesGenero(API_URL);

});

async function buscarDetalhesGenero(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        mostrarDadosGenero(data['dados'][0]);

    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
    }
};

function mostrarDadosGenero(dadosGenero) {
    const id = document.getElementById("id");
    const nome = document.getElementById("nome");
    const descricao = document.getElementById("descricao");

    id.value = dadosGenero.id;
    nome.value = dadosGenero.nome;
    descricao.value = dadosGenero.descricao;

};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editarGeneroForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const id = document.getElementById("id").value; // Obtém o ID do genero
        const nome = document.getElementById("nome").value; // Obtém o arquivo da capa
        const descricao = document.getElementById("descricao").value;

        const formData = new FormData();
        formData.append("id", id); // Adiciona o ID do genero ao FormData
        formData.append("nome", nome); // Adiciona o arquivo da capa ao FormData
        formData.append("descricao", descricao)

        try {
            const response = await fetch("http://localhost/api/routes/generos/editar.php", {
                method: "POST", // Método POST para enviar os dados
                body: formData, // Enviando os dados do FormData
            });

            if (response.ok) {
                alert("Genero atualizado com sucesso!");
                window.location.href = "listaGeneros.html"; // Redireciona para a lista de filmes
            } else {
                alert("Erro ao atualizar genero. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao atualizar genero:", error);
            alert("Erro ao atualizar genero. Tente novamente.");
        };
    });
});
