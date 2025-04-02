document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastrarGeneroForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById("nome").value; // Obtém o arquivo da capa
        const descricao = document.getElementById("descricao").value;

        const formData = new FormData();
        formData.append("nome", nome); // Adiciona o arquivo ao FormData
        formData.append("descricao", descricao); // Adiciona o arquivo ao FormData

        try {
            const response = await fetch("http://localhost/api/routes/generos/criar.php", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log(response);

                alert("Gênero cadastrado com sucesso!");
                window.location.href = "cadastrarFilme.html"; // Redireciona para a lista de filmes
            } else {
                alert("Erro ao cadastrar gênero. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar gênero:", error);
            alert("Erro ao cadastrar gênero. Tente novamente.");
        };
    });
});
