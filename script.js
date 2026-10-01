const screenStart = document.getElementById('screen-start');
const screenLoading = document.getElementById('screen-loading');
const screenGallery = document.getElementById('screen-gallery');

const progressBar = document.getElementById('progress-bar');
const percentageText = document.getElementById('percentage-text');
const tunnelContainer = document.getElementById('tunnel-container');
const starsContainer = document.getElementById('stars-container');

// Tus imágenes de carritos con frases de amistad para los tres
const carData = [
  {
    img: 'carrito3.jpg', // Reemplaza por la ruta de tu imagen
    text: 'Orlandi, Royer y Cusco 🏎️️'
  },
  {
    img: 'carrito4.jpg', // Reemplaza por la ruta de tu imagen
    text: '¡Listos para cualquier aventura, amigos! 🏁'
  },
  {
    img: 'carrito5.png', // Reemplaza por la ruta de tu imagen
    text: '¡Una amistad que va a toda velocidad! ✨'
  },
  {
    img: 'carrito6.jpg', // Reemplaza por la ruta de tu imagen
    text: '¡Por más risas y momentos juntos! 💙'
  }
];

// Iniciar al tocar pantalla
screenStart.addEventListener('click', () => {
  screenStart.classList.remove('active');
  screenLoading.classList.add('active');
  startLoading();
});

// Barra de carga
function startLoading() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = `${progress}%`;
    percentageText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        screenLoading.classList.remove('active');
        screenGallery.classList.add('active');
        initShootingStars();
        startTunnelAnimation();
      }, 400);
    }
  }, 40);
}

// Generar estrellas fugaces dinámicas
function initShootingStars() {
  for (let i = 0; i < 6; i++) {
    createStar();
  }
}

function createStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  
  // Posiciones y retrasos aleatorios
  star.style.top = `${Math.random() * 50}%`;
  star.style.left = `${Math.random() * 100 + 20}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2 + Math.random() * 2}s`;

  starsContainer.appendChild(star);
}

// Bucle continuo para el avance de carros
function startTunnelAnimation() {
  let index = 0;

  setInterval(() => {
    const itemData = carData[index];
    createFloatingCar(itemData);
    index = (index + 1) % carData.length;
  }, 1200);
}

// Crear elementos de carros flotantes
function createFloatingCar(data) {
  const item = document.createElement('div');
  item.classList.add('floating-item');

  const randomX = Math.random() * 60 - 30; 
  const randomY = Math.random() * 30 - 15;

  item.style.left = `calc(50% + ${randomX}vw - 80px)`;
  item.style.top = `calc(35% + ${randomY}vh)`;

  item.innerHTML = `
    <img src="${data.img}" class="car-user-img" alt="Carro Hot Wheels">
    <span>${data.text}</span>
  `;

  tunnelContainer.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 4500);
}