document.querySelectorAll('.collapsedpreview').forEach(header => {
  header.addEventListener('click', () => {
    header.closest('.projectcard').classList.toggle('open');
  });
});

//close all other open cards
document.querySelectorAll('.projectcard.open').forEach(card => {
      if (card !== clickedCard) {
        card.classList.remove('open');
      }
    });

const sheets = ['style.css', 'altstyles1.css', 'altstyles2.css'];
let currentIndex = 0;

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
  }
});
