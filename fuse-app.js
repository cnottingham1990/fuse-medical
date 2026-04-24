// ============ PARTICLES ============
(function initParticles(){
  const c = document.getElementById('particles');
  if(!c) return;
  const N = 22;
  for(let i=0;i<N;i++){
    const p = document.createElement('div');
    const cls = ['particle'];
    if(Math.random()<.4) cls.push('p-pur');
    if(Math.random()<.35) cls.push('p-sm');
    else if(Math.random()<.25) cls.push('p-lg');
    p.className = cls.join(' ');
    p.style.left = (Math.random()*100)+'%';
    p.style.animationDelay = (Math.random()*-18)+'s';
    p.style.animationDuration = (14 + Math.random()*14)+'s';
    p.style.setProperty('--tx', ((Math.random()-.5)*200)+'px');
    c.appendChild(p);
  }
})();

// ============ HERO ORBS CURSOR PARALLAX ============
(function initHeroParallax(){
  const scene = document.getElementById('hero-scene');
  if(!scene) return;
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const orbs = scene.querySelectorAll('.hero-orb');

  document.addEventListener('mousemove', (e)=>{
    const r = scene.getBoundingClientRect();
    if(e.clientY > r.bottom + 300) return;
    tx = (e.clientX / window.innerWidth - .5) * 2;
    ty = (e.clientY / window.innerHeight - .5) * 2;
  });

  function tick(){
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    orbs.forEach(o => {
      o.style.setProperty('--x', cx.toFixed(3));
      o.style.setProperty('--y', cy.toFixed(3));
    });
    // ambient orbs gentler
    const atmo = document.querySelectorAll('.atmo-orb');
    atmo.forEach((a,i)=>{
      const mult = (i+1)*8;
      a.style.transform += '';
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

// ============ 3D TILT CARDS ============
function bindTilt(){
  document.querySelectorAll('.svc-card, .pillar, .tg-card, .sch-reason, .sch-prov, .q-item, .hero-stat').forEach(el=>{
    if(el.dataset.tilt) return;
    el.dataset.tilt = '1';
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (y - .5) * -8;
      const ry = (x - .5) * 10;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) translateZ(12px)`;
      el.style.setProperty('--mx', (x*100)+'%');
      el.style.setProperty('--my', (y*100)+'%');
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = '';
    });
  });
}
bindTilt();

// ============ NAV PILL ============
function updateNavPill(){
  const active = document.querySelector('nav.top .middle button.active');
  const pill = document.getElementById('nav-pill');
  if(!active || !pill) return;
  const container = active.parentElement;
  const cr = container.getBoundingClientRect();
  const ar = active.getBoundingClientRect();
  pill.style.width = ar.width + 'px';
  pill.style.transform = `translateX(${ar.left - cr.left}px)`;
}
window.addEventListener('load', updateNavPill);
window.addEventListener('resize', updateNavPill);

// ============ PAGE SWITCH ============
function goTo(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const pg = document.getElementById('page-'+page);
  if(pg) pg.classList.add('active');
  document.querySelectorAll('nav.top .middle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.nav === page);
  });
  updateNavPill();
  window.scrollTo({top:0,behavior:'instant'});
  try{ localStorage.setItem('fuse5-page', page); }catch(e){}

  if(page === 'team') initTeam();
  if(page === 'schedule') initSchedule();
}
window.goTo = goTo;

// restore page
try{
  const saved = localStorage.getItem('fuse5-page');
  if(saved && ['home','team','restoration','schedule'].includes(saved)){
    goTo(saved);
  }
}catch(e){}

// ============ TEAM ============
const TEAM = [
  {id:'tammy', name:'Tammy Whitehead', role:'Co-Founder · Lead Clinician', cat:'clinical', tone:'a-blue', tag:'DNP, APRN, FNP-C, PMHNP-BC, CNE', photo:'images/team/tammy-whitehead.jpg', bio:[
    `With over 31 years of experience in the medical field, <strong>Dr. Tammy Whitehead</strong> is a compassionate and highly skilled provider committed to improving the lives of her patients and community.`,
    `Tammy earned her Master of Science in Nursing (MSN) degree in 2009, becoming a Family Nurse Practitioner. She advanced her education by completing a Doctorate in Nursing Practice and earning her certification as a <strong>Psychiatric-Mental Health Nurse Practitioner (PMHNP)</strong> in 2020. In 2021, Tammy and her husband Devin fulfilled a shared dream by opening Fuse Medical in their hometown of London, KY.`,
    `Tammy's career spans <strong>cardiology, family practice, and urgent care</strong>. As an Assistant Professor at Frontier Nursing University since 2012, she has shared her expertise with future generations of healthcare providers.`,
    `She specializes in treating individuals with severe mental illness, substance use disorders, and attention deficit disorders. Outside of her professional life, Tammy is a devoted wife, mother of three, and grandmother of seven.`
  ]},
  {id:'devin', name:'Devin Whitehead', role:'Co-Founder · Family Nurse Practitioner', cat:'clinical', tone:'a-purple', tag:'DNP, APRN, FNP-C', photo:'images/team/devin-whitehead.jpg', bio:[
    `With over 15 years of experience in the medical field, <strong>Dr. Devin Whitehead</strong> is a dedicated Family Nurse Practitioner known for his compassionate approach and expertise in managing chronic illnesses and providing inclusive care.`,
    `Devin earned his Master of Science in Nursing from Frontier Nursing University in 2015 and his Doctorate in Nursing Practice in 2019. During his time at Lexington Clinic, Devin demonstrated a particular passion for working with college students, addressing concerns related to <strong>gender identity and transgender care</strong>.`,
    `After the onset of the COVID-19 pandemic, Devin and Tammy returned to their hometown and opened Fuse Medical in 2021.`
  ]},
  {id:'hannah', name:'Hannah Norris', role:'Family Nurse Practitioner', cat:'clinical', tone:'a-sky', tag:'MSN, APRN, FNP-BC', photo:'images/team/hannah-norris.jpg', bio:[
    `We are thrilled to have <strong>Hannah Norris, MSN, APRN, FNP-BC</strong>, as part of our Fuse Medical team. With a passion for patient care and a wealth of expertise, Hannah is continuing to accept new patients, including walk-ins.`,
    `Her extensive background as a Family Nurse Practitioner allows her to meet a wide range of healthcare needs with excellence and empathy. Whether you're seeking preventive care, management of a chronic condition, or immediate walk-in services, Hannah is here to support your health and wellness journey.`
  ]},
  {id:'cheyenne', name:'Cheyenne Hamblin', role:'Psychiatric Mental Health NP', cat:'clinical', tone:'a-ink', tag:'MSN, APRN, PMHNP-BC', photo:'images/team/cheyenne-hamblin.jpg', bio:[
    `<strong>Cheyenne Hamblin, PMHNP-BC</strong> is a dedicated psychiatric mental health nurse practitioner with more than eight years of experience in inpatient psychiatric care.`,
    `She provides compassionate, evidence-based treatment to a broad population of both adult and pediatric patients. In recognition of her outstanding service, she was named <strong>Mental Health Provider of the Year in 2025</strong> in the local area.`,
    `Outside of her professional role, Cheyenne enjoys spending time outdoors and has a genuine love for people, reflected in her warm and caring approach to patient care.`
  ]},
  {id:'bobbie', name:'Bobbie Zhang', role:'Psychiatric Mental Health NP', cat:'clinical', tone:'a-deep', tag:'MSN, APRN, PMHNP-BC', photo:'images/team/bobbie-zhang.jpg', bio:[
    `<strong>Bobbie Zhang</strong> is a board-certified Psychiatric Mental Health Nurse Practitioner with over 20 years of diverse nursing experience, including geriatrics, corrections, medical-surgical nursing, telemetry, critical care, and behavioral health.`,
    `She earned her MSN from Northern Kentucky University, specializing in psychiatric mental health care across the lifespan. Her clinical interests include <strong>ADHD, substance use disorders, mood disorders, anxiety</strong>, and other psychiatric conditions. She is experienced in medication-assisted treatment (MAT) for substance use disorders.`,
    `She is committed to delivering compassionate, trauma-informed, and patient-centered care.`
  ]},
  {id:'alyssa', name:'Alyssa Thomas', role:'Office Manager & HR Director', cat:'ops', tone:'a-purple', tag:'RN', photo:'images/team/alyssa-thomas.jpg', bio:[
    `Graduated from Galen College's Nursing School in June 2024, Alyssa brings a strong foundation in healthcare with a focus on recovery.`,
    `With experience as a <strong>Recovery Specialist since 2019</strong>, she has empowered clients to reach their goals both individually and in group settings. As a mother to four girls, they motivate her to always work hard and give 100 percent.`,
    `"I firmly believe in recognizing the value in each individual and approach my work with kindness and compassion."`
  ]},
  {id:'quinn', name:'Audra "Quinn" Hunt', role:'Clinical Treatment Coordinator', cat:'support', tone:'a-blue', tag:'BBA, MA Mental Health Counseling', photo:'images/team/audra-quinn-hunt.jpg', bio:[
    `<strong>Quinn Hunt</strong> serves as a Clinical Treatment Coordinator at Fuse Medical, where she has been a dedicated member of the team since 2023.`,
    `She earned her Bachelor's in Business Administration from Morehead State in 2014 and her Master's in Mental Health Counseling from Lindsey Wilson University in 2025. Quinn brings a unique blend of clinical knowledge and organizational expertise, allowing her to effectively coordinate care and support clients throughout their treatment journey.`
  ]},
  {id:'krystal', name:'Krystal Philpot', role:'Mental Health Counselor', cat:'support', tone:'a-sky', tag:'LPCA', photo:'images/team/krystal-philpot.jpg', bio:[
    `<strong>Krystal Philpot, LPCA</strong>, is a dedicated mental health professional with a strong commitment to supporting individuals in achieving balanced and sustainable well-being.`,
    `She earned her BS in Psychology from Eastern Kentucky University in 2022 and her Master of Education in Counseling from Lindsey Wilson University in 2025. She has been actively working in the mental health field since 2020, primarily serving individuals with substance use disorders.`
  ]},
  {id:'breckan', name:'Breckan Fox', role:'Director of Recovery Services', cat:'support', tone:'a-purple', tag:'Peer Support Specialist', photo:'images/team/breckan-fox.jpg', bio:[
    `<strong>Breckan Fox</strong> serves as Director of Recovery Services and Peer Support Specialist with a strong focus on recovery services.`,
    `She plays a vital role in supporting the day-to-day operations of the <strong>Fuse Restoration Living homes</strong>, helping to ensure a stable, structured, and supportive environment for residents.`
  ]},
  {id:'josie', name:'Josie Philpot', role:'Targeted Case Manager', cat:'support', tone:'a-cream', tag:'BS, TCM, TCADC', photo:'images/team/josie-philpot.jpg', bio:[
    `<strong>Josie</strong> is a dedicated Targeted Case Manager with one year of direct experience in case management and a strong background in behavioral health.`,
    `Josie began working in sober living environments in 2022 and has since gained over four years of experience in treatment settings as a substance abuse counselor. Josie earned a bachelor's degree in Substance Use Disorder Counseling from Union College in 2024, and is currently pursuing a master's in Education and Counseling at Lindsey Wilson College.`
  ]},
  {id:'kelsey', name:'Kelsey Fox', role:'Social Work Professional', cat:'support', tone:'a-sky', tag:'MS, TCM', photo:'images/team/kelsey-fox.jpg', bio:[
    `<strong>Kelsey Fox</strong> has earned her master's degree in social work and is actively working toward licensure.`,
    `She brings over <strong>eight years of experience</strong> serving individuals from lower socioeconomic backgrounds and has developed extensive knowledge of community resources and support services. She has a deep passion for working with individuals affected by substance use disorders.`
  ]},
  {id:'haley', name:'Haley Whitehead', role:'Billing & Coding', cat:'ops', tone:'a-deep', tag:'RH-CBS', photo:'images/team/haley-whitehead.jpg', bio:[
    `<strong>Haley Whitehead, RH-CBS</strong> is a highly skilled billing and coding professional with extensive experience in <strong>rural health, behavioral health, and primary care billing</strong>.`,
    `She is well-versed in working with insurance companies and has developed strong expertise in accounts receivable collection, claims management, and timely reimbursement processes.`
  ]},
];

let stackIndex = 0;
const FEATURED = ['tammy','devin','cheyenne','bobbie','hannah'];

function initTeam(){
  const stack = document.getElementById('team-stack');
  if(!stack || stack.dataset.init) return;
  stack.dataset.init = '1';

  // nav
  const navHTML = `<div class="stack-nav">
    <button id="stack-prev"><svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
    <span class="counter" id="stack-counter">01 / ${String(FEATURED.length).padStart(2,'0')}</span>
    <button id="stack-next"><svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  </div>`;

  function renderStack(){
    stack.innerHTML = '';
    FEATURED.forEach((id, i) => {
      const t = TEAM.find(x=>x.id===id);
      if(!t) return;
      const pos = i - stackIndex;
      const hidden = Math.abs(pos) > 2;
      const card = document.createElement('div');
      card.className = 'stack-card';
      card.dataset.pos = pos;
      if(hidden) card.dataset.hidden = '1';
      card.innerHTML = `<div class="stack-portrait ${t.tone}">
        ${t.photo ? `<img class="portrait-photo" src="${t.photo}" alt="${t.name}">` : `<div class="stack-initial">${t.name[0]}</div>`}
        <div class="stack-tag">${t.tag}</div>
        <div class="stack-name">${t.name}</div>
        <div class="stack-role">${t.role}</div>
        <div class="stack-cred">View full bio →</div>
      </div>`;
      card.addEventListener('click', ()=>{
        if(pos === 0) openModal(t);
        else stackIndex = i, renderStack();
      });
      stack.appendChild(card);
    });
    stack.insertAdjacentHTML('beforeend', navHTML);
    document.getElementById('stack-prev').disabled = stackIndex === 0;
    document.getElementById('stack-next').disabled = stackIndex === FEATURED.length-1;
    document.getElementById('stack-counter').textContent = String(stackIndex+1).padStart(2,'0') + ' / ' + String(FEATURED.length).padStart(2,'0');
    document.getElementById('stack-prev').onclick = ()=>{ if(stackIndex>0){ stackIndex--; renderStack(); }};
    document.getElementById('stack-next').onclick = ()=>{ if(stackIndex<FEATURED.length-1){ stackIndex++; renderStack(); }};
  }
  renderStack();

  // filter + grid
  const grid = document.getElementById('team-grid');
  const filter = document.getElementById('team-filter');
  function renderGrid(cat='all'){
    grid.innerHTML = '';
    TEAM.filter(t => cat==='all' || t.cat===cat).forEach(t=>{
      const card = document.createElement('div');
      card.className = 'tg-card';
      card.innerHTML = `
        <div class="tg-portrait ${t.tone}">
          ${t.photo ? `<img class="portrait-photo" src="${t.photo}" alt="${t.name}">` : `<div class="initial">${t.name[0]}</div>`}
          <span class="ph-tag">${t.tag}</span>
        </div>
        <div class="tg-body">
          <div class="role"><span class="dot"></span>${t.role}</div>
          <h3>${t.name}</h3>
          <div class="creds">${t.tag}</div>
          <div class="read">Read bio</div>
        </div>`;
      card.addEventListener('click', ()=>openModal(t));
      grid.appendChild(card);
    });
    bindTilt();
  }
  renderGrid();

  filter.addEventListener('click', (e)=>{
    const b = e.target.closest('button');
    if(!b) return;
    filter.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    renderGrid(b.dataset.filter);
  });
}

function openModal(t){
  const mb = document.getElementById('modal-backdrop');
  const mp = document.getElementById('modal-portrait');
  mp.className = 'modal-portrait';
  mp.innerHTML = `<div class="stack-portrait ${t.tone}" style="position:absolute;inset:0">${t.photo ? `<img class="portrait-photo" src="${t.photo}" alt="${t.name}">` : `<div class="stack-initial">${t.name[0]}</div>`}</div>
    <div class="stack-tag" style="position:relative;z-index:1;color:var(--cream);opacity:.8">${t.tag}</div>`;
  document.getElementById('modal-role').textContent = t.role;
  document.getElementById('modal-name').textContent = t.name;
  document.getElementById('modal-creds').textContent = t.tag;
  document.getElementById('modal-bio').innerHTML = t.bio.map(p=>`<p>${p}</p>`).join('');
  mb.classList.add('open');
}
function closeModal(){ document.getElementById('modal-backdrop').classList.remove('open'); }
window.closeModal = closeModal;

// ============ SCHEDULE ============
const REASONS = [
  {id:'primary', ttl:'Primary care', dsc:'Checkups, acute & chronic care', icn:'<path d="M12 21s-7.5-4.8-7.5-11a4 4 0 0 1 7.5-2 4 4 0 0 1 7.5 2c0 6.2-7.5 11-7.5 11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'},
  {id:'behavioral', ttl:'Behavioral health', dsc:'Therapy, psychiatry, support', icn:'<path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3c0 1.3.8 2.4 2 2.8V15a3 3 0 0 0 3 3M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3c0 1.3-.8 2.4-2 2.8V15a3 3 0 0 1-3 3M12 4v16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'},
  {id:'peds', ttl:'Pediatrics', dsc:'Well-child visits & sick care', icn:'<circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'},
  {id:'recovery', ttl:'Addiction & recovery', dsc:'IOP, outpatient, intake', icn:'<path d="M19 3c0 9-7 15-15 15M5 18c0-6 5-11 13-12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'},
  {id:'new', ttl:'New patient visit', dsc:'Establish care with us', icn:'<path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'},
  {id:'other', ttl:'Something else', dsc:"Tell us what you need", icn:'<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'}
];
const PROVIDERS = [
  {id:'any', name:'First available', sub:'Fastest match', tone:'av-any', abbr:'+'},
  {id:'alyssa', name:'Alyssa Wiley', sub:'PMHNP-BC · Psychiatry', tone:'av-blue', abbr:'A'},
  {id:'fred', name:'Fred Thompson', sub:'APRN, FNP-BC · Primary', tone:'av-deep', abbr:'F'},
  {id:'allison', name:'Allison McDaniel', sub:'APRN, FNP-BC · Primary', tone:'av-purple', abbr:'A'},
  {id:'marcus', name:'Marcus Hale', sub:'LCSW · Therapy', tone:'av-deep', abbr:'M'},
  {id:'sonia', name:'Sonia Mercer', sub:'LMFT · Family therapy', tone:'av-purple', abbr:'S'},
];

const schState = { step:0, reason:null, provider:null, date:null, slot:null, info:{} };
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const today = new Date(); today.setHours(0,0,0,0);
let viewMonth = today.getMonth();
let viewYear = today.getFullYear();

function initSchedule(){
  const wrap = document.getElementById('sch-wrap');
  if(!wrap || wrap.dataset.init) return;
  wrap.dataset.init = '1';

  // reasons
  const rs = document.getElementById('reasons');
  REASONS.forEach(r=>{
    const b = document.createElement('button');
    b.className = 'sch-reason';
    b.innerHTML = `<div class="icn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none">${r.icn}</svg></div>
      <div class="ttl">${r.ttl}</div>
      <div class="dsc">${r.dsc}</div>`;
    b.addEventListener('click', ()=>{
      schState.reason = r;
      rs.querySelectorAll('.sch-reason').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
      document.getElementById('sum-reason').textContent = r.ttl;
      document.getElementById('sum-reason').classList.remove('empty');
      updateNext();
    });
    rs.appendChild(b);
  });

  // providers
  const ps = document.getElementById('providers');
  PROVIDERS.forEach(p=>{
    const b = document.createElement('button');
    b.className = 'sch-prov';
    b.innerHTML = `<div class="av ${p.tone}">${p.abbr}</div>
      <div class="meta"><h4>${p.name}</h4><div class="sub">${p.sub}</div></div>`;
    b.addEventListener('click', ()=>{
      schState.provider = p;
      ps.querySelectorAll('.sch-prov').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
      const el = document.getElementById('sum-prov');
      el.classList.remove('empty');
      el.innerHTML = `<span class="av-mini" style="background:radial-gradient(circle at 30% 30%,#A68CDB,var(--purple))">${p.abbr}</span>${p.name}<small>${p.sub}</small>`;
      renderCalendar();
      updateNext();
    });
    ps.appendChild(b);
  });

  // Form inputs
  ['f-first','f-last','f-dob','f-phone','f-email','f-kind','f-ins','f-notes','f-consent'].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    const ev = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(ev, ()=>{
      schState.info[id] = el.type==='checkbox' ? el.checked : el.value;
      const f = schState.info['f-first']||'', l = schState.info['f-last']||'';
      const pat = document.getElementById('sum-pat');
      if(f||l){ pat.textContent = (f+' '+l).trim(); pat.classList.remove('empty'); }
      else { pat.textContent = 'Enter your information'; pat.classList.add('empty'); }
      updateNext();
    });
  });

  document.getElementById('cal-prev').onclick = ()=>{ shiftMonth(-1); };
  document.getElementById('cal-next').onclick = ()=>{ shiftMonth(1); };

  document.getElementById('sch-next').onclick = nextStep;
  document.getElementById('sch-back').onclick = prevStep;

  renderProgress();
  showStep();
}

function shiftMonth(dir){
  viewMonth += dir;
  if(viewMonth < 0){ viewMonth = 11; viewYear--; }
  if(viewMonth > 11){ viewMonth = 0; viewYear++; }
  renderCalendar();
}

function renderCalendar(){
  document.getElementById('cal-month').textContent = MONTHS[viewMonth];
  document.getElementById('cal-year').textContent = viewYear;
  document.getElementById('cal-prev').disabled = (viewYear===today.getFullYear() && viewMonth===today.getMonth());
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';
  const first = new Date(viewYear, viewMonth, 1);
  const last = new Date(viewYear, viewMonth+1, 0);
  const startDow = first.getDay();
  for(let i=0;i<startDow;i++){ const b = document.createElement('button'); b.className='empty'; grid.appendChild(b); }
  for(let d=1; d<=last.getDate(); d++){
    const date = new Date(viewYear, viewMonth, d);
    const b = document.createElement('button');
    b.textContent = d;
    const dow = date.getDay();
    const isPast = date < today;
    const isToday = date.getTime() === today.getTime();
    const isClosed = dow === 0 || dow === 6; // Sat Sun closed
    if(isPast) b.classList.add('past'), b.disabled = true;
    else if(isClosed) b.classList.add('closed'), b.disabled = true;
    else b.classList.add('avail');
    if(isToday) b.classList.add('today');
    if(schState.date && schState.date.getTime() === date.getTime()) b.classList.add('selected');
    b.addEventListener('click', ()=>{
      if(b.disabled) return;
      schState.date = date;
      schState.slot = null;
      renderCalendar();
      renderSlots();
    });
    grid.appendChild(b);
  }
  renderSlots();
}

function renderSlots(){
  const col = document.getElementById('slots-col');
  if(!schState.date){
    col.innerHTML = '<div class="sch-slots-empty">Select a date<small>to see available times</small></div>';
    return;
  }
  const d = schState.date;
  const dow = d.getDay();
  const baseHours = dow === 5 ? {s:9,e:12} : {s:9,e:17};
  const provSeed = schState.provider ? schState.provider.id : 'any';
  const seed = d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate() + provSeed.charCodeAt(0);
  const slots = [];
  for(let h=baseHours.s; h<baseHours.e; h++){
    for(let m=0; m<60; m+=30){
      const rng = ((seed + h*17 + m*13) * 9301 + 49297) % 233280 / 233280;
      const avail = rng > 0.35;
      slots.push({h,m,avail});
    }
  }
  const fmt = (h,m) => {
    const hr = h===0?12 : h>12?h-12 : h;
    const ap = h<12?'AM':'PM';
    return `${hr}:${String(m).padStart(2,'0')} ${ap}`;
  };
  const now = new Date();
  const isToday = d.getTime() === today.getTime();
  const morning = slots.filter(s => s.h < 12);
  const afternoon = slots.filter(s => s.h >= 12);
  const dStr = d.toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric'});
  let html = `<div class="slots-head">Available on <span class="dt">${dStr}</span></div>
    <div class="slots-sub">Each visit is scheduled for 30 minutes.</div>`;
  function renderGroup(label, arr){
    if(!arr.length) return '';
    return `<div class="sch-slot-group"><div class="lbl">${label}</div><div class="sch-slot-grid">${arr.map(s=>{
      const past = isToday && (s.h < now.getHours() || (s.h===now.getHours() && s.m <= now.getMinutes()));
      const dis = !s.avail || past;
      const sel = schState.slot && schState.slot.h===s.h && schState.slot.m===s.m;
      return `<button class="sch-slot${sel?' selected':''}" data-h="${s.h}" data-m="${s.m}" ${dis?'disabled':''}>${fmt(s.h,s.m)}</button>`;
    }).join('')}</div></div>`;
  }
  html += renderGroup('Morning', morning) + renderGroup('Afternoon', afternoon);
  col.innerHTML = html;
  col.querySelectorAll('.sch-slot:not([disabled])').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      schState.slot = { h: +btn.dataset.h, m: +btn.dataset.m };
      renderSlots();
      const dStr = d.toLocaleDateString('en-US',{weekday:'short', month:'short', day:'numeric'});
      const el = document.getElementById('sum-when');
      el.classList.remove('empty');
      el.innerHTML = `${dStr}<small>at ${fmt(schState.slot.h, schState.slot.m)} ET · 30 min</small>`;
      updateNext();
    });
  });
}

function renderProgress(){
  const rail = document.getElementById('sch-progress');
  const steps = ['Reason','Provider','Date & Time','Info'];
  rail.innerHTML = steps.map((s,i)=>{
    const cls = i < schState.step ? 'done' : i === schState.step ? 'active' : '';
    return `<span class="step ${cls}"><span class="nm">${i+1}</span><span>${s}</span></span>${i<steps.length-1?'<span class="link"></span>':''}`;
  }).join('');
}

function showStep(){
  const ids = ['step-reason','step-provider','step-datetime','step-info'];
  ids.forEach((id,i)=>{
    document.getElementById(id).style.display = i === schState.step ? 'block' : 'none';
  });
  document.getElementById('sch-back').disabled = schState.step === 0;
  document.getElementById('sch-next').textContent = schState.step === 3 ? 'Book appointment' : 'Continue ';
  if(schState.step === 3){
    document.getElementById('sch-next').innerHTML = 'Book appointment <span class="arr">→</span>';
  } else {
    document.getElementById('sch-next').innerHTML = 'Continue <span class="arr">→</span>';
  }
  renderProgress();
  updateNext();
}

function updateNext(){
  const btn = document.getElementById('sch-next');
  let ok = false;
  if(schState.step === 0) ok = !!schState.reason;
  else if(schState.step === 1) ok = !!schState.provider;
  else if(schState.step === 2) ok = !!(schState.date && schState.slot);
  else if(schState.step === 3){
    const i = schState.info;
    ok = i['f-first'] && i['f-last'] && i['f-dob'] && i['f-phone'] && i['f-email'] && i['f-kind'] && i['f-consent'];
  }
  btn.disabled = !ok;
}

function nextStep(){
  if(schState.step < 3){ schState.step++; showStep(); window.scrollTo({top:document.getElementById('sch-shell')?.offsetTop||0,behavior:'smooth'}); }
  else { confirmBooking(); }
}
function prevStep(){ if(schState.step>0){ schState.step--; showStep(); } }

function confirmBooking(){
  document.getElementById('sch-panel').style.display = 'none';
  document.getElementById('sch-summary').style.display = 'none';
  const c = document.getElementById('sch-confirm');
  c.style.display = 'block';
  document.getElementById('conf-email').textContent = schState.info['f-email'] || 'your inbox';
  const d = schState.date;
  const fmt = (h,m) => { const hr=h===0?12:h>12?h-12:h; const ap=h<12?'AM':'PM'; return `${hr}:${String(m).padStart(2,'0')} ${ap}`; };
  const dStr = d.toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric', year:'numeric'});
  document.getElementById('conf-card').innerHTML = `
    <div><div class="k">Reason</div><div class="v">${schState.reason.ttl}</div></div>
    <div><div class="k">Provider</div><div class="v">${schState.provider.name}</div></div>
    <div><div class="k">Date</div><div class="v it">${dStr}</div></div>
    <div><div class="k">Time</div><div class="v">${fmt(schState.slot.h, schState.slot.m)} ET</div></div>
    <div><div class="k">Patient</div><div class="v">${schState.info['f-first']} ${schState.info['f-last']}</div></div>
    <div><div class="k">Contact</div><div class="v" style="font-size:16px">${schState.info['f-phone']}</div></div>`;
}

function resetSchedule(){
  Object.assign(schState, { step:0, reason:null, provider:null, date:null, slot:null, info:{} });
  document.getElementById('sch-panel').style.display = 'block';
  document.getElementById('sch-summary').style.display = 'flex';
  document.getElementById('sch-confirm').style.display = 'none';
  document.querySelectorAll('.sch-reason, .sch-prov').forEach(e=>e.classList.remove('selected'));
  ['f-first','f-last','f-dob','f-phone','f-email','f-kind','f-ins','f-notes'].forEach(id=>{ const el = document.getElementById(id); if(el) el.value=''; });
  const c = document.getElementById('f-consent'); if(c) c.checked = false;
  ['sum-reason','sum-prov','sum-when','sum-pat'].forEach(id=>{
    const el = document.getElementById(id);
    el.classList.add('empty');
  });
  document.getElementById('sum-reason').textContent = 'Not yet selected';
  document.getElementById('sum-prov').textContent = 'Not yet selected';
  document.getElementById('sum-when').textContent = 'Pick a date & time';
  document.getElementById('sum-pat').textContent = 'Enter your information';
  showStep();
  window.scrollTo({top:0});
}
window.resetSchedule = resetSchedule;
