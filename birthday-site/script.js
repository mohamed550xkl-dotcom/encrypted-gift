/* ====== عدّل هنا بس ====== */
const C = {
  name: "Zeinab",              // الاسم بالإنجليزي (بيظهر في العناوين)
  nameAr: "زينب",              // الاسم بالعربي
  code: "4826",                // الكود السري
  date: "November 28",         // تاريخ ميلادها (بيظهر في الآخر)
  finalImage: "images/final.webp",
  intro: ["النهارده عيد ميلاد زينب", "وعايز أقولها بطريقتي ♥"],
  chapters: [
    {t: "من أول يوم حسيت إن في حاجة مختلفة فيكي.", i: [3, 7]},
    {t: "كل مرة بنقعد سوا الوقت بيجري، وأنا أتمنى يفضل واقف.", i: [1, 5]},
    {t: "في أي مكان بنروحه، أحلى حاجة فيه إنك جنبي.", i: [8, 9]},
    {t: "أبسط اللحظات معاكي بتتحول لذكرى حلوة.", i: [2, 6]},
    {t: "بتضحكيني حتى في الأيام اللي كنت مش قادر أضحك فيها.", i: [10, 4]},
    {t: "وكل يوم بحبك أكتر من اللي قبله.", i: [11]}
  ],
  cards: [
    ["ضحكتك", "ضحكتك بتنسّيني أي تعب وبتنوّر يومي كله."],
    ["عيونك", "عيونك لما بتبصيلي بحس إن الدنيا كلها بخير."],
    ["قلبك", "حنيتك وطيبة قلبك أحلى حاجة فيكي."]
  ],
  letter:
`حبيبتي،

النهارده يوم مش عادي، لأنه اليوم اللي ربنا خلقك فيه، ومن غيرك حياتي كانت هتبقى أهدى وأقل لونًا بكتير.

مش بعرف أعبّر قد إيه وجودك جنبي بيفرق معايا. معاكي بحس بالأمان، وبضحك من قلبي حتى في أصعب أيامي.

نفسي تعرفي إنك أحلى حاجة حصلتلي، وإني دايمًا جنبك في الفرحة قبل الحزن.

كل سنة وإنتي طيبة يا قلبي، وربنا يحقق لك كل اللي نفسك فيه ويخليكي ليا.

ودلوقتي انزلي تحت، فيه مفاجأة مستنياكي ♥`,
  finalText: "كل سنة وإنتي طيبة يا أجمل حاجة في حياتي ♥\nبحبك."
};
/* ========================== */

const $ = s => document.querySelector(s);
const wait = ms => new Promise(r => setTimeout(r, ms));
const song = $('#song');
/* الأغنية تشتغل أول ما الموقع يفتح (لو المتصفح منع، تشتغل مع أول لمسة) */
song.play().catch(() => {
  const evs = ['pointerdown', 'keydown', 'touchstart'];
  const go = () => { song.play().catch(() => {}); evs.forEach(e => removeEventListener(e, go)); };
  evs.forEach(e => addEventListener(e, go));
});
async function type(el, txt, ms) {
  for (let i = 1; i <= txt.length; i++) { el.textContent = txt.slice(0, i); await wait(ms); }
}

document.querySelectorAll('.nm').forEach(e => e.textContent = C.name);
$('#date2').textContent = C.date;
$('#finalImg').src = C.finalImage;
$('#finalText').textContent = C.finalText;

/* قلوب طايرة */
function heart(big) {
  const h = document.createElement('span');
  h.className = 'h';
  h.textContent = '♥';
  h.style.cssText = `left:${Math.random() * 100}%;font-size:${(big ? 12 : 10) + Math.random() * 22}px;animation-duration:${(big ? 4 : 6) + Math.random() * 7}s`;
  $('#hearts').append(h);
  setTimeout(() => h.remove(), 13000);
}
setInterval(heart, 900);

/* شاشة القفل */
let buf = '';
const dots = [...document.querySelectorAll('.dots i')];
const draw = () => dots.forEach((d, i) => d.classList.toggle('on', i < buf.length));
$('.keys').onclick = e => {
  const k = e.target.dataset.k;
  if (k === undefined) return;
  $('#err').textContent = '';
  if (k === 'del') buf = buf.slice(0, -1);
  else if (k === 'x') buf = '';
  else if (buf.length < 4) buf += k;
  draw();
  if (buf.length === 4) {
    if (buf === C.code) return unlock();
    $('.pad').classList.add('shake');
    $('#err').textContent = 'الكود غلط، جرّبي تاني';
    setTimeout(() => { $('.pad').classList.remove('shake'); buf = ''; draw(); }, 450);
  }
};

async function unlock() {
  song.play().catch(() => {});
  $('#lock').hidden = true;
  $('#welcome').hidden = false;
  for (let i = 0; i < 15; i++) setTimeout(heart, i * 90);
  await wait(2200);
  $('#welcome').hidden = true;
  $('#intro').hidden = false;
  for (const line of C.intro) {
    await type($('#introText'), line, 70);
    await wait(1400);
    $('#introText').textContent = '';
  }
  $('#intro').hidden = true;
  $('#main').hidden = false;
  $('#player').hidden = false;
  scrollTo(0, 0);
  particles();
}

/* القلب المتحرك من النقط */
function particles() {
  const cv = $('#cv'), x = cv.getContext('2d');
  let W, H, P = [], m = {x: -999, y: -999};
  function init() {
    const r = cv.getBoundingClientRect();
    W = cv.width = r.width; H = cv.height = r.height; P = [];
    const s = Math.min(W, H) / 2.9, g = Math.max(8, s / 11);
    for (let i = -1.4 * s; i < 1.4 * s; i += g)
      for (let j = -1.4 * s; j < 1.4 * s; j += g) {
        const a = i / s, b = -j / s;
        if ((a * a + b * b - 1) ** 3 - a * a * b ** 3 < 0)
          P.push({hx: W / 2 + i, hy: H / 2 + j + s * .1, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0});
      }
  }
  init(); addEventListener('resize', init);
  cv.onpointermove = e => { const r = cv.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; };
  cv.onpointerleave = () => m.x = -999;
  x.fillStyle = '#d6336c';
  (function f() {
    x.clearRect(0, 0, W, H);
    for (const p of P) {
      const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
      if (d < 70) { p.vx += dx / d * 2.2; p.vy += dy / d * 2.2; }
      p.vx += (p.hx - p.x) * .05; p.vy += (p.hy - p.y) * .05;
      p.vx *= .85; p.vy *= .85; p.x += p.vx; p.y += p.vy;
      x.globalAlpha = .75; x.beginPath(); x.arc(p.x, p.y, 1.9, 0, 7); x.fill();
    }
    requestAnimationFrame(f);
  })();
}

/* قصتنا */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: .3});
C.chapters.forEach((c, k) => {
  const d = document.createElement('div');
  d.className = 'ch' + (k % 2 ? ' rev' : '');
  d.innerHTML = `<p>${c.t}</p><div class="stack">${c.i.map((n, j) =>
    `<img src="images/memory-${String(n).padStart(2, '0')}.webp" alt="ذكرى" loading="lazy" style="--r:${j ? 5 : -4}deg">`).join('')}</div>`;
  $('#story').append(d);
  io.observe(d);
});

/* كروت الكشط */
C.cards.forEach(([h, t]) => {
  const w = document.createElement('div');
  w.className = 'sc';
  w.innerHTML = `<div class="rv"><b>${h}</b><span>${t}</span></div><canvas width="220" height="220"></canvas>`;
  $('#cards').append(w);
  const c = w.querySelector('canvas'), x = c.getContext('2d');
  x.fillStyle = '#f8b4c8'; x.fillRect(0, 0, 220, 220);
  for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * .6})`; x.fillRect(Math.random() * 220, Math.random() * 220, 2, 2); }
  x.fillStyle = '#8a2346'; x.font = '500 16px "Playfair Display",serif'; x.textAlign = 'center'; x.fillText('Scratch Me', 110, 114);
  let down = false;
  const scratch = e => {
    if (!down) return;
    const r = c.getBoundingClientRect();
    x.globalCompositeOperation = 'destination-out';
    x.beginPath(); x.arc((e.clientX - r.left) * 220 / r.width, (e.clientY - r.top) * 220 / r.height, 20, 0, 7); x.fill();
    const d = x.getImageData(0, 0, 220, 220).data;
    let n = 0; for (let i = 3; i < d.length; i += 16) if (!d[i]) n++;
    if (n > d.length / 16 * .4) { c.style.opacity = 0; c.style.pointerEvents = 'none'; }
  };
  c.onpointerdown = e => { down = true; c.setPointerCapture(e.pointerId); scratch(e); };
  c.onpointermove = scratch;
  c.onpointerup = () => down = false;
});

/* الجواب */
let opened = false;
$('#seal').onclick = async () => {
  if (opened) return;
  opened = true;
  $('#seal').style.animation = 'none';
  await type($('#letter'), C.letter, 40);
};

/* الهدية */
$('#giftBtn').onclick = async () => {
  $('#final').hidden = false;
  await wait(2200);
  $('#last').hidden = true;
  $('#fin').hidden = false;
  setInterval(() => heart(true), 220);
};

/* مشغّل الأغنية */
const pp = $('#pp');
pp.onclick = () => song.paused ? song.play().catch(() => {}) : song.pause();
song.onplay = () => pp.textContent = '❚❚';
song.onpause = () => pp.textContent = '▶';
song.ontimeupdate = () => {
  const t = Math.floor(song.currentTime);
  $('#tm').textContent = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
};
