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

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".testimonials-slider");
    const items = document.querySelectorAll(".testimonial-item");

    let isDown = false;
    let startX;
    let scrollLeft;

    function update3DEffect() {
        const center = slider.scrollLeft + slider.clientWidth / 2;
        let closestItem = null;
        let closestDistance = Infinity;

        items.forEach((item) => {
            const boxCenter = item.offsetLeft + item.clientWidth / 2;
            const distance = Math.abs(center - boxCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        items.forEach((item) => item.classList.remove("active", "prev", "next"));

        if (closestItem) {
            closestItem.classList.add("active");

            if (closestItem.previousElementSibling) {
                closestItem.previousElementSibling.classList.add("prev");
            }
            if (closestItem.nextElementSibling) {
                closestItem.nextElementSibling.classList.add("next");
            }
        }
    }

    function scrollToActive() {
        const activeItem = document.querySelector(".testimonial-item.active");
        if (activeItem) {
            slider.scrollTo({
                left: activeItem.offsetLeft - (slider.clientWidth - activeItem.clientWidth) / 2,
                behavior: "smooth",
            });
        }
    }

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        e.preventDefault();
    });

    slider.addEventListener("mouseleave", () => (isDown = false));
    slider.addEventListener("mouseup", () => {
        isDown = false;
        scrollToActive();
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; // Ajuste para suavizar o arrasto
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener("scroll", update3DEffect);

    // Suporte para touchscreen
    slider.addEventListener("touchend", scrollToActive);
    slider.addEventListener("touchmove", update3DEffect);

    update3DEffect();
});

// benefit item click
document.addEventListener("DOMContentLoaded", function () {
    const benefitItems = document.querySelectorAll(".benefit-item");

    benefitItems.forEach((item) => {
        item.addEventListener("click", function () {
            const isActive = this.classList.contains("active");

            // Fecha todos os outros antes de abrir um novo
            benefitItems.forEach((el) => el.classList.remove("active"));

            // Se o item já estava ativo, mantém fechado; caso contrário, ativa
            if (!isActive) {
                this.classList.add("active");
            }
        });
    });
});


animate();
