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


document.addEventListener('DOMContentLoaded', function () {
  var containers = document.querySelectorAll('.gardenproj-container');
  var gardenArea = document.querySelector('.garden-container');
  var captionBox = document.getElementById('garden-caption');
  var captionTitle = captionBox.querySelector('.caption-title');
  var captionDesc = captionBox.querySelector('.caption-description');

  function scatterImages() {
    var areaWidth = gardenArea.clientWidth;
    var areaHeight = gardenArea.clientHeight;
    var reserveWidth = areaWidth * 0.35;
    var reserveHeight = areaHeight * 0.35;

    containers.forEach(function (container) {
      var w = container.offsetWidth || 180;
      var h = container.offsetHeight || 180;
      var maxLeft = areaWidth - w;
      var maxTop = areaHeight - h;

      var left, top, attempts = 0;
      do {
        left = Math.random() * maxLeft;
        top = Math.random() * maxTop;
        attempts++;
      } while (
        left > areaWidth - reserveWidth - w &&
        top > areaHeight - reserveHeight - h &&
        attempts < 20
      );

      var rotation = (Math.random() * 10 - 5).toFixed(2);
      container.style.left = left + 'px';
      container.style.top = top + 'px';
      container.style.transform = 'rotate(' + rotation + 'deg)';
    });
  }

  scatterImages();
  window.addEventListener('resize', scatterImages);

  containers.forEach(function (container) {
    var title = container.querySelector('.gardenproject-title').innerText;
    var desc = container.querySelector('.gardenproject-description').innerText;

    container.addEventListener('mouseenter', function () {
      captionTitle.innerText = title;
      captionDesc.innerText = desc;
      captionBox.classList.add('visible');
    });
    container.addEventListener('mouseleave', function () {
      captionBox.classList.remove('visible');
    });
  });
});
