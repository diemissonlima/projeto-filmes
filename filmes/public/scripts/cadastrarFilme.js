document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastrarFilmeForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const capa = document.getElementById("capa").files[0]; // Obtém o arquivo da capa
        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const dataLancamento = document.getElementById("dataLancamento").value;
        const duracao = document.getElementById("duracao").value;
        const sinopse = document.getElementById("sinopse").value;
        const trailerURL = document.getElementById("trailerURL").value;

        const formData = new FormData();
        formData.append("capa", capa); // Adiciona o arquivo da capa ao FormData
        formData.append("titulo", titulo);
        formData.append("genero", genero);
        formData.append("data_lancamento", dataLancamento);
        formData.append("duracao", duracao);
        formData.append("sinopse", sinopse);
        formData.append("trailer_url", trailerURL);

        try {
            const response = await fetch("http://localhost/api/routes/filmes/criar.php", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log(response);

                alert("Filme cadastrado com sucesso!");
                window.location.href = "listaFilmes.html"; // Redireciona para a lista de filmes
            } else {
                alert("Erro ao cadastrar filme. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar filme:", error);
            alert("Erro ao cadastrar filme. Tente novamente.");
        };
    });
});

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
        generosLista = data['dados']; // Armazena os filmes na variável global
        listarGeneros(generosLista);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

function listarGeneros(generos) {
    const tabela = document.getElementById("genero");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos filmes

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.nome; // Atribui o ID do gênero como valor
        option.textContent = genero.nome; // Atribui o nome do gênero como texto
        tabela.appendChild(option); // Adiciona a opção à tabela                
    });
};

buscarGeneros(); // Chama a função para buscar os gêneros ao carregar a página
