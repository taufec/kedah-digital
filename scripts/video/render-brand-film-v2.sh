#!/usr/bin/env bash
set -euo pipefail

WORK="/tmp/ktv-brand-film-v2"
SITE="$WORK/site"
FILM="$WORK/film"
OUT="$WORK/ktv-brand-film-v2.mp4"

rm -rf "$WORK"
mkdir -p "$WORK" "$FILM/src" "$FILM/public"

echo "=== KTV BRAND FILM V2 ==="
echo "direction=Ordinary Folk restraint + Linear depth + premium launch-film kinetic type"

for c in git node npm ffmpeg ffprobe python3; do
  command -v "$c" >/dev/null 2>&1 || { echo "missing $c" >&2; exit 64; }
done

git clone -q --depth 1 https://github.com/taufec/kedah-digital.git "$SITE"
mkdir -p "$FILM/public/assets"
cp -a "$SITE/public/assets/." "$FILM/public/assets/"

git clone -q --depth 1 https://github.com/vercel/geist-font.git "$WORK/geist"
mkdir -p "$FILM/public/fonts"
cp "$WORK/geist/fonts/Geist/variable/Geist[wght].ttf" "$FILM/public/fonts/Geist.ttf"
cp "$WORK/geist/fonts/GeistMono/variable/GeistMono[wght].ttf" "$FILM/public/fonts/GeistMono.ttf"

cat > "$FILM/package.json" <<'JSON'
{
  "name": "ktv-brand-film-v2",
  "private": true,
  "type": "module",
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "remotion": "^4.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
JSON

cat > "$FILM/src/index.jsx" <<'JSX'
import React from 'react';
import {registerRoot} from 'remotion';
import {Root} from './root.jsx';
registerRoot(Root);
JSX

cat > "$FILM/src/root.jsx" <<'JSX'
import React from 'react';
import {Composition} from 'remotion';
import {KTVFilm} from './video.jsx';

export const Root = () => (
  <Composition
    id="KTVBrandFilm"
    component={KTVFilm}
    durationInFrames={885}
    fps={30}
    width={1920}
    height={1080}
  />
);
JSX

cat > "$FILM/src/video.jsx" <<'JSX'
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  ink: '#050806',
  ink2: '#0A100D',
  paper: '#EEF2EA',
  muted: '#A4AFA6',
  green: '#B9F05D',
  greenDeep: '#0A6844',
  gold: '#E3BB55',
  cyan: '#82D8CB',
  violet: '#B9A5FF',
};

const F = {
  display: "'Geist', 'Helvetica Neue', Arial, sans-serif",
  mono: "'Geist Mono', ui-monospace, monospace",
};

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const prog = (f, a, b) => clamp((f - a) / (b - a));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
const mix = (a, b, p) => a + (b - a) * p;

const sceneOpacity = (f, start, end, fade = 12) =>
  interpolate(f, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const Scene = ({start, end, children, style = {}}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: sceneOpacity(frame, start, end),
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Noise = ({opacity = 0.05}) => (
  <AbsoluteFill
    style={{
      opacity,
      mixBlendMode: 'soft-light',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.7%27/%3E%3C/svg%3E")',
    }}
  />
);

const Grid = ({opacity = 0.15}) => (
  <AbsoluteFill
    style={{
      opacity,
      backgroundImage:
        'linear-gradient(rgba(238,242,234,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(238,242,234,.09) 1px, transparent 1px)',
      backgroundSize: '96px 96px',
      maskImage: 'radial-gradient(circle at center, black 25%, transparent 82%)',
    }}
  />
);

const Glow = ({x='50%', y='50%', size=700, color=C.green, opacity=.18}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      transform: 'translate(-50%,-50%)',
      borderRadius: '50%',
      background: color,
      filter: 'blur(140px)',
      opacity,
    }}
  />
);

const Label = ({children, color=C.muted, style={}}) => (
  <div
    style={{
      fontFamily: F.mono,
      fontSize: 20,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

const ArrowMark = ({size=62, color=C.green}) => (
  <div style={{display:'flex', gap:8, alignItems:'center'}}>
    <div style={{width:size*.55,height:size*.55,borderTop:`${size*.15}px solid ${color}`,borderRight:`${size*.15}px solid ${color}`,transform:'rotate(45deg)'}} />
    <div style={{width:size*.55,height:size*.55,borderTop:`${size*.15}px solid ${color}`,borderRight:`${size*.15}px solid ${color}`,transform:'rotate(45deg)',opacity:.65,marginLeft:-24}} />
  </div>
);

const Scribble = ({progress=1, color=C.green, width=6, style={}}) => {
  const dash = 1200;
  return (
    <svg viewBox="0 0 1000 180" style={{position:'absolute', overflow:'visible', ...style}}>
      <path
        d="M28 120 C165 142 282 75 404 104 S665 165 968 76"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dash}
        strokeDashoffset={dash * (1-progress)}
      />
    </svg>
  );
};

const Photo = ({src, style={}, dim=.2, radius=32}) => (
  <div style={{position:'absolute', overflow:'hidden', borderRadius:radius, ...style}}>
    <Img src={staticFile(src)} style={{width:'100%',height:'100%',objectFit:'cover'}} />
    <div style={{position:'absolute',inset:0,background:`rgba(5,8,6,${dim})`}} />
  </div>
);

const Logo = ({width=420, style={}}) => (
  <Img
    src={staticFile('assets/ktv-logo.png')}
    style={{width, height:'auto', objectFit:'contain', ...style}}
  />
);

const Symbol = ({width=130, style={}}) => (
  <Img
    src={staticFile('assets/ktv-symbol.png')}
    style={{width, height:'auto', objectFit:'contain', ...style}}
  />
);

const Glass = ({children, style={}}) => (
  <div
    style={{
      position:'absolute',
      background:'linear-gradient(145deg, rgba(238,242,234,.11), rgba(238,242,234,.035))',
      border:'1px solid rgba(238,242,234,.18)',
      boxShadow:'0 36px 100px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.08)',
      backdropFilter:'blur(20px)',
      borderRadius:30,
      ...style,
    }}
  >{children}</div>
);

const CornerIndex = ({n, text}) => (
  <div style={{position:'absolute', left:62, top:54, display:'flex', alignItems:'center', gap:16}}>
    <div style={{fontFamily:F.mono,fontSize:18,color:C.green,letterSpacing:'.08em'}}>{n}</div>
    <div style={{width:54,height:1,background:'rgba(238,242,234,.28)'}} />
    <Label>{text}</Label>
  </div>
);

const SceneHook = () => {
  const f = useCurrentFrame();
  const p = spring({frame:f, fps:30, config:{damping:18, stiffness:110, mass:.9}});
  const under = ease(prog(f, 24, 54));
  const bg = ease(prog(f, 0, 44));
  return (
    <Scene start={0} end={76} style={{background:C.ink}}>
      <Photo
        src="assets/strategy-brain-drain.webp"
        style={{
          right:-70, top:-40, width:1130, height:1160,
          transform:`scale(${1.08 - .035*bg})`,
          filter:'grayscale(.15) contrast(1.05)',
          opacity:.82,
        }}
        dim={.42}
        radius={0}
      />
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg, #050806 0%, #050806 38%, rgba(5,8,6,.72) 63%, rgba(5,8,6,.2) 100%)'}} />
      <Glow x="71%" y="58%" size={780} opacity={.12}/>
      <CornerIndex n="01" text="CABARAN → PELUANG"/>
      <div style={{position:'absolute',left:92,top:268,width:1010,transform:`translateY(${mix(80,0,p)}px)`,opacity:p}}>
        <div style={{fontFamily:F.display,fontSize:140,lineHeight:.88,fontWeight:680,letterSpacing:'-.065em',color:C.paper}}>
          KEDAH BUKAN<br/>KURANG <span style={{color:C.green}}>BAKAT.</span>
        </div>
      </div>
      <Scribble progress={under} style={{left:70,top:635,width:920,height:170,transform:'rotate(-1.6deg)'}} />
      <div style={{position:'absolute',left:98,bottom:110,width:650,fontFamily:F.display,fontSize:32,lineHeight:1.25,color:'rgba(238,242,234,.72)',opacity:ease(prog(f,38,65))}}>
        Potensi ada. Yang diperlukan ialah momentum.
      </div>
      <Noise opacity={.065}/>
    </Scene>
  );
};

const NodeChip = ({label, accent, x, y, z, rot, reveal}) => (
  <div
    style={{
      position:'absolute',
      left:x, top:y,
      width:280,
      transform:`translate(-50%,-50%) perspective(1200px) translateZ(${z}px) rotate(${rot}deg) scale(${.84+.16*reveal})`,
      opacity:reveal,
    }}
  >
    <div style={{
      padding:'22px 26px',
      borderRadius:22,
      background:'rgba(13,20,16,.72)',
      border:'1px solid rgba(238,242,234,.13)',
      boxShadow:'0 22px 65px rgba(0,0,0,.42)',
      display:'flex',alignItems:'center',gap:16,
    }}>
      <span style={{width:12,height:12,borderRadius:'50%',background:accent,boxShadow:`0 0 32px ${accent}`}} />
      <span style={{fontFamily:F.mono,fontSize:20,letterSpacing:'.06em',color:C.paper}}>{label}</span>
    </div>
  </div>
);

const SceneMomentum = () => {
  const f = useCurrentFrame();
  const local = f-58;
  const title = spring({frame:local, fps:30, config:{damping:18,stiffness:120}});
  const labels = [
    ['BAKAT',C.green,330,360,30,-4],
    ['INDUSTRI',C.gold,610,765,-10,3],
    ['AKADEMIA',C.cyan,1320,325,40,4],
    ['AGENSI',C.violet,1560,675,10,-3],
    ['KOMUNITI',C.green,1020,875,0,2],
  ];
  return (
    <Scene start={58} end={178} style={{background:'linear-gradient(145deg,#050806,#09100b)'}}>
      <Grid opacity={.18}/>
      <Glow x="50%" y="55%" size={880} opacity={.08}/>
      <CornerIndex n="02" text="MOMENTUM"/>
      <div style={{position:'absolute',left:92,top:160,width:1600,transform:`translateY(${mix(42,0,title)}px)`,opacity:title}}>
        <div style={{fontFamily:F.display,fontSize:110,lineHeight:.95,fontWeight:650,letterSpacing:'-.055em',color:C.paper}}>
          Kedah perlukan<br/><span style={{color:C.green}}>momentum.</span>
        </div>
      </div>
      {labels.map((a,i)=>{
        const r=ease(prog(local,30+i*7,70+i*7));
        const wobble=Math.sin((f+i*13)/17)*10;
        return <NodeChip key={a[0]} label={a[0]} accent={a[1]} x={a[2]} y={a[3]+wobble} z={a[4]} rot={a[5]} reveal={r}/>;
      })}
      <div style={{position:'absolute',right:90,bottom:82,width:560,textAlign:'right',fontFamily:F.mono,fontSize:20,letterSpacing:'.06em',color:C.muted,opacity:ease(prog(local,66,98))}}>
        LIMA PEMAIN · SATU EKOSISTEM
      </div>
      <Noise opacity={.055}/>
    </Scene>
  );
};

const SceneConnect = () => {
  const f = useCurrentFrame();
  const local=f-160;
  const connect=ease(prog(local,26,82));
  const logoP=spring({frame:local-48,fps:30,config:{damping:20,stiffness:105,mass:.8}});
  const pts=[
    [290,300,C.green,'BAKAT'],
    [290,790,C.gold,'INDUSTRI'],
    [1630,300,C.cyan,'AKADEMIA'],
    [1630,790,C.violet,'AGENSI'],
    [960,930,C.green,'KOMUNITI'],
  ];
  const cx=960,cy=560;
  return (
    <Scene start={160} end={292} style={{background:C.ink}}>
      <Grid opacity={.12}/>
      <Glow x="50%" y="55%" size={780} opacity={.14}/>
      <CornerIndex n="03" text="HUBUNGKAN"/>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
        {pts.map((p,i)=>{
          const x2=mix(p[0],cx,connect), y2=mix(p[1],cy,connect);
          return <line key={i} x1={p[0]} y1={p[1]} x2={x2} y2={y2} stroke={p[2]} strokeWidth="3.5" opacity={.78} />;
        })}
        <circle cx={cx} cy={cy} r={118+22*Math.sin(f/9)} fill="none" stroke={C.green} strokeWidth="2" opacity=".24"/>
        <circle cx={cx} cy={cy} r={178+16*Math.sin(f/13)} fill="none" stroke={C.green} strokeWidth="1.5" opacity=".12"/>
      </svg>
      {pts.map((p,i)=>(
        <div key={p[3]} style={{position:'absolute',left:p[0],top:p[1],transform:'translate(-50%,-50%)'}}>
          <div style={{width:30,height:30,borderRadius:'50%',border:`3px solid ${p[2]}`,background:C.ink,boxShadow:`0 0 38px ${p[2]}66`}} />
          <div style={{marginTop:14,fontFamily:F.mono,fontSize:18,color:p[2],letterSpacing:'.08em',textAlign:'center'}}>{p[3]}</div>
        </div>
      ))}
      <div style={{position:'absolute',left:cx,top:cy,transform:`translate(-50%,-50%) scale(${.78+.22*logoP})`,opacity:logoP}}>
        <div style={{width:285,height:285,borderRadius:'50%',background:'rgba(5,8,6,.8)',border:'1px solid rgba(185,240,93,.35)',boxShadow:'0 0 110px rgba(185,240,93,.16)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Logo width={225}/>
        </div>
      </div>
      <div style={{position:'absolute',left:92,bottom:84,width:940,opacity:ease(prog(local,74,108))}}>
        <div style={{fontFamily:F.display,fontSize:68,fontWeight:590,letterSpacing:'-.04em',color:C.paper}}>Menghubungkan semua titik.</div>
        <div style={{marginTop:12,fontFamily:F.mono,fontSize:20,letterSpacing:'.06em',color:C.muted}}>BAKAT × INDUSTRI × AKADEMIA × AGENSI × KOMUNITI</div>
      </div>
      <Noise opacity={.05}/>
    </Scene>
  );
};

const BrowserMock = ({f}) => {
  const p=spring({frame:f,fps:30,config:{damping:18,stiffness:95,mass:.9}});
  return (
    <div style={{position:'absolute',right:92,top:132,width:1160,height:760,transform:`perspective(1500px) rotateY(${-10+10*p}deg) rotateX(${5-5*p}deg) translateX(${mix(180,0,p)}px) scale(${.94+.06*p})`,transformOrigin:'center'}}>
      <div style={{position:'absolute',left:-55,top:70,width:'100%',height:'100%',borderRadius:36,background:'rgba(185,165,255,.12)',border:'1px solid rgba(185,165,255,.18)',transform:'translateZ(-100px) rotate(-2deg)'}}/>
      <div style={{position:'absolute',left:-28,top:34,width:'100%',height:'100%',borderRadius:36,background:'rgba(130,216,203,.09)',border:'1px solid rgba(130,216,203,.18)',transform:'translateZ(-50px) rotate(-1deg)'}}/>
      <div style={{position:'absolute',inset:0,borderRadius:36,overflow:'hidden',background:'#07100a',border:'1px solid rgba(238,242,234,.2)',boxShadow:'0 55px 140px rgba(0,0,0,.55)'}}>
        <Photo src="assets/hero-community.webp" style={{inset:0}} dim={.48} radius={0}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(5,8,6,.96) 0%, rgba(5,8,6,.76) 45%, rgba(5,8,6,.15) 100%)'}}/>
        <div style={{position:'absolute',left:48,top:38,right:48,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Logo width={250}/>
          <div style={{fontFamily:F.mono,fontSize:16,color:'rgba(238,242,234,.74)',letterSpacing:'.08em'}}>TENTANG · EKOSISTEM · KEAHLIAN</div>
        </div>
        <div style={{position:'absolute',left:54,top:205,width:680}}>
          <Label color={C.green}>PERTUBUHAN PROFESIONAL TEKNOLOGI DIGITAL KEDAH</Label>
          <div style={{marginTop:20,fontFamily:F.display,fontSize:77,lineHeight:.95,fontWeight:660,letterSpacing:'-.055em',color:C.paper}}>
            Merancakkan<br/><span style={{color:C.green}}>Ekonomi Digital</span><br/>Kedah
          </div>
          <div style={{marginTop:24,fontFamily:F.display,fontSize:24,lineHeight:1.4,color:'rgba(238,242,234,.72)'}}>
            Menghubungkan bakat, industri, akademia, agensi dan komuniti untuk memacu masa depan digital Kedah.
          </div>
          <div style={{marginTop:34,display:'inline-flex',padding:'17px 24px',borderRadius:14,background:C.green,color:C.ink,fontFamily:F.mono,fontSize:18,fontWeight:700,letterSpacing:'.04em'}}>
            SERTAI KOMUNITI →
          </div>
        </div>
      </div>
    </div>
  );
};

const ScenePlatform = () => {
  const f=useCurrentFrame();
  const local=f-270;
  const p=spring({frame:local-6,fps:30,config:{damping:18,stiffness:100}});
  return (
    <Scene start={270} end={420} style={{background:'linear-gradient(135deg,#050806,#07130c)'}}>
      <Glow x="77%" y="52%" size={780} opacity={.12}/>
      <CornerIndex n="04" text="SATU PLATFORM"/>
      <div style={{position:'absolute',left:92,top:280,width:600,opacity:p,transform:`translateY(${mix(55,0,p)}px)`}}>
        <div style={{fontFamily:F.display,fontSize:94,lineHeight:.94,fontWeight:640,letterSpacing:'-.055em',color:C.paper}}>
          Bukan sekadar<br/><span style={{color:C.green}}>acara.</span>
        </div>
        <div style={{marginTop:34,fontFamily:F.display,fontSize:32,lineHeight:1.3,color:'rgba(238,242,234,.72)'}}>
          Jaringan yang menggerakkan ekosistem.
        </div>
      </div>
      <BrowserMock f={local}/>
      <Noise opacity={.055}/>
    </Scene>
  );
};

const SceneOutcome = () => {
  const f=useCurrentFrame();
  const local=f-400;
  const bridge=ease(prog(local,34,92));
  const symbolX=mix(510,1410,bridge);
  const p=spring({frame:local-8,fps:30,config:{damping:18,stiffness:110}});
  return (
    <Scene start={400} end={548} style={{background:C.ink}}>
      <Grid opacity={.11}/>
      <Glow x="50%" y="52%" size={900} opacity={.08}/>
      <CornerIndex n="05" text="OUTCOME"/>
      <div style={{position:'absolute',left:90,top:166,width:1700,opacity:p}}>
        <div style={{fontFamily:F.display,fontSize:76,fontWeight:600,letterSpacing:'-.045em',color:C.paper}}>
          Bakat lebih terlihat. <span style={{color:C.green}}>Peluang lebih dekat.</span>
        </div>
      </div>
      <Glass style={{left:110,top:455,width:400,height:210,padding:40}}>
        <Label color={C.green}>01 / INPUT</Label>
        <div style={{marginTop:22,fontFamily:F.display,fontSize:58,fontWeight:630,color:C.paper}}>BAKAT</div>
        <div style={{marginTop:10,fontFamily:F.display,fontSize:23,color:C.muted}}>Builder · founder · profesional</div>
      </Glass>
      <Glass style={{right:110,top:455,width:400,height:210,padding:40}}>
        <Label color={C.gold}>02 / OUTPUT</Label>
        <div style={{marginTop:22,fontFamily:F.display,fontSize:58,fontWeight:630,color:C.paper}}>PELUANG</div>
        <div style={{marginTop:10,fontFamily:F.display,fontSize:23,color:C.muted}}>Konteks · jaringan · kolaborasi</div>
      </Glass>
      <svg width="1920" height="1080" style={{position:'absolute',inset:0}}>
        <path d="M510 560 C760 420 1160 700 1410 560" fill="none" stroke="rgba(238,242,234,.16)" strokeWidth="14" strokeLinecap="round"/>
        <path d="M510 560 C760 420 1160 700 1410 560" fill="none" stroke={C.green} strokeWidth="5" strokeLinecap="round" strokeDasharray="1050" strokeDashoffset={1050*(1-bridge)}/>
      </svg>
      <div style={{position:'absolute',left:symbolX,top:560,transform:`translate(-50%,-50%) rotate(${mix(-12,8,bridge)}deg)`,filter:'drop-shadow(0 0 32px rgba(185,240,93,.35))'}}>
        <Symbol width={118}/>
      </div>
      <div style={{position:'absolute',left:610,bottom:96,width:700,fontFamily:F.mono,fontSize:19,letterSpacing:'.05em',color:C.muted,opacity:ease(prog(local,78,118))}}>
        MENYAMBUNGKAN BAKAT YANG ADA KEPADA PELUANG YANG ADA
      </div>
      <Noise opacity={.05}/>
    </Scene>
  );
};

const Scene2020 = () => {
  const f=useCurrentFrame();
  const local=f-525;
  const p=spring({frame:local-10,fps:30,config:{damping:17,stiffness:100,mass:.9}});
  const photoP=ease(prog(local,20,70));
  const photos=[
    ['assets/community-network.webp',70,145,610,315,-4],
    ['assets/event-speaker-wide.webp',1240,105,580,315,4],
    ['assets/community-portrait.webp',1180,700,650,300,-2],
    ['assets/committee-gathering.webp',110,710,620,280,3],
  ];
  return (
    <Scene start={525} end={660} style={{background:'#050806'}}>
      <Glow x="50%" y="50%" size={850} opacity={.12}/>
      {photos.map((q,i)=>(
        <Photo key={q[0]} src={q[0]} style={{left:q[1],top:q[2],width:q[3],height:q[4],transform:`rotate(${q[5]}deg) scale(${.88+.12*photoP})`,opacity:.62*photoP}} dim={.36} radius={24}/>
      ))}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at center,rgba(5,8,6,.15),rgba(5,8,6,.9) 72%)'}}/>
      <div style={{position:'absolute',left:'50%',top:'50%',transform:`translate(-50%,-50%) scale(${.82+.18*p})`,textAlign:'center'}}>
        <Label color={C.gold} style={{fontSize:26}}>SEJAK</Label>
        <div style={{fontFamily:F.display,fontSize:310,lineHeight:.8,fontWeight:700,letterSpacing:'-.085em',color:C.green,textShadow:'0 0 80px rgba(185,240,93,.18)'}}>2020</div>
        <div style={{marginTop:34,fontFamily:F.display,fontSize:34,color:C.paper}}>Gerakan yang konsisten.</div>
      </div>
      <Scribble progress={ease(prog(local,54,92))} color={C.gold} width={5} style={{left:470,top:700,width:980,height:130,transform:'rotate(-2deg)'}} />
      <Noise opacity={.07}/>
    </Scene>
  );
};

const SceneProof = () => {
  const f=useCurrentFrame();
  const local=f-640;
  const p=spring({frame:local-7,fps:30,config:{damping:20,stiffness:100}});
  return (
    <Scene start={640} end={760} style={{background:'linear-gradient(135deg,#07100a,#050806)'}}>
      <CornerIndex n="07" text="STRUKTUR RASMI"/>
      <Glow x="50%" y="50%" size={720} color={C.gold} opacity={.08}/>
      <div style={{position:'absolute',left:250,top:190,width:1420,height:700,transform:`perspective(1400px) rotateX(${mix(7,0,p)}deg) scale(${.93+.07*p})`,transformOrigin:'center'}}>
        <div style={{position:'absolute',inset:0,borderRadius:42,background:'linear-gradient(145deg,rgba(238,242,234,.075),rgba(227,187,85,.03))',border:'1px solid rgba(227,187,85,.32)',boxShadow:'0 60px 180px rgba(0,0,0,.5)'}}/>
        <div style={{position:'absolute',left:64,top:56}}>
          <Logo width={300}/>
        </div>
        <div style={{position:'absolute',left:72,top:238}}>
          <Label color={C.gold}>PERTUBUHAN PROFESIONAL TEKNOLOGI DIGITAL KEDAH</Label>
          <div style={{marginTop:24,fontFamily:F.display,fontSize:126,fontWeight:650,letterSpacing:'-.06em',color:C.paper}}>PPTDK</div>
          <div style={{marginTop:16,fontFamily:F.mono,fontSize:28,letterSpacing:'.08em',color:C.green}}>BERDAFTAR · 21.04.2026</div>
          <div style={{marginTop:18,fontFamily:F.mono,fontSize:18,letterSpacing:'.06em',color:C.muted}}>PPM-010-02-21042026</div>
        </div>
        <div style={{position:'absolute',right:90,top:240,width:330,height:330,borderRadius:'50%',border:`2px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',transform:`rotate(${mix(-18,-6,p)}deg)`,boxShadow:'inset 0 0 80px rgba(227,187,85,.06)'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontFamily:F.mono,fontSize:18,letterSpacing:'.12em',color:C.gold}}>DRIVEN BY</div>
            <div style={{marginTop:12,fontFamily:F.display,fontSize:30,fontWeight:600,color:C.paper}}>ENTITI<br/>BERDAFTAR</div>
          </div>
        </div>
        <div style={{position:'absolute',left:72,right:72,bottom:54,height:1,background:'linear-gradient(90deg,transparent,rgba(227,187,85,.6),transparent)'}}/>
      </div>
      <Noise opacity={.055}/>
    </Scene>
  );
};

const ScenePeak = () => {
  const f=useCurrentFrame();
  const local=f-735;
  const p=spring({frame:local-4,fps:30,config:{damping:18,stiffness:98}});
  const slide=ease(prog(local,16,70));
  return (
    <Scene start={735} end={838} style={{background:C.ink}}>
      <Photo src="assets/community-portrait.webp" style={{left:-70,top:-30,width:2060,height:1140,transform:`scale(${1.08-.05*slide})`}} dim={.38} radius={0}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(5,8,6,.92) 0%,rgba(5,8,6,.58) 52%,rgba(5,8,6,.34) 100%)'}} />
      <Glow x="30%" y="56%" size={760} opacity={.12}/>
      <div style={{position:'absolute',left:84,top:198,transform:`translateX(${mix(-120,0,p)}px)`,opacity:p}}>
        <div style={{fontFamily:F.display,fontSize:120,lineHeight:.9,fontWeight:680,letterSpacing:'-.06em',color:C.paper}}>
          SATU<br/>EKOSISTEM.
        </div>
        <div style={{marginTop:24,fontFamily:F.display,fontSize:86,lineHeight:.95,fontWeight:620,letterSpacing:'-.05em',color:C.green}}>
          Satu gelombang<br/>kebangkitan.
        </div>
      </div>
      <div style={{position:'absolute',right:92,bottom:98,display:'flex',alignItems:'center',gap:28,opacity:ease(prog(local,42,78))}}>
        <ArrowMark size={54}/>
        <Label color={C.paper}>DRIVING KEDAH'S DIGITAL FUTURE</Label>
      </div>
      <Noise opacity={.065}/>
    </Scene>
  );
};

const SceneEnd = () => {
  const f=useCurrentFrame();
  const local=f-815;
  const p=spring({frame:local,fps:30,config:{damping:18,stiffness:95}});
  const cta=spring({frame:local-24,fps:30,config:{damping:16,stiffness:120}});
  return (
    <Scene start={815} end={885} style={{background:C.ink}}>
      <Glow x="50%" y="50%" size={700} opacity={.09}/>
      <div style={{position:'absolute',left:'50%',top:'42%',transform:`translate(-50%,-50%) scale(${.9+.1*p})`,opacity:p,textAlign:'center'}}>
        <Logo width={560}/>
        <div style={{marginTop:32,fontFamily:F.display,fontSize:50,fontWeight:540,letterSpacing:'-.03em',color:C.paper}}>
          Merancakkan Ekonomi Digital Kedah.
        </div>
      </div>
      <div style={{position:'absolute',left:'50%',bottom:124,transform:`translateX(-50%) scale(${.86+.14*cta})`,opacity:cta}}>
        <div style={{display:'flex',alignItems:'center',gap:22,padding:'22px 34px',borderRadius:18,background:C.green,color:C.ink,boxShadow:'0 18px 55px rgba(185,240,93,.17)'}}>
          <span style={{fontFamily:F.mono,fontSize:24,fontWeight:760,letterSpacing:'.06em'}}>SERTAI KOMUNITI</span>
          <span style={{fontSize:30}}>→</span>
        </div>
      </div>
      <Noise opacity={.05}/>
    </Scene>
  );
};

export const KTVFilm = () => {
  const frame=useCurrentFrame();
  return (
    <AbsoluteFill style={{background:C.ink, color:C.paper, fontFamily:F.display, overflow:'hidden'}}>
      <style>{`
        @font-face {font-family: 'Geist'; src: url('${staticFile('fonts/Geist.ttf')}') format('truetype'); font-weight: 100 900;}
        @font-face {font-family: 'Geist Mono'; src: url('${staticFile('fonts/GeistMono.ttf')}') format('truetype'); font-weight: 100 900;}
        * { box-sizing: border-box; }
      `}</style>
      <SceneHook/>
      <SceneMomentum/>
      <SceneConnect/>
      <ScenePlatform/>
      <SceneOutcome/>
      <Scene2020/>
      <SceneProof/>
      <ScenePeak/>
      <SceneEnd/>
      <div style={{position:'absolute',left:0,bottom:0,width:`${(frame/884)*100}%`,height:3,background:`linear-gradient(90deg,${C.greenDeep},${C.green},${C.gold})`,opacity:.55}}/>
    </AbsoluteFill>
  );
};
JSX

cd "$FILM"
npm install --silent --no-audit --no-fund

echo "=== RENDER VISUALS ==="
npx remotion render src/index.jsx KTVBrandFilm "$WORK/visual-v2.mp4" \
  --codec=h264 \
  --crf=23 \
  --concurrency=2 \
  --log=error

cat > "$WORK/narration.txt" <<'TXT'
Kedah bukan kurang bakat. Kedah perlukan momentum. Bakat, industri, akademia, agensi dan komuniti — bila bergerak berasingan, peluang sukar bertemu. Kedah Tech Valley menghubungkan titik-titik ini, menjadikan bakat lebih terlihat dan jaringan lebih tersusun. Sejak 2020, gerakan ini terus membina momentum. Kini digerakkan oleh Pertubuhan Profesional Teknologi Digital Kedah, berdaftar pada 21 April 2026. Satu ekosistem. Satu gelombang kebangkitan. Kedah Tech Valley. Merancakkan ekonomi digital Kedah. Sertai komuniti.
TXT

python3 - <<'PY'
import numpy as np, wave, math, os
out=os.environ.get("SCORE_OUT","/tmp/ktv-brand-film-v2/score.wav")
sr=48000; dur=29.5; n=int(sr*dur)
t=np.arange(n)/sr
L=np.zeros(n,dtype=np.float64); R=np.zeros(n,dtype=np.float64)

# restrained low pad
for freq,amp,phase in [(55,0.010,0),(82.41,0.006,.8),(110,0.004,1.6)]:
    s=amp*np.sin(2*np.pi*freq*t+phase)*(0.82+0.18*np.sin(2*np.pi*.075*t+phase))
    L+=s; R+=s

rng=np.random.default_rng(23)
def add(sig,sec,pan=0):
    i=int(sec*sr); m=min(len(sig),n-i)
    if m<=0:return
    L[i:i+m]+=sig[:m]*(1-pan*.55)
    R[i:i+m]+=sig[:m]*(1+pan*.55)

def pluck(sec,freq,amp=.038,decay=8,pan=0):
    m=int(sr*1.1); x=np.arange(m)/sr
    sig=amp*(np.sin(2*np.pi*freq*x)+.35*np.sin(2*np.pi*freq*2*x))*np.exp(-decay*x)
    add(sig,sec,pan)

def hit(sec,amp=.12,pan=0):
    m=int(sr*.7); x=np.arange(m)/sr
    sig=amp*(np.sin(2*np.pi*(70-22*x)*x)+.22*rng.normal(size=m))*np.exp(-10*x)
    add(sig,sec,pan)

def tick(sec,amp=.035,pan=0):
    m=int(sr*.10); x=np.arange(m)/sr
    sig=amp*np.sin(2*np.pi*1400*x)*np.exp(-45*x)
    add(sig,sec,pan)

def whoosh(sec,amp=.045,pan=0):
    length=.72;m=int(sr*length);x=np.linspace(0,1,m,endpoint=False)
    noise=rng.normal(size=m)
    kernel=np.ones(64)/64
    smooth=np.convolve(noise,kernel,mode='same')
    env=np.sin(np.pi*x)**2
    add(amp*smooth*env,sec-length*.44,pan)

# musical pulses: D minor-ish
notes=[146.83,220.00,261.63,349.23]
for k,sec in enumerate(np.arange(.75,29,.5)):
    if k%2==0:
        pluck(float(sec),notes[k%len(notes)],.018 if sec<18 else .022,9,(-.35 if k%4==0 else .35))
    if k%4==1:
        tick(float(sec)+.02,.018,(-.4 if k%8<4 else .4))

for j,sec in enumerate([0,2.15,5.4,8.9,13.6,18.0,22.0,25.0,27.8]):
    hit(sec,.08 if sec not in [8.9,18.0,25.0] else .14,(-.22 if j%2 else .22))
    if sec>0: whoosh(sec,.046,(-.25 if j%2 else .25))

# 2020 peak shimmer
for q,freq in enumerate([523.25,659.25,783.99]):
    pluck(18.4+q*.08,freq,.028,6,(-.25+q*.25))

mx=max(np.max(np.abs(L)),np.max(np.abs(R)),1e-9)
if mx>.90:
    L*=.90/mx;R*=.90/mx
pcm=(np.column_stack([L,R])*32767).astype('<i2')
with wave.open(out,'wb') as w:
    w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(pcm.tobytes())
print(out)
PY

python3 - <<'PY'
import os, subprocess, sys, json, pathlib
work="/tmp/ktv-brand-film-v2"
voice=f"{work}/voice.mp3"
txt=pathlib.Path(f"{work}/narration.txt").read_text().strip()
venv=f"{work}/venv"
try:
    subprocess.run(["python3","-m","venv",venv],check=True)
except Exception:
    subprocess.run(["apt-get","update","-qq"],check=True)
    subprocess.run(["apt-get","install","-y","-qq","python3-venv"],check=True)
    subprocess.run(["python3","-m","venv",venv],check=True)
subprocess.run([f"{venv}/bin/pip","install","-q","edge-tts"],check=True,timeout=180)
subprocess.run([
    f"{venv}/bin/edge-tts",
    "--voice","ms-MY-YasminNeural",
    "--rate=+10%",
    "--pitch=-1Hz",
    "--text",txt,
    "--write-media",voice
],check=True,timeout=180)
dur=float(subprocess.check_output([
    "ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",voice
],text=True).strip())
print(f"VOICE duration={dur:.3f}s voice=ms-MY-YasminNeural")
if dur>27.1:
    ratio=dur/27.1
    fitted=f"{work}/voice-fit.m4a"
    filters=[]
    while ratio>2:
        filters.append("atempo=2.0");ratio/=2
    while ratio<0.5:
        filters.append("atempo=0.5");ratio/=0.5
    filters.append(f"atempo={ratio:.6f}")
    subprocess.run([
        "ffmpeg","-hide_banner","-loglevel","error","-y","-i",voice,
        "-filter:a",",".join(filters),"-c:a","aac","-b:a","112k",fitted
    ],check=True)
    voice=fitted

flt=(
"[1:a]highpass=f=80,lowpass=f=12500,"
"acompressor=threshold=0.10:ratio=2.4:attack=4:release=110,"
"volume=1.15[v0];"
"[v0]asplit=2[vduck][vmix];"
"[2:a]volume=0.62[score];"
"[score][vduck]sidechaincompress=threshold=0.018:ratio=7:attack=8:release=260[duck];"
"[vmix][duck]amix=inputs=2:duration=longest:normalize=0,"
"alimiter=limit=0.94,loudnorm=I=-16:TP=-1.4:LRA=6[a]"
)
subprocess.run([
    "ffmpeg","-hide_banner","-loglevel","error","-y",
    "-i",f"{work}/visual-v2.mp4",
    "-i",voice,
    "-i",f"{work}/score.wav",
    "-filter_complex",flt,
    "-map","0:v","-map","[a]",
    "-c:v","copy","-c:a","aac","-b:a","96k",
    "-t","29.5","-movflags","+faststart",
    f"{work}/mixed.mp4"
],check=True)

# final compact encode
subprocess.run([
    "ffmpeg","-hide_banner","-loglevel","error","-y",
    "-i",f"{work}/mixed.mp4",
    "-c:v","libx264","-preset","slow","-crf","25",
    "-maxrate","2200k","-bufsize","4400k",
    "-c:a","copy","-pix_fmt","yuv420p","-movflags","+faststart",
    f"{work}/ktv-brand-film-v2.mp4"
],check=True)

out=f"{work}/ktv-brand-film-v2.mp4"
probe=subprocess.check_output([
    "ffprobe","-v","error","-show_entries","format=duration,size:stream=codec_name,width,height,r_frame_rate",
    "-of","json",out
],text=True)
print("FINAL_PROBE="+probe.replace("\n",""))
PY

echo "=== QA CONTACT SHEET ==="
mkdir -p "$WORK/qa"
for t in 0.8 3.4 6.7 10.5 15.5 19.5 23.5 26.7 28.6; do
  safe="$(echo "$t" | tr '.' '_')"
  ffmpeg -hide_banner -loglevel error -y -ss "$t" -i "$OUT" -frames:v 1 -vf scale=640:-1 "$WORK/qa/$safe.jpg"
done
python3 - <<'PY'
from PIL import Image,ImageOps,ImageDraw
import glob,math,os
files=sorted(glob.glob('/tmp/ktv-brand-film-v2/qa/*.jpg'))
imgs=[Image.open(f).convert('RGB') for f in files]
w,h=640,360;cols=3;rows=math.ceil(len(imgs)/cols)
out=Image.new('RGB',(cols*w,rows*h),(238,242,234))
for i,im in enumerate(imgs):
    out.paste(im,((i%cols)*w,(i//cols)*h))
out.save('/tmp/ktv-brand-film-v2/qa-contact.jpg',quality=90)
print('/tmp/ktv-brand-film-v2/qa-contact.jpg')
PY

echo "VIDEO_OK path=$OUT"
echo "VIDEO_SHA256=$(sha256sum "$OUT" | awk '{print $1}')"
echo "VIDEO_BYTES=$(stat -c%s "$OUT")"
echo "VIDEO_B64_BEGIN"
base64 -w0 "$OUT"
echo
echo "VIDEO_B64_END"
echo "QA_B64_BEGIN"
base64 -w0 "$WORK/qa-contact.jpg"
echo
echo "QA_B64_END"
