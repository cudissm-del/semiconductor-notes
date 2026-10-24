// 아주 작은 JSX → SVG 문자열 런타임 (빌드 전용)
const KEBAB = new Set(['strokeWidth', 'textAnchor', 'fontSize', 'fontWeight', 'fillOpacity', 'strokeDasharray', 'markerEnd', 'strokeLinecap', 'strokeLinejoin', 'dominantBaseline', 'strokeOpacity']);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const flat = a => a.flat(Infinity).filter(c => c !== null && c !== undefined && c !== false && c !== true);

export function h(tag, props, ...children) {
  const attrs = Object.entries(props || {})
    .filter(([k]) => k !== 'key' && !k.startsWith('data-claude'))
    .map(([k, v]) => ` ${KEBAB.has(k) ? k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()) : k}="${esc(v)}"`)
    .join('');
  const inner = flat(children).map(c => (typeof c === 'object' && c.__html !== undefined) ? c.__html : esc(c)).join('');
  return { __html: `<${tag}${attrs}>${inner}</${tag}>` };
}
