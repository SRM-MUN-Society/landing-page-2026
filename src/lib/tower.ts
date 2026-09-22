/* ==========================================================================
   SRMMUN 2026 — The SRM Kattankulathur clock tower, drawn to the real thing.
   ========================================================================== */

function urn(cx: number, baseY: number, s: number): string {
  return '<g class="tw-urn" transform="translate(' + cx + ',' + baseY + ') scale(' + s + ')">' +
    '<rect x="-5.2" y="-4" width="10.4" height="4" fill="var(--tw-trim,#f7f3e8)"/>' +
    '<path d="M-4.4 -4 q0 -7.2 4.4 -9.2 q4.4 2 4.4 9.2 Z" fill="var(--tw-trim,#f7f3e8)"/>' +
    '<rect x="-2.6" y="-15.4" width="5.2" height="2.2" rx="1" fill="var(--tw-trim,#f7f3e8)"/>' +
    '<circle cx="0" cy="-17.4" r="2.1" fill="var(--tw-trim,#f7f3e8)"/></g>';
}

export function buildTowerSvg(): string {
  const t: string[] = [];

  /* ---- 1. PLINTH (u 92–100) — solid, blank, no arcade, no steps ------- */
  t.push('<g id="tw-plinth" class="tw-part">');
  t.push('<path d="M2 490 H202.9 V477.8 H2 Z" fill="var(--tw-trim,#f3eee2)"/>');
  t.push('<path d="M8.2 477.8 H196.8 V458.6 H8.2 Z" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<path d="M2 458.6 H202.9 V450.8 H2 Z" fill="var(--tw-trim,#f3eee2)"/>');
  t.push('<path d="M2 458.6 H202.9 V462.6 H2 Z" fill="var(--tw-shade,#c9bfa8)" opacity=".45"/>');
  t.push('</g>');

  /* ---- 2. OPEN ARCHED PAVILION (u 59–92) — the defining stage --------- */
  t.push('<g id="tw-stage" class="tw-part">');
  t.push('<path d="M80.5 450.8 V323.4 A22.1 22.1 0 0 1 124.5 323.4 V450.8 Z" fill="var(--tw-void,#4a4438)"/>');
  t.push('<path d="M88.3 450.8 V330.5 A14.2 14.2 0 0 1 116.7 330.5 V450.8 Z" fill="var(--tw-far,#7d735e)" opacity=".55"/>');
  t.push('<rect x="13.1" y="289.1" width="46.6" height="161.7" fill="var(--tw-body,#f1e5c4)"/>');
  t.push('<rect x="145.4" y="289.1" width="46.6" height="161.7" fill="var(--tw-body,#f1e5c4)"/>');
  for (let g = 1; g < 13; g++) {
    const gy = (289.1 + g * 12.44).toFixed(1);
    t.push('<path d="M13.1 ' + gy + ' H59.7 M145.4 ' + gy + ' H192" stroke="var(--tw-shade,#c9bfa8)" stroke-width="1.2"/>');
  }
  [[61.3], [127.0]].forEach(function (c) {
    const x = c[0];
    t.push('<rect x="' + x + '" y="325.9" width="16.7" height="117.6" fill="var(--tw-trim,#f7f3e8)"/>');
    t.push('<rect x="' + (x - 2.4) + '" y="316.5" width="21.5" height="10.8" rx="1.6" fill="var(--tw-trim,#faf6ec)"/>');
    t.push('<rect x="' + (x - 2.8) + '" y="443" width="22.3" height="8.4" rx="1.4" fill="var(--tw-trim,#faf6ec)"/>');
  });
  t.push('<path d="M59.7 318.5 H145.4 V326 H59.7 Z" fill="var(--tw-trim,#f3eee2)"/>');
  t.push('<path d="M80.5 323.4 A22.1 22.1 0 0 1 124.5 323.4" stroke="var(--tw-trim,#faf6ec)" stroke-width="6" fill="none"/>');
  t.push('<path d="M102.5 301.3 v10" stroke="var(--tw-trim,#f3eee2)" stroke-width="7" stroke-linecap="square"/>');
  t.push('<path d="M2.8 301.3 H202.2 V289.1 H2.8 Z" fill="var(--tw-trim,#faf6ec)"/>');
  t.push('<path d="M2.8 289.1 H202.2 V284.2 H2.8 Z" fill="var(--tw-shade,#c9bfa8)" opacity=".3"/>');
  t.push('</g>');

  /* ---- 3. BALUSTRADE CORNICE (u 56–59) -------------------------------- */
  t.push('<g id="tw-cornice" class="tw-part">');
  t.push('<path d="M0 284.2 H205 V274.4 H0 Z" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<path d="M8.2 274.4 H196.8 V265 H8.2 Z" fill="var(--tw-trim,#f3eee2)"/>');
  t.push('<path d="M0 274.4 H205" stroke="var(--tw-shade,#c9bfa8)" stroke-width="1.2"/>');
  [12.3, 192.7].forEach(function (x) { t.push(urn(x, 265, 0.95)); });
  t.push('</g>');

  /* ---- 4. DIAL CHAMBER (u 26–56) -------------------------------------- */
  t.push('<g id="tw-chamber" class="tw-part">');
  t.push('<rect x="18.5" y="127.4" width="168" height="147" fill="var(--tw-body,#f1e5c4)"/>');
  t.push('<rect x="18.5" y="127.4" width="22" height="147" fill="var(--tw-shade,#c9bfa8)" opacity=".22"/>');
  t.push('<rect x="164.5" y="127.4" width="22" height="147" fill="var(--tw-shade,#c9bfa8)" opacity=".22"/>');
  for (let l = 1; l < 8; l++) {
    const ly = (127.4 + l * 18.37).toFixed(1);
    t.push('<path d="M18.5 ' + ly + ' H40.5 M164.5 ' + ly + ' H186.5" stroke="var(--tw-shade,#c9bfa8)" stroke-width="1"/>');
  }
  t.push('<circle cx="102.5" cy="200.9" r="63.7" fill="var(--tw-dial-rim,#24211c)"/>');
  t.push('<circle cx="102.5" cy="200.9" r="61.5" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<circle cx="102.5" cy="200.9" r="56.8" fill="var(--tw-dial,#fbf9f1)"/>');
  t.push('<circle cx="102.5" cy="200.9" r="54.2" stroke="var(--tw-ink,#1c1a16)" stroke-width="0.7" fill="none"/>');
  t.push('<circle cx="102.5" cy="200.9" r="41.2" stroke="var(--tw-ink,#1c1a16)" stroke-width="0.5" fill="none"/>');

  const ROMAN = ['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];
  for (let h = 0; h < 12; h++) {
    const rad = (h * 30 - 90) * Math.PI / 180;
    const nx = (102.5 + Math.cos(rad) * 47.7).toFixed(1);
    const ny = (200.9 + Math.sin(rad) * 47.7 + 3.2).toFixed(1);
    t.push('<text x="' + nx + '" y="' + ny + '" text-anchor="middle" font-family="Times New Roman, serif" font-size="8.8" font-weight="600" fill="var(--tw-ink,#1c1a16)">' + ROMAN[h] + '</text>');
  }
  for (let m = 0; m < 60; m++) {
    const mrad = (m * 6 - 90) * Math.PI / 180;
    const r1 = (m % 5 === 0) ? 51.5 : 52.8;
    const r2 = 54.0;
    const x1 = (102.5 + Math.cos(mrad) * r1).toFixed(1);
    const y1 = (200.9 + Math.sin(mrad) * r1).toFixed(1);
    const x2 = (102.5 + Math.cos(mrad) * r2).toFixed(1);
    const y2 = (200.9 + Math.sin(mrad) * r2).toFixed(1);
    t.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--tw-ink,#1c1a16)" stroke-width="' + (m % 5 === 0 ? '1.1' : '0.5') + '"/>');
  }

  t.push('<g id="tw-hands" transform="translate(102.5,200.9)">');
  t.push('<g data-hand="hour" class="tw-hand tw-hand--hour"><path d="M-1.8 8 L-1.8 -27 L-3.6 -29.5 L0 -35.5 L3.6 -29.5 L1.8 -27 L1.8 8 Z" fill="var(--tw-ink,#1c1a16)"/><circle cx="0" cy="-21" r="3.2" fill="none" stroke="var(--tw-ink,#1c1a16)" stroke-width="1.1"/></g>');
  t.push('<g data-hand="minute" class="tw-hand tw-hand--minute"><path d="M-1.4 10 L-1.4 -42 L-3 -44 L0 -50 L3 -44 L1.4 -42 L1.4 10 Z" fill="var(--tw-ink,#1c1a16)"/><circle cx="0" cy="-33" r="2.8" fill="none" stroke="var(--tw-ink,#1c1a16)" stroke-width="0.9"/></g>');
  t.push('<g data-hand="second" class="tw-hand tw-hand--second"><line x1="0" y1="12" x2="0" y2="-52" stroke="var(--tw-accent,#9e3223)" stroke-width="0.8"/><circle cx="0" cy="0" r="2.2" fill="var(--tw-accent,#9e3223)"/><circle cx="0" cy="-36" r="1.6" fill="var(--tw-accent,#9e3223)"/></g>');
  t.push('<circle cx="0" cy="0" r="3.4" fill="var(--tw-ink,#1c1a16)"/>');
  t.push('<circle cx="0" cy="0" r="1.2" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('</g>');
  t.push('</g>');

  /* ---- 5. UPPER PEDIMENT CORNICE (u 22–26) ----------------------------- */
  t.push('<g id="tw-pediment" class="tw-part">');
  t.push('<path d="M12.3 127.4 H192.7 V117.6 H12.3 Z" fill="var(--tw-trim,#f3eee2)"/>');
  t.push('<path d="M6.2 117.6 H198.8 V107.8 H6.2 Z" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<path d="M6.2 117.6 H198.8" stroke="var(--tw-shade,#c9bfa8)" stroke-width="1.2"/>');
  t.push('<path d="M6.2 107.8 H198.8 V102.9 H6.2 Z" fill="var(--tw-trim,#faf6ec)"/>');
  [21.5, 183.5].forEach(function (x) { t.push(urn(x, 102.9, 0.9)); });
  t.push('</g>');

  /* ---- 6. ATTIC DRUM (u 17.5–22) -------------------------------------- */
  t.push('<g id="tw-drum" class="tw-part">');
  t.push('<path d="M37.9 102.9 H167.1 V85.8 H37.9 Z" fill="var(--tw-body,#f1e5c4)"/>');
  t.push('<rect x="37.9" y="85.8" width="14" height="17.1" fill="var(--tw-shade,#c9bfa8)" opacity=".22"/>');
  t.push('<rect x="153.1" y="85.8" width="14" height="17.1" fill="var(--tw-shade,#c9bfa8)" opacity=".22"/>');
  t.push('<path d="M30.7 85.8 H174.3 V80.9 H30.7 Z" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('</g>');

  /* ---- 7. GADROONED CHHATRI DOME (u 8.5–17.5) ------------------------- */
  t.push('<g id="tw-dome" class="tw-part">');
  t.push('<path d="M41 80.9 Q41 38 102.5 38 Q164 38 164 80.9 Z" fill="var(--tw-body,#eedfad)"/>');
  const RIBS = [
    'M102.5 38 V80.9',
    'M102.5 38 Q113.8 45 117.9 80.9',
    'M102.5 38 Q91.2 45 87.1 80.9',
    'M102.5 38 Q129.2 48 135.3 80.9',
    'M102.5 38 Q75.8 48 69.7 80.9',
    'M102.5 38 Q146.6 52 153.8 80.9',
    'M102.5 38 Q58.4 52 51.2 80.9'
  ];
  RIBS.forEach(function (d) {
    t.push('<path d="' + d + '" stroke="var(--tw-trim,#faf6ec)" stroke-width="2.6" fill="none"/>');
  });
  t.push('</g>');

  /* ---- 8. DRUM OF THE LANTERN (u 5.4–8.5) ----------------------------- */
  t.push('<g id="tw-lan-drum" class="tw-part">');
  t.push('<rect x="84.7" y="33.3" width="35.6" height="4.7" rx="1.2" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<rect x="88.8" y="27.9" width="27.4" height="5.4" fill="var(--tw-body,#f1e5c4)"/>');
  t.push('</g>');

  /* ---- 9. MINIATURE LANTERN FINIAL (u 0–5.4) -------------------------- */
  t.push('<g id="tw-finial" class="tw-part">');
  t.push('<rect x="87.8" y="22.5" width="29.4" height="5.4" rx="1.2" fill="var(--tw-trim,#faf6ec)"/>');
  t.push('<rect x="92.2" y="12.7" width="20.6" height="10.8" fill="var(--tw-trim,#f7f3e8)"/>');
  t.push('<path d="M92.2 12.7 h20.6 M99.3 12.7 v10.8 M105.7 12.7 v10.8" stroke="var(--tw-shade,#c9bfa8)" stroke-width=".9"/>');
  t.push('<path d="M90.2 12.7 Q102.5 2.5 114.8 12.7 Z" fill="var(--tw-trim,#faf6ec)"/>');
  t.push('<rect x="99.5" y="3.4" width="6" height="2.4" rx="1" fill="var(--tw-trim,#faf6ec)"/>');
  t.push('<circle cx="102.5" cy="1.8" r="2.2" fill="var(--tw-trim,#faf6ec)"/>');
  t.push('</g>');

  return '<svg class="illo illo--tower" viewBox="0 0 205 490" fill="none" ' +
    'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The SRM Kattankulathur clock tower">' +
    '<title>SRM Kattankulathur clock tower</title>' + t.join('') + '</svg>';
}
