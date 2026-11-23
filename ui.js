/* Shared behaviour. Motion follows the La Boite a Slides scroll skill: reveal once, rAF-throttled --progress, ease-out only. */
(function(){
  var d=document,b=d.body,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,G=root.dataset.motion==='gsap'; /* G: home.js (GSAP + Lenis) owns motion */

  /* loader: first page of a visit only; opens on load or fonts ready, hard cap 300ms, wipe .5s */
  var L=d.getElementById('loader'),opened=false;
  function reveal(){
    if(opened)return;opened=true;b.classList.add('ready');
    try{sessionStorage.setItem('dl-seen','1')}catch(e){}
    if(!L||reduce||root.classList.contains('seen')){L&&L.remove();return}
    L.classList.add('open');setTimeout(function(){L.remove()},520);
  }
  if(root.classList.contains('seen'))reveal();
  else{addEventListener('load',reveal);d.fonts&&d.fonts.ready.then(reveal);setTimeout(reveal,300)}

  /* menu: clip-path wipe, scroll lock, focus return */
  var M=d.getElementById('menuBtn'),ML=d.getElementById('menuLabel'),menu=d.getElementById('menu');
  function setMenu(open){
    if(open===b.classList.contains('menu-open'))return;
    b.classList.toggle('menu-open',open);
    M.setAttribute('aria-expanded',String(open));ML.textContent=open?'Close':'Menu';
    if(open)menu.querySelector('a').focus({preventScroll:true});else M.focus({preventScroll:true});
  }
  M.addEventListener('click',function(){setMenu(!b.classList.contains('menu-open'))});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  /* marquee: duplicate the list exactly once, track loops 0 to -50% */
  d.querySelectorAll('[data-marquee]').forEach(function(t){var c=t.firstElementChild.cloneNode(true);c.setAttribute('aria-hidden','true');t.appendChild(c)});

  /* split text nodes into word spans; wrap(word,index) returns the element to insert */
  function words(el,wrap){
    var n=0,walk=d.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];
    while(walk.nextNode())nodes.push(walk.currentNode);
    nodes.forEach(function(t){
      var f=d.createDocumentFragment();
      t.textContent.split(/(\s+)/).forEach(function(part){
        if(!part)return;
        if(/^\s+$/.test(part)){f.appendChild(d.createTextNode(part));return}
        f.appendChild(wrap(part,n++));
      });
      t.parentNode.replaceChild(f,t);
    });
    return n;
  }
  if(!reduce&&!G){
    d.querySelectorAll('[data-split]').forEach(function(h){
      h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
      words(h,function(w,i){var o=d.createElement('span');o.className='w';o.setAttribute('aria-hidden','true');var s=d.createElement('span');s.textContent=w;s.style.setProperty('--wi',i);o.appendChild(s);return o});
    });
    d.querySelectorAll('[data-fill]').forEach(function(p){
      var n=words(p,function(w,i){var s=d.createElement('span');s.className='fw';s.textContent=w;s.style.setProperty('--k',i);return s});
      p.style.setProperty('--n',n);p.style.setProperty('--fill',0);
    });
  }

  /* count-up: once, 1.2s ease-out, lands on the exact written figure */
  function countUp(el){
    var txt=el.textContent,m=txt.match(/^([^\d]*)([\d,]+)(.*)$/);if(!m)return;
    var end=+m[2].replace(/,/g,''),comma=m[2].indexOf(',')>-1,t0=performance.now();
    function fmt(v){return m[1]+(comma?v.toLocaleString('en-US'):String(v))+m[3]}
    (function step(now){var k=Math.min(1,(now-t0)/1200),e=1-Math.pow(1-k,3);el.textContent=fmt(Math.round(end*e));if(k<1)requestAnimationFrame(step);else{el.textContent=txt;var c=el.closest('.stat');if(c){c.classList.add('flash');c.addEventListener('animationend',function(){c.classList.remove('flash')},{once:true})}}})(t0);
  }

  /* reveals: one observer, once per section, children staggered 100ms */
  var secs=d.querySelectorAll('[data-reveal]');
  secs.forEach(function(s){s.querySelectorAll('.rv,.clip,.draw').forEach(function(el,i){el.style.setProperty('--i',Math.min(i,6))})});
  function show(s){s.classList.add('is-visible');if(!reduce&&!G)s.querySelectorAll('[data-count]').forEach(countUp);s.querySelectorAll('.chat').forEach(function(c){c.classList.add('is-on')})}
  /* threshold 0, not .15: a section taller than ~6 screens can never be 15% visible and would never reveal */
  if('IntersectionObserver' in window&&!reduce&&!G){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){show(e.target);io.unobserve(e.target)}})},{rootMargin:'0px 0px -10% 0px',threshold:0});
    secs.forEach(function(s){io.observe(s)});
  }else secs.forEach(show);

  /* --progress per section and page progress, rAF-throttled */
  var hdr=d.querySelector('.header'),lastTuck=scrollY,P=G?[]:d.querySelectorAll('[data-progress]'),F=G?[]:d.querySelectorAll('[data-fill]'),bar=d.querySelector('.progress-bar'),ticking=false;
  function clamp(v){return Math.max(0,Math.min(1,v))}
  function update(){
    ticking=false;var vh=innerHeight;
    P.forEach(function(s){
      var r=s.getBoundingClientRect(),p=clamp((vh-r.top)/(vh+r.height));
      s.style.setProperty('--progress',(p*100).toFixed(1)+'%');s.style.setProperty('--p',p.toFixed(3));
      if(s.dataset.imageR)s.style.setProperty('--imageR',(p*s.dataset.imageR).toFixed(2)+'deg');
    });
    /* words fill while the paragraph travels from 85% to 35% of the viewport */
    F.forEach(function(p){var r=p.getBoundingClientRect();p.style.setProperty('--fill',clamp((vh*.85-r.top)/(vh*.5+r.height*.5)).toFixed(3))});
    if(bar){var max=root.scrollHeight-vh;bar.style.setProperty('--page',max>0?(scrollY/max).toFixed(4):0)}
    var y=scrollY;if(hdr&&!G&&!b.classList.contains('menu-open')){if(y>300&&y>lastTuck+4)hdr.classList.add('tuck');else if(y<lastTuck-4||y<300)hdr.classList.remove('tuck')}lastTuck=y;
  }
  if(!reduce){
    addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
    addEventListener('resize',update);update();
  }

  /* email, assembled at runtime so scrapers miss it */
  var A='deepanshulathar'+'@'+'gmail.com';
  d.querySelectorAll('[data-email]').forEach(function(a){a.href='mailto:'+A;if(a.hasAttribute('data-email-text'))a.textContent=A});

  /* accordion: one open at a time, max-height from scrollHeight */
  if(!G)d.querySelectorAll('.faq').forEach(function(list){
    function setItem(item,open){
      item.classList.toggle('open',open);
      item.querySelector('.faq-q').setAttribute('aria-expanded',String(open));
      var a=item.querySelector('.faq-a');a.style.maxHeight=open?a.scrollHeight+'px':'0px';
    }
    list.addEventListener('click',function(e){
      var btn=e.target.closest('.faq-q');if(!btn)return;
      var item=btn.closest('.faq-item'),open=!item.classList.contains('open');
      list.querySelectorAll('.faq-item.open').forEach(function(x){if(x!==item)setItem(x,false)});
      setItem(item,open);btn.focus();
    });
    list.querySelectorAll('.faq-item').forEach(function(it,i){setItem(it,i===0)});
    addEventListener('resize',function(){var o=list.querySelector('.faq-item.open .faq-a');if(o)o.style.maxHeight=o.scrollHeight+'px'});
  });

  /* work filters: type AND sector */
  var fw=d.getElementById('filters');
  if(fw){
    var state={type:'all',sector:'all'},items=d.querySelectorAll('[data-type]'),empty=d.getElementById('empty');
    fw.addEventListener('click',function(e){
      var btn=e.target.closest('[data-f]');if(!btn)return;
      state[btn.dataset.f]=btn.value;
      fw.querySelectorAll('[data-f="'+btn.dataset.f+'"]').forEach(function(x){x.setAttribute('aria-pressed',String(x===btn))});
      var shown=0;
      items.forEach(function(it){
        var ok=(state.type==='all'||it.dataset.type===state.type)&&(state.sector==='all'||it.dataset.sector===state.sector);
        it.hidden=!ok;it.classList.remove('enter');
        if(ok){shown++;void it.offsetWidth;if(!reduce)it.classList.add('enter')}
      });
      empty.hidden=shown>0;
      d.getElementById('count').textContent=shown+(shown===1?' project':' projects');
    });
  }

  /* contact form: validate, then hand the brief to WhatsApp or email (nothing is stored on this site) */
  var form=d.getElementById('brief');
  if(form){
    function compose(){
      var f=new FormData(form),lines=['Hi Deepanshu, I found your portfolio.',''];
      [['name','Name'],['reply','Reply to'],['kind','About'],['brief','Brief'],['when','Timeline'],['stack','Stack'],['link','Link']].forEach(function(p){
        var v=(f.get(p[0])||'').toString().trim();if(v)lines.push(p[1]+': '+v);
      });
      return lines.join('\n');
    }
    function valid(){
      var ok=true;
      form.querySelectorAll('[required]').forEach(function(el){
        var bad=!el.value.trim(),err=d.getElementById(el.id+'-err');
        el.setAttribute('aria-invalid',String(bad));if(err)err.textContent=bad?'Please fill this in.':'';
        if(bad&&ok){el.focus();ok=false}
      });
      return ok;
    }
    form.addEventListener('submit',function(e){
      e.preventDefault();if(!valid())return;
      var via=e.submitter&&e.submitter.value==='email'?'email':'whatsapp',text=compose();
      var url=via==='email'?'mailto:'+A+'?subject='+encodeURIComponent('Portfolio enquiry')+'&body='+encodeURIComponent(text)
        :'https://wa.me/918221016809?text='+encodeURIComponent(text);
      var note=d.getElementById('sent');note.hidden=false;
      note.textContent=via==='email'?'Your email app is opening with the brief filled in. Press send there.':'WhatsApp is opening with the brief filled in. Press send there.';
      if(via==='email')location.href=url;else window.open(url,'_blank','noopener');
    });
  }

  /* ---------- living effects (motion on only) ---------- */
  if(!reduce){
    /* marquee: base speed is half the track per 26s; scrolling speeds it up to 6x and sets its direction, then it eases back */
    var mqs=[].map.call(d.querySelectorAll('[data-marquee]'),function(t){return{t:t,x:0,v:0,half:t.scrollWidth/2,hover:false,on:false}});
    if(mqs.length&&!G){
      root.classList.add('mq-js');
      var mDir=-1,mLastY=scrollY,mPrev=0,mRun=false;
      addEventListener('resize',function(){mqs.forEach(function(m){m.half=m.t.scrollWidth/2})});
      function mLoop(now){
        if(!mqs.some(function(m){return m.on})){mRun=false;return}
        var dt=Math.min(.05,(now-mPrev)/1000)||.016;mPrev=now;
        var dy=scrollY-mLastY;mLastY=scrollY;if(dy)mDir=dy>0?-1:1;
        var boost=Math.min(5,Math.abs(dy)/dt/400);
        mqs.forEach(function(m){
          if(!m.on||!m.half)return;
          var target=m.hover?0:(m.half/26)*(1+boost);
          m.v+=(target-m.v)*.08;m.x+=mDir*m.v*dt;
          if(m.x<=-m.half)m.x+=m.half;else if(m.x>0)m.x-=m.half;
          m.t.style.transform='translate3d('+m.x.toFixed(2)+'px,0,0)';
        });
        requestAnimationFrame(mLoop);
      }
      var mio=new IntersectionObserver(function(es){es.forEach(function(e){var m=mqs.find(function(q){return q.t.parentElement===e.target});if(m)m.on=e.isIntersecting});
        if(!mRun&&mqs.some(function(m){return m.on})){mRun=true;mPrev=performance.now();requestAnimationFrame(mLoop)}});
      mqs.forEach(function(m){
        mio.observe(m.t.parentElement);
        m.t.parentElement.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')m.hover=true});
        m.t.parentElement.addEventListener('pointerleave',function(){m.hover=false});
      });
    }

    if(matchMedia('(hover:hover) and (pointer:fine)').matches){
      /* magnetic: buttons lean up to 6px toward the cursor, arrow circles up to 10px inside their card */
      function magnet(el,zone,max){
        zone.addEventListener('pointermove',function(e){
          var r=el.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/r.width,y=(e.clientY-(r.top+r.height/2))/r.height;
          el.style.translate=(Math.max(-1,Math.min(1,x))*max).toFixed(1)+'px '+(Math.max(-1,Math.min(1,y))*max).toFixed(1)+'px';
        });
        zone.addEventListener('pointerleave',function(){el.style.translate=''});
      }
      d.querySelectorAll('.btn,.menu-btn').forEach(function(el){magnet(el,el,6)});
      d.querySelectorAll('.arrow').forEach(function(el){var z=el.closest('a');if(z)magnet(el,z,10)});
      /* images follow the cursor inside their frame */
      if(!G)d.querySelectorAll('.proj,.shot').forEach(function(card){
        card.addEventListener('pointermove',function(e){
          var r=card.getBoundingClientRect();
          card.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));
          card.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3));
        });
        card.addEventListener('pointerleave',function(){card.style.setProperty('--mx',0);card.style.setProperty('--my',0)});
      });
    }
  }
})();
