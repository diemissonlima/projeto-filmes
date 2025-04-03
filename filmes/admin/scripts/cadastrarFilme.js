document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastrarFilmeForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // impede o envio padrão do formulário

        const capa = document.getElementById("capa").files[0];
        const titulo = document.getElementById("titulo").value;
        const genero = document.getElementById("genero").value;
        const genero2 = document.getElementById("genero2").value;
        const genero3 = document.getElementById("genero3").value;
        const dataLancamento = document.getElementById("dataLancamento").value;
        const duracao = document.getElementById("duracao").value;
        const sinopse = document.getElementById("sinopse").value;
        const trailerURL = document.getElementById("trailerURL").value;

        const formData = new FormData();
        formData.append("capa", capa);
        formData.append("titulo", titulo);
        formData.append("genero", genero);
        formData.append("genero_2", genero2);
        formData.append("genero_3", genero3);
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
                window.location.href = "listaFilmes.html"; // redireciona para a lista de filmes
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
        generosLista = data['dados'];
        listarGeneros(generosLista);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

function listarGeneros(generos) {
    const tabela = document.getElementById("genero");
    tabela.innerHTML = ""; // limpa a tabela antes de adicionar os novos filmes
    const tabela2 = document.getElementById("genero2");
    tabela2.innerHTML = "";
    const tabela3 = document.getElementById("genero3");
    tabela3.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; // deixe o valor vazio para indicar "todos"
    defaultOption.textContent = "Gênero Opcional"; // texto padrão
    defaultOption.selected = true; // define como selecionado
    tabela2.appendChild(defaultOption); // adiciona a opção à tabela2

    const defaultOption2 = document.createElement("option");
    defaultOption2.value = ""; // deixe o valor vazio para indicar "todos"
    defaultOption2.textContent = "Gênero Opcional"; // texto padrão
    defaultOption2.selected = true; // define como selecionado
    tabela3.appendChild(defaultOption2); // adiciona a opção à tabela3

    generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.nome; // atribui o ID do gênero como valor
        option.textContent = genero.nome; // atribui o nome do gênero como texto
        tabela.appendChild(option); // adiciona a opção à tabela

        const option2 = document.createElement("option");
        option2.value = genero.nome; // atribui o ID do gênero como valor
        option2.textContent = genero.nome; // atribui o nome do gênero como texto
        tabela2.appendChild(option2); // adiciona a opção à tabela2

        const option3 = document.createElement("option");
        option3.value = genero.nome; // atribui o ID do gênero como valor
        option3.textContent = genero.nome; // atribui o nome do gênero como texto
        tabela3.appendChild(option3); // adiciona a opção à tabela3             
    });
};

buscarGeneros(); // chama a função para buscar os gêneros ao carregar a página
