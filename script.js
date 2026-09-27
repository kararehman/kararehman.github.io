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

  function isDesktop() {
    return window.innerWidth > 768;
  }

  function scatterImages() {
    if (!isDesktop()) {
      // let the mobile CSS take over cleanly
      gardenArea.style.height = '';
      containers.forEach(function (c) {
        c.style.left = '';
        c.style.top = '';
        c.style.transform = '';
      });
      return;
    }

    var areaWidth = gardenArea.clientWidth;

    // size the container to fit everything, so nothing gets clipped
    var totalArea = 0;
    containers.forEach(function (c) {
      totalArea += c.offsetWidth * c.offsetHeight;
    });
    var neededHeight = Math.max((totalArea * 2.2) / areaWidth, window.innerHeight * 1.1);
    gardenArea.style.height = neededHeight + 'px';

    var areaHeight = neededHeight;
    var reserveWidth = areaWidth * 0.35;
    var reserveTop = window.innerHeight * 0.65; // bottom-right of the ON-LOAD viewport only
    var reserveBottom = window.innerHeight;

    containers.forEach(function (container) {
      var w = container.offsetWidth;
      var h = container.offsetHeight;
      var maxLeft = Math.max(areaWidth - w, 0);
      var maxTop = Math.max(areaHeight - h, 0);

      var left, top, attempts = 0;
      do {
        left = Math.random() * maxLeft;
        top = Math.random() * maxTop;
        attempts++;
      } while (
        attempts < 20 &&
        left > areaWidth - reserveWidth &&
        top + h > reserveTop &&
        top < reserveBottom
      );

      var rotation = (Math.random() * 10 - 5).toFixed(2);
      container.style.left = left + 'px';
      container.style.top = top + 'px';
      container.style.transform = 'rotate(' + rotation + 'deg)';
    });
  }

  window.addEventListener('load', scatterImages);
  window.addEventListener('resize', scatterImages);

  containers.forEach(function (container) {
    var title = container.querySelector('.gardenproject-title').innerText;
    var desc = container.querySelector('.gardenproject-description').innerText;

    container.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      captionTitle.innerText = title;
      captionDesc.innerText = desc;
      captionBox.classList.add('visible');
    });
    container.addEventListener('mouseleave', function () {
      captionBox.classList.remove('visible');
    });
  });
});
