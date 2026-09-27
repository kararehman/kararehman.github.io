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
  var activeContainer = null;
  var topZ = 20;

  function bringToFront(container) {
  topZ++;
  container.style.zIndex = topZ;
}

  function isDesktop() {
    return window.innerWidth > 768;
  }

  function showCaption(title, desc) {
    captionTitle.innerText = title;
    captionDesc.innerText = desc;
    captionBox.classList.add('visible');
  }

  function hideCaption() {
    captionBox.classList.remove('visible');
    activeContainer = null;
  }

  function scatterImages() {
    var mobile = !isDesktop();
    var areaWidth = gardenArea.clientWidth;
    var viewportHeight = window.innerHeight;

    var neededHeight;
    if (mobile) {
      // everything must fit in one screen, no scrolling
      neededHeight = gardenArea.clientHeight || (viewportHeight - 40);
    } else {
      var totalArea = 0;
      containers.forEach(function (c) {
        totalArea += c.offsetWidth * c.offsetHeight;
      });
      var packedHeight = (totalArea * 1.4) / areaWidth;
      neededHeight = Math.max(packedHeight, viewportHeight);
      gardenArea.style.height = neededHeight + 'px';
    }

    var areaHeight = neededHeight;
    var reserveWidth = mobile ? 0 : areaWidth * 0.35;
    var reserveTop = mobile ? areaHeight : viewportHeight * 0.65;
    var reserveBottom = mobile ? areaHeight : viewportHeight;

    containers.forEach(function (container) {
      var w = container.offsetWidth;
      var h = container.offsetHeight;
      var maxLeft = Math.max(areaWidth - w, 0);
      var maxTop = Math.max(Math.min(areaHeight, mobile ? areaHeight : viewportHeight) - h, 0);

      var left, top, attempts = 0;
      do {
        left = Math.random() * maxLeft;
        top = Math.random() * maxTop;
        attempts++;
      } while (
        attempts < 20 &&
        !mobile &&
        left > areaWidth - reserveWidth &&
        top + h > reserveTop &&
        top < reserveBottom
      );

      var rotation = (Math.random() * 10 - 5).toFixed(2);
      container.style.left = left + 'px';
      container.style.top = top + 'px';
      container.style.transform = 'rotate(' + rotation + 'deg)';
    });

    if (!mobile && areaHeight > viewportHeight + 40) {
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
var lastWidth = window.innerWidth;
window.addEventListener('resize', function () {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    scatterImages();
  }
});
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) hideScrollCue();
  });

  containers.forEach(function (container) {
  var title = container.querySelector('.gardenproject-title').innerText;
  var desc = container.querySelector('.gardenproject-description').innerText;

  // desktop: hover
  container.addEventListener('mouseenter', function () {
    if (!isDesktop()) return;
    bringToFront(container);
    showCaption(title, desc);
  });
  container.addEventListener('mouseleave', function () {
    if (!isDesktop()) return;
    hideCaption();
  });

  // mobile: tap to toggle
  container.addEventListener('click', function (e) {
    if (isDesktop()) return;
    e.stopPropagation();
    bringToFront(container);
    if (activeContainer === container && captionBox.classList.contains('visible')) {
      hideCaption();
    } else {
      showCaption(title, desc);
      activeContainer = container;
    }
  });
  });

  // tapping anywhere else on mobile closes the open caption
  document.addEventListener('click', function () {
    if (!isDesktop()) hideCaption();
  });
});
