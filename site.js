/* Deepanshu Lathar — site behaviour. Zero dependencies. */
(function(){
"use strict";
var doc=document, el=doc.documentElement;
var RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- motion store (session-persisted) ---------- */
var motionKey="dl-motion-paused";
function storePaused(){try{return sessionStorage.getItem(motionKey)==="true"}catch(e){return false}}
function isPaused(){return storePaused()||RM}
function applyMotion(){
  var p=isPaused();
  el.dataset.motion=p?"paused":"playing";
  doc.querySelectorAll("[data-motion-btn]").forEach(function(b){
    var pauseIco=b.querySelector(".ico-pause"), playIco=b.querySelector(".ico-play");
    var label=b.querySelector("[data-pause-label]");
    if(RM){
      b.disabled=true;
      b.title="Animations paused by reduced motion preference";
      if(label)label.textContent="animations paused";
      b.setAttribute("aria-pressed","true");
      return;
    }
    b.disabled=false;
    b.setAttribute("aria-pressed",String(p));
    b.title=p?"Resume site animations":"Pause site animations";
    if(pauseIco)pauseIco.style.display=p?"none":"";
    if(playIco)playIco.style.display=p?"":"none";
    if(label)label.textContent=p?"play animations":"pause animations";
  });
}
doc.querySelectorAll("[data-motion-btn]").forEach(function(b){
  b.addEventListener("click",function(){
    if(RM)return;
    try{sessionStorage.setItem(motionKey,String(!storePaused()))}catch(e){}
    applyMotion();
    kickStars();
  });
});
applyMotion();

/* ---------- hero: scale fallback + animation-ready gate ---------- */
/* CSS scales the stages with tan(atan2()); browsers without it get the same value from here. */
(function(){
  var probe=doc.createElement("div");
  probe.style.width="calc(1px * tan(atan2(1px, 2px)))";
  if(probe.style.width)return;
  var fits=[[".hero-fit",".hero-stage","--s",1664],[".hero-art",".hero-art__stage","--ms",860]];
  function fit(){
    fits.forEach(function(f){
      doc.querySelectorAll(f[0]).forEach(function(box){
        var stage=box.querySelector(f[1]);
        if(stage)stage.style.setProperty(f[2],String(box.clientWidth/f[3]));
      });
    });
  }
  fit();
  window.addEventListener("resize",fit);
})();
doc.querySelectorAll(".home2-hero").forEach(function(hero){
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    hero.setAttribute("data-animation-ready","true");
  })});
});

/* ---------- mobile menu ---------- */
(function(){
  var btn=doc.querySelector("[data-menu-btn]"),
      panel=doc.querySelector("[data-menu-panel]");
  if(!btn||!panel)return;
  var menuIco=btn.querySelector(".ico-menu"), xIco=btn.querySelector(".ico-x");
  function set(open){
    panel.hidden=!open;
    panel.dataset.open=open?"true":"false";
    btn.setAttribute("aria-expanded",String(open));
    btn.setAttribute("aria-label",open?"Close menu":"Open menu");
    if(menuIco)menuIco.style.display=open?"none":"";
    if(xIco)xIco.style.display=open?"":"none";
    if(open){var f=panel.querySelector("a");if(f)f.focus()}
  }
  btn.addEventListener("click",function(){set(panel.hidden)});
  doc.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!panel.hidden){set(false);btn.focus()}
  });
  panel.addEventListener("click",function(e){
    if(e.target.closest("a,button"))set(false);
  });
})();

/* ---------- lazy work tiles: fetch only when scrolled near ---------- */
(function(){
  var imgs=doc.querySelectorAll("img.lazy[data-src]");
  function load(img){
    if(img.dataset.srcset)img.srcset=img.dataset.srcset;
    img.src=img.dataset.src;
    img.removeAttribute("data-src");
  }
  if(!("IntersectionObserver" in window)){imgs.forEach(load);return}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){if(en.isIntersecting){load(en.target);io.unobserve(en.target)}});
  },{rootMargin:"600px 0px"});
  imgs.forEach(function(i){io.observe(i)});
})();

/* ---------- scroll reveals ---------- */
(function(){
  var els=doc.querySelectorAll("[data-reveal]");
  if(!("IntersectionObserver" in window)||RM){els.forEach(function(e){e.classList.add("is-inview")});return}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add("is-inview");io.unobserve(en.target)}
    });
  },{threshold:.15});
  els.forEach(function(e){io.observe(e)});
})();

/* ---------- sparkles: 15 dots drift out of the box, then idle and dodge the pointer ---------- */
var kickStars=function(){};
(function(){
  var field=doc.querySelector("[data-sparkles]");
  if(!field)return;
  var W=1664,H=1180,DM=40,SIZE=16;
  var TINTS={ember:["#ff3535","#ff6b2c"],cobalt:["#3556ff","#2c76ff"],lime:["#becf3b","#e8ff3c"]};
  var P=[
    {tint:"ember",from:[811,675],to:[215,660]},
    {tint:"ember",from:[883,645],to:[1500,330]},
    {tint:"ember",from:[914,748],to:[1530,530]},
    {tint:"ember",from:[759,697],to:[110,300]},
    {tint:"ember",from:[867,762],to:[1170,1000]},
    {tint:"ember",from:[837,602],to:[905,1060]},
    {tint:"cobalt",from:[779,591],to:[200,140]},
    {tint:"cobalt",from:[742,744],to:[455,960]},
    {tint:"cobalt",from:[690,663],to:[1465,855]},
    {tint:"cobalt",from:[940,753],to:[128,1012]},
    {tint:"lime",from:[698,722],to:[168,872]},
    {tint:"lime",from:[809,727],to:[150,470]},
    {tint:"lime",from:[871,705],to:[1315,915]},
    {tint:"lime",from:[934,703],to:[1480,170]},
    {tint:"lime",from:[739,663],to:[1560,700]}
  ];
  function I(n){var t=Math.sin(n*127.1+311.7)*43758.5453;return t-Math.floor(t)}
  var TAU=Math.PI*2, F=1.05, FA=.04, PA=170, MA=1.4, HA=.88, GA=300;
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  var stars=P.map(function(e,t){
    var fx=e.from[0],fy=e.from[1],tx=e.to[0],ty=e.to[1];
    var dx=tx-fx,dy=ty-fy,c=Math.hypot(dx,dy)||1;
    var l=(I(t*13)-.5)*2*(.18+I(t*17)*.24)*c;
    var node=doc.createElement("div");
    node.className="home2-star";
    var glow=doc.createElement("span");
    glow.className="home2-star__glow";
    var col=TINTS[e.tint], size=e.tint==="lime"?SIZE+4:SIZE;
    glow.style.width=size+"px";glow.style.height=size+"px";
    glow.style.marginLeft=(-size/2)+"px";glow.style.marginTop=(-size/2)+"px";
    glow.style.background="radial-gradient(circle, "+col[0]+" 0%, "+col[1]+" 59%)";
    glow.style.setProperty("--size",size+"px");
    node.appendChild(glow);
    field.appendChild(node);
    return{
      el:node,fromX:fx,fromY:fy,toX:tx,toY:ty,
      ctrlX:(fx+tx)/2-dy/c*l+(I(t*19)-.5)*80,
      ctrlY:(fy+ty)/2+dx/c*l+(I(t*23)-.5)*80,
      release:F+t*FA,travel:1.2+I(t*29)*.8,
      a1:42+I(t*31)*44,a2:18+I(t*37)*24,
      f1:.11+I(t*41)*.18,f2:.28+I(t*43)*.32,
      f3:.1+I(t*47)*.17,f4:.26+I(t*53)*.3,
      p1:I(t*59)*TAU,p2:I(t*61)*TAU,p3:I(t*67)*TAU,p4:I(t*71)*TAU,
      ox:0,oy:0,vx:0,vy:0
    };
  });
  /* layout scale positions the dots; visual rect maps the pointer */
  var sx=1,sy=1,rect=null;
  function measure(){
    rect=field.getBoundingClientRect();
    sx=field.offsetWidth/W||1;sy=field.offsetHeight/H||1;
  }
  measure();
  window.addEventListener("resize",measure);
  window.addEventListener("scroll",function(){rect=field.getBoundingClientRect()},{passive:true});
  var ptr={x:0,y:0,active:false};
  window.addEventListener("pointermove",function(e){
    if(!rect)return;
    var x=(e.clientX-rect.left)/(rect.width/W),y=(e.clientY-rect.top)/(rect.height/H);
    ptr.x=x;ptr.y=y;ptr.active=x>=0&&x<=W&&y>=0&&y<=H;
  },{passive:true});
  window.addEventListener("blur",function(){ptr.active=false});
  function place(s,x,y){s.el.style.transform="translate3d("+(x*sx)+"px,"+(y*sy)+"px,0)"}
  if(RM){
    stars.forEach(function(s){place(s,s.toX,s.toY)});
    window.addEventListener("resize",function(){stars.forEach(function(s){place(s,s.toX,s.toY)})});
    return;
  }
  var raf=0,inView=false,t0=performance.now();
  function frame(now){
    raf=0;
    if(isPaused()||doc.hidden||!inView)return;
    var t=(now-t0)/1000;
    for(var k=0;k<stars.length;k++){
      var s=stars[k];
      var i=clamp((t-s.release)/s.travel,0,1);
      var c=i*i*(3-2*i),l=1-c;
      var ux=l*l*s.fromX+2*l*c*s.ctrlX+c*c*s.toX;
      var uy=l*l*s.fromY+2*l*c*s.ctrlY+c*c*s.toY;
      var h=.35+.65*i;
      var gx=h*(s.a1*Math.sin(s.f1*t+s.p1)+s.a2*Math.sin(s.f2*t+s.p2));
      var gy=h*(s.a1*Math.cos(s.f3*t+s.p3)+s.a2*Math.sin(s.f4*t+s.p4));
      var x=clamp(ux+gx,DM,W-DM),y=clamp(uy+gy,DM,H-DM);
      if(ptr.active){
        var ex=x+s.ox-ptr.x,ey=y+s.oy-ptr.y,d=Math.hypot(ex,ey);
        if(d<PA){var f=MA*Math.pow(1-d/PA,1.5),dd=d||1;s.vx+=ex/dd*f;s.vy+=ey/dd*f}
      }
      s.vx*=HA;s.vy*=HA;s.ox+=s.vx;s.oy+=s.vy;
      var m=Math.hypot(s.ox,s.oy);
      if(m>GA){s.ox*=GA/m;s.oy*=GA/m}
      place(s,x+s.ox,y+s.oy);
    }
    raf=requestAnimationFrame(frame);
  }
  kickStars=function(){
    if(raf||isPaused()||doc.hidden||!inView)return;
    raf=requestAnimationFrame(frame);
  };
  /* park every dot at the box until the loop starts */
  stars.forEach(function(s){place(s,s.fromX,s.fromY)});
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(en){
      inView=en[0].isIntersecting;
      if(inView)kickStars();else if(raf){cancelAnimationFrame(raf);raf=0}
    }).observe(field);
  }else{inView=true;kickStars()}
  doc.addEventListener("visibilitychange",function(){
    if(doc.hidden){if(raf){cancelAnimationFrame(raf);raf=0}}
    else kickStars();
  });
})();

/* ---------- email assembly (anti-scrape) ---------- */
(function(){
  var E="deepanshulathar",D="gmail.com",A=E+"@"+D;
  doc.querySelectorAll("[data-email-link]").forEach(function(a){
    a.href="mailto:"+A;
    if(!a.textContent.trim())a.textContent=A;
  });
  doc.querySelectorAll("[data-email-text]").forEach(function(s){s.textContent=A});
})();

/* ---------- say-hi modal ---------- */
(function(){
  var modal=doc.querySelector("[data-sayhi]");
  if(!modal)return;
  var lastFocus=null;
  function open(){
    lastFocus=doc.activeElement;
    modal.hidden=false;
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      modal.classList.add("is-open");
    })});
    try{doc.body.style.overflow="hidden"}catch(e){}
    var first=modal.querySelector(".sayhi__chips button");
    if(first)setTimeout(function(){first.focus()},60);
  }
  function close(){
    modal.classList.remove("is-open");
    try{doc.body.style.overflow=""}catch(e){}
    setTimeout(function(){modal.hidden=true},200);
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  /* questions are answered by the terminal on /sidequests */
  function askTerminal(q){
    close();
    var section=doc.getElementById("terminal"),
        input=doc.getElementById("term-input"),
        form=doc.getElementById("term-form");
    if(section&&input&&form){
      section.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"});
      input.value=q;
      setTimeout(function(){
        if(form.requestSubmit)form.requestSubmit();
        else form.dispatchEvent(new Event("submit",{cancelable:true}));
      },RM?0:450);
    }else{
      try{sessionStorage.setItem("dl-sayhi-q",q)}catch(e){}
      location.href="/sidequests#terminal";
    }
  }
  doc.querySelectorAll("[data-sayhi-open]").forEach(function(b){
    b.addEventListener("click",open);
  });
  modal.querySelectorAll("[data-sayhi-close]").forEach(function(b){
    b.addEventListener("click",close);
  });
  doc.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!modal.hidden)close();
  });
  modal.querySelectorAll("[data-term-q]").forEach(function(b){
    b.addEventListener("click",function(){askTerminal(b.getAttribute("data-term-q"))});
  });
  /* cross-page handoff: a question picked on another page lands here */
  var pending=null;
  try{pending=sessionStorage.getItem("dl-sayhi-q")}catch(e){}
  if(pending&&doc.getElementById("term-form")){
    try{sessionStorage.removeItem("dl-sayhi-q")}catch(e){}
    setTimeout(function(){askTerminal(pending)},900);
  }
})();

/* ---------- labs: the hanging sign turns over when tapped and leans toward the pointer ---------- */
(function(){
  var sign=doc.getElementById("sign"), hint=doc.getElementById("sign-hint"), swing=doc.getElementById("swing");
  if(sign&&sign.tagName==="BUTTON"){
    var open=sign.querySelector(".face.open"), busyFace=sign.querySelector(".face.busy");
    var say=function(){
      var busy=sign.getAttribute("aria-pressed")==="true";
      /* the button is named by whichever face is showing */
      if(open)open.setAttribute("aria-hidden",String(busy));
      if(busyFace)busyFace.setAttribute("aria-hidden",String(!busy));
      if(hint)hint.textContent=busy?"Your door, while you work. Tap to turn it.":"Tap the sign to turn it.";
    };
    var settle=function(){
      if(RM||!swing)return;
      swing.classList.remove("settle");void swing.offsetWidth;swing.classList.add("settle");
    };
    sign.addEventListener("click",function(){
      sign.setAttribute("aria-pressed",String(sign.getAttribute("aria-pressed")!=="true"));
      say();setTimeout(settle,520);
    });
    /* the first turn is done by the inline script beside the sign */
    sign.addEventListener("turned",say);
    say();
  }
  var hang=doc.querySelector(".hang"), sw=doc.querySelector(".swing"), card=doc.querySelector(".sign .card"),
      zone=doc.querySelector(".lab-hero");
  if(zone&&hang&&sw&&!RM&&window.matchMedia("(pointer: fine)").matches){
    var lr=0;
    zone.addEventListener("pointermove",function(e){
      if(lr)return;
      lr=requestAnimationFrame(function(){
        lr=0;
        var r=hang.getBoundingClientRect(),dx=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width/2))/520));
        sw.style.setProperty("--lean",(dx*-2.2).toFixed(2)+"deg");
        if(card)card.style.setProperty("--ty",(dx*7).toFixed(2)+"deg");
      });
    });
    zone.addEventListener("pointerleave",function(){sw.style.setProperty("--lean","0deg");if(card)card.style.setProperty("--ty","0deg")});
  }
})();

/* ---------- labs: the example conversation plays once when it scrolls into view ---------- */
(function(){
  var chat=doc.querySelector(".chat ol"), note=doc.querySelector(".chat-note");
  if(!chat||!note||RM||!("IntersectionObserver" in window))return;
  var items=[].slice.call(chat.children), timers=[];
  var btn=doc.createElement("button");
  btn.type="button";btn.className="replay";btn.hidden=true;btn.textContent="Replay the example";
  note.insertAdjacentElement("afterend",btn);
  function play(){
    timers.forEach(clearTimeout);timers=[];
    items.forEach(function(li){li.classList.remove("shown","typing")});
    chat.classList.add("playing");btn.hidden=true;
    var t=250;
    items.forEach(function(li,k){
      var bot=li.classList.contains("bot");
      if(bot){timers.push(setTimeout(function(){li.classList.add("typing")},t));t+=k===items.length-1?1300:800}
      timers.push(setTimeout(function(){li.classList.remove("typing");li.classList.add("shown")},t));
      t+=bot?750:650;
    });
    timers.push(setTimeout(function(){
      chat.classList.remove("playing");items.forEach(function(li){li.classList.remove("shown")});btn.hidden=false;
    },t+700));
  }
  btn.addEventListener("click",play);
  new IntersectionObserver(function(es,o){if(es[0].isIntersecting){o.disconnect();play()}},{threshold:.35}).observe(chat);
})();

/* ---------- labs: the docked WhatsApp button steps aside at the contact strip ---------- */
(function(){
  var dock=doc.querySelector(".dock"), end=doc.getElementById("contact");
  if(!dock||!end||!("IntersectionObserver" in window))return;
  new IntersectionObserver(function(es){dock.classList.toggle("away",es[0].isIntersecting)},{rootMargin:"0px 0px -80px 0px"}).observe(end);
})();

/* ---------- misc ---------- */
doc.querySelectorAll("[data-year]").forEach(function(s){s.textContent=new Date().getFullYear()});
})();
