(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 저장 불가 환경 */ } },
  };

  // ── 다크 모드 ─────────────────────────────
  const root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  $('#theme').addEventListener('click', () => {
    const t = isDark() ? 'light' : 'dark';
    root.dataset.theme = t;
    try { localStorage.setItem('theme', t); } catch { }
  });

  // ── 모바일 목차 ───────────────────────────
  const menu = $('#menu');
  const setNav = open => { document.body.classList.toggle('nav-open', open); menu.setAttribute('aria-expanded', String(open)); };
  menu.addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  $('#scrim').addEventListener('click', () => setNav(false));
  $('#sidebar').addEventListener('click', e => { if (e.target.closest('a') && innerWidth <= 980) setNav(false); });

  // ── 읽음 표시와 진행률 ─────────────────────
  const total = $$('.read-btn').length;
  let read = new Set(store.get('read', []));
  const paint = () => {
    $$('.read-btn').forEach(b => b.setAttribute('aria-pressed', String(read.has(b.dataset.ch))));
    $$('.toc-ch').forEach(li => li.classList.toggle('done', read.has(li.dataset.ch)));
    const n = [...read].filter(id => $(`.read-btn[data-ch="${id}"]`)).length;
    $('#prog-text').textContent = `${n} / ${total}`;
    $('#prog-bar').style.width = `${total ? (n / total) * 100 : 0}%`;
  };
  $$('.read-btn').forEach(b => b.addEventListener('click', () => {
    read.has(b.dataset.ch) ? read.delete(b.dataset.ch) : read.add(b.dataset.ch);
    store.set('read', [...read]); paint();
  }));
  paint();

  // ── 현재 위치 표시 (스크롤 스파이) ──────────
  const heads = $$('main h2[id], main h3[id]');
  const tocItem = Object.fromEntries($$('.toc-ch').map(li => [li.dataset.ch, li]));
  let current = null;
  const spy = () => {
    const y = 90;
    let h = heads[0];
    for (const el of heads) { if (el.getBoundingClientRect().top - y <= 0) h = el; else break; }
    if (!h) return;
    const sec = h.closest('.chapter');
    const ch = sec && sec.dataset.ch;
    if (ch !== current) {
      Object.values(tocItem).forEach(li => li.classList.remove('active'));
      if (tocItem[ch]) {
        tocItem[ch].classList.add('active');
        const sb = $('#sidebar'), r = tocItem[ch].getBoundingClientRect(), s = sb.getBoundingClientRect();
        if (r.top < s.top + 40 || r.bottom > s.bottom - 40) sb.scrollTop += r.top - s.top - 120;
      }
      current = ch;
    }
    $$('.subs a.on').forEach(a => a.classList.remove('on'));
    if (h.tagName === 'H3') { const a = $(`.subs a[href="#${h.id}"]`); if (a) a.classList.add('on'); }
  };
  let ticking = false;
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { spy(); ticking = false; }); } }, { passive: true });
  spy();

  // ── 용어 풀이 ─────────────────────────────
  const tip = $('#tip');
  let tipFor = null;
  const showTip = el => {
    tipFor = el;
    tip.innerHTML = `<b>${el.textContent}</b>${el.dataset.def}`;
    tip.hidden = false;
    const r = el.getBoundingClientRect(), w = tip.offsetWidth, hgt = tip.offsetHeight;
    let left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let top = r.top - hgt - 8; if (top < 64) top = r.bottom + 8;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  };
  const hideTip = () => { tip.hidden = true; tipFor = null; };
  document.addEventListener('mouseover', e => { const t = e.target.closest('abbr.term'); if (t) showTip(t); });
  document.addEventListener('mouseout', e => { if (e.target.closest('abbr.term')) hideTip(); });
  document.addEventListener('focusin', e => { const t = e.target.closest('abbr.term'); if (t) showTip(t); });
  document.addEventListener('focusout', e => { if (e.target.closest('abbr.term')) hideTip(); });
  document.addEventListener('click', e => {
    const t = e.target.closest('abbr.term');
    if (t) { tipFor === t && !tip.hidden ? hideTip() : showTip(t); } else if (!tip.hidden) hideTip();
  });
  addEventListener('scroll', () => { if (!tip.hidden) hideTip(); }, { passive: true });

  // ── 그림 확대 ─────────────────────────────
  const lb = $('#lightbox'), lbBody = $('.lb-body', lb);
  const openFig = f => { lbBody.innerHTML = f.innerHTML; lb.showModal(); };
  $$('.fig').forEach(f => {
    f.addEventListener('click', e => { if (!e.target.closest('a')) openFig(f); });
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFig(f); } });
  });
  $('.lb-close', lb).addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  // ── 검색 ─────────────────────────────────
  const index = JSON.parse($('#search-index').textContent);
  const q = $('#q'), box = $('#results');
  const norm = s => s.toLowerCase();
  const escH = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escR = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let sel = -1;
  const highlight = (s, terms) => {
    let out = escH(s);
    for (const t of terms) out = out.replace(new RegExp(escR(escH(t)), 'gi'), m => `<mark>${m}</mark>`);
    return out;
  };
  const run = () => {
    const raw = q.value.trim();
    sel = -1;
    if (!raw) { box.hidden = true; box.innerHTML = ''; return; }
    const terms = raw.split(/\s+/).filter(Boolean);
    const hits = [];
    for (const it of index) {
      const T = norm(it.t), X = norm(it.x);
      if (!terms.every(t => T.includes(norm(t)) || X.includes(norm(t)))) continue;
      let score = 0;
      for (const t of terms) { const n = norm(t); if (T.includes(n)) score += 10; score += Math.min(5, X.split(n).length - 1); }
      hits.push([score, it]);
    }
    hits.sort((a, b) => b[0] - a[0]);
    if (!hits.length) { box.innerHTML = `<div class="empty">“${escH(raw)}”에 대한 결과가 없습니다.</div>`; box.hidden = false; return; }
    box.innerHTML = hits.slice(0, 24).map(([, it]) => {
      const X = norm(it.x), first = terms.map(t => X.indexOf(norm(t))).filter(i => i >= 0).sort((a, b) => a - b)[0] ?? 0;
      const start = Math.max(0, first - 40);
      const snip = (start ? '… ' : '') + it.x.slice(start, start + 130) + (it.x.length > start + 130 ? ' …' : '');
      const chap = it.c !== it.t ? `<span class="rc">${escH(it.c.replace(/:.*$/, ''))}</span>` : '';
      return `<a href="#${it.id}" role="option"><div class="rt">${highlight(it.t, terms)}${chap}</div><div class="rx">${highlight(snip, terms)}</div></a>`;
    }).join('');
    box.hidden = false;
  };
  q.addEventListener('input', run);
  q.addEventListener('focus', () => { if (q.value.trim()) run(); });
  q.addEventListener('keydown', e => {
    const items = $$('a', box);
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); if (!items.length) return;
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.classList.toggle('sel', i === sel)); items[sel].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const a = items[sel >= 0 ? sel : 0]; if (a) { location.hash = a.getAttribute('href'); box.hidden = true; q.blur(); }
    } else if (e.key === 'Escape') { q.value = ''; run(); q.blur(); }
  });
  box.addEventListener('click', e => { if (e.target.closest('a')) { box.hidden = true; q.blur(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) box.hidden = true; });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== q && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); q.focus(); }
  });
})();
