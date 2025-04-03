document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastrarGeneroForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // impede o envio padrão do formulário

        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;

        const formData = new FormData();
        formData.append("nome", nome); 
        formData.append("descricao", descricao);

        try {
            const response = await fetch("http://localhost/api/routes/generos/criar.php", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log(response);

                alert("Gênero cadastrado com sucesso!");
                window.location.href = "listaGeneros.html"; // redireciona para a lista de generos
            } else {
                alert("Erro ao cadastrar gênero. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar gênero:", error);
            alert("Erro ao cadastrar gênero. Tente novamente.");
        };
    });
});
