/* =========================================================
   SHELTON HOTELS — shared behaviour
   ========================================================= */

// Capture selected branch ID to localStorage to survive server redirects that strip query params
document.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (link) {
    const href = link.getAttribute("href");
    if (href && href.includes("branch.html")) {
      try {
        const url = new URL(href, window.location.origin);
        const id = url.searchParams.get("id");
        if (id) {
          localStorage.setItem("selected_branch_id", id);
        }
      } catch (err) {
        const match = href.match(/[?&]id=([^&#]+)/);
        if (match && match[1]) {
          localStorage.setItem("selected_branch_id", match[1]);
        }
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderRouteRibbon();
  if (document.querySelector("[data-city-cards]")) renderCityCards();
  if (document.querySelector("[data-branch-list]")) renderBranchList();
  if (document.querySelector("[data-branch-page]")) initBranchPage();
  initBookingModal();
  initScrollReveal();
});

/* ---------- scroll reveal observer ---------- */
function initScrollReveal(root = document) {
  const reveals = root.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.01, rootMargin: "0px 0px 50px 0px" });

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in');
    } else {
      obs.observe(el);
    }
  });
}

/* ---------- nav toggle (mobile) ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    nav.classList.add("open");
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.contains("open");
    if (isOpen) closeMenu(); else openMenu();
  });

  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

/* ---------- route ribbon (seamless marquee) ---------- */
function renderRouteRibbon(){
  const cities = [...CITY_ORDER, ...CITY_ORDER]; /* duplicate for seamless loop */
  document.querySelectorAll("[data-route-ribbon]").forEach(el=>{
    el.innerHTML = cities.map(c=>`<span class="stop">${c === "Lahore" ? `<b>${c}</b>` : c}</span>`).join("");
  });
}

/* ---------- home page: city summary cards ---------- */
function renderCityCards(){
  const wrap = document.querySelector("[data-city-cards]");
  const map = citySummary();
  const order = CITY_ORDER.filter(c=>map[c]);
  wrap.innerHTML = order.map(city=>{
    const list = map[city];
    const hotels = list.filter(b=>b.type==="hotel").length;
    const extras = list.filter(b=>b.type!=="hotel");
    let extraLabel = "";
    if(extras.length){
      const kinds = [...new Set(extras.map(e=>e.type))];
      extraLabel = " + " + kinds.map(k=>k==="restaurant"?"restaurant":"apartment").join(", ");
    }
    const delayClass = [``,`delay-1`,`delay-2`,`delay-3`,`delay-4`][order.indexOf(city) % 5];
    const totalProps = list.length;
    const targetUrl = `branches.html#${city.replace(/\s+/g,"-").toLowerCase()}`;
    return `
      <div class="city-card fade-up ${delayClass}" onclick="location.href='${targetUrl}'">
        <div class="count">${hotels} hotel${hotels===1?"":"s"}${extraLabel}</div>
        <h3>${city}</h3>
        <p>${totalProps} propert${totalProps===1?"y":"ies"} — ${list.map(b=>b.area).filter(Boolean).slice(0,2).join(" · ") || list[0].city}</p>
        <a class="link" href="${targetUrl}">Explore</a>
      </div>`;
  }).join("");
}

/* ---------- branches page: full grouped list ---------- */
function renderBranchList(){
  const wrap = document.querySelector("[data-branch-list]");
  const map = citySummary();
  const order = CITY_ORDER.filter(c=>map[c]);

  wrap.innerHTML = order.map(city=>{
    const list = map[city];
    return `
    <div class="city-group" id="${city.replace(/\s+/g,"-").toLowerCase()}">
      <div class="city-group-head">
        <h2>${city}</h2>
        <span>${list.length} location${list.length===1?"":"s"}</span>
      </div>
      <div class="grid grid-3">
        ${list.map(branchCard).join("")}
      </div>
    </div>`;
  }).join("");

  wrap.querySelectorAll("[data-book]").forEach(btn=>{
    btn.addEventListener("click", ()=> openBookingModal(btn.dataset.book));
  });

  if (location.hash && location.hash.startsWith('#')) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
}

function branchCard(b){
  const ratingHtml = b.rating
    ? `<span class="rating">★ ${b.rating}</span><span>(${b.reviews.toLocaleString()} reviews)</span>`
    : `<span>New listing</span>`;
  const typeBadge = b.type === "restaurant" ? `<span class="badge badge-clay">Restaurant</span>`
    : b.type === "apartment" ? `<span class="badge">Apartment</span>` : "";
  const pendingNote = b.pending ? `<p class="branch-addr" style="color:var(--gold-hover)">Full details coming soon.</p>` : "";

  const photoEl = b.photos
    ? `<a class="branch-photo has-img" href="branch.html?id=${b.id}#gallery" style="background-image:url('${assetPath(b.photos.dir, b.photos.card)}')" aria-label="View photos of ${b.name}">
         <span>${countPhotos(b)} photos</span>
       </a>`
    : `<div class="branch-photo"><span>${b.area || b.city}</span></div>`;

  const featureIcons = (b.features || []).slice(0,3).map(f => {
    const iconMap = { WiFi: '📶', 'AC': '❄️', 'Parking':'🅿️', 'Restaurant':'🍽️', 'Room Service':'🛎️', 'Conference':'🏛️', 'Laundry':'👕', 'TV':'📺' };
    const icon = Object.entries(iconMap).find(([k]) => f.includes(k))?.[1] || '✓';
    return `<span style="font-size:.85rem" title="${f}">${icon}</span>`;
  }).join('');

  return `
    <div class="branch-card fade-up">
      ${photoEl}
      <div class="branch-body">
        <div class="branch-meta">${typeBadge}${ratingHtml}</div>
        <h3>${b.name}</h3>
        <p class="branch-addr">${b.address}</p>
        ${pendingNote}
        ${featureIcons ? `<div style="display:flex;gap:8px;margin:10px 0 4px;">${featureIcons}</div>` : ''}
        ${b.rooms ? roomTable(b.rooms) : ""}
        <div class="branch-actions">
          <button class="btn btn-primary btn-sm" data-book="${b.id}" ${b.pending?"disabled":""}>Book now</button>
          ${b.photos ? `<a class="btn btn-ghost btn-sm" href="branch.html?id=${b.id}#gallery">View hotel</a>` : ""}
          ${b.phone ? `<a class="btn btn-ghost btn-sm" href="tel:${b.phone.replace(/\s+/g,"")}">Call</a>` : ""}
        </div>
      </div>
    </div>`;
}

function roomTable(rooms){
  return `<div style="font-family:var(--mono);font-size:.78rem;color:var(--ink-soft);border-top:1px solid var(--line);padding-top:10px;">
    ${rooms.map(r=>`<div style="display:flex;justify-content:space-between;padding:3px 0;"><span>${r.name} · ${r.detail}</span><span>from Rs ${r.from.toLocaleString()}</span></div>`).join("")}
  </div>`;
}

/* ---------- booking modal ---------- */
let activeBranch = null;

function initBookingModal(){
  const backdrop = document.getElementById("booking-modal");
  if(!backdrop) return;
  backdrop.querySelector(".modal-close").addEventListener("click", closeBookingModal);
  backdrop.addEventListener("click", e=>{ if(e.target === backdrop) closeBookingModal(); });

  document.getElementById("booking-form").addEventListener("submit", e=>e.preventDefault());
  document.getElementById("send-whatsapp").addEventListener("click", sendViaWhatsapp);
  document.getElementById("send-email").addEventListener("click", sendViaEmail);

  // any element elsewhere on the page with data-book opens the modal too
  document.querySelectorAll("[data-book]").forEach(btn=>{
    btn.addEventListener("click", ()=> openBookingModal(btn.dataset.book));
  });
}

function openBookingModal(branchId){
  activeBranch = BRANCHES.find(b=>b.id===branchId) || null;
  const modal = document.getElementById("booking-modal");
  if(!modal) return;
  document.getElementById("modal-branch-name").textContent = activeBranch ? activeBranch.name : "Shelton Hotels";
  document.getElementById("modal-branch-sub").textContent = activeBranch ? activeBranch.address : "Tell us your dates and we'll confirm availability.";

  const waBtn = document.getElementById("send-whatsapp");
  if(activeBranch && activeBranch.whatsapp){
    waBtn.removeAttribute("disabled");
    waBtn.textContent = "Send via WhatsApp";
  } else {
    waBtn.setAttribute("disabled","disabled");
    waBtn.textContent = "WhatsApp number coming soon";
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeBookingModal(){
  const modal = document.getElementById("booking-modal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("booking-form").reset();
}

function collectBookingText(){
  const name = document.getElementById("f-name").value || "(not provided)";
  const checkin = document.getElementById("f-checkin").value || "(not provided)";
  const checkout = document.getElementById("f-checkout").value || "(not provided)";
  const guests = document.getElementById("f-guests").value || "(not provided)";
  const notes = document.getElementById("f-notes").value || "—";
  const branchName = activeBranch ? activeBranch.name : "Shelton Hotels (branch not specified)";

  return {
    branchName, name, checkin, checkout, guests, notes,
    plain:
`New booking request — Shelton Hotels
Branch: ${branchName}
Guest name: ${name}
Check-in: ${checkin}
Check-out: ${checkout}
Guests: ${guests}
Notes: ${notes}`
  };
}

function sendViaWhatsapp(){
  if(!activeBranch || !activeBranch.whatsapp) return;
  const data = collectBookingText();
  const url = `https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(data.plain)}`;
  window.open(url, "_blank");
}

function sendViaEmail(){
  const data = collectBookingText();
  const subject = encodeURIComponent(`Booking request — ${data.branchName}`);
  const body = encodeURIComponent(data.plain);
  window.location.href = `mailto:${GENERAL_BOOKING_EMAIL}?subject=${subject}&body=${body}`;
}


/* ---------- photo helpers ---------- */

function assetPath(...segments) {
  return segments
    .filter(Boolean)
    .map(segment => String(segment)
      .split('/')
      .map(part => encodeURIComponent(part))
      .join('/'))
    .join('/');
}

/** Returns the thumbnail URL for a gallery image.
 *  Hotels without _t.jpg variants (hasThumb === false) reuse the full image.
 *  Hotels with rawNames === true store full filenames in groups (no extension appended). */
function thumbPath(photos, name) {
  if (photos.rawNames || name.includes('.')) return assetPath(photos.dir, name);
  const ext = photos.ext || 'jpg';
  return photos.hasThumb === false
    ? assetPath(photos.dir, `${name}.${ext}`)
    : assetPath(photos.dir, `${name}_t.${ext}`);
}

/** Returns the full-size URL for a gallery image. */
function fullPath(photos, name) {
  if (photos.rawNames || name.includes('.')) return assetPath(photos.dir, name);
  const ext = photos.ext || 'jpg';
  return assetPath(photos.dir, `${name}.${ext}`);
}

function countPhotos(b){
  if(!b.photos) return 0;
  return Object.values(b.photos.groups).reduce((a,g)=>a+g.length,0);
}

/** Renders a gallery item button. Supports both images and autoplaying looping videos. */
function renderGalleryItem(photos, src, label, group, branchName) {
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");
  const full = fullPath(photos, src);
  if (isVideo) {
    const fallback = src.endsWith(".webm") ? full.replace(/\.webm$/i, ".mp4") : full;
    const poster = photos.videoPoster ? fullPath(photos, photos.videoPoster) : "";
    return `
      <button class="gal-item video-gal-item" data-full="${full}" ${group ? `data-group="${group}"` : ""} aria-label="Play video of ${branchName}">
        <video class="gal-video-preview" autoplay loop muted playsinline preload="auto"${poster ? ` poster="${poster}"` : ""}>
          <source src="${full}" type="video/webm">
          ${fallback !== full ? `<source src="${fallback}" type="video/mp4">` : ""}
        </video>
        <div class="video-badge"><span class="badge-icon">▶</span> Video</div>
      </button>`;
  }
  return `
    <button class="gal-item" data-full="${full}" ${group ? `data-group="${group}"` : ""} aria-label="Enlarge ${label} photo">
      <img src="${thumbPath(photos, src)}" loading="lazy" alt="${label} at ${branchName}">
    </button>`;
}

/* ---------- branch detail page (enhanced) ---------- */
function initBranchPage(){
  const params = new URLSearchParams(location.search);
  let branchId = params.get("id");
  if (!branchId) {
    branchId = localStorage.getItem("selected_branch_id");
    if (branchId) {
      const newUrl = window.location.pathname + `?id=${branchId}` + window.location.hash;
      window.history.replaceState(null, "", newUrl);
    }
  }
  const b = branchById(branchId);
  const root = document.querySelector("[data-branch-page]");
  if(!root) return;
  if(!b){ root.innerHTML = `<div class="container"><p>Branch not found. <a href="branches.html">See all branches</a>.</p></div>`; return; }

  document.title = `${b.name} — Shelton Hotels`;

  const ratingHtml = b.rating ? `<span class="rating">★ ${b.rating}</span> <span class="ink-soft">(${b.reviews.toLocaleString()} reviews)</span>` : "";
  const heroStyle = b.photos ? `style="background-image:linear-gradient(to top, rgba(12,10,20,.72), rgba(12,10,20,.12)), url('${assetPath(b.photos.dir, b.photos.hero)}')"` : "";

  /* Feature chips */
  const feats = (b.features||[]).map(f=>`<span class="feat">${f}</span>`).join("");

  /* ----- GALLERY with category tabs ----- */
  let galleryHtml = "";
  if (b.photos) {
    const availGroups = PHOTO_ORDER.filter(k => b.photos.groups[k] && b.photos.groups[k].length);
    const allPhotos   = availGroups.flatMap(k => b.photos.groups[k].map(n => ({ src: n, label: PHOTO_LABELS[k] })));

    const tabsHtml = [
      { key: 'all',  label: 'All',  count: allPhotos.length },
      ...availGroups.map(k => ({ key: k, label: PHOTO_LABELS[k], count: b.photos.groups[k].length }))
    ].map((t, i) => `<button class="gallery-tab${i===0?' active':''}" data-tab="${t.key}">${t.label} <small>(${t.count})</small></button>`).join("");

    const allGrid = allPhotos.map(p => renderGalleryItem(b.photos, p.src, p.label, 'all', b.name)).join("");

    const groupGrids = availGroups.map(k => `
      <div class="gal-group" data-group="${k}">
        <div class="gal-grid">
          ${b.photos.groups[k].map(n=> renderGalleryItem(b.photos, n, PHOTO_LABELS[k], null, b.name)).join("")}
        </div>
      </div>`).join("");

    galleryHtml = `
      <div class="gallery-section">
        <div class="section-head reveal">
          <div class="eyebrow">Gallery</div>
          <h2>Images of <em>${b.name}</em></h2>
        </div>
        <div class="gallery-tabs-bar" role="tablist" aria-label="Gallery categories">${tabsHtml}</div>
        <div class="gal-group active" data-group="all">
          <div class="gal-grid">${allGrid}</div>
        </div>
        ${groupGrids}
      </div>`;
  }

  /* ----- ROOMS section (Serena-style split cards) ----- */
  let roomsHtml = "";
  const roomsList = b.rooms || (b.roomTypes ? b.roomTypes.map((rt, i) => ({
    name: rt.toLowerCase().includes('room') || rt.toLowerCase().includes('suite') ? rt : `${rt} Room`,
    detail: `A luxurious and comfortable ${rt.toLowerCase()} space with modern climate control, high-speed WiFi, and 24-hour direct front desk service.`,
    from: 14500 + (i * 4000)
  })) : [
    { name: "Deluxe Room", detail: "Comfortable, well-appointed guest room with king bed, high-speed WiFi, and private bath.", from: 14500 },
    { name: "Executive Suite", detail: "Spacious luxury suite with separate seating area, premium bedding, and city views.", from: 22000 }
  ]);

  if (roomsList && roomsList.length) {
    const roomIcons = { 'single': '🛏️', 'double': '🛏️🛏️', 'suite': '👑', 'deluxe': '🌟', 'executive': '💼', 'family': '👨‍👩‍👧', 'twin': '🛏️' };

    const tabsHtml   = roomsList.map((r,i) => `<button class="room-selector-tab${i===0?' active':''}" data-room="${i}">${r.name}</button>`).join("");
    const cardsHtml  = roomsList.map((r,i) => {
      const icon   = Object.entries(roomIcons).find(([k]) => r.name.toLowerCase().includes(k))?.[1] || '🏨';
      const imgSrc = b.photos ? assetPath(b.photos.dir, b.photos.hero) : '';
      return `
      <div class="room-card${i===0?' active':''}" data-room-card="${i}">
        <div class="room-card-left">
          <div class="room-card-eyebrow">${b.city} · ${b.area || 'Shelton Hotels'}</div>
          <div class="room-card-name">${r.name}</div>
          <p class="room-card-desc">${r.detail}</p>
          <div class="room-card-features">
            <div class="room-card-feature"><span class="room-card-feature-icon">${icon}</span> ${r.name}</div>
            ${(b.features||['WiFi','AC','Breakfast','Room Service']).slice(0,3).map(f=>`<div class="room-card-feature"><span class="room-card-feature-icon">✓</span> ${f}</div>`).join('')}
          </div>
          <div class="room-card-price">
            <div>
              <span class="room-price-label">Book direct from</span>
              <div class="room-price-value"><span class="room-price-currency">Rs </span>${r.from.toLocaleString()}</div>
            </div>
            <button class="btn btn-gold" data-book="${b.id}" style="margin-left:auto">Book Room</button>
          </div>
        </div>
        <div class="room-card-right">
          ${imgSrc ? `<img class="room-card-photo" src="${imgSrc}" alt="${r.name} at ${b.name}" loading="lazy">` : `<div style="width:100%;height:100%;background:var(--cream-3);display:flex;align-items:center;justify-content:center;font-size:3rem;">${icon}</div>`}
        </div>
      </div>`;
    }).join("");

    roomsHtml = `
      <div class="rooms-section">
        <div class="container">
          <div class="rooms-section-head reveal">
            <h2>Accommodation</h2>
            <div class="sub">ROOM TYPES AT ${b.name.toUpperCase()}</div>
          </div>
          <div class="room-selector-tabs" role="tablist">${tabsHtml}</div>
          ${cardsHtml}
        </div>
      </div>`;
  }

  /* ----- AMENITIES icon grid ----- */
  let amenitiesHtml = "";
  if (b.features && b.features.length >= 3) {
    const iconMap = {
      'WiFi': { icon: '📶', label: 'Free WiFi' },
      'Wi-Fi': { icon: '📶', label: 'Free WiFi' },
      'AC': { icon: '❄️', label: 'Air Cond.' },
      'Air': { icon: '❄️', label: 'Air Cond.' },
      'Parking': { icon: '🅿️', label: 'Parking' },
      'Restaurant': { icon: '🍽️', label: 'Restaurant' },
      'Room Service': { icon: '🛎️', label: 'Room Service' },
      'Conference': { icon: '🏛️', label: 'Conference' },
      'Laundry': { icon: '👕', label: 'Laundry' },
      'TV': { icon: '📺', label: 'Cable TV' },
      'Gym': { icon: '💪', label: 'Gym' },
      'Pool': { icon: '🏊', label: 'Pool' },
      'Generator': { icon: '⚡', label: 'Generator' },
      'CCTV': { icon: '🔒', label: 'Security' },
      'Breakfast': { icon: '☕', label: 'Breakfast' },
    };
    const items = b.features.map(f => {
      const match = Object.entries(iconMap).find(([k]) => f.toLowerCase().includes(k.toLowerCase()));
      const { icon, label } = match ? match[1] : { icon: '✓', label: f.slice(0,12) };
      return `<div class="amenity-item"><span class="amenity-icon" aria-hidden="true">${icon}</span><span class="amenity-label">${label}</span></div>`;
    }).join("");

    amenitiesHtml = `
      <div class="amenities-section">
        <h3>General Amenities</h3>
        <div class="amenities-grid">${items}</div>
      </div>`;
  }

  /* ----- ROOT HTML ----- */
  root.innerHTML = `
    <!-- Branch hero -->
    <div class="branch-hero" ${heroStyle}>
      <div class="container">
        <a class="back-link" href="branches.html">← All hotels</a>
        <h1>${b.name}</h1>
        <p class="branch-hero-meta">${ratingHtml}</p>
        <p class="branch-hero-addr">${b.address}</p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-book="${b.id}">Book this hotel</button>
          ${b.phone?`<a class="btn btn-ghost light" href="tel:${b.phone.replace(/\s+/g,'')}">Call the front desk</a>`:''}
        </div>
      </div>
    </div>

    <!-- Feature chips + intro -->
    <section class="branch-intro-section">
      <div class="container">
        ${feats ? `<div class="feat-row">${feats}</div>` : ''}
        ${b.roomTypes ? `<div style="margin-top:20px;"><span class="eyebrow" style="display:inline">Room types available: </span><b style="font-family:var(--sans);font-size:.9rem;color:var(--ink);">${b.roomTypes.join(' · ')}</b></div>` : ''}
        ${amenitiesHtml}
      </div>
    </section>

    <!-- Rooms section -->
    ${roomsHtml}

    <!-- Gallery section -->
    <section id="gallery">
      <div class="container">
        ${galleryHtml}
      </div>
    </section>`;

  /* --- gallery tab switching --- */
  root.querySelectorAll(".gallery-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      root.querySelectorAll(".gallery-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.dataset.tab;
      root.querySelectorAll(".gal-group").forEach(g => g.classList.toggle("active", g.dataset.group === key));
    });
  });

  /* --- room tab switching --- */
  root.querySelectorAll(".room-selector-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      root.querySelectorAll(".room-selector-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const idx = tab.dataset.room;
      root.querySelectorAll(".room-card").forEach(c => c.classList.toggle("active", c.dataset.roomCard === idx));
    });
  });

  /* --- lightbox --- */
  root.querySelectorAll(".gal-item").forEach(el=>{
    el.addEventListener("click", ()=>openLightbox(el.dataset.full));
  });

  /* --- booking buttons --- */
  root.querySelectorAll("[data-book]").forEach(btn=>{
    btn.addEventListener("click", ()=>openBookingModal(btn.dataset.book));
  });

  /* --- scroll reveals --- */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  root.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  if (location.hash && location.hash.startsWith('#')) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }
}

function openLightbox(src){
  let lb = document.getElementById("lightbox");
  if(!lb){
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.innerHTML = `
      <img alt="" style="display:none;">
      <video controls autoplay loop muted playsinline style="display:none; max-width:100%; max-height:100%; outline:none;"></video>
      <button class="lb-close" aria-label="Close">✕</button>
    `;
    document.body.appendChild(lb);
    lb.addEventListener("click", (e)=>{
      if (e.target.tagName !== 'VIDEO') {
        lb.classList.remove("open");
        document.body.style.overflow="";
        const video = lb.querySelector("video");
        if (video) video.pause();
      }
    });
    document.addEventListener("keydown", e=>{
      if(e.key==="Escape"){
        lb.classList.remove("open");
        document.body.style.overflow="";
        const video = lb.querySelector("video");
        if (video) video.pause();
      }
    });
  }

  const img = lb.querySelector("img");
  const video = lb.querySelector("video");
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg");

  if (isVideo) {
    img.style.display = "none";
    video.innerHTML = "";
    if (src.endsWith(".webm")) {
      video.insertAdjacentHTML("beforeend", `<source src="${src}" type="video/webm"><source src="${src.replace(/\.webm$/i, ".mp4")}" type="video/mp4">`);
      video.removeAttribute("src");
    } else {
      video.src = src;
    }
    video.style.display = "block";
    video.play().catch(err => console.log("Video play failed:", err));
  } else {
    if (video) {
      video.style.display = "none";
      video.pause();
    }
    img.src = src;
    img.style.display = "block";
  }

  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}
