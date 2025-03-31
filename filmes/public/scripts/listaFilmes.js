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
        filmes = data['dados']; // Armazena os filmes na variável global
        mostrarFilmes(data['dados']);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

// Função para exibir os filmes na tabela
function mostrarFilmes(filmes) {
    const tabela = document.querySelector('tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os filmes

    filmes.forEach(filme => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="http://localhost/api/public/uploads/${filme.capa}" alt="${filme.titulo}" style="width: 50px; height: 50px;">
            </td>
            <td>${filme.titulo}</td>
            <td>${filme.genero}</td>
            <td>
                <a href="${filme.trailer_url}" target="_blank" class="btn btn-primary btn-sm">Assistir</a>
            </td>
            <td>${filme.data_lancamento}</td>
            <td>${filme.duracao} minutos</td>
            <td>
                <a href="editarFilme.html?id=${filme.id}" class="btn btn-warning btn-sm">Editar</a>
                <a href="listaFilmes.html" class="btn btn-danger btn-sm" onclick="excluirFilme(${filme.id})">Excluir</a>
            </td>`;

        tabela.appendChild(tr);
    });
};

buscarDados(); // Chama a função para buscar os dados ao carregar a página

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
