/* =========================================================
   Al Batoul Real Estate — site behaviour
   Vanilla JS, no build step, no dependencies.
   ========================================================= */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var LANG_KEY = 'albatoul-lang';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Storage is unavailable when the page is opened straight off the disk
  // (file://) or in a locked-down private window — never let it break boot.
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  // ?lang=en / ?lang=ar wins, so a link can open in a chosen language.
  var urlLang = (location.search.match(/[?&]lang=(ar|en)\b/) || [])[1];
  var lang = urlLang || store.get(LANG_KEY) || 'ar';

  function t(key) {
    var dict = I18N[lang] || I18N.ar;
    return dict[key] !== undefined ? dict[key] : key;
  }

  /* ---------------------------------------------------------
     1. Preloader
     --------------------------------------------------------- */
  function hidePreloader() {
    var pl = $('#preloader');
    if (pl) pl.classList.add('done');
  }
  window.addEventListener('load', function () { setTimeout(hidePreloader, 350); });
  // Never trap the page behind the loader if a font or image request stalls.
  setTimeout(hidePreloader, 2500);

  /* ---------------------------------------------------------
     2. Language switching
     --------------------------------------------------------- */
  function applyLang(next) {
    lang = next;
    store.set(LANG_KEY, lang);

    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.title = t('meta.title');
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta.desc'));

    // Text nodes
    $$('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    // Placeholders
    $$('[data-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-ph')));
    });

    var label = $('#langLabel');
    if (label) label.textContent = lang === 'ar' ? 'EN' : 'ع';

    // Re-render everything driven by data
    renderProjects(currentFilter);
    renderProjectOptions();
    renderFooterProjects();
    renderTestimonials();
    updateWaLinks();
    updateMap();
  }

  var langBtn = $('#langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      applyLang(lang === 'ar' ? 'en' : 'ar');
    });
  }

  /* ---------------------------------------------------------
     3. Header / mobile nav
     --------------------------------------------------------- */
  var header = $('#header');
  var nav = $('#nav');
  var navToggle = $('#navToggle');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (navToggle) navToggle.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
    });
  }
  var navClose = $('#navClose');
  if (navClose) navClose.addEventListener('click', closeNav);
  $$('.nav a').forEach(function (a) { a.addEventListener('click', closeNav); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeNav(); closeModal(); }
  });

  /* ---------------------------------------------------------
     4. Scroll: sticky shadow, active link, back-to-top
     --------------------------------------------------------- */
  var toTop = $('#toTop');
  var sections = $$('section[id]');

  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 30);
    if (toTop) toTop.classList.toggle('show', y > 600);

    var current = '';
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    $$('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     5. Hero — cross-fading building photos
     --------------------------------------------------------- */
  var slides = $$('.hero-slide');
  var dotsWrap = $('#heroDots');
  var heroIndex = 0;
  var heroTimer = null;
  var HERO_DELAY = 6000;

  function goToSlide(i) {
    if (!slides.length) return;
    heroIndex = (i + slides.length) % slides.length;

    slides.forEach(function (s, n) {
      // Removing then re-adding restarts the Ken Burns animation.
      s.classList.remove('is-active');
      if (n === heroIndex) {
        void s.offsetWidth;
        s.classList.add('is-active');
      }
    });

    $$('button', dotsWrap).forEach(function (d, n) {
      d.classList.remove('is-active');
      if (n === heroIndex) { void d.offsetWidth; d.classList.add('is-active'); }
    });
  }

  function startHero() {
    if (reduceMotion || slides.length < 2) return;
    stopHero();
    heroTimer = setInterval(function () { goToSlide(heroIndex + 1); }, HERO_DELAY);
  }
  function stopHero() {
    if (heroTimer) { clearInterval(heroTimer); heroTimer = null; }
  }

  if (dotsWrap && slides.length) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      if (i === 0) b.classList.add('is-active');
      b.addEventListener('click', function () { goToSlide(i); startHero(); });
      dotsWrap.appendChild(b);
    });
  }

  // Pause the carousel while the tab is hidden so slides don't pile up.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopHero(); else startHero();
  });
  startHero();

  /* ---------------------------------------------------------
     6. WhatsApp links
     --------------------------------------------------------- */
  function waUrl(message) {
    return 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(message);
  }
  /* ---------------------------------------------------------
     6b. Office map — embed needs no API key
     --------------------------------------------------------- */
  function updateMap() {
    // Every address line and the directions button open the shared pin.
    $$('.map-link').forEach(function (a) { a.href = SITE.maps; });

    var frame = $('#mapFrame');
    if (!frame) return;
    frame.title = t('map.frameTitle');

    // Google's keyless embed endpoint. maps.google.com/?output=embed also works
    // but 301s through a hop that sends X-Frame-Options: SAMEORIGIN; this
    // canonical URL answers 200 directly with no framing restriction.
    var src = 'https://www.google.com/maps/embed?origin=mfe&pb=' +
              '!1m3!2m1!1s' + SITE.lat + ',' + SITE.lng +
              '!6i16!3m1!1s' + lang + '!5m1!1s' + lang;
    // Only reassign when it actually changed, so switching language back and
    // forth doesn't reload the map for nothing.
    if (frame.getAttribute('src') !== src) frame.setAttribute('src', src);
  }

  function updateWaLinks() {
    var url = waUrl(t('wa.hello'));
    var link = $('#waLink');
    if (link) link.href = url;
    var fab = $('.fab-wa');
    if (fab) fab.href = url;
  }

  /* ---------------------------------------------------------
     7. Projects grid + filters
     --------------------------------------------------------- */
  var grid = $('#projectsGrid');
  var currentFilter = 'all';

  var PIN_SVG = '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
  var ARROW_SVG = '<svg viewBox="0 0 24 24"><path d="M12 4l-1.4 1.4L16.2 11H4v2h12.2l-5.6 5.6L12 20l8-8z"/></svg>';
  var TYPE_SVG = '<svg viewBox="0 0 24 24"><path d="M12 3 2 9v12h7v-6h6v6h7V9zm0 2.3 8 4.8V19h-3v-6H7v6H4v-8.9z"/></svg>';

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderProjects(filter) {
    if (!grid) return;
    currentFilter = filter || 'all';

    var list = PROJECTS.filter(function (p) {
      return currentFilter === 'all' || p.city === currentFilter;
    });

    if (!list.length) {
      grid.innerHTML = '<p class="sec-desc" style="grid-column:1/-1;text-align:center">' + esc(t('card.empty')) + '</p>';
      return;
    }

    grid.innerHTML = list.map(function (p, i) {
      var d = p[lang];
      return '' +
        '<article class="p-card" data-id="' + p.id + '" style="animation-delay:' + (i * 60) + 'ms">' +
          '<div class="p-media">' +
            '<img src="' + p.img + '" alt="' + esc(d.name) + '" loading="lazy">' +
            '<span class="badge ' + p.status + '">' + esc(t('status.' + p.status)) + '</span>' +
            '<span class="p-type">' + TYPE_SVG + esc(d.type) + '</span>' +
          '</div>' +
          '<div class="p-body">' +
            '<h3>' + esc(d.name) + '</h3>' +
            '<p class="p-loc">' + PIN_SVG + '<span>' + esc(d.location) + '</span></p>' +
            '<ul class="p-specs">' +
              '<li><b>' + esc(d.area) + '</b>' + esc(t('card.area')) + '</li>' +
              '<li><b>' + esc(d.units) + '</b>' + esc(t('card.units')) + '</li>' +
              '<li><b>' + esc(d.delivery) + '</b>' + esc(t('card.delivery')) + '</li>' +
            '</ul>' +
            '<div class="p-foot">' +
              '<button class="p-more" type="button">' + esc(t('card.details')) + ARROW_SVG + '</button>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');

    $$('.p-card', grid).forEach(function (card) {
      card.addEventListener('click', function () { openModal(card.getAttribute('data-id')); });
    });
  }

  var filters = $('#filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      $$('.filter', filters).forEach(function (f) { f.classList.remove('is-active'); });
      btn.classList.add('is-active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  }

  /* ---------------------------------------------------------
     8. Project modal
     --------------------------------------------------------- */
  var modal = $('#projectModal');

  function openModal(id) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p || !modal) return;
    var d = p[lang];

    $('#mImg').src = p.img;
    $('#mImg').alt = d.name;
    var st = $('#mStatus');
    st.textContent = t('status.' + p.status);
    st.className = 'badge ' + p.status;
    $('#mTitle').textContent = d.name;
    $('#mLoc').textContent = d.location;
    $('#mDesc').textContent = d.desc;
    $('#mSpecs').innerHTML = '' +
      '<li><b>' + esc(d.area) + '</b>' + esc(t('card.area')) + '</li>' +
      '<li><b>' + esc(d.units) + '</b>' + esc(t('card.units')) + '</li>' +
      '<li><b>' + esc(d.delivery) + '</b>' + esc(t('card.delivery')) + '</li>' +
      '<li><b>' + esc(d.type) + '</b>' + esc(t('card.type')) + '</li>';
    $('#mWa').href = waUrl(t('wa.about') + ' ' + d.name + ' — ' + d.location + '.');

    // Preselect this project in the callback form.
    var sel = $('#fProject');
    if (sel) sel.value = p.id;

    modal.hidden = false;
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeModal();
    });
  }

  /* ---------------------------------------------------------
     9. Footer project list + form project options
     --------------------------------------------------------- */
  function renderFooterProjects() {
    var ul = $('#footerProjects');
    if (!ul) return;
    ul.innerHTML = PROJECTS.slice(0, 5).map(function (p) {
      return '<li><a href="#projects" data-id="' + p.id + '">' + esc(p[lang].name) + '</a></li>';
    }).join('');
    $$('a', ul).forEach(function (a) {
      a.addEventListener('click', function () {
        setTimeout(function () { openModal(a.getAttribute('data-id')); }, 420);
      });
    });
  }

  function renderProjectOptions() {
    var sel = $('#fProject');
    if (!sel) return;
    var keep = sel.value;
    sel.innerHTML = '<option value="">' + esc(t('form.projectAny')) + '</option>' +
      PROJECTS.map(function (p) {
        return '<option value="' + p.id + '">' + esc(p[lang].name) + '</option>';
      }).join('');
    if (keep) sel.value = keep;
  }

  /* ---------------------------------------------------------
     10. Testimonials slider
     --------------------------------------------------------- */
  var track = $('#tstTrack');
  var tstDots = $('#tstDots');
  var tstIndex = 0;

  function renderTestimonials() {
    if (!track) return;
    track.innerHTML = TESTIMONIALS.map(function (item) {
      var d = item[lang];
      return '' +
        '<div class="tst-item"><div class="tst-card">' +
          '<div class="tst-stars">★★★★★</div>' +
          '<p class="tst-text">' + esc(d.text) + '</p>' +
          '<div class="tst-person">' +
            '<div class="tst-avatar">' + esc(item.initials) + '</div>' +
            '<div><b>' + esc(d.name) + '</b><span>' + esc(d.role) + '</span></div>' +
          '</div>' +
        '</div></div>';
    }).join('');

    if (tstDots) {
      tstDots.innerHTML = TESTIMONIALS.map(function (_, i) {
        return '<button type="button" aria-label="Testimonial ' + (i + 1) + '"></button>';
      }).join('');
      $$('button', tstDots).forEach(function (b, i) {
        b.addEventListener('click', function () { goTst(i); });
      });
    }
    goTst(Math.min(tstIndex, TESTIMONIALS.length - 1));
  }

  function goTst(i) {
    if (!track) return;
    tstIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    // In RTL the track moves the other way.
    var dirSign = document.documentElement.getAttribute('dir') === 'rtl' ? 1 : -1;
    track.style.transform = 'translateX(' + (dirSign * tstIndex * 100) + '%)';
    if (tstDots) {
      $$('button', tstDots).forEach(function (d, n) {
        d.classList.toggle('is-active', n === tstIndex);
      });
    }
  }

  var tstPrev = $('#tstPrev');
  var tstNext = $('#tstNext');
  if (tstPrev) tstPrev.addEventListener('click', function () { goTst(tstIndex - 1); });
  if (tstNext) tstNext.addEventListener('click', function () { goTst(tstIndex + 1); });

  /* ---------------------------------------------------------
     11. Reveal on scroll + counting stats
     --------------------------------------------------------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    var start = performance.now();
    var dur = 1600;
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        var num = entry.target.querySelector('.stat-num');
        if (num && !num.dataset.done) { num.dataset.done = '1'; countUp(num); }
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) {
      el.classList.add('in');
      var num = el.querySelector('.stat-num');
      if (num) countUp(num);
    });
  }

  /* ---------------------------------------------------------
     12. Callback request form
     --------------------------------------------------------- */
  var form = $('#callbackForm');
  var success = $('#formSuccess');
  var dateInput = $('#fDate');

  // Can't book a call in the past.
  function todayISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  if (dateInput) {
    dateInput.min = todayISO();
    dateInput.value = todayISO();
  }

  function setError(field, message) {
    var wrap = field.closest('.field');
    if (!wrap) return;
    var slot = wrap.querySelector('.err');
    wrap.classList.toggle('invalid', !!message);
    if (slot) slot.textContent = message || '';
  }

  function collect() {
    var sel = $('#fProject');
    var timeSel = $('#fTime');
    return {
      name: $('#fName').value.trim(),
      phone: $('#fPhone').value.trim(),
      email: $('#fEmail').value.trim(),
      projectId: sel ? sel.value : '',
      projectName: sel && sel.selectedIndex > -1 ? sel.options[sel.selectedIndex].text : '',
      date: dateInput ? dateInput.value : '',
      time: timeSel ? timeSel.value : '',
      timeLabel: timeSel && timeSel.selectedIndex > -1 ? timeSel.options[timeSel.selectedIndex].text : '',
      notes: $('#fNotes').value.trim(),
      consent: $('#fConsent').checked
    };
  }

  function validate(data) {
    var ok = true;

    if (data.name.length < 2) { setError($('#fName'), t('err.name')); ok = false; }
    else setError($('#fName'), '');

    // Accepts local Egyptian formats and international ones.
    var digits = data.phone.replace(/[^\d]/g, '');
    if (digits.length < 8 || digits.length > 15 || !/^[+\d\s()-]+$/.test(data.phone)) {
      setError($('#fPhone'), t('err.phone')); ok = false;
    } else setError($('#fPhone'), '');

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      setError($('#fEmail'), t('err.email')); ok = false;
    } else setError($('#fEmail'), '');

    if (!data.date || data.date < todayISO()) { setError(dateInput, t('err.date')); ok = false; }
    else setError(dateInput, '');

    if (!data.time) { setError($('#fTime'), t('err.time')); ok = false; }
    else setError($('#fTime'), '');

    if (!data.consent) { alert(t('err.consent')); ok = false; }

    return ok;
  }

  function prettyDate(iso) {
    if (!iso) return '';
    var parts = iso.split('-');
    var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    try {
      return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function buildWaMessage(data) {
    var L = lang === 'ar';
    var lines = [
      L ? 'طلب مكالمة — البتول للاستثمار العقاري' : 'Callback request — Al Batoul Real Estate',
      '',
      (L ? 'الاسم: ' : 'Name: ') + data.name,
      (L ? 'الهاتف: ' : 'Phone: ') + data.phone
    ];
    if (data.email) lines.push((L ? 'البريد: ' : 'Email: ') + data.email);
    if (data.projectId) lines.push((L ? 'المشروع: ' : 'Project: ') + data.projectName);
    lines.push((L ? 'اليوم المفضل: ' : 'Preferred day: ') + prettyDate(data.date));
    lines.push((L ? 'الوقت المفضل: ' : 'Preferred time: ') + data.timeLabel);
    if (data.notes) lines.push((L ? 'ملاحظات: ' : 'Notes: ') + data.notes);
    return lines.join('\n');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = collect();
      if (!validate(data)) {
        var firstBad = $('.field.invalid input, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }

      // Demo only — no backend. Wire this to your CRM / endpoint.
      console.log('Callback request:', data);

      var msg = t('form.okMsg')
        .replace('{name}', data.name)
        .replace('{date}', prettyDate(data.date))
        .replace('{time}', data.timeLabel)
        .replace('{phone}', data.phone);
      $('#successMsg').textContent = msg;

      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  var againBtn = $('#againBtn');
  if (againBtn) {
    againBtn.addEventListener('click', function () {
      form.reset();
      if (dateInput) dateInput.value = todayISO();
      $$('.field').forEach(function (f) {
        f.classList.remove('invalid');
        var slot = f.querySelector('.err');
        if (slot) slot.textContent = '';
      });
      success.hidden = true;
      form.hidden = false;
    });
  }

  var sendWa = $('#sendWa');
  if (sendWa) {
    sendWa.addEventListener('click', function () {
      var data = collect();
      if (!validate(data)) return;
      window.open(waUrl(buildWaMessage(data)), '_blank', 'noopener');
    });
  }

  /* ---------------------------------------------------------
     13. Boot
     --------------------------------------------------------- */
  applyLang(lang);
})();
