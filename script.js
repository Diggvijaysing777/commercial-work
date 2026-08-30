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

// ══════════════════════════════════════════════════════════════
//  PREMIUM UPGRADE : progress · mobile nav · gallery · lightbox
// ══════════════════════════════════════════════════════════════

// ── SCROLL PROGRESS BAR ─────────────────────────
(function(){
  const bar=document.getElementById('progress');
  if(!bar)return;
  const upd=()=>{
    const h=document.documentElement;
    const max=h.scrollHeight-h.clientHeight;
    bar.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';
  };
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);upd();
})();

// ── PHOTO FADE-IN ON DECODE ─────────────────────
document.querySelectorAll('img.ph').forEach(img=>{
  if(img.complete&&img.naturalWidth)img.classList.add('loaded');
  else{
    img.addEventListener('load',()=>img.classList.add('loaded'),{once:true});
    img.addEventListener('error',()=>img.classList.add('loaded'),{once:true});
  }
});

// ── MOBILE NAV ──────────────────────────────────
(function(){
  const burger=document.getElementById('navBurger');
  const links=document.getElementById('navLinks');
  const scrim=document.getElementById('navScrim');
  if(!burger||!links||!scrim)return;
  const close=()=>{document.body.classList.remove('menu-open');document.body.style.overflow='';burger.setAttribute('aria-expanded','false');};
  burger.addEventListener('click',()=>{
    const open=document.body.classList.toggle('menu-open');
    document.body.style.overflow=open?'hidden':'';
    burger.setAttribute('aria-expanded',open?'true':'false');
  });
  scrim.addEventListener('click',close);
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  window.addEventListener('resize',()=>{if(window.innerWidth>900)close();});
})();

// ── GALLERY FILTER ──────────────────────────────
const galItems=document.querySelectorAll('.gal-item');
(function(){
  const btns=document.querySelectorAll('.gf-btn');
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    btns.forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const cat=btn.dataset.cat;
    galItems.forEach(it=>it.classList.toggle('hide',!(cat==='all'||it.dataset.cat===cat)));
  }));
  // desktop custom-cursor grow on gallery frames (figures aren't caught by a,button)
  galItems.forEach(it=>{
    it.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
    it.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
  });
})();

// ── LIGHTBOX ────────────────────────────────────
(function(){
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  const lbImg=document.getElementById('lbImg'),
        lbCap=document.getElementById('lbCap'),
        lbCount=document.getElementById('lbCount');
  let list=[],idx=0;
  const visible=()=>[...galItems].filter(it=>!it.classList.contains('hide'));
  const render=()=>{
    const img=list[idx].querySelector('img');
    lbImg.src=img.currentSrc||img.src;lbImg.alt=img.alt;
    lbCap.textContent=img.alt;
    lbCount.textContent=(idx+1)+' / '+list.length;
  };
  const open=item=>{
    list=visible();idx=list.indexOf(item);if(idx<0)idx=0;
    render();lb.hidden=false;document.body.style.overflow='hidden';
    requestAnimationFrame(()=>lb.classList.add('show'));
  };
  const close=()=>{lb.classList.remove('show');document.body.style.overflow='';setTimeout(()=>{lb.hidden=true;},400);};
  const go=d=>{
    idx=(idx+d+list.length)%list.length;
    lbImg.style.opacity='0';lbImg.style.transform='scale(.98)';
    setTimeout(()=>{render();lbImg.style.opacity='';lbImg.style.transform='';},170);
  };
  galItems.forEach(it=>it.addEventListener('click',()=>open(it)));
  document.getElementById('lbClose').addEventListener('click',close);
  document.getElementById('lbPrev').addEventListener('click',()=>go(-1));
  document.getElementById('lbNext').addEventListener('click',()=>go(1));
  lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('lb-stage'))close();});
  document.addEventListener('keydown',e=>{
    if(lb.hidden)return;
    if(e.key==='Escape')close();
    else if(e.key==='ArrowLeft')go(-1);
    else if(e.key==='ArrowRight')go(1);
  });
  // swipe
  let sx=0;
  lb.addEventListener('touchstart',e=>{sx=e.changedTouches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)go(dx<0?1:-1);},{passive:true});
})();
