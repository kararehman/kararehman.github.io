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
      gardenArea.style.height = '';
      containers.forEach(function (c) {
        c.style.left = '';
        c.style.top = '';
        c.style.transform = '';
      });
      hideScrollCue();
      return;
    }

    var areaWidth = gardenArea.clientWidth;
    var viewportHeight = window.innerHeight;

    var totalArea = 0;
    containers.forEach(function (c) {
      totalArea += c.offsetWidth * c.offsetHeight;
    });
    var packedHeight = (totalArea * 1.4) / areaWidth;

    var neededHeight = Math.max(packedHeight, viewportHeight);
    gardenArea.style.height = neededHeight + 'px';

    var areaHeight = neededHeight;
    var reserveWidth = areaWidth * 0.35;
    var reserveTop = viewportHeight * 0.65;
    var reserveBottom = viewportHeight;

    containers.forEach(function (container) {
      var w = container.offsetWidth;
      var h = container.offsetHeight;
      var maxLeft = Math.max(areaWidth - w, 0);
      var maxTop = Math.max(Math.min(areaHeight, viewportHeight) - h, 0);

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

    if (areaHeight > viewportHeight + 40) {
      showScrollCue();
    } else {
      hideScrollCue();
    }
  }

  function showScrollCue() {
    var cue = document.getElementById('scroll-cue');
    if (!cue) return;
    cue.classList.add('visible');
  }

  function hideScrollCue() {
    var cue = document.getElementById('scroll-cue');
    if (!cue) return;
    cue.classList.remove('visible');
  }

  window.addEventListener('load', scatterImages);
  window.addEventListener('resize', scatterImages);
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) hideScrollCue();
  });

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
