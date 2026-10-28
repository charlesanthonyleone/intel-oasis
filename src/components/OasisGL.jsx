import { useEffect, useRef } from 'react';
/* v11 — one photograph, one shader. The photo supplies sky, stars, Milky Way, dunes and palms.
   The shader adds only: a ray-structured aurora (sky-masked, behind palms), a refraction-only lake
   ripple, a unified grade and film grain. A 2D overlay twinkles the photo's own brightest stars (sky-only). */
const BASE = import.meta.env.BASE_URL + 'oasis/';
const VS = `attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0,1);}`;
const FS = `precision highp float;varying vec2 v;
uniform sampler2D uP,uS,uL;uniform vec2 uRes,uOff,uSize;uniform float uT,uMob,uHz,uLakeOn,uA;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float n1(float x){return n(vec2(x,.5));}
vec3 aur(vec2 u,float t){ vec3 c=vec3(0.);
  for(int k=0;k<3;k++){float K=float(k);
    float fold=.055*sin(u.x*2.2+t*.14+K*1.9)+.025*sin(u.x*5.3-t*.23+K)+.01*sin(u.x*13.-t*.45+K*2.)+.006*sin(u.x*31.+t*.7);
    float b=(uMob>.5?.50:.36)+K*.05+fold;
    float d=b-u.y; float hgt=(uMob>.5?.13:.2)*(.8+.4*n1(u.x*3.+K*7.+t*.05));
    float edge=d<0.?exp(d*320.):exp(-d/hgt)*.75+exp(-d*70.)*.6;
    float rx=u.x*(uMob>.5?90.:150.)+K*31.+ 6.*sin(u.x*4.+t*.2+K);
    float rays=.45+.55*pow(n(vec2(rx+t*.45,K*3.+t*.07)),2.2)*(.6+.4*n(vec2(rx*.37-t*.3,K)));
    float env=smoothstep(.0,.25,u.x-K*.08)*smoothstep(1.05,.6,u.x+K*.06)*(.55+.45*n1(u.x*2.3-t*.06+K*5.));
    float lowr=clamp(d/hgt,0.,1.);
    vec3 col=mix(vec3(.62,.86,.74),vec3(.80,.76,.96),smoothstep(0.,.18,lowr));col=mix(col,vec3(.58,.48,.86),smoothstep(.35,1.,lowr));
    c+=col*edge*rays*env*(k==0?.42:.26);}
  return c;}
void main(){vec2 px=v*uRes;vec2 u=(px-uOff)/uSize;
  vec3 col;float sky=texture2D(uS,u).r;float lake=uLakeOn*texture2D(uL,u).r;float t=uT;
  vec2 uu=u;
  if(lake>.01){ vec2 q=u*vec2(60.,140.); float a1=n(q+vec2(t*.35,t*.9)),a2=n(q*1.9-vec2(t*.5,t*1.3)),a3=n(q*.5+vec2(-t*.2,t*.5));
    vec2 nrm=vec2(a1-a2,(a2+a3-1.))*.0045*(.4+.6*(u.y-uHz)/(1.-uHz)*2.); uu=u+nrm*lake; }
  col=texture2D(uP,uu).rgb;
  col+=aur(u,t)*sky*uA;
  if(lake>.01){ vec2 m=vec2(uu.x,2.*uHz-uu.y); col+=aur(m,t)*lake*.38*smoothstep(0.,.02,uu.y-uHz); }
  col=pow(col,vec3(1.02,1.02,.98));col*=vec3(.98,.97,1.03);
  float g=h(px+fract(t*24.)*91.)-.5; col+=g*.035;
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
    let alive = true, raf, io, set = {}, mob, W, H, dpr, off, size, img, stars, G, S;
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
        const [p, s, l, st] = await Promise.all([load(BASE + k + '-photo.webp'), load(BASE + k + '-sky.png'), load(BASE + k + '-lake.png'), fetch(BASE + k + '-stars.json').then(x => x.json())]);
        if (!alive) return false; img = p; stars = st; tex(0, p); tex(1, s); tex(2, l); set.p = 1; }
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, mob ? 1.5 : 1.75);
      for (const c of [cv, ov]) { c.width = W * dpr; c.height = H * dpr; }
      gl.viewport(0, 0, cv.width, cv.height);
      const iw = img.width, ih = img.height;
      let s; if (hero) { s = Math.max(W / iw, H / ih); size = [iw * s, ih * s]; off = [(W - size[0]) * (mob ? .85 : .7), H - size[1]]; }
      else { s = Math.max(W / (iw * (mob ? .42 : .5)), H / (ih * .58)); size = [iw * s, ih * s]; off = [0, 0]; }
      gl.uniform1i(U('uP'), 0); gl.uniform1i(U('uS'), 1); gl.uniform1i(U('uL'), 2);
      gl.uniform2f(U('uRes'), W, H); gl.uniform2f(U('uOff'), off[0], off[1]); gl.uniform2f(U('uSize'), size[0], size[1]);
      gl.uniform1f(U('uMob'), mob ? 1 : 0); gl.uniform1f(U('uHz'), mob ? .675 : .695); gl.uniform1f(U('uLakeOn'), hero ? 1 : 0); gl.uniform1f(U('uA'), hero ? 1 : 1.7);
      G = G || glow(); S = S || spike(); return true; };
    const frame = (ms) => {
      if (!alive) return; const t = reduce ? 30 : ms / 1000 + 40;
      gl.uniform1f(U('uT'), t); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      o2.setTransform(dpr, 0, 0, dpr, 0, 0); o2.clearRect(0, 0, W, H); o2.globalCompositeOperation = 'lighter';
      for (let i = 0; i < stars.length; i++) { const [x, y, m, d] = stars[i]; const sx = off[0] + x * size[0], sy = off[1] + y * size[1];
        if (sx < -20 || sy < -20 || sx > W + 20 || sy > H + 20) continue;
        const p = i * 2.399, sc = reduce ? .7 : Math.max(0, .55 + .45 * Math.sin(t * (2.3 + (i % 7) * .9) + p) * Math.sin(t * (5.1 + (i % 5) * 1.7) + p * 1.7) + .25 * Math.sin(t * (11 + i % 9) + p * 3));
        const r = (1.6 + m * 3.6) * (.7 + .6 * sc), lim = d * size[0] / img.width; // never larger than the gap to land
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
