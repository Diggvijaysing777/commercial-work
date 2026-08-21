// ── LOADER ──────────────────────────────────────
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('gone'),2400));

// ── CURSOR ──────────────────────────────────────
const cd=document.getElementById('cur-dot'),cr=document.getElementById('cur-ring');
let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop)})();
document.addEventListener('mouseleave',()=>{cd.style.opacity='0';cr.style.opacity='0'});
document.addEventListener('mouseenter',()=>{cd.style.opacity='1';cr.style.opacity='0.35'});
document.querySelectorAll('a,button,.dest-card,.pkg-card,.testi-card,.act-item,.stat-box,.feat-item,.trust-item,.why-item,.sdot').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

// ── NAV SCROLL ──────────────────────────────────
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('nav');
  const s=window.scrollY>50;
  nav.classList.toggle('scrolled',s);
  nav.classList.toggle('hero-dark',!s);
});

// ── SEARCH TABS ─────────────────────────────────
function setTab(btn){
  document.querySelectorAll('.sb-tab').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
}

// ── HERO SLIDER ─────────────────────────────────
const slides=[
  {badge:'Spiti Valley, Himachal Pradesh',title:'Discover the<br><em>Soul</em> of the<br>Himalayas',desc:'Handcrafted mountain journeys — hidden valleys, ancient monasteries, and sky-touching peaks only the locals know.'},
  {badge:'Manali, Himachal Pradesh',title:'Where Rivers<br><em>Meet</em> the<br>Snow Peaks',desc:'From apple orchards to snow-clad summits, experience the magic of Kullu Valley\'s most dramatic landscapes.'},
  {badge:'Shimla, Himachal Pradesh',title:'Walk Through<br>Colonial<br><em>Heritage</em>',desc:'The Queen of Hill Stations awaits — Victorian architecture, toy trains, and misty mountain mornings.'}
];
let curSlide=0,slideTimer;
function goSlide(n){
  document.querySelectorAll('.slide').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.sdot').forEach(d=>d.classList.remove('on'));
  document.getElementById('slide'+n).classList.add('active');
  document.querySelectorAll('.sdot')[n].classList.add('on');
  document.getElementById('heroBadge').textContent=slides[n].badge;
  document.getElementById('heroTitle').innerHTML=slides[n].title;
  document.getElementById('heroDesc').textContent=slides[n].desc;
  document.getElementById('curSlideNum').textContent=String(n+1).padStart(2,'0');
  curSlide=n;
}
function nextSlide(){goSlide((curSlide+1)%slides.length)}
slideTimer=setInterval(nextSlide,5500);
document.querySelectorAll('.sdot').forEach((d,i)=>d.addEventListener('click',()=>{clearInterval(slideTimer);goSlide(i);slideTimer=setInterval(nextSlide,5500)}));

// ── SCROLL REVEAL ───────────────────────────────
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// ── PACKAGE FILTER ──────────────────────────────
function filterPkg(type,btn){
  document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.pkg-card').forEach((c,i)=>{
    const show=type==='all'||c.dataset.type===type;
    if(show){c.style.display='';c.style.opacity='0';c.style.transform='translateY(16px)';
      setTimeout(()=>{c.style.transition='opacity .38s,transform .38s';c.style.opacity='1';c.style.transform=''},i*60)}
    else c.style.display='none';
  });
}

// ── COUNTER ANIMATION ───────────────────────────
function animNum(el){
  const raw=el.dataset.target,tgt=parseFloat(raw.replace(/[^0-9.]/g,''));
  const suf=raw.includes('%')?'%':raw.includes('+')?'+':'';
  const dur=1800,start=performance.now();
  (function tick(now){
    const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
    el.textContent=Math.round(e*tgt)+suf;
    if(p<1)requestAnimationFrame(tick);
  })(start);
}
new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.querySelectorAll('[data-target]').forEach(animNum)}),{threshold:.5}).observe(document.getElementById('about'));

// ── FORM SUBMIT ─────────────────────────────────
document.getElementById('submitBtn').addEventListener('click',()=>{
  const btn=document.getElementById('submitBtn');
  btn.textContent='Sending...';btn.disabled=true;
  setTimeout(()=>{
    btn.textContent='✓ Sent!';btn.classList.add('sent');
    const t=document.getElementById('toast');
    t.classList.add('show');
    setTimeout(()=>{t.classList.remove('show');btn.textContent='Send Enquiry →';btn.disabled=false;btn.classList.remove('sent')},4000);
  },1200);
});