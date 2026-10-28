import { useEffect, useRef } from 'react';
/* v11 — one photograph, one shader. The photo supplies sky, stars, Milky Way, dunes and palms.
   The shader adds only: a ray-structured aurora (sky-masked, behind palms), a refraction-only lake
   ripple, a unified grade and film grain. A 2D overlay twinkles the photo's own brightest stars (sky-only). */
const BASE = import.meta.env.BASE_URL + 'oasis/';
const VS = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0,1);}`;
const FS = `precision highp float;varying vec2 v;
uniform sampler2D uP,uS,uL;uniform vec2 uRes,uOff,uSize;uniform float uT,uMob,uHz,uLakeOn,uA,uRot,uDpr;uniform vec2 uPole;uniform vec4 uM[7],uMD[7],uR;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float n1(float x){return n(vec2(x,.5));}
vec2 rot(vec2 u,float a){vec2 asp=vec2(uSize.x/uSize.y,1.);vec2 d=(u-uPole)*asp;float c=cos(a),s=sin(a);return uPole+vec2(c*d.x-s*d.y,s*d.x+c*d.y)/asp;}
vec3 met(vec2 px){vec3 c=vec3(0.);
  for(int i=0;i<7;i++){vec4 m=uM[i];if(m.w<=0.)continue;vec4 d=uMD[i];
    vec2 hp=uOff+m.xy*uSize;vec2 r=px-hp;vec2 dir=normalize(d.xy+1e-5);
    float along=-dot(r,dir);float perp=abs(r.x*dir.y-r.y*dir.x);float sz=max(m.z,.35);
    float head=exp(-dot(r,r)/(sz*sz*1.2));
    float tl=max(d.z,1.);float tw=sz*(d.w>.5?1.6:.55)*(1.+along/tl*(d.w>.5?2.5:.8));
    float tail=along>0.?exp(-along/tl*2.2)*exp(-perp*perp/(tw*tw))*(d.w>.5?.55:.8):0.;
    float coma=d.w>.5?exp(-length(r)/(sz*4.))*.18:0.;
    vec3 hc=d.w>1.5?vec3(1.,.9,.78):vec3(.92,.95,1.);
    c+=(hc*head*1.4+vec3(.8,.84,1.)*tail+vec3(.75,.85,1.)*coma)*m.w;}
  return c;}
vec3 aur(vec2 u,float t){ vec3 c=vec3(0.);
  for(int k=0;k<3;k++){float K=float(k);
    float fold=.055*sin(u.x*2.2+t*.14+K*1.9)+.025*sin(u.x*5.3-t*.23+K)+.01*sin(u.x*13.-t*.45+K*2.)+.006*sin(u.x*31.+t*.7);
    float b=(uMob>.5?.50:.36)+K*.05+fold;
    float d=b-u.y; float hgt=(uMob>.5?.13:.2)*(.8+.4*n1(u.x*3.+K*7.+t*.05));
    float edge=d<0.?exp(d*320.):exp(-d/hgt)*.75+exp(-d*70.)*.6;
    float rx=u.x*(uMob>.5?90.:150.)+K*31.+ 6.*sin(u.x*4.+t*.2+K);
    float lowr=clamp(d/hgt,0.,1.);float rr0=.45+.55*pow(n(vec2(rx+t*.45,K*3.+t*.07)),2.2)*(.6+.4*n(vec2(rx*.37-t*.3,K)));float rays=mix(rr0,.62,smoothstep(.25,1.,lowr)*.75);
    float env=smoothstep(.0,.25,u.x-K*.08)*smoothstep(1.05,.6,u.x+K*.06)*(.55+.45*n1(u.x*2.3-t*.06+K*5.));
    vec3 col=mix(vec3(.62,.86,.74),vec3(.80,.76,.96),smoothstep(0.,.18,lowr));col=mix(col,vec3(.58,.48,.86),smoothstep(.35,1.,lowr));
    c+=col*edge*rays*env*(k==0?.42:.26);}
  return c;}
void main(){vec2 px=v*uRes;vec2 u=(px-uOff)/uSize;
  vec3 col;float sky=texture2D(uS,u).r;float lake=uLakeOn*texture2D(uL,u).r;float t=uT;
  vec2 uu=u;
  if(lake>.01&&uR.w>0.){float age=t-uR.z;vec2 dd=(u-uR.xy)*uSize*vec2(1.,3.2);float dr=length(dd);float R=uR.w*(5.+age*22.);
    float env=exp(-age*.75)*smoothstep(0.,.15,age)*exp(-pow((dr-R)/(uR.w*9.+age*10.),2.));
    float w=sin((dr-R)*.55/max(uR.w*.35,.6))*env;uu+=normalize(dd+1e-4)*vec2(1.,1./3.2)*w*uR.w*1.6/uSize;}
  if(lake>.01){ vec2 q=u*vec2(60.,140.); float a1=n(q+vec2(t*.35,t*.9)),a2=n(q*1.9-vec2(t*.5,t*1.3)),a3=n(q*.5+vec2(-t*.2,t*.5));
    vec2 nrm=vec2(a1-a2,(a2+a3-1.))*.0045*(.4+.6*(u.y-uHz)/(1.-uHz)*2.); uu+=nrm*lake; }
  col=texture2D(uP,uu).rgb;
  if(sky>.01&&uRot!=0.){vec2 ru=rot(u,uRot);float sk2=texture2D(uS,ru).r;float k=smoothstep(.85,1.,sky)*smoothstep(.85,1.,sk2)*smoothstep(uHz-.02,uHz-.12,u.y);col=mix(col,texture2D(uP,ru).rgb,k);}
  col+=aur(u,t)*sky*uA;
  if(lake>.01){ vec2 m=vec2(uu.x,2.*uHz-uu.y); col+=aur(m,t)*lake*.38*smoothstep(0.,.02,uu.y-uHz); }
  col+=met(px)*max(sky,lake);
  if(lake>.01&&uR.w>0.){float age=t-uR.z;vec2 dd=(u-uR.xy)*uSize*vec2(1.,3.2);col+=vec3(1.,.93,.85)*exp(-age*5.)*exp(-dot(dd,dd)/(uR.w*uR.w*30.))*1.2*smoothstep(-.01,.03,age);}
  col=pow(col,vec3(1.02,1.02,.98));col*=vec3(.98,.97,1.03);
  float g=h(floor(px*uDpr)+fract(t*24.)*91.)-.5; col+=g*.035;
  gl_FragColor=vec4(col,1.);}`;
const load = (s) => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = s; });
const glow = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.12, 'rgba(225,230,255,.55)'); r.addColorStop(.4, 'rgba(190,200,255,.1)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return c; });
const spike = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  for (const [w, hh] of [[128, 1.2], [1.2, 128]]) { const r = g.createLinearGradient(w > 2 ? 0 : 64, w > 2 ? 64 : 0, w > 2 ? 128 : 64, w > 2 ? 64 : 128); r.addColorStop(0, 'rgba(0,0,0,0)'); r.addColorStop(.5, 'rgba(220,226,255,.8)'); r.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = r; g.fillRect(64 - w / 2, 64 - hh / 2, w, hh); } return c; });

export default function OasisGL({ variant = 'hero' }) {
  const wrap = useRef(null);
  useEffect(() => {
    const hero = variant === 'hero', el = wrap.current, cv = el.querySelector('canvas.gl'), ov = el.querySelector('canvas.tw');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = cv.getContext('webgl', { antialias: false, premultipliedAlpha: false }); const o2 = ov.getContext('2d');
    if (!gl) return;
    let alive = true, raf, io, set = {}, mob, W, H, dpr, off, size, img, stars, G, S, lakePts = [], BW = 2560, pole = [.3, 1.9];
    const sim = { obj: [], next: 1.5, imp: null, impNext: 2, rip: [0, 0, -99, 0] };
    const sh = (t, s) => { const x = gl.createShader(t); gl.shaderSource(x, s); gl.compileShader(x); return x; };
    const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr);
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const tex = (i, im) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im); return t; };
    const setup = async () => {
      const r = el.getBoundingClientRect(); const m = (hero ? r.width : window.innerWidth) < 768;
      if (m !== mob || !set.p) { mob = m; const k = mob ? 'landm' : 'land';
        const want = Math.min(window.devicePixelRatio || 1, 2) * (hero ? r.width : window.innerWidth) * (mob ? 2.4 : 1.25);
        const res = mob ? (want > 1500 ? 3840 : 2560) : (want > 2700 ? 3840 : 2560);
        const [p, s, l, st] = await Promise.all([load(BASE + k + '-photo-' + res + '.webp'), load(BASE + k + '-sky.png'), load(BASE + k + '-lake.png'), fetch(BASE + k + '-stars.json').then(x => x.json())]);
        if (!alive) return false; img = p; stars = st; tex(0, p); tex(1, s); tex(2, l); set.p = 1; BW = mob ? 1440 : 2560; pole = mob ? [.2, 1.5] : [.3, 1.9];
          const c = document.createElement('canvas'); c.width = l.width; c.height = l.height; const g = c.getContext('2d'); g.drawImage(l, 0, 0);
          const dd = g.getImageData(0, 0, c.width, c.height).data; lakePts = [];
          for (let y = 0; y < c.height; y += 4) for (let x = 0; x < c.width; x += 4) if (dd[(y * c.width + x) * 4] > 200) lakePts.push([x / c.width, y / c.height]); }
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [cv, ov]) { c.width = W * dpr; c.height = H * dpr; }
      gl.viewport(0, 0, cv.width, cv.height);
      const iw = img.width, ih = img.height;
      let s; if (hero) { s = Math.max(W / iw, H / ih); size = [iw * s, ih * s]; off = [(W - size[0]) * (mob ? .85 : .7), H - size[1]]; }
      else { s = Math.max(W / (iw * (mob ? .42 : .5)), H / (ih * .58)); size = [iw * s, ih * s]; off = [0, 0]; }
      gl.uniform1i(U('uP'), 0); gl.uniform1i(U('uS'), 1); gl.uniform1i(U('uL'), 2);
      gl.uniform2f(U('uRes'), W, H); gl.uniform2f(U('uOff'), off[0], off[1]); gl.uniform2f(U('uSize'), size[0], size[1]);
      gl.uniform1f(U('uMob'), mob ? 1 : 0); gl.uniform1f(U('uHz'), mob ? .675 : .695); gl.uniform1f(U('uLakeOn'), hero ? 1 : 0); gl.uniform1f(U('uA'), hero ? 1 : 1.7); gl.uniform1f(U('uDpr'), dpr); gl.uniform2f(U('uPole'), pole[0], pole[1]);
      G = G || glow(); S = S || spike(); return true; };
    const R = Math.random, vis = () => [Math.max(0, -off[0] / size[0]), Math.min(1, (W - off[0]) / size[0]), Math.max(0, -off[1] / size[1])];
    const step = (t) => {
      const [x0, x1, y0] = vis(), hz = mob ? .675 : .695;
      if (t > sim.next) { sim.next = t + 3 + R() * 5; const kind = R() < .62 ? 0 : R() < .7 ? 1 : 2; const dir = R() < .5 ? 1 : -1;
        const dur = kind === 1 ? 4 + R() * 4 : kind === 0 ? .5 + R() * 1.1 : 1 + R() * 1.2; const span = (x1 - x0) * (kind === 1 ? .35 + R() * .3 : .2 + R() * .35);
        const xs = x0 + (x1 - x0) * (.1 + R() * .8); const ys = y0 + (hz - y0) * (.08 + R() * .55); const app = R() < .5;
        const big = kind === 2 ? 2.2 + R() * 2 : kind === 1 ? 1.4 + R() * 1.6 : .8 + R() * 1.8;
        sim.obj.push({ t0: t, dur, kind, a: [xs, ys], b: [xs + dir * span, ys + (R() * .5 + .05) * span * size[0] / size[1] * .35], s0: app ? .35 : big, s1: app ? big : .35, br: kind === 1 ? .55 : .85 + R() * .3 }); }
      if (!sim.imp && t > sim.impNext && hero && lakePts.length) {
        const vp = lakePts.filter(([x, y]) => x > x0 + .04 && x < x1 - .04 && off[1] + y * size[1] < H - 30); const e = vp[Math.floor(R() * vp.length)];
        if (e) { const dir = e[0] > (x0 + x1) / 2 ? 1 : -1; const sx = Math.min(x1 - .03, Math.max(x0 + .03, e[0] - dir * (x1 - x0) * (.55 + R() * .2)));
          sim.imp = { t0: t, dur: 55 + R() * 8, a: [sx, y0 + (hz - y0) * (.12 + R() * .2)], e, sz: 2.4 + R() * 1.6 }; } }
      const im = sim.imp; if (im && t - im.t0 > im.dur) { sim.rip = [im.e[0], im.e[1], t, im.sz]; sim.imp = null; sim.impNext = t + 12 + R() * 14; }
      sim.obj = sim.obj.filter(o => t - o.t0 < o.dur); };
    const M = new Float32Array(28), MD = new Float32Array(28);
    const upload = (t) => { M.fill(0); MD.fill(0); let i = 0;
      for (const o of sim.obj) { if (i > 5) break; const p = (t - o.t0) / o.dur, q = o.s0 < o.s1 ? p * p : Math.sqrt(p);
        const x = o.a[0] + (o.b[0] - o.a[0]) * p, y = o.a[1] + (o.b[1] - o.a[1]) * (p * p * .6 + p * .4); const sz = o.s0 + (o.s1 - o.s0) * q;
        const vx = (o.b[0] - o.a[0]) * size[0], vy = (o.b[1] - o.a[1]) * size[1] * (1.2 * p + .4); const sp = Math.hypot(vx, vy) / o.dur;
        const fade = Math.min(1, p * 6) * Math.min(1, (1 - p) * (o.kind === 1 ? 3 : 5));
        M.set([x, y, sz, o.br * fade * (o.s0 < o.s1 ? .45 + .55 * q : 1 - .55 * q)], i * 4);
        MD.set([vx, vy, (o.kind === 1 ? 70 : o.kind === 2 ? 30 : 16 + sp * .06) * sz, o.kind === 1 ? 1 : o.kind === 2 ? 2 : 0], i * 4); i++; }
      const im = sim.imp; if (im) { const p = (t - im.t0) / im.dur, q = Math.pow(p, 3.2);
        const x = im.a[0] + (im.e[0] - im.a[0]) * p, y = im.a[1] + (im.e[1] - im.a[1]) * (.25 * p + .75 * p * p);
        const vx = (im.e[0] - im.a[0]) * size[0], vy = (im.e[1] - im.a[1]) * size[1] * (.25 + 1.5 * p);
        M.set([x, y, .35 + im.sz * 1.8 * q, Math.min(1, p * 8) * (.35 + .9 * q)], 24); MD.set([vx, vy, 4 + 120 * q, 2], 24); }
      gl.uniform4fv(U('uM'), M); gl.uniform4fv(U('uMD'), MD); gl.uniform4f(U('uR'), ...sim.rip); };
    const frame = (ms) => {
      if (!alive) return; const t = reduce ? 30 : ms / 1000 + 40;
      gl.uniform1f(U('uT'), t); const rot = reduce ? 0 : Math.sin(t * .021) * .022; gl.uniform1f(U('uRot'), rot);
      if (!reduce) step(t); upload(t); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      o2.setTransform(dpr, 0, 0, dpr, 0, 0); o2.clearRect(0, 0, W, H); o2.globalCompositeOperation = 'lighter';
      for (let i = 0; i < stars.length; i++) { const [x, y, m, d] = stars[i]; const asp = size[0] / size[1], dx = (x - pole[0]) * asp, dy = y - pole[1], cr = Math.cos(rot), sr = Math.sin(rot);
        const rx = pole[0] + (cr * dx + sr * dy) / asp, ry = pole[1] + (-sr * dx + cr * dy); const sx = off[0] + rx * size[0], sy = off[1] + ry * size[1];
        if (sx < -20 || sy < -20 || sx > W + 20 || sy > H + 20) continue;
        const p = i * 2.399, sc = reduce ? .7 : Math.max(0, .55 + .45 * Math.sin(t * (2.3 + (i % 7) * .9) + p) * Math.sin(t * (5.1 + (i % 5) * 1.7) + p * 1.7) + .25 * Math.sin(t * (11 + i % 9) + p * 3));
        const r = (1.6 + m * 3.6) * (.7 + .6 * sc), lim = d * size[0] / BW; // never larger than the gap to land
        const rr = Math.min(r, lim); o2.globalAlpha = Math.min(1, (.25 + .6 * m) * sc); o2.drawImage(G, sx - rr, sy - rr, rr * 2, rr * 2);
        if (i < 7 && m > .8) { const L = Math.min(lim, (14 + 16 * m) * (.6 + .5 * sc)); o2.globalAlpha = .5 * sc; o2.drawImage(S, sx - L, sy - L, L * 2, L * 2); } }
      raf = reduce ? 0 : requestAnimationFrame(frame); };
    (async () => { if (!(await setup())) return; raf = requestAnimationFrame(frame);
      io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting && !reduce) raf = requestAnimationFrame(frame); }); io.observe(el); })();
    let tm; const onR = () => { clearTimeout(tm); tm = setTimeout(async () => { if (await setup()) frame(performance.now()); }, 120); };
    window.addEventListener('resize', onR);
    return () => { alive = false; cancelAnimationFrame(raf); io && io.disconnect(); window.removeEventListener('resize', onR); };
  }, [variant]);
  return <div ref={wrap} className={`oasis-canvas ${variant === 'bg' ? 'oc-bg' : ''}`} aria-hidden="true">
    <canvas className="gl" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    <canvas className="tw" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} /></div>;
}
