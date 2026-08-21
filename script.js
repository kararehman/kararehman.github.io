const sheets = ['style.css', 'altstyles1.css', 'altstyles2.css', 'altstyles3.css'];
let currentIndex = 0;

document.querySelectorAll('.collapsedpreview').forEach(header => {
  header.addEventListener('click', () => {
    const clickedCard = header.closest('.projectcard');
    document.querySelectorAll('.projectcard.open').forEach(card => {
      if (card !== clickedCard) {
        card.classList.remove('open');
      }
    });
    clickedCard.classList.toggle('open');
  });
});

function toggleTheme() {
  currentIndex = (currentIndex + 1) % sheets.length;
  const newSheet = sheets[currentIndex];
  document.getElementById('theme-stylesheet').setAttribute('href', newSheet);
  localStorage.setItem('themeIndex', currentIndex);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('themeIndex');
  if (saved !== null) {
    currentIndex = parseInt(saved);
    document.getElementById('theme-stylesheet').setAttribute('href', sheets[currentIndex]);
    applyThemeState(currentIndex); // ← now runs on restore too
  }
});


// Assumes you have a div like: <div id="image-container"></div>
const container = document.getElementById('randomimg');

// List your image paths here
const images = [
  'images/photo1.jpg',
  'images/photo2.jpg',
  'images/photo3.jpg',
  'images/photo4.jpg'
];

function randomizeImages() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('floating-image'); // for styling (size, border-radius, etc.)

    // Set absolute positioning so images can overlap freely
    img.style.position = 'absolute';

    // Randomize top/left, leaving a margin so images don't get cut off at edges
    const maxLeft = containerWidth - 150;  // adjust 150 to your image width
    const maxTop = containerHeight - 150;  // adjust 150 to your image height

    const randomLeft = Math.random() * Math.max(maxLeft, 0);
    const randomTop = Math.random() * Math.max(maxTop, 0);

    img.style.left = `${randomLeft}px`;
    img.style.top = `${randomTop}px`;

    // Optional: slight random rotation for a more organic, scattered look
    const randomRotation = Math.random() * 30 - 15; // -15deg to 15deg
    img.style.transform = `rotate(${randomRotation}deg)`;

    container.appendChild(img);
  });
}

// Run once the page loads
window.addEventListener('load', randomizeImages);
