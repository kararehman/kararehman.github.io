document.querySelectorAll('.collapsedpreview').forEach(header => {
  header.addEventListener('click', () => {
    const clickedCard = header.closest('.projectcard');

    // close all other open cards
    document.querySelectorAll('.projectcard.open').forEach(card => {
      if (card !== clickedCard) {
        card.classList.remove('open');
      }
    });

    // toggle the clicked card
    clickedCard.classList.toggle('open');
  });
});

const sheets = ['style.css', 'altstyles1.css', 'altstyles2.css'];
let currentIndex = 0;

function toggleTheme() {
  currentIndex = (currentIndex + 1) % sheets.length;
  const newSheet = sheets[currentIndex];
  document.getElementById('theme-stylesheet').setAttribute('href', newSheet);
  localStorage.setItem('themeIndex', currentIndex);

  // disable collapsing on the column theme
  document.querySelectorAll('.collapsedpreview').forEach(header => {
    header.style.pointerEvents = currentIndex === 2 ? 'none' : 'auto';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('themeIndex');
  if (saved !== null) {
    currentIndex = parseInt(saved);
    document.getElementById('theme-stylesheet').setAttribute('href', sheets[currentIndex]);
  }
});
