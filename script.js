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

function toggleTheme() {
  const sheet = document.getElementById('theme-stylesheet');
  const isDefault = sheet.getAttribute('href') === 'style.css';
  sheet.setAttribute('href', isDefault ? 'altstyles1.css' : 'style.css');
}
