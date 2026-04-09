const map = L.map('map', { zoomControl: true }).setView([40.730, -73.990], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

const markers = {};
let activeCard = null;
let allRestaurants = [];

// ── Helpers ──
function scoreColor(s) {
  if (s >= 4.7) return '#e53935';
  if (s >= 4.3) return '#ff6b6b';
  if (s >= 4.0) return '#ff8a65';
  return '#ffb74d';
}

function renderDots(score) {
  const f = Math.round(score);
  return '<div class="score-dots">' +
    [1,2,3,4,5].map(i => `<div class="dot${i <= f ? ' filled' : ''}"></div>`).join('') +
    '</div>';
}

function chipCls(f) {
  const blue   = ['Stroller Parking','All-Day','Outdoor Seating','Outdoor Terrace','Bridge Views','Waterfront','Museum Cafe','Sidewalk Patio','Outdoor Space','Beer Garden'];
  const purple = ['Family-Style','Wood-Fired','Creative Dim Sum','Fine-Casual','Detroit-Style Pizza','Okosama Sets','Rooftop Garden','Beautiful Garden','Coal-Fired Pizza'];
  const amber  = ['Gelato','Gelato Counter','CrazyShakes','Frozen Hot Choc',"S'mores Cake",'Gachapon Machine','Famous Cheesecake','Scones & Tea','Afternoon Tea'];
  if (blue.some(x => f.includes(x)))   return 'fc fc-blue';
  if (purple.some(x => f.includes(x))) return 'fc fc-purple';
  if (amber.some(x => f.includes(x)))  return 'fc fc-amber';
  return 'fc fc-green';
}

function markerIcon(rank, score) {
  const c = scoreColor(score);
  return L.divIcon({
    className: '',
    html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${c};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25)"><span style="transform:rotate(45deg);font-size:10px;font-weight:700;color:#fff">${rank}</span></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -28]
  });
}

function buildPopup(r) {
  return `<div class="popup-inner">
    <div class="popup-name">${r.name}</div>
    <div class="popup-sub">${r.neighborhood} &middot; ${r.tags.join(' &middot; ')}</div>
    <div class="popup-score">${renderDots(r.score)}<span class="score-num">${r.score.toFixed(1)}</span><span class="popup-score-label">kid-friendly</span></div>
    <div class="popup-desc">${r.desc}</div>
    <div class="popup-features">${r.features.map(f => `<span class="${chipCls(f)}">${f}</span>`).join('')}</div>
    <a class="popup-resy-btn" href="${r.resyUrl}" target="_blank" rel="noopener">Book on Resy</a>
  </div>`;
}

// ── Render markers ──
function renderMarkers(list) {
  Object.values(markers).forEach(m => map.removeLayer(m));
  Object.keys(markers).forEach(k => delete markers[k]);

  list.forEach((r, i) => {
    const m = L.marker([r.lat, r.lng], { icon: markerIcon(i + 1, r.score) })
      .addTo(map)
      .bindPopup(buildPopup(r), { maxWidth: 270, minWidth: 250 });

    m.on('click', () => {
      document.querySelectorAll('.restaurant-card').forEach(c => c.classList.remove('active'));
      const card = document.getElementById(`card-${r.id}`);
      if (card) { card.classList.add('active'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
      activeCard = r.id;
    });

    markers[r.id] = m;
  });
}

// ── Render sidebar list ──
function renderList(list) {
  document.getElementById('result-count').textContent = `${list.length} restaurant${list.length !== 1 ? 's' : ''}`;
  const container = document.getElementById('restaurantList');

  if (!list.length) {
    container.innerHTML = '<div class="empty-state">No restaurants match your search.</div>';
    return;
  }

  container.innerHTML = list.map((r, i) => {
    const rank = i + 1;
    const bc = rank === 1 ? 'rank-badge gold' : rank <= 3 ? 'rank-badge red' : 'rank-badge';
    return `<div class="restaurant-card" data-id="${r.id}" id="card-${r.id}">
      <div class="${bc}">${rank}</div>
      <div class="card-info">
        <div class="card-top">
          <div class="card-name">${r.name}</div>
          <div class="kid-score">${renderDots(r.score)}<span class="score-num">${r.score.toFixed(1)}</span></div>
        </div>
        <div class="card-meta">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}<span class="neighborhood">${r.neighborhood}</span></div>
        <div class="card-bottom">
          <div class="card-features">${r.features.slice(0, 3).map(f => `<span class="${chipCls(f)}">${f}</span>`).join('')}</div>
          <a class="resy-btn" href="${r.resyUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">Resy</a>
        </div>
      </div>
    </div>`;
  }).join('');

  container.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', () => focusRestaurant(parseInt(card.dataset.id)));
  });
}

function focusRestaurant(id) {
  if (activeCard) {
    const prev = document.getElementById(`card-${activeCard}`);
    if (prev) prev.classList.remove('active');
  }
  activeCard = id;
  const card = document.getElementById(`card-${id}`);
  if (card) { card.classList.add('active'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  const r = allRestaurants.find(x => x.id === id);
  if (r && markers[id]) { map.setView([r.lat, r.lng], 15, { animate: true }); markers[id].openPopup(); }
}

// ── Fetch from API ──
async function fetchRestaurants(params = {}) {
  document.getElementById('restaurantList').innerHTML = '<div class="loading">Loading</div>';
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/restaurants${query ? '?' + query : ''}`);
  const data = await res.json();
  allRestaurants = data.restaurants;
  renderList(allRestaurants);
  renderMarkers(allRestaurants);
}

// ── Filters ──
function getActiveParams() {
  const af = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const search = document.getElementById('searchInput').value.trim();
  const params = {};
  if (search) params.search = search;
  if (af === 'kids-menu')   params.feature = 'Kids Menu';
  if (af === 'high-chairs') params.feature = 'High Chairs';
  if (af === 'quiet')       params.quiet = 'true';
  if (af === 'brooklyn')    params.borough = 'Brooklyn';
  return params;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    fetchRestaurants(getActiveParams());
  });
});

let searchTimer;
document.getElementById('searchInput').addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => fetchRestaurants(getActiveParams()), 250);
});

// ── Init ──
fetchRestaurants();
