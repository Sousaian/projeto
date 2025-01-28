const carousel = document.querySelector('.carousel');
const items = Array.from(carousel.children);

function setupCarousel() {
    const totalWidth = carousel.scrollWidth; // Largura total do carrossel
    const itemWidth = items[0].offsetWidth; // Largura de um item
    const visibleItems = Math.ceil(totalWidth / itemWidth); // Quantidade de itens visíveis

    for (let i = 0; i < visibleItems; i++) {
        const clone = items[i % items.length].cloneNode(true); 
        carousel.appendChild(clone); // Adiciona o clone no final
    }

    const animationDuration = (totalWidth / itemWidth) * 5; // Ajuste de tempo de acordo com a largura
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

animate();
