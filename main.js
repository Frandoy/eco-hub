// ── Scroll Progress ──
const bar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  if (bar) bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Cursor Glow ──
const glow = document.querySelector('.cursor-glow');
if (glow && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
}

// ── Mobile Menu ──
const ham = document.querySelector('.hamburger'), mob = document.querySelector('.mobile-menu');
if (ham && mob) {
  ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('open'); });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('open'); }));
}

// ── Scroll Reveal ──
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 }).observe && document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => {
  new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 }).observe(el);
});

// ── Counter ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target), suffix = el.dataset.suffix || '', dur = 2200, step = target / (dur / 16);
  let cur = 0;
  const tick = () => { cur = Math.min(cur + step, target); el.textContent = Math.floor(cur).toLocaleString('id-ID') + suffix; if (cur < target) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
document.querySelectorAll('[data-target]').forEach(el => {
  el.textContent = '0';
  new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting && !e.target.dataset.done) { e.target.dataset.done = '1'; animateCounter(e.target); } }), { threshold: .5 }).observe(el);
});

// ── Magnetic Buttons ──
document.querySelectorAll('.btn-primary,.btn-gold').forEach(btn => {
  btn.addEventListener('mousemove', e => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.2}px) translateY(-3px)`; });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// ── Ripple ──
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = this.getBoundingClientRect(), d = Math.max(r.width, r.height), rp = document.createElement('span');
    rp.style.cssText = `position:absolute;width:${d}px;height:${d}px;border-radius:50%;background:rgba(255,255,255,.35);pointer-events:none;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px;animation:ripple .6s ease-out forwards`;
    if (!document.querySelector('#ripple-style')) { const s = document.createElement('style'); s.id='ripple-style'; s.textContent='@keyframes ripple{from{transform:scale(0);opacity:1}to{transform:scale(2.5);opacity:0}}'; document.head.appendChild(s); }
    this.appendChild(rp); setTimeout(() => rp.remove(), 700);
  });
});

// ── Active Nav ──
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a,.mobile-menu a').forEach(a => { if (a.getAttribute('href') === page) a.classList.add('active'); });

// ── Toast ──
function showToast(msg, type='success') {
  const t = document.createElement('div');
  t.innerHTML = `<span>${type==='success'?'✓':'ℹ'}</span><span>${msg}</span>`;
  Object.assign(t.style, { position:'fixed',bottom:'28px',right:'28px',zIndex:'9999',display:'flex',alignItems:'center',gap:'10px',padding:'14px 22px',background:'#fff',borderRadius:'14px',boxShadow:'0 8px 32px rgba(0,0,0,.14)',fontFamily:"'Poppins',sans-serif",fontSize:'.86rem',fontWeight:'500',borderLeft:`4px solid ${type==='success'?'#2D6A4F':'#D4A017'}`,maxWidth:'320px',animation:'slideToast .4s ease' });
  if (!document.querySelector('#toast-style')) { const s=document.createElement('style'); s.id='toast-style'; s.textContent='@keyframes slideToast{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}'; document.head.appendChild(s); }
  document.body.appendChild(t); setTimeout(() => t.remove(), 3500);
}

// ── Typed Text ──
function initTyped(el, words) {
  if (!el) return;
  let wi=0, ci=0, del=false;
  setInterval(() => {
    const w = words[wi];
    if (!del) { el.textContent = w.slice(0,++ci); if(ci===w.length){del=true} }
    else { el.textContent = w.slice(0,--ci); if(ci===0){del=false;wi=(wi+1)%words.length} }
  }, del ? 55 : 95);
}
initTyped(document.querySelector('.typed-text'), ['Taman Sempur','Jl. Sempur','Kota Bogor','Indonesia 2045','Generasi Emas']);