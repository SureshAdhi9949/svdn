import {useEffect,useRef,useState} from 'react';
import {img,PHONE,MAIL,CATS,TEST,FAQ} from './data.js';

function useInView(){const r=useRef(),[v,s]=useState(false);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&(s(true),o.disconnect()),{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[]);return[r,v]}
const Rev=({children,d=0,cls='',as:T='div',st})=>{const[r,v]=useInView();return <T ref={r} className={`rev ${cls} ${v?'in':''}`} style={{'--d':d+'ms',...st}}>{children}</T>};
const PAL=[['#2f8f4e','#0f3d2a'],['#ff5d8f','#9b1d57'],['#ffb830','#e8590c'],['#a6e22e','#2f8f4e'],['#8e6bff','#4a2fb5'],['#19c6c6','#0b6e8a'],['#ff7a45','#c2255c']];
const Ph=({n,cls=''})=>{const k=[...n].reduce((a,c)=>a+c.charCodeAt(0),0)%PAL.length,[a,b]=PAL[k];return <div className={`ph ${cls}`} style={{backgroundImage:`radial-gradient(circle at 30% 20%,${a},transparent 60%),linear-gradient(135deg,${a},${b})`}} role="img" aria-label={n}><img src={img(n)} alt="" loading="lazy" decoding="async"/><svg className="phl" viewBox="0 0 64 64"><path d="M32 58C32 30 44 14 58 8 56 30 48 50 32 58Zm0 0C30 40 20 28 6 24c2 18 12 30 26 34Z"/></svg></div>};
const Counter=({to,label})=>{const[r,v]=useInView(),[n,s]=useState(0);
 useEffect(()=>{if(!v)return;let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1600,1);s(Math.round(to*(1-Math.pow(1-p,3))));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)},[v]);
 return <span ref={r}>{label?(n>=to?label:(n/100000).toFixed(0)+'L'):n.toLocaleString('en-IN')}{!label&&'+'}</span>};

function Nav(){const[sc,setSc]=useState(false),[o,setO]=useState(false);
 useEffect(()=>{const f=()=>setSc(scrollY>40);addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 const L=[['Home','home'],['About Us','about'],['Plants','plants'],['Infrastructure','infrastructure'],['Gallery','gallery'],['Contact','contact']];
 return <header className={`nav ${sc?'sc':''}`}><a href="#home" className="logo"><img className="lg" src="/img/logo.webp" alt="SVDN logo since 1948"/><span>Sri Vijaya Durga <b>Nursery</b></span></a>
 <nav className={o?'open':''}>{L.map(([l,id])=><a key={id} onClick={()=>setO(false)} href={'#'+id}>{l}</a>)}</nav>
 <a className="btn sm" href="#contact">Get Bulk Quote</a><a className="call" href={'tel:'+PHONE.replace(/\s/g,'')}>📞</a>
 <button className={`burger ${o?'x':''}`} onClick={()=>setO(!o)} aria-label="menu"><span/><span/><span/></button></header>}

const Hero=()=><section id="home" className="hero">
 <div className="hbg" style={{backgroundImage:"url('/img/hero-reference.webp')"}}/>
 <img className="hero-foliage hero-foliage-left" src="/img/hero-foliage-left.webp" alt="" aria-hidden="true"/>
 <img className="hero-foliage hero-foliage-right" src="/img/hero-foliage-right.webp" alt="" aria-hidden="true"/>
 <div className="hero-t">
  <h1><span>GROW</span><span>SOMETHING</span><span className="hero-script-line">Beautiful</span></h1>
  <p>Supplying premium quality planting material for farms, landscaping, government projects and large-scale plantations across India.</p>
  <div className="row hero-actions"><a className="btn" href="#plants">Explore Plants</a><a className="btn ghost" href="#contact">Visit Our Nursery</a></div>
  <div className="hero-benefits">
   <div><i>♧</i><span><b>Fruit Plants</b><small>High Yield & Quality</small></span></div>
   <div><i>❀</i><span><b>Ornamental Plants</b><small>For Beautiful Spaces</small></span></div>
   <div><i>♣</i><span><b>Avenue Trees</b><small>Green & Sustainable</small></span></div>
  </div>
 </div>
 <div className="hero-showcase">
  <div className="hero-stack">
  <Ph n="hero-1" cls="show-main"/>
   <Ph n="about-2" cls="show-fruit"/>
   <Ph n="cat-1" cls="show-small"/>
   <div className="hero-script">Healthy Plants<br/>Greener Tomorrow <span>↗</span></div>
   <div className="show-badge badge-quality"><i>♧</i><span><b>Premium Quality</b><small>Healthy & Disease Free</small></span></div>
   <div className="show-badge badge-delivery"><i>♧</i><span><b>Pan India Delivery</b><small>Safe & On Time</small></span></div>
   <div className="show-badge badge-farmers"><i>♧</i><span><b>Trusted by Farmers</b><small>Since 1948</small></span></div>
  </div>
 </div>
</section>;

const STAT_ITEMS=[
 [1200000,'Saplings / Year','12L+','♧'],
 [0,'Delivery Network','Pan India','⌖'],
 [1700,'Farmers Network',null,'♣'],
 [75,'Years Experience',null,'✿']
];
const Stats=()=><section className="stats">{STAT_ITEMS.map(([n,l,x,icon],i)=><Rev key={l} d={i*100} cls="stat"><i className="stat-icon">{icon}</i><span className="stat-copy"><b>{i===1?x:<Counter to={n} label={x}/>}</b><small>{l}</small></span></Rev>)}</section>;

const Leaf=({c,cls=''})=><svg className={`deco ${cls}`} viewBox="0 0 64 64" style={{fill:c}}><path d="M32 58C32 30 44 14 58 8 56 30 48 50 32 58Zm0 0C30 40 20 28 6 24c2 18 12 30 26 34Z"/></svg>;
const Flower=({c,cls=''})=><svg className={`deco ${cls}`} viewBox="0 0 64 64" style={{fill:c}}>{[0,72,144,216,288].map(r=><ellipse key={r} cx="32" cy="16" rx="9" ry="14" transform={`rotate(${r} 32 32)`}/>)}<circle cx="32" cy="32" r="7" fill="#ffd43b"/></svg>;
const Marquee=()=>{const w=['🍋 Fruit Plants','🌳 Avenue Trees','🌺 Ornamental','🪴 Indoor','🎋 Bamboo','🌸 Flowers','🌴 Palms','🌿 Shrubs','🍃 Hangings','🌱 Bonsai','💐 Bougainvillea'];return <div className="mq"><div>{[...w,...w].map((t,i)=><span key={i} style={{'--h':i*37%360}}>{t}</span>)}</div></div>};
function Fx(){useEffect(()=>{const r=document.documentElement;let pending=false;const sc=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{const range=r.scrollHeight-innerHeight;r.style.setProperty('--pg',range>0?scrollY/range:0);pending=false})};
 addEventListener('scroll',sc,{passive:true});sc();return()=>removeEventListener('scroll',sc)},[]);return <div className="prog"/>}
const Wave=({flip})=><svg className={`wave ${flip?'flip':''}`} viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0 40C240 100 480 0 720 40s480 60 720 0V80H0Z"/></svg>;

const About=()=><section id="about" className="split sec"><Flower c="#ff7a45" cls="d8"/><Rev cls="collage"><Ph n="hero-1" cls="a1"/><Ph n="about-2" cls="a2"/><div className="seal">1948</div></Rev>
 <Rev d={150}><h2>Rooted in Nature, Growing for a Better Future</h2>
 <p>Sri Vijaya Durga Nursery is a leading wholesale plant nursery in Andhra Pradesh, committed to providing high-quality planting material for a greener and healthier tomorrow.</p>
 <div className="pills">{['🚚 Pan-India Bulk Delivery','🌳 Massive Acreage & Stock','✅ Disease-Free Saplings'].map((t,i)=><Rev key={t} d={300+i*150} cls="pill">{t}</Rev>)}</div></Rev></section>;

const Plants=()=><section id="plants" className="sec cream"><Rev><h2 className="c">Explore Our Green Collection</h2><p className="c sub">India's finest wholesale plant collections.</p></Rev>
 <div className="rail">{CATS.map(([t,d],i)=><Rev key={t} d={i*60} cls="card" st={{'--c':PAL[i%7][0]}}><Ph n={'cat-'+(i+1)}/><div className="ov"><h3>{t}</h3><p>{d}</p><span>View Collection <i>→</i></span></div></Rev>)}</div></section>;

const Biz=()=><section className="dark sec blobs"><Flower c="#ff5d8f" cls="d4"/><Leaf c="#a6e22e" cls="d5"/><Rev><h2 className="c">Built for Large-Scale Green Projects</h2><p className="c sub">We cater to massive landscaping projects, commercial fruit orchards, and urban avenue plantations.</p></Rev>
 <div className="g3">{[['🏞️','Landscaping Projects'],['🥭','Commercial Fruit Orchards'],['🌳','Urban Avenue Plantations']].map(([e,t],i)=><Rev key={t} d={i*200} cls="glass"><em>{e}</em><h3>{t}</h3><svg viewBox="0 0 100 6"><path d="M0 3H100" className="grow"/></svg></Rev>)}</div></section>;

const India=()=><section className="sec"><Rev><h2 className="c">From Kadiyapulanka to Every Corner of India</h2><p className="c sub">Through our dedicated transport networks, we safely deliver thousands of saplings across Indian states daily.</p></Rev>
 <Rev cls="map"><svg viewBox="0 0 300 320"><path className="in-map" d="M110 20l50 10 40 40-10 40 30 30-20 40-30 20-20 60-30 50-20-60-30-50-30-70 20-40 10-50z"/>
 {[[90,70],[200,60],[230,150],[60,150],[150,290],[190,230]].map(([x,y],i)=><path key={i} className="route" style={{'--i':i}} d={`M170 190Q${(170+x)/2+20} ${(190+y)/2-40} ${x} ${y}`}/>)}
 <circle cx="170" cy="190" r="7" className="pulse"/></svg><div className="tag">Pan-India Bulk Delivery</div></Rev></section>;

const Infra=()=><section id="infrastructure" className="sec cream"><Rev><h2 className="c">Advanced Nursery Infrastructure & Transport</h2><p className="c sub">Our expansive facilities in Kadiyapulanka utilize modern shade nets, drip irrigation, and scientifically formulated potting mixes to ensure maximum plant survival rates.</p></Rev>
 <div className="g3">{['Shade Nets','Drip Irrigation','Scientifically Formulated Potting Mixes'].map((t,i)=><Rev key={t} d={i*150} cls="ib"><Ph n={'infra-'+(i+1)}/><h3>{t}</h3></Rev>)}</div></section>;

const GALLERY_IMAGES=['gal-1','gal-2','gal-3','gal-4','gal-5','gal-6','gal-7','gal-8'];
const GALLERY_ASPECTS=[597/335,547/365,335/597,600/400,547/244,638/480,337/149,386/518];
function Gallery(){const[o,setO]=useState(null),N=GALLERY_IMAGES.length;
 useEffect(()=>{const k=e=>{if(o===null)return;e.key==='Escape'&&setO(null);e.key==='ArrowRight'&&setO((o+1)%N);e.key==='ArrowLeft'&&setO((o+N-1)%N)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[o]);
 return <section id="gallery" className="sec"><Rev><h2 className="c">Inside Sri Vijaya Durga Nursery</h2></Rev>
 <div className="mas">{GALLERY_IMAGES.map((photo,i)=><Rev key={photo} d={i*70} cls={`g gallery-item gallery-item-${i+1}`} st={{'--gallery-aspect':GALLERY_ASPECTS[i]}}><button onClick={()=>setO(i)} aria-label={`View nursery photo ${i+1}`}><img src={img(photo)} alt={`Sri Vijaya Durga Nursery photo ${i+1}`} loading="lazy" className="gallery-photo-image"/><span>⤢</span></button></Rev>)}</div>
 {o!==null&&<div className="lb" onClick={()=>setO(null)}><button className="x">✕</button><button className="p" onClick={e=>{e.stopPropagation();setO((o+N-1)%N)}}>‹</button>
 <img src={img(GALLERY_IMAGES[o])} alt={`Sri Vijaya Durga Nursery photo ${o+1}`} className="lbi"/><button className="n" onClick={e=>{e.stopPropagation();setO((o+1)%N)}}>›</button><small>{o+1} / {N}</small></div>}</section>}

function Testi(){const[i,s]=useState(0),[h,sh]=useState(false);
 useEffect(()=>{if(h)return;const t=setInterval(()=>s(x=>(x+1)%TEST.length),5000);return()=>clearInterval(t)},[h]);
 return <section className="dark sec"><Rev><h2 className="c">What Our Clients Say</h2><p className="c sub">Trusted by contractors and farmers nationwide.</p></Rev>
 <div className="tc" onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}><div className="q">“</div>
 {TEST.map(([n,r,t],k)=><div key={n} className={`ts ${k===i?'on':''}`}><p>{t}</p><b>{n}</b>{r&&<small>{r}</small>}</div>)}
 <div className="dots">{TEST.map((_,k)=><i key={k} className={k===i?'on':''} onClick={()=>s(k)}/>)}</div></div></section>}

function Faq(){const[o,s]=useState(0);return <section className="sec cream"><Rev><h2 className="c">Frequently Asked Questions</h2></Rev>
 <div className="faq">{FAQ.map(([q,a],i)=><div key={q} className={`fi ${o===i?'on':''}`}><button onClick={()=>s(o===i?-1:i)}>{q}<i>▾</i></button><div className="fa"><p>{a}</p></div></div>)}</div></section>}

function Contact(){const[ok,setOk]=useState(false);
 const sub=e=>{e.preventDefault();const f=new FormData(e.target);const b=[...f.entries()].map(([k,v])=>`${k}: ${v}`).join('\n');
 location.href=`mailto:${MAIL}?subject=Bulk Enquiry&body=${encodeURIComponent(b)}`;setOk(true)};
 return <section id="contact" className="sec grad"><Flower c="#ffb830" cls="d6"/><Leaf c="#2f8f4e" cls="d7"/><Rev><h2 className="c">Let's Grow Something Great Together</h2><p className="c sub">Planning a landscaping project, orchard or bulk plantation?</p></Rev>
 <Rev cls="form-w"><form onSubmit={sub}><input name="Name" placeholder="Name" required/><input name="Phone" placeholder="Phone" required/><input name="Email" type="email" placeholder="Email"/>
 <select name="Category">{['Plant Category',...CATS.map(c=>c[0])].map(c=><option key={c}>{c}</option>)}</select><input name="Quantity" placeholder="Quantity"/><input name="Requirement" placeholder="Requirement"/>
 <textarea name="Message" rows="3" placeholder="Message"/><div className="row"><button className="btn">Send Bulk Enquiry</button><a className="btn ghost" href={'tel:'+PHONE.replace(/\s/g,'')}>Call Now</a></div>{ok&&<small>Opening your mail app…</small>}</form>
 <div className="loc"><span className="pin">🌱</span><h3>Visit Our Nursery</h3><p>Kadiyapulanka, Rajahmundry,<br/>Andhra Pradesh, India - 533126</p><a href="https://maps.app.goo.gl/xjc7fNWXDe2q4xocA" target="_blank" rel="noreferrer">Open in Google Maps →</a></div></Rev></section>}

const MAPURL='https://maps.app.goo.gl/xjc7fNWXDe2q4xocA';
const MapSec=()=><section id="location" className="sec mapsec"><Flower c="#ff5d8f" cls="d6"/><Leaf c="#a6e22e" cls="d7"/>
 <Rev><h2 className="c">Visit Our Nursery</h2><p className="c sub">Kadiyapulanka, the famous nursery hub near Rajahmundry. Come see our plants in person.</p></Rev>
 <Rev cls="mapw"><iframe title="Sri Vijaya Durga Nursery location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=16.8912037,81.8092142&z=15&output=embed"/>
 <div className="mcard"><span className="pin">🌱</span><h3>Sri Vijaya Durga Nursery</h3><p>Kadiyapulanka, Rajahmundry,<br/>Andhra Pradesh, India - 533126</p>
 <div className="row"><a className="btn sm" href={MAPURL} target="_blank" rel="noreferrer">Get Directions</a><a className="btn sm ghost" href={'tel:'+PHONE.replace(/\s/g,'')}>Call Now</a></div></div></Rev></section>;
const Foot=()=><footer className="foot"><div><img className="lg ft" src="/img/logo.webp" alt="SVDN logo"/><b>Sri Vijaya Durga Nursery</b><p>Wholesale plant nursery since 1948, Kadiyapulanka, Rajahmundry.</p></div>
 <div><b>Quick Links</b>{['Home','About','Plants','Infrastructure','Gallery','Contact'].map(l=><a key={l} href={'#'+l.toLowerCase()}>{l}</a>)}</div>
 <div><b>Categories</b><a href="#plants">Wholesale Fruit Plants</a><a href="#plants">Avenue Trees</a><a href="#plants">Ornamental Plants</a><a href="#plants">Indoor Greens</a><a href="#plants">Bamboos & Grasses</a></div>
 <div><b>Contact</b><p>Kadiyapulanka, Rajahmundry,<br/>Andhra Pradesh - 533126</p><a href={'tel:'+PHONE.replace(/\s/g,'')}>{PHONE}</a><a href={'mailto:'+MAIL}>{MAIL}</a></div>
 <small>© 2026 Sri Vijaya Durga Nursery. All Rights Reserved.</small></footer>;

export default()=><><Fx/><Nav/><main className="home-board">
 <div className="board-column board-primary"><Hero/><Stats/><Plants/><Biz/></div>
 <div className="board-column board-secondary"><About/><Infra/><Gallery/><Testi/></div>
 <div className="board-column board-wide"><India/><Faq/><Contact/><MapSec/></div>
 </main><Foot/></>;
