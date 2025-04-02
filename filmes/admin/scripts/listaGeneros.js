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
        mostrarGeneros(generosLista);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    };
};

// Função para exibir os filmes na tabela
function mostrarGeneros(generos) {
    const tabela = document.getElementById('generos');
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os filmes

    generos.forEach(genero => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${genero.nome}</td>
            <td style="max-width: 800px;">${genero.descricao}</td>
            <td>
                <a style="margin-right: 5px;" href="editarGenero.html?id=${genero.id}" class="btn btn-warning btn-sm"><strong>Editar</strong></a>
                <a href="listaGeneros.html" class="btn btn-danger btn-sm" onclick="excluirGenero(${genero.id})"><strong>Excluir</strong></a>
            </td>`;
        tabela.appendChild(tr);
    });
};

async function excluirGenero(id) {
    if (!confirm("Tem certeza que deseja excluir?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost/api/routes/generos/excluir.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert("Erro ao excluir o gênero: " + data.error);
        }
    } catch (error) {
        console.error('Erro ao excluir o gênero:', error);
        alert("Erro ao excluir o gênero.");
    }
}

buscarGeneros();
