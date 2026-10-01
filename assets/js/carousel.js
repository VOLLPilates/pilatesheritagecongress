/* Coverflow-style looping carousel (arrows, dots, swipe, keyboard) */
(function () {
  'use strict';

  var STATES = ['is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next'];

  function initCarousel(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
    var dotsWrap = root.querySelector('.carousel__dots');
    var viewport = root.querySelector('.carousel__viewport');
    var count = slides.length;
    var current = 0;
    if (!count) return;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    // Shortest signed distance from the active slide, wrapping around
    function offset(i) {
      var d = (i - current) % count;
      if (d > count / 2) d -= count;
      if (d < -count / 2) d += count;
      return d;
    }

    function render() {
      slides.forEach(function (slide, i) {
        var d = offset(i);
        STATES.forEach(function (s) { slide.classList.remove(s); });
        if (d === 0) slide.classList.add('is-active');
        else if (d === -1) slide.classList.add('is-prev');
        else if (d === 1) slide.classList.add('is-next');
        else slide.classList.add(d < 0 ? 'is-far-prev' : 'is-far-next');
        slide.setAttribute('aria-hidden', String(d !== 0));
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', String(i === current));
      });
    }

    function goTo(i) {
      current = (i + count) % count;
      render();
    }

    root.querySelector('.carousel__arrow--prev').addEventListener('click', function () { goTo(current - 1); });
    root.querySelector('.carousel__arrow--next').addEventListener('click', function () { goTo(current + 1); });

    slides.forEach(function (slide, i) {
      slide.addEventListener('click', function () { if (i !== current) goTo(i); });
    });

    root.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') goTo(current - 1);
      if (event.key === 'ArrowRight') goTo(current + 1);
    });

    // Swipe
    var startX = null;
    viewport.addEventListener('pointerdown', function (event) { startX = event.clientX; });
    viewport.addEventListener('pointerup', function (event) {
      if (startX === null) return;
      var delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) > 40) goTo(current + (delta < 0 ? 1 : -1));
    });
    viewport.addEventListener('pointercancel', function () { startX = null; });

    render();
  }

  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
})();
