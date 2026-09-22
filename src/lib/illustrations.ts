/* ==========================================================================
   SRMMUN 2026 — SVG illustration library
   Inline SVG generators and hydration helper.
   ========================================================================== */

import { buildTowerSvg } from './tower';

export type IllustrationRenderer = (arg?: any) => string;

const S: Record<string, IllustrationRenderer> = {};

function wrap(viewBox: string, body: string, cls?: string, extra?: string): string {
  return '<svg class="illo ' + (cls || '') + '" viewBox="' + viewBox +
    '" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ' +
    (extra || '') + '>' + body + '</svg>';
}

const SW = 'stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';

/* =================================================== 1. THE COLONNADE MARK */
const VP_X = 2456;
const VP_Y = 679.5;

function edgeY(x: number, x0: number, y0: number): number {
  return y0 + (x - x0) / (VP_X - x0) * (VP_Y - y0);
}

const ARCHES = [
  [935, 999, 301], [1062, 1119, 352], [1178, 1230, 399],
  [1283, 1330, 441], [1378, 1420, 480], [1466, 1504, 516], [1546, 1576, 545]
];
const COLS = [
  [0, 39, 515, 1062], [83, 125, 480, 1098], [174, 220, 442, 1135],
  [273, 325, 399, 1176], [383, 441, 352, 1221], [506, 570, 300, 1272]
];

function archPath(x0: number, x1: number, top: number, bottom: number): string {
  const r = (x1 - x0) / 2;
  return 'M ' + x0 + ' ' + bottom + ' L ' + x0 + ' ' + (top + r) +
         ' A ' + r + ' ' + r + ' 0 0 1 ' + x1 + ' ' + (top + r) +
         ' L ' + x1 + ' ' + bottom + ' Z';
}

(function buildColonnade() {
  const slab = 'M 760 3 L 1600 ' + edgeY(1600, 760, 3).toFixed(1) +
               ' L 1600 ' + edgeY(1600, 748, 1356).toFixed(1) + ' L 748 1356 Z';
  const cuts = ARCHES.map(function (a, i) {
    const xm = (a[0] + a[1]) / 2;
    return '<path class="cn-arch" data-i="' + i + '" d="' +
           archPath(a[0], a[1], a[2], edgeY(xm, 748, 1356) + 40) + '"/>';
  }).join('');
  const cols = COLS.map(function (c, i) {
    return '<path class="cn-col" data-i="' + i + '" d="' + archPath(c[0], c[1], c[2], c[3]) + '"/>';
  }).join('');

  let cnSeq = 0;
  S.colonnade = function (uid?: string) {
    uid = uid || ('cn' + (++cnSeq));
    return wrap('0 0 1600 1359',
      '<defs><mask id="' + uid + '-m" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1359">' +
      '<path d="' + slab + '" fill="#fff"/><g fill="#000">' + cuts + '</g></mask></defs>' +
      '<g class="cn-slab-g" fill="currentColor"><path class="cn-slab" d="' + slab + '" mask="url(#' + uid + '-m)"/></g>' +
      '<g class="cn-cols" fill="currentColor">' + cols + '</g>',
      'illo--colonnade');
  };
})();

/* ================================================= 2. THE SRM CLOCK TOWER */
S.tower = function () {
  return buildTowerSvg();
};

/* ============================================================== 3. GAVEL */
S.gavel = function () {
  return wrap('0 0 200 160',
    '<g id="gv-block"><rect x="36" y="120" width="128" height="16" rx="5" fill="currentColor" opacity=".9"/>' +
    '<rect x="46" y="112" width="108" height="10" rx="4" fill="currentColor" opacity=".55"/></g>' +
    '<g id="gv-gavel" style="transform-box:fill-box;transform-origin:88% 62%">' +
    '<rect x="30" y="34" width="66" height="34" rx="9" fill="currentColor"/>' +
    '<rect x="38" y="34" width="5" height="34" fill="var(--n-0,#fff)" opacity=".3"/>' +
    '<rect x="83" y="34" width="5" height="34" fill="var(--n-0,#fff)" opacity=".3"/>' +
    '<rect x="94" y="45" width="76" height="11" rx="5.5" fill="currentColor"/>' +
    '<circle cx="168" cy="50.5" r="7.5" fill="currentColor"/>' +
    '</g>' +
    '<g id="gv-rings" opacity="0">' +
    '<ellipse cx="63" cy="116" rx="26" ry="7" stroke="currentColor" stroke-width="1.4" opacity=".7"/>' +
    '<ellipse cx="63" cy="116" rx="42" ry="11" stroke="currentColor" stroke-width="1.1" opacity=".45"/>' +
    '<ellipse cx="63" cy="116" rx="60" ry="15" stroke="currentColor" stroke-width="0.9" opacity=".25"/>' +
    '</g>', 'illo--gavel');
};

/* ============================================== 4. DELEGATE BADGE */
S.badge = function () {
  return wrap('0 0 220 340',
    '<g id="bd-swing" style="transform-box:fill-box;transform-origin:50% 2%">' +
    '<path d="M110 6 L66 96" stroke="var(--g-700,#262626)" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M110 6 L154 96" stroke="var(--g-700,#262626)" stroke-width="7" stroke-linecap="round"/>' +
    '<rect x="101" y="92" width="18" height="22" rx="4" fill="currentColor" opacity=".6"/>' +
    '<g id="bd-card">' +
    '<rect x="34" y="110" width="152" height="212" rx="12" fill="var(--n-0,#fff)" stroke="currentColor" stroke-width="1.6"/>' +
    '<rect x="34" y="110" width="152" height="44" rx="12" fill="var(--g-800,#171717)"/>' +
    '<rect x="34" y="142" width="152" height="12" fill="var(--g-800,#171717)"/>' +
    '<rect x="48" y="126" width="52" height="7" rx="3.5" fill="var(--g-300,#a3a3a3)"/>' +
    '<rect x="140" y="124" width="32" height="11" rx="5.5" fill="var(--g-400,#737373)" opacity=".8"/>' +
    '<rect x="52" y="170" width="54" height="60" rx="6" fill="var(--g-100,#ececec)" stroke="currentColor" stroke-width="1" opacity=".95"/>' +
    '<circle cx="79" cy="192" r="11" fill="currentColor" opacity=".3"/>' +
    '<path d="M60 228 q19-22 38 0 Z" fill="currentColor" opacity=".3"/>' +
    '<rect x="118" y="172" width="52" height="6" rx="3" fill="currentColor" opacity=".75"/>' +
    '<rect x="118" y="186" width="40" height="5" rx="2.5" fill="currentColor" opacity=".4"/>' +
    '<rect x="118" y="200" width="48" height="5" rx="2.5" fill="currentColor" opacity=".4"/>' +
    '<rect x="118" y="214" width="30" height="5" rx="2.5" fill="currentColor" opacity=".4"/>' +
    '<rect x="52" y="246" width="118" height="7" rx="3.5" fill="currentColor" opacity=".8"/>' +
    '<rect x="52" y="260" width="80" height="5" rx="2.5" fill="currentColor" opacity=".35"/>' +
    '<g opacity=".8">' +
    '<rect x="52" y="280" width="30" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
    '<rect x="57" y="285" width="8" height="8" fill="currentColor"/>' +
    '<rect x="69" y="285" width="4" height="4" fill="currentColor"/>' +
    '<rect x="57" y="297" width="4" height="4" fill="currentColor"/>' +
    '<rect x="66" y="297" width="4" height="4" fill="currentColor"/>' +
    '<rect x="72" y="301" width="5" height="5" fill="currentColor"/>' +
    '</g>' +
    '<rect x="94" y="284" width="76" height="22" rx="11" fill="var(--g-100,#ececec)" stroke="var(--g-300,#a3a3a3)" stroke-width="1"/>' +
    '<rect x="106" y="292" width="52" height="6" rx="3" fill="var(--g-800,#171717)" opacity=".7"/>' +
    '</g></g>', 'illo--badge');
};

/* ========================================================== 5. POSITION PAPER */
S.paper = function (n?: number) {
  const count = n || 3;
  let out = '';
  for (let i = count - 1; i >= 0; i--) {
    const dx = i * 9, dy = i * -7, rot = (i - 1) * 2.4;
    let lines = '';
    for (let l = 0; l < 9; l++) {
      const w = [78, 92, 64, 88, 80, 94, 58, 86, 40][l];
      lines += '<rect x="26" y="' + (78 + l * 15) + '" width="' + w + '" height="4.5" rx="2.25" ' +
               'fill="currentColor" opacity="' + (0.14 + (l % 3) * 0.05) + '"/>';
    }
    out += '<g class="pp-sheet" data-i="' + i + '" transform="translate(' + dx + ',' + dy + ') rotate(' + rot + ' 70 110)">' +
      '<rect x="14" y="14" width="112" height="158" rx="4" fill="var(--paper,#faf7f0)" stroke="currentColor" stroke-width="1.2" stroke-opacity=".35"/>' +
      '<rect x="26" y="30" width="52" height="8" rx="4" fill="var(--g-700,#262626)" opacity=".8"/>' +
      '<rect x="26" y="46" width="76" height="5" rx="2.5" fill="currentColor" opacity=".3"/>' +
      '<line x1="26" y1="64" x2="114" y2="64" stroke="currentColor" stroke-width="1" stroke-opacity=".25"/>' +
      lines +
      '<circle cx="100" cy="150" r="13" fill="none" stroke="var(--red-seal,#9b2c2c)" stroke-width="1.2" opacity=".55"/>' +
      '<circle cx="100" cy="150" r="9" fill="none" stroke="var(--red-seal,#9b2c2c)" stroke-width="0.7" stroke-dasharray="2 2" opacity=".5"/>' +
      '</g>';
  }
  return wrap('0 0 160 200', out, 'illo--paper');
};

/* =============================================================== 6. LAPTOP */
S.laptop = function () {
  return wrap('0 0 240 170',
    '<g id="lt-lid" style="transform-box:fill-box;transform-origin:50% 100%">' +
    '<rect x="44" y="18" width="152" height="100" rx="7" fill="currentColor"/>' +
    '<rect x="52" y="26" width="136" height="84" rx="3" fill="var(--g-950,#0a0a0a)"/>' +
    '<g id="lt-screen" opacity=".95">' +
    '<rect x="62" y="36" width="44" height="5" rx="2.5" fill="var(--g-400,#737373)"/>' +
    '<rect x="62" y="48" width="72" height="4" rx="2" fill="var(--g-200,#d4d4d4)" opacity=".5"/>' +
    '<rect x="62" y="58" width="60" height="4" rx="2" fill="var(--g-200,#d4d4d4)" opacity=".35"/>' +
    '<rect x="62" y="68" width="80" height="4" rx="2" fill="var(--g-200,#d4d4d4)" opacity=".35"/>' +
    '<rect x="62" y="78" width="38" height="4" rx="2" fill="var(--g-200,#d4d4d4)" opacity=".25"/>' +
    '<rect x="146" y="36" width="34" height="34" rx="4" fill="var(--g-700,#262626)" opacity=".45"/>' +
    '<rect x="146" y="78" width="34" height="4" rx="2" fill="var(--g-200,#d4d4d4)" opacity=".3"/>' +
    '<rect x="62" y="90" width="52" height="10" rx="5" fill="var(--g-500,#525252)"/>' +
    '</g></g>' +
    '<g id="lt-base">' +
    '<path d="M28 118 H212 L226 140 H14 Z" fill="currentColor"/>' +
    '<rect x="14" y="140" width="212" height="8" rx="4" fill="currentColor" opacity=".72"/>' +
    '<rect x="96" y="124" width="48" height="5" rx="2.5" fill="var(--n-0,#fff)" opacity=".28"/>' +
    '</g>', 'illo--laptop');
};

/* ============================================================== 7. PLACARD */
S.placard = function (label?: string) {
  const lbl = label || '';
  return wrap('0 0 200 150',
    '<g id="pc-card" style="transform-box:fill-box;transform-origin:50% 100%">' +
    '<path d="M100 24 L176 44 V104 L100 92 Z" fill="currentColor" opacity=".22"/>' +
    '<path d="M100 24 L24 44 V104 L100 92 Z" fill="var(--n-0,#fff)" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
    '<line x1="100" y1="24" x2="100" y2="92" stroke="currentColor" stroke-width="1.6" opacity=".55"/>' +
    '<g transform="matrix(1,0.26,0,1,0,0)">' +
    '<rect x="36" y="38" width="54" height="9" rx="4.5" fill="currentColor" opacity=".82"/>' +
    '<rect x="36" y="53" width="34" height="5" rx="2.5" fill="currentColor" opacity=".32"/>' +
    '<rect x="36" y="26" width="18" height="4" rx="2" fill="var(--g-500,#525252)"/>' +
    '</g>' +
    '</g>' +
    '<ellipse cx="100" cy="106" rx="80" ry="7" fill="currentColor" opacity=".13"/>' +
    '<rect x="14" y="112" width="172" height="7" rx="3.5" fill="currentColor" opacity=".5"/>' +
    (lbl ? '<text x="62" y="62" text-anchor="middle" transform="rotate(9 62 62)" ' +
      'font-family="Times New Roman,serif" font-size="15" fill="currentColor">' + lbl + '</text>' : ''),
    'illo--placard');
};

/* ================================================== 8. GLOBE + WREATH MARK */
S.emblem = function () {
  let mer = '';
  for (let i = 1; i <= 3; i++) {
    const rx = 44 * (i / 4);
    mer += '<ellipse cx="100" cy="100" rx="' + rx.toFixed(1) + '" ry="44" stroke="currentColor" stroke-width="1" opacity=".5"/>';
  }
  let par = '';
  [-30, 0, 30].forEach(function (y) {
    const w = Math.sqrt(Math.max(0, 1 - (y / 44) * (y / 44))) * 44;
    par += '<line x1="' + (100 - w).toFixed(1) + '" y1="' + (100 + y) + '" x2="' + (100 + w).toFixed(1) +
           '" y2="' + (100 + y) + '" stroke="currentColor" stroke-width="1" opacity=".5"/>';
  });
  let leaves = '';
  for (let s = 0; s < 2; s++) {
    for (let n = 0; n < 9; n++) {
      const ang = (s ? 1 : -1) * (24 + n * 15);
      const rr = 62;
      leaves += '<g transform="rotate(' + ang + ' 100 100)">' +
        '<path d="M100 ' + (100 - rr) + ' q7 -6 13 -1 q-5 8 -13 8 Z" fill="currentColor" opacity=".8" ' +
        'transform="rotate(' + (s ? 18 : -18) + ' 100 ' + (100 - rr) + ')"/></g>';
    }
  }
  return wrap('0 0 200 200',
    '<circle cx="100" cy="100" r="44" stroke="currentColor" stroke-width="1.6"/>' + mer + par +
    '<path d="M72 78 q14 6 26 0 q12 -6 24 4 q-10 12 -26 10 q-18 -2 -24 -14 Z" fill="currentColor" opacity=".78"/>' +
    '<path d="M78 118 q16 -4 28 4 q10 8 22 2 q-8 14 -26 14 q-20 0 -24 -20 Z" fill="currentColor" opacity=".78"/>' +
    '<g id="em-wreath">' + leaves + '</g>' +
    '<path d="M100 168 q-4 8 0 14 q4 -6 0 -14 Z" fill="currentColor" opacity=".7"/>',
    'illo--emblem');
};

/* ======================================================== 9. SMALL OBJECTS */
S.mic = function () {
  return wrap('0 0 120 160',
    '<ellipse cx="60" cy="146" rx="34" ry="8" fill="currentColor" opacity=".85"/>' +
    '<rect x="52" y="120" width="16" height="24" rx="6" fill="currentColor" opacity=".7"/>' +
    '<path d="M60 120 C60 84 34 86 34 56" ' + SW + ' stroke-width="4" fill="none"/>' +
    '<rect x="20" y="22" width="28" height="40" rx="14" fill="currentColor"/>' +
    '<line x1="26" y1="32" x2="42" y2="32" stroke="var(--n-0,#fff)" stroke-width="1.4" opacity=".45"/>' +
    '<line x1="26" y1="40" x2="42" y2="40" stroke="var(--n-0,#fff)" stroke-width="1.4" opacity=".45"/>' +
    '<line x1="26" y1="48" x2="42" y2="48" stroke="var(--n-0,#fff)" stroke-width="1.4" opacity=".45"/>' +
    '<circle id="mic-live" cx="60" cy="132" r="3.4" fill="var(--g-500,#525252)"/>', 'illo--mic');
};

S.pen = function () {
  return wrap('0 0 200 200',
    '<g transform="rotate(-38 100 100)">' +
    '<rect x="88" y="32" width="24" height="98" rx="6" fill="currentColor"/>' +
    '<rect x="88" y="64" width="24" height="9" fill="var(--brass,#b08a3e)"/>' +
    '<path d="M88 130 h24 l-12 34 Z" fill="var(--brass,#b08a3e)"/>' +
    '<line x1="100" y1="140" x2="100" y2="158" stroke="var(--n-0,#fff)" stroke-width="1.4" opacity=".5"/>' +
    '<rect x="106" y="40" width="5" height="30" rx="2.5" fill="var(--n-0,#fff)" opacity=".22"/>' +
    '</g>', 'illo--pen');
};

S.resolution = function () {
  return wrap('0 0 200 160',
    '<path d="M32 26 q10 -10 20 0 v108 q-10 10 -20 0 Z" fill="currentColor" opacity=".25"/>' +
    '<rect x="42" y="20" width="116" height="120" rx="3" fill="var(--paper,#faf7f0)" stroke="currentColor" stroke-width="1.3" stroke-opacity=".4"/>' +
    '<rect x="56" y="36" width="48" height="7" rx="3.5" fill="var(--g-700,#262626)" opacity=".85"/>' +
    '<rect x="56" y="54" width="88" height="4" rx="2" fill="currentColor" opacity=".25"/>' +
    '<rect x="56" y="66" width="76" height="4" rx="2" fill="currentColor" opacity=".25"/>' +
    '<rect x="56" y="78" width="84" height="4" rx="2" fill="currentColor" opacity=".25"/>' +
    '<rect x="56" y="90" width="58" height="4" rx="2" fill="currentColor" opacity=".25"/>' +
    '<circle cx="136" cy="112" r="14" fill="var(--red-seal,#9b2c2c)" opacity=".9"/>' +
    '<circle cx="136" cy="112" r="9" fill="none" stroke="var(--n-0,#fff)" stroke-width="1" opacity=".6"/>' +
    '<path d="M136 126 l-7 18 7 -5 7 5 Z" fill="var(--red-seal,#9b2c2c)" opacity=".9"/>', 'illo--resolution');
};

S.chit = function () {
  return wrap('0 0 140 110',
    '<path d="M14 22 H126 V88 H14 Z" fill="var(--paper,#faf7f0)" stroke="currentColor" stroke-width="1.2" stroke-opacity=".4"/>' +
    '<path d="M14 22 L70 60 L126 22" stroke="currentColor" stroke-width="1.2" stroke-opacity=".4" fill="none"/>' +
    '<path d="M14 88 L58 52 M126 88 L82 52" stroke="currentColor" stroke-width="1" stroke-opacity=".22" fill="none"/>', 'illo--chit');
};

S.hourglass = function () {
  return wrap('0 0 120 180',
    '<rect x="22" y="14" width="76" height="9" rx="4.5" fill="currentColor"/>' +
    '<rect x="22" y="157" width="76" height="9" rx="4.5" fill="currentColor"/>' +
    '<path d="M32 23 h56 L62 88 v4 L88 157 H32 L58 92 v-4 Z" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
    '<path id="hg-top" d="M38 30 h44 L62 84 Z" fill="var(--g-400,#737373)" opacity=".85"/>' +
    '<path id="hg-bot" d="M46 150 h28 L60 122 Z" fill="var(--g-400,#737373)" opacity=".85"/>' +
    '<line id="hg-stream" x1="60" y1="92" x2="60" y2="146" stroke="var(--g-500,#525252)" stroke-width="1.6" stroke-linecap="round"/>', 'illo--hourglass');
};

S.flags = function (n?: number) {
  const count = n || 5;
  let out = '';
  for (let i = 0; i < count; i++) {
    const x = 20 + i * 42;
    out += '<g class="fl-pole" data-i="' + i + '">' +
      '<line x1="' + x + '" y1="26" x2="' + x + '" y2="150" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="' + x + '" cy="24" r="3" fill="currentColor"/>' +
      '<path class="fl-cloth" d="M' + (x + 2) + ' 32 q14 6 28 0 q-4 12 0 24 q-14 6 -28 0 Z" ' +
      'fill="currentColor" opacity="' + (0.85 - i * 0.1).toFixed(2) + '"/></g>';
  }
  return wrap('0 0 ' + (20 + count * 42 + 20) + ' 160', out, 'illo--flags');
};

S.folder = function () {
  return wrap('0 0 200 160',
    '<g id="fd-back"><path d="M18 40 h58 l12 16 h94 v92 H18 Z" fill="currentColor" opacity=".35"/></g>' +
    '<g id="fd-papers">' +
    '<rect class="fd-sheet" x="44" y="44" width="112" height="86" rx="3" fill="var(--paper,#faf7f0)" stroke="currentColor" stroke-width="1.1" stroke-opacity=".3"/>' +
    '<rect class="fd-sheet" x="52" y="38" width="112" height="92" rx="3" fill="var(--n-0,#fff)" stroke="currentColor" stroke-width="1.1" stroke-opacity=".35"/>' +
    '<rect x="64" y="52" width="42" height="6" rx="3" fill="var(--g-700,#262626)" opacity=".8"/>' +
    '<rect x="64" y="66" width="76" height="4" rx="2" fill="currentColor" opacity=".26"/>' +
    '<rect x="64" y="78" width="64" height="4" rx="2" fill="currentColor" opacity=".26"/>' +
    '<rect x="64" y="90" width="72" height="4" rx="2" fill="currentColor" opacity=".26"/>' +
    '<rect x="64" y="102" width="40" height="4" rx="2" fill="currentColor" opacity=".26"/>' +
    '</g>' +
    '<g id="fd-front"><path d="M18 56 h164 l-10 82 H28 Z" fill="currentColor" opacity=".92"/>' +
    '<rect x="84" y="90" width="34" height="6" rx="3" fill="var(--n-0,#fff)" opacity=".3"/></g>',
    'illo--folder');
};

S.files = function (n?: number) {
  const count = n || 4;
  let out = '';
  for (let i = 0; i < count; i++) {
    const y = 30 + i * 26, tabX = 26 + (i % 3) * 46;
    out += '<g class="fl-file" data-i="' + i + '">' +
      '<path d="M18 ' + (y + 10) + ' v-8 h' + (tabX - 18) + ' l8 8 h' + (156 - tabX) + ' v18 H18 Z" ' +
      'fill="currentColor" opacity="' + (0.3 + i * 0.16).toFixed(2) + '"/>' +
      '<rect x="' + (tabX + 16) + '" y="' + (y + 14) + '" width="46" height="4" rx="2" fill="var(--n-0,#fff)" opacity=".45"/>' +
      '</g>';
  }
  return wrap('0 0 190 ' + (30 + count * 26 + 22), out, 'illo--files');
};

S.clipboard = function () {
  return wrap('0 0 160 200',
    '<rect x="20" y="26" width="120" height="158" rx="8" fill="currentColor" opacity=".9"/>' +
    '<rect x="30" y="40" width="100" height="134" rx="4" fill="var(--paper,#faf7f0)"/>' +
    '<rect x="58" y="14" width="44" height="22" rx="6" fill="currentColor"/>' +
    '<rect x="66" y="20" width="28" height="10" rx="5" fill="var(--n-0,#fff)" opacity=".5"/>' +
    '<rect x="44" y="58" width="40" height="6" rx="3" fill="var(--g-700,#262626)" opacity=".85"/>' +
    '<g id="cb-rows">' +
    '<g class="cb-row"><rect x="44" y="78" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".5"/><rect x="58" y="80" width="56" height="4" rx="2" fill="currentColor" opacity=".26"/></g>' +
    '<g class="cb-row"><rect x="44" y="98" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".5"/><rect x="58" y="100" width="46" height="4" rx="2" fill="currentColor" opacity=".26"/></g>' +
    '<g class="cb-row"><rect x="44" y="118" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".5"/><rect x="58" y="120" width="52" height="4" rx="2" fill="currentColor" opacity=".26"/></g>' +
    '<g class="cb-row"><rect x="44" y="138" width="8" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".5"/><rect x="58" y="140" width="38" height="4" rx="2" fill="currentColor" opacity=".26"/></g>' +
    '</g>', 'illo--clipboard');
};

S.ballot = function () {
  return wrap('0 0 180 180',
    '<g id="bx-paper" style="transform-box:fill-box;transform-origin:50% 100%">' +
    '<rect x="66" y="16" width="48" height="60" rx="2" fill="var(--paper,#faf7f0)" stroke="currentColor" stroke-width="1.2" stroke-opacity=".4" transform="rotate(-8 90 46)"/>' +
    '<path d="M76 42 l7 8 14 -17" stroke="var(--g-600,#3f3f3f)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 90 46)"/>' +
    '</g>' +
    '<path d="M28 86 h124 l-8 74 H36 Z" fill="currentColor" opacity=".9"/>' +
    '<rect x="22" y="76" width="136" height="16" rx="4" fill="currentColor"/>' +
    '<rect x="68" y="80" width="44" height="7" rx="3.5" fill="var(--g-950,#0a0a0a)"/>' +
    '<rect x="58" y="116" width="64" height="6" rx="3" fill="var(--n-0,#fff)" opacity=".28"/>',
    'illo--ballot');
};

S.earpiece = function () {
  return wrap('0 0 160 160',
    '<path d="M40 74 a40 40 0 0 1 80 0" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<rect x="26" y="70" width="26" height="42" rx="12" fill="currentColor"/>' +
    '<rect x="108" y="70" width="26" height="42" rx="12" fill="currentColor"/>' +
    '<rect x="32" y="80" width="14" height="22" rx="7" fill="var(--g-400,#737373)" opacity=".8"/>' +
    '<rect x="114" y="80" width="14" height="22" rx="7" fill="var(--g-400,#737373)" opacity=".8"/>',
    'illo--earpiece');
};

/* ============================================================== HYDRATION */
export function renderIllustration(name: string, arg?: any): string {
  const fn = S[name];
  if (!fn) return '';
  return typeof fn === 'function' ? fn(arg) : (fn as string);
}

export function hydrateIllustrations(root?: Element | Document | null): void {
  if (typeof document === 'undefined') return;
  const target = root || document;
  const nodes = target.querySelectorAll('[data-illo]');
  Array.prototype.forEach.call(nodes, function (el: HTMLElement) {
    if (el.dataset.illoDone) return;
    const name = el.getAttribute('data-illo');
    if (!name) return;
    const arg = el.getAttribute('data-illo-arg');
    const svg = renderIllustration(name, arg && !isNaN(Number(arg)) ? parseInt(arg, 10) : arg);
    if (!svg) return;
    el.innerHTML = svg;
    el.dataset.illoDone = '1';
  });
  document.dispatchEvent(new CustomEvent('mun:illos-ready', { detail: { root: target } }));
}

export const MUNIllo = {
  render: renderIllustration,
  hydrate: hydrateIllustrations,
  set: S
};

// Also expose on window for legacy compatibility
if (typeof window !== 'undefined') {
  (window as any).MUNIllo = MUNIllo;
  (window as any).MUNTower = buildTowerSvg;
}
