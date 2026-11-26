'use strict';
const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];
// Image fallback works even when the browser's network is offline.
function fallback(image) { if (!image.dataset.fallback || image.dataset.failed) return; image.dataset.failed = 'true'; image.src = image.dataset.fallback; }
$$('img[data-fallback]').forEach(image => { image.addEventListener('error', () => fallback(image)); if (image.getAttribute('src') && image.complete && !image.naturalWidth) fallback(image); });
const menu = $('.menu'), navigation = $('#navigation');
if (menu && navigation) {
  menu.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); } });
}
$$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const grid = $('#game-grid');
if (grid) {
  const cards = $$('[data-game]', grid), search = $('#search'), category = $('#category'), sort = $('#sort');
  const apply = () => {
    const query = search.value.trim().toLowerCase(), selected = category.value;
    const ordered = [...cards];
    if (sort.value === 'name') ordered.sort((a,b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
    if (sort.value === 'downloads') ordered.sort((a,b) => Number(b.dataset.downloads)-Number(a.dataset.downloads));
    if (sort.value === 'recent') ordered.sort((a,b) => b.dataset.date.localeCompare(a.dataset.date));
    let count=0;
    ordered.forEach(card => { card.hidden = !((!selected || card.dataset.category === selected) && query.split(/\s+/).every(word => card.dataset.search.toLowerCase().includes(word))); if (!card.hidden) count++; grid.append(card); });
    $('#result-count').textContent = `${count} ${count === 1 ? 'game' : 'games'}`;
    $('#empty').hidden = count !== 0;
  };
  search.addEventListener('input', apply); category.addEventListener('change', apply); sort.addEventListener('change', apply);
  $('#reset').addEventListener('click', () => { search.value=''; category.value=''; sort.value='featured'; apply(); search.focus(); });
}
const dialog = $('#lightbox');
if (dialog) {
  const picture = $('img', dialog);
  $$('[data-gallery]').forEach(button => button.addEventListener('click', () => { delete picture.dataset.failed; picture.src = button.dataset.gallery; picture.alt = $('img',button).alt; dialog.showModal(); }));
  $('.close',dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
}
const form = $('#support-form');
if (form) {
  const selected = new URLSearchParams(location.search).get('game');
  if (selected && [...$('#game').options].some(option => option.value === selected)) $('#game').value = selected;
  form.addEventListener('submit', event => {
    event.preventDefault(); const data = new FormData(form);
    const subject = `${data.get('topic')} — ${data.get('game')}`;
    const message = `Game: ${data.get('game')}\nTopic: ${data.get('topic')}\nDevice/app version: ${data.get('device') || 'Not provided'}\n\n${data.get('message')}`;
    const uri = `mailto:policepatrol.666@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    // Keep the full report available even if the OS has no configured mail application.
    $('#support-status').textContent = 'Your email app should open. If it does not, copy your message and email policepatrol.666@gmail.com directly.';
    location.href = uri;
  });
}
