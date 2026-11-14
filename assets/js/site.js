(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hero = document.querySelector('.hero');

  /* ---- hero geometry ----
     The arc (centre 100,-60; rx 74.4; ry 138 in a 0-100 box) is drawn in three places:
     the CSS masks in site.css (.hero), the hidden #navyPath/#silverPath in index.html,
     and arcX() below. Change all three together. */
  if (hero) {
    var main = hero.querySelector('.hero-main');
    var photo = hero.querySelector('.photo-wrap');
    var silver = document.getElementById('silverPath');
    var navy = document.getElementById('navyPath');
    var svg = silver.ownerSVGElement;
    var CLEAR = 40;          // gap between the text block and the arc
    var centroids = {};      // black-shape centroid only depends on the hero's aspect ratio

    function arcX(yPct) {
      var t = (yPct + 60) / 138;
      return 100 - 74.4 * Math.sqrt(Math.max(0, 1 - t * t));
    }
    function isBlack(xPct, yPct) {
      var p = svg.createSVGPoint();
      p.x = xPct; p.y = yPct;
      return !silver.isPointInFill(p) && !navy.isPointInFill(p);
    }
    function stacked() { return getComputedStyle(main).position !== 'absolute'; }

    // Text block: one straight left edge, just clear of the arc at the block's lowest line.
    function placeText(w, h) {
      var left = 0.5 * w;
      for (var i = 0; i < 4; i++) {
        main.style.setProperty('--text-left', left + 'px');
        var bottom = (main.offsetTop + main.offsetHeight) / h * 100;
        var next = Math.max(0.36 * w, arcX(Math.min(bottom, 77)) / 100 * w + CLEAR);
        if (Math.abs(next - left) < 1) break;
        left = next;
      }
      main.style.setProperty('--text-left', left + 'px');
    }

    function centroid(w, h) {
      var key = (w / h).toFixed(2);
      if (centroids[key]) return centroids[key];
      var sx = 0, sy = 0, n = 0, N = 30;
      for (var i = 0; i <= N; i++) {
        for (var j = 0; j <= N; j++) {
          var xp = i / N * 100, yp = j / N * 100;
          if (isBlack(xp, yp)) { sx += xp; sy += yp; n++; }
        }
      }
      return (centroids[key] = n ? [sx / n, sy / n] : [16, 30]);
    }

    // Photo: centroid of the black shape, nudged up for the optical centre, as large as fits.
    function placePhoto(w, h) {
      var c = centroid(w, h);
      var cx = c[0] / 100 * w, cy = c[1] / 100 * h - 0.03 * h;
      var margin = 32, size = Math.min(360, Math.max(200, 0.22 * w));
      function fits(s) {
        var half = s / 2 + margin;
        for (var k = 0; k <= 8; k++) {
          var edge = -half + 2 * half * k / 8;
          var pts = [[cx + edge, cy - half], [cx + edge, cy + half], [cx - half, cy + edge], [cx + half, cy + edge]];
          for (var q = 0; q < 4; q++) {
            var x = pts[q][0], y = pts[q][1];
            if (x < 0 || y < 0 || !isBlack(x / w * 100, y / h * 100)) return false;
          }
        }
        return true;
      }
      while (size > 160 && !fits(size)) size -= 8;
      photo.style.setProperty('--photo-x', cx + 'px');
      photo.style.setProperty('--photo-y', cy + 'px');
      photo.style.setProperty('--photo-s', size + 'px');
    }

    function layout() {
      if (stacked()) {
        main.style.removeProperty('--text-left');
        ['--photo-x', '--photo-y', '--photo-s'].forEach(function (v) { photo.style.removeProperty(v); });
        return;
      }
      var w = hero.clientWidth, h = hero.clientHeight;
      placeText(w, h);
      placePhoto(w, h);
    }
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    layout();
  }

  /* ---- sticky bar: only once the hero has left the screen; not focusable while hidden ---- */
  var bar = document.getElementById('topbar');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var past = !entries[0].isIntersecting;
      bar.classList.toggle('show', past);
      if (past) bar.removeAttribute('inert'); else bar.setAttribute('inert', '');
    }).observe(hero);
  } else if (bar) {
    bar.classList.add('show');
    bar.removeAttribute('inert');
  }

  /* ---- metallic shimmer only runs while it can be seen ---- */
  if ('IntersectionObserver' in window) {
    var shimmerWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('paused', !e.isIntersecting); });
    });
    document.querySelectorAll('.glitter, .glitter-fill').forEach(function (el) { shimmerWatch.observe(el); });
  }

  /* ---- copy email: the address only exists here, assembled on click ---- */
  function address() {
    return ['321nahsraduisiarud', 'moc.liamg'].map(function (part) {
      return part.split('').reverse().join('');
    }).join('@');
  }
  document.querySelectorAll('[data-copy-email]').forEach(function (button) {
    var status = document.getElementById(button.getAttribute('aria-describedby'));
    button.addEventListener('click', function () {
      var addr = address();
      function done() {
        status.textContent = 'Copied! Paste it into your email app.';
        clearTimeout(status._timer);
        status._timer = setTimeout(function () { status.textContent = ''; }, 4000);
      }
      function failed() {
        status.textContent = "Couldn't copy automatically. Here's the address: ";
        var span = document.createElement('span');
        span.className = 'addr';
        span.textContent = addr;
        status.appendChild(span);
      }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(addr).then(done, failed);
      else failed();
    });
  });

  /* ---- videos ----
     Muted. Posters load as the section approaches. Only clips marked data-autoplay start on
     their own, and not with reduced motion, Save-Data or a 3G-or-slower connection. */
  var conn = navigator.connection || {};
  var slowNet = conn.saveData || /(^|-)(2g|3g)$/.test(conn.effectiveType || '');
  document.querySelectorAll('.video').forEach(function (box) {
    var video = box.querySelector('video');
    var button = box.querySelector('.play');
    var source = video.querySelector('source');
    var autoplay = box.hasAttribute('data-autoplay') && !slowNet;
    source.addEventListener('error', function () { box.classList.add('failed'); });

    function start() {
      video.controls = true;
      button.hidden = true;
      var p = video.play();
      if (p && p.catch) p.catch(function () { button.hidden = false; });
    }
    button.addEventListener('click', start);

    if (!('IntersectionObserver' in window)) {
      video.poster = video.getAttribute('data-poster');
      return;
    }
    new IntersectionObserver(function (entries, obs) {
      if (entries[0].isIntersecting) {
        video.poster = video.getAttribute('data-poster');
        obs.disconnect();
      }
    }, { rootMargin: '800px 0px' }).observe(box);

    new IntersectionObserver(function (entries) {
      var e = entries[0];
      if (e.isIntersecting && autoplay && !reduceMotion.matches && video.paused && !box.dataset.started) {
        box.dataset.started = '1';
        start();
      } else if (!e.isIntersecting && !video.paused) {
        video.pause();
      }
    }, { threshold: 0.6 }).observe(box);
  });

  /* ---- images that fail to load get a real message instead of a broken icon ---- */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    function swap() {
      var note = document.createElement('p');
      note.className = 'fallback';
      note.textContent = img.getAttribute('data-fallback');
      img.replaceWith(note);
    }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('loading') !== 'lazy') swap();
    else img.addEventListener('error', swap);
  });
})();
