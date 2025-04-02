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
    const genero2 = document.getElementById('genero2');
    const genero3 = document.getElementById('genero3');
    const dataLancamento = document.getElementById('dataLancamento');
    const duracao = document.getElementById('duracao');
    const sinopse = document.getElementById('sinopse');
    const trailerLink = document.getElementById('trailerURL');
    const optionGenero = document.createElement("option");
    const optionGenero2 = document.createElement("option");
    const optionGenero3 = document.createElement("option");

    console.log(filme.generos.length);

    id.value = filme.id;
    titulo.value = filme.titulo;

    optionGenero.value = filme.generos[0];
    optionGenero.textContent = filme.generos[0];
    optionGenero.selected = true;
    genero.appendChild(optionGenero);

    if (filme.generos.length === 2) {
        optionGenero2.value = filme.generos[1];
        optionGenero2.textContent = filme.generos[1];
        optionGenero2.selected = true;
        genero2.appendChild(optionGenero2);
    }

    if (filme.generos.length === 3) {
        optionGenero2.value = filme.generos[1];
        optionGenero2.textContent = filme.generos[1];
        optionGenero2.selected = true;
        genero2.appendChild(optionGenero2);

        optionGenero3.value = filme.generos[2];
        optionGenero3.textContent = filme.generos[2];
        optionGenero3.selected = true;
        genero3.appendChild(optionGenero3);
    }

    dataLancamento.value = filme.data_lancamento;
    duracao.value = filme.duracao;
    sinopse.value = filme.sinopse;
    trailerLink.value = filme.trailer_url;
};

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
        generosLista = data['dados'];
        listarGeneros(generosLista);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

function listarGeneros(generos) {
    const tabela = document.getElementById("genero");
    tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos filmes
    const tabela2 = document.getElementById("genero2");
    tabela2.innerHTML = "";
    const tabela3 = document.getElementById("genero3");
    tabela3.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // Deixe o valor vazio para indicar "todos"
    defaultOption.textContent = "Gênero Opcional"; // Texto padrão
    defaultOption.selected = true; // Define como selecionado
    tabela2.appendChild(defaultOption); // Adiciona a opção à tabela2

    const defaultOption2 = document.createElement("option");
    defaultOption2.value = ""; // Deixe o valor vazio para indicar "todos"
    defaultOption2.textContent = "Gênero Opcional"; // Texto padrão
    defaultOption2.selected = true; // Define como selecionado
    tabela3.appendChild(defaultOption2); // Adiciona a opção à tabela2

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.nome; // Atribui o ID do gênero como valor
        option.textContent = genero.nome; // Atribui o nome do gênero como texto
        tabela.appendChild(option); // Adiciona a opção à tabela

        const option2 = document.createElement("option");
        option2.value = genero.nome; // Atribui o ID do gênero como valor
        option2.textContent = genero.nome; // Atribui o nome do gênero como texto
        tabela2.appendChild(option2); // Adiciona a opção à tabela 

        const option3 = document.createElement("option");
        option3.value = genero.nome; // Atribui o ID do gênero como valor
        option3.textContent = genero.nome; // Atribui o nome do gênero como texto
        tabela3.appendChild(option3); // Adiciona a opção à tabela                
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("editarFilmForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const id = document.getElementById("id").value; // Obtém o ID do filme
        const capa = document.getElementById("capa").files[0]; // Obtém o arquivo da capa
        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const genero2 = document.getElementById("genero2").value;
        const genero3 = document.getElementById("genero3").value;
        const dataLancamento = document.getElementById("dataLancamento").value;
        const duracao = document.getElementById("duracao").value;
        const sinopse = document.getElementById("sinopse").value;
        const trailerURL = document.getElementById("trailerURL").value;

        const formData = new FormData();
        formData.append("id", id); // Adiciona o ID do filme ao FormData
        formData.append("capa", capa); // Adiciona o arquivo da capa ao FormData
        formData.append("titulo", titulo);
        formData.append("genero", genero);
        formData.append("genero_2", genero2);
        formData.append("genero_3", genero3);
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

buscarGeneros();
