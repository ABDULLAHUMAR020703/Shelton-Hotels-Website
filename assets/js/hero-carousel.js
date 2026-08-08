/* ============================================================
   HeroCarousel — self-contained hero background carousel
   ============================================================

   USAGE
   -----
   1. Drop images into  assets/img/carousel/
   2. Register each image in  assets/img/carousel/manifest.json
   3. Done — no code changes needed.

   MANIFEST FORMAT
   ---------------
   Each entry in "images" can be:

     • A plain string  → "01-hero.jpg"
       Uses all values from "defaults".

     • A rich object   → { "file": "01-hero.jpg", "objectPosition": "center 72%" }
       Any property not provided falls back to "defaults".

   Per-image properties:
     file                  (string)   filename inside carousel/
     objectPosition        (string)   CSS object-position, desktop
     objectPositionTablet  (string)   tablet override (≤ 900 px)
     objectPositionMobile  (string)   mobile override (≤ 600 px)
     duration              (number)   hold time in ms (before crossfade)

   ARCHITECTURE
   ------------
   • Single fetch of manifest.json on init.
   • Normalises every entry against defaults.
   • Builds one .hc-slide per image; sets --hc-pos / --hc-pos-tablet /
     --hc-pos-mobile / --hc-duration as CSS custom properties on the
     slide element — the stylesheet picks them up automatically.
   • Per-slide durations use chained setTimeout (not setInterval) so
     each slide can have a different hold time.
   • Next slide is preloaded before transition begins.
   • Pauses when the browser tab is hidden (saves resources).
   • Respects prefers-reduced-motion (CSS handles the no-zoom case).
   ============================================================ */

(function () {
  'use strict';

  /* ---- Constants ---- */
  const FADE_MS      = 1600;   /* must match CSS transition duration       */

  /* System defaults — overridden by manifest "defaults" block */
  const SYS_DEFAULTS = {
    objectPosition:       'center 70%',
    objectPositionTablet: 'center 68%',
    objectPositionMobile: 'center 65%',
    duration: 7000,
  };

  /* ---- State ---- */
  let entries = [];   /* normalised config objects (parallel with slides)  */
  let slides  = [];   /* DOM .hc-slide elements                            */
  let stage   = null;
  let baseDir = '';
  let current = 0;
  let timer   = null;

  /* ============================================================
     Manifest helpers
     ============================================================ */

  /**
   * Normalise a raw manifest entry (string or object) against the
   * resolved defaults, returning a clean config object.
   */
  function normalise(raw, defaults) {
    const isString = typeof raw === 'string';
    const file     = isString ? raw : raw.file;

    return {
      file,
      objectPosition:       (isString ? null : raw.objectPosition)       || defaults.objectPosition,
      objectPositionTablet: (isString ? null : raw.objectPositionTablet) || defaults.objectPositionTablet || null,
      objectPositionMobile: (isString ? null : raw.objectPositionMobile) || defaults.objectPositionMobile || null,
      duration: (isString ? 0 : (raw.duration || 0)) || defaults.duration,
    };
  }

  /* ============================================================
     DOM helpers
     ============================================================ */

  /**
   * Build a single .hc-slide element and apply all per-image CSS
   * custom properties directly on the element so the stylesheet
   * can consume them without any JS media-query logic.
   */
  function buildSlide(entry, index) {
    const slide = document.createElement('div');
    slide.className = 'hc-slide';
    slide.setAttribute('aria-hidden', 'true');
    slide.dataset.index = index;

    /* ---------- CSS custom properties ---------- */

    /* object-position (desktop) */
    slide.style.setProperty('--hc-pos', entry.objectPosition);

    /* tablet override — only set if explicitly provided, otherwise
       the CSS fallback chain handles it gracefully               */
    if (entry.objectPositionTablet) {
      slide.style.setProperty('--hc-pos-tablet', entry.objectPositionTablet);
    }

    /* mobile override */
    if (entry.objectPositionMobile) {
      slide.style.setProperty('--hc-pos-mobile', entry.objectPositionMobile);
    }

    /* Ken Burns + hold duration — used by hc-kenburns @keyframes */
    const totalMs = entry.duration + FADE_MS;
    slide.style.setProperty('--hc-duration', `${totalMs}ms`);

    /* ---------- Image element ---------- */
    const img = document.createElement('img');
    img.alt      = '';          /* decorative — screen readers skip it     */
    img.draggable = false;

    /* First image eager-loads so the hero never shows a dark flash */
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.src = `${baseDir}/${entry.file}`;

    slide.appendChild(img);
    return slide;
  }

  /* ============================================================
     Playback
     ============================================================ */

  /**
   * Promote a lazy-loaded slide to eager so it starts downloading
   * before it becomes visible — avoids a visible network delay.
   */
  function preloadSlide(index) {
    const s = slides[index];
    if (!s) return;
    const img = s.querySelector('img');
    if (img && img.loading === 'lazy') img.loading = 'eager';
  }

  /**
   * Activate a slide by index. Deactivates the previous slide.
   * CSS handles the opacity crossfade.
   */
  function goTo(index) {
    const prev = slides[current];
    const next = slides[index];
    if (!next || next === prev) return;

    if (prev) prev.classList.remove('hc-active');
    next.classList.add('hc-active');
    current = index;

    /* Preload the slide after this one */
    preloadSlide((index + 1) % slides.length);
  }

  /** Advance to the next slide */
  function advance() {
    goTo((current + 1) % slides.length);
  }

  /**
   * Schedule the next advance using the *current* slide's hold duration.
   * Uses setTimeout so each slide can have a different duration.
   * After advancing, schedules the following slide recursively.
   */
  function scheduleNext() {
    if (timer) clearTimeout(timer);
    const holdMs = entries[current].duration;
    timer = setTimeout(() => {
      advance();
      scheduleNext();        /* chain: schedule the next slide */
    }, holdMs + FADE_MS);
  }

  function stopTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  function startTimer() {
    stopTimer();
    scheduleNext();
  }

  /* Pause when tab hidden, resume (with a fresh slide) when visible */
  function onVisibilityChange() {
    if (document.hidden) {
      stopTimer();
    } else {
      if (slides.length > 1) advance();
      startTimer();
    }
  }

  /* ============================================================
     Init
     ============================================================ */
  async function init() {
    stage = document.getElementById('hc-stage');
    if (!stage) return;

    const manifestUrl = stage.getAttribute('data-manifest') || 'assets/img/carousel/manifest.json';
    baseDir = manifestUrl.substring(0, manifestUrl.lastIndexOf('/'));

    /* Fetch manifest */
    let json;
    try {
      const res = await fetch(manifestUrl);
      json = await res.json();
    } catch (err) {
      console.warn('[HeroCarousel] Could not load manifest:', err);
      return;
    }

    /* Resolve defaults (manifest defaults override SYS_DEFAULTS) */
    const defaults = Object.assign({}, SYS_DEFAULTS, json.defaults || {});

    /* Normalise entries — filter to supported image extensions */
    const raw = (json.images || []).filter(e => {
      const file = typeof e === 'string' ? e : e.file;
      return file && /\.(jpe?g|png|webp)$/i.test(file);
    });

    if (!raw.length) {
      console.warn('[HeroCarousel] No valid images found in manifest.');
      return;
    }

    entries = raw.map((e, i) => normalise(e, defaults));

    /* Build slides and inject before the overlay */
    const overlay = stage.querySelector('.hc-overlay');
    entries.forEach((entry, i) => {
      const slide = buildSlide(entry, i);
      stage.insertBefore(slide, overlay);
      slides.push(slide);
    });

    /* Activate the first slide immediately */
    slides[0].classList.add('hc-active');
    current = 0;

    /* Preload slide #1 so the first crossfade is seamless */
    if (slides.length > 1) preloadSlide(1);

    /* Autoplay — only when multiple slides exist */
    if (slides.length > 1) {
      startTimer();
      document.addEventListener('visibilitychange', onVisibilityChange);
    }
  }

  /* Boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public API */
  window.HeroCarousel = { goTo, advance, stop: stopTimer, start: startTimer };

}());
