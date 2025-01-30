const table_id = "436539"; 
const token = "w2qlMxodry6mF3oaAbU5CjArFfWRKG61";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const nome = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            // Dados a serem enviados para o Baserow
            const data = {
                "field_3380121": nome,  
                "field_3380124": email,
                "field_3380125": phone
            };

            try {
                const response = await fetch(`https://api.baserow.io/api/database/rows/table/${table_id}/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso!");

                    // Enviar mensagem para o WhatsApp
                    const mensagem = `Olá, me chamo ${nome}. Quero saber mais sobre seus serviços.`;
                    const numeroWhatsApp = "556298023348"; 
                    window.location.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
                } else {
                    alert("Erro ao cadastrar. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao conectar com o servidor.");
            }
        });
    } else {
        console.error("Elemento #signupForm não encontrado no DOM.");
    }
});

