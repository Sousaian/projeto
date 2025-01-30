const carousel = document.querySelector('.carousel');
const items = Array.from(carousel.children);

function setupCarousel() {
    const totalWidth = carousel.scrollWidth; 
    const itemWidth = items[0].offsetWidth; 
    const visibleItems = Math.ceil(totalWidth / itemWidth);

    for (let i = 0; i < visibleItems; i++) {
        const clone = items[i % items.length].cloneNode(true); 
        carousel.appendChild(clone); 
    }

    const animationDuration = (totalWidth / itemWidth) * 5; 
    carousel.style.animationDuration = `${animationDuration}s`;
}

setupCarousel();

// Repetir a animação sem interrupção
let position = 0;
function animate() {
    position -= 1; 
    if (Math.abs(position) >= carousel.scrollWidth / 2) {
        position = 0; 
    }
    carousel.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

// Pop-up
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.className = "popup";
    popup.innerHTML = `
        <div class="popup-content">
            <span id="closePopup" class="close">&times;</span>
            <h2>Cadastro</h2>
            <form id="signupForm">
                <input type="text" id="name" placeholder="Nome" required>
                <input type="email" id="email" placeholder="E-mail" required>
                <input type="tel" id="phone" placeholder="Telefone" required>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `;
    document.body.appendChild(popup); // Adiciona o pop-up ao final do body

    // Selecionando elementos necessários
    const openButtons = document.querySelectorAll(".openPopup");
    const closePopup = document.getElementById("closePopup");

    // Abrir pop-up ao clicar nos botões
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            popup.style.display = "flex";
        });
    });

    // Fechar pop-up ao clicar no botão de fechar
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Fechar ao clicar fora do pop-up
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });

});


animate();
