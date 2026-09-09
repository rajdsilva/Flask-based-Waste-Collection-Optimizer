let map;
let markers = [];
let bins = [];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function popupHtml(bin) {
  return `<strong>${escapeHtml(bin.name)}</strong><br>` +
    `ID: ${escapeHtml(bin.id)}<br>` +
    `Fill level: ${Number(bin.fill_level).toFixed(0)}%<br>` +
    `Status: ${escapeHtml(bin.status)}<br>` +
    `Coordinates: ${Number(bin.latitude).toFixed(6)}, ${Number(bin.longitude).toFixed(6)}`;
}

function renderBins() {
  const list = document.getElementById('binList');
  list.innerHTML = '';
  bins.forEach(bin => {
    const item = document.createElement('div');
    item.className = 'bin';
    item.innerHTML = `<div class="bin-title"><span>${escapeHtml(bin.id)}</span><span class="badge">${escapeHtml(bin.status)}</span></div>` +
      `<div class="meta">${escapeHtml(bin.name)}<br>${Number(bin.latitude).toFixed(6)}, ${Number(bin.longitude).toFixed(6)}<br>Fill: ${Number(bin.fill_level).toFixed(0)}%</div>`;
    item.addEventListener('click', () => {
      const marker = markers.find(m => m.binId === bin.id);
      if (marker) {
        map.setView(marker.getLatLng(), Math.max(map.getZoom(), 16));
        marker.openPopup();
      }
    });
    list.appendChild(item);
  });
}

function fitAllBins() {
  if (!markers.length) return;
  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.15));
}

async function loadBins() {
  try {
    const response = await fetch('/api/bins', {headers: {'Accept': 'application/json'}});
    if (!response.ok) throw new Error(`Server returned ${response.status}`);
    const payload = await response.json();
    bins = Array.isArray(payload.bins) ? payload.bins : [];

    bins.forEach(bin => {
      const lat = Number(bin.latitude);
      const lon = Number(bin.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return;
      const marker = L.marker([lat, lon]).addTo(map).bindPopup(popupHtml(bin));
      marker.binId = bin.id;
      markers.push(marker);
    });

    renderBins();
    document.getElementById('totalBins').textContent = bins.length;
    document.getElementById('collectionBins').textContent = bins.filter(b => b.status === 'Needs Collection').length;
    document.getElementById('mapStatus').textContent = markers.length ? 'Ready' : 'No locations';
    fitAllBins();
  } catch (error) {
    document.getElementById('mapStatus').textContent = 'Error';
    const message = document.getElementById('errorMessage');
    message.hidden = false;
    message.textContent = `Unable to load bin locations: ${error.message}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Start with a sensible center; fitAllBins() replaces it after exact coordinates load.
  map = L.map('map', {zoomControl: true}).setView([19.076090, 72.877426], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  document.getElementById('fitBinsBtn').addEventListener('click', fitAllBins);
  loadBins();
});
