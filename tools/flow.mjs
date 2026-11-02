// 흐름 층(v1 강의노트)과 사전 층(v2 백과)을 잇는 매핑 로더 — content/flow.json 하나에서 양방향 링크를 만든다.
// build.mjs(장 끝 「백과에서 더 깊이」)와 build2.mjs(항목 페이지 「강의에서의 위치」)가 함께 쓴다.
import fs from 'node:fs';
import path from 'node:path';

const DOMAINS = [
  ['process', '공정'], ['structure-materials', '구조·재료'],
  ['metrology', '계측·분석'], ['principles-ops', '원리·운영'],
];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// v1 장 앵커 → 장 제목 (build.mjs의 slug 규칙과 같은 앵커)
function chapterHeadings(notes) {
  const map = new Map();
  for (const line of notes.split('\n')) {
    let m;
    if ((m = line.match(/^## (\d{1,2})\.\s*(.+)$/))) map.set(`ch-${m[1]}`, { num: m[1], title: m[2].trim() });
    else if (line.startsWith('## 심화편')) map.set('deep-afs', { num: 'S', title: line.replace(/^## 심화편:?\s*/, '').trim() });
  }
  return map;
}

export function loadFlow(root) {
  const file = path.join(root, 'content/flow.json');
  const warnings = [];
  if (!fs.existsSync(file)) return null;
  const flow = JSON.parse(fs.readFileSync(file, 'utf8'));
  const max = flow.max_per_entry ?? 2;
  const exceptions = flow.exceptions || {};

  const titles = new Map();
  for (const f of walk(path.join(root, 'content/entries'))) {
    const t = fs.readFileSync(f, 'utf8').match(/^title:\s*(.+)$/m);
    titles.set(path.basename(f, '.md'), t ? t[1].trim() : path.basename(f, '.md'));
  }
  const heads = chapterHeadings(fs.readFileSync(path.join(root, 'content/notes.md'), 'utf8'));

  const chapters = [];
  const byEntry = new Map();
  for (const [id, c] of Object.entries(flow.chapters || {})) {
    const h = heads.get(id);
    if (!h) { warnings.push(`flow.json: 장 앵커 ${id}가 notes.md에 없음`); continue; }
    const label = h.num === 'S' ? '심화편' : `${h.num}장`;
    if (c.mode === 'domains') {
      chapters.push({ id, label, title: h.title, mode: 'domains', domains: DOMAINS, entries: [] });
      continue;
    }
    const entries = [];
    for (const slug of c.entries || []) {
      if (!titles.has(slug)) { warnings.push(`flow.json: ${id}의 항목 ${slug}가 content/entries에 없음`); continue; }
      entries.push({ slug, title: titles.get(slug) });
      if (!byEntry.has(slug)) byEntry.set(slug, []);
      byEntry.get(slug).push({ id, label, title: h.title });
    }
    chapters.push({ id, label, title: h.title, mode: 'entries', entries });
  }
  for (const [slug, list] of byEntry) {
    if (list.length > max && !exceptions[slug]) warnings.push(`flow.json: ${slug}가 ${list.length}개 장에 걸림 (최대 ${max}) — exceptions에 이유를 적거나 줄일 것`);
  }
  const unmapped = [...titles.keys()].filter(s => !byEntry.has(s)).sort();
  return { chapters, byChapter: new Map(chapters.map(c => [c.id, c])), byEntry, unmapped, total: titles.size, warnings };
}
