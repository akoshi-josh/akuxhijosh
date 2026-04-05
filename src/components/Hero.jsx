import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'Mobile Developer',
  'Web Developer',
  'Frontend Developer',
  'Full Stack Developer',
];

export default function Hero() {
  const canvasRef = useRef(null);
  const [typed, setTyped] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const word = ROLES[roleIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, charIndex + 1);
        setTyped(next);
        if (charIndex + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1400);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        const next = word.slice(0, charIndex - 1);
        setTyped(next);
        if (charIndex - 1 < 0) {
          setDeleting(false);
          setRoleIndex(r => (r + 1) % ROLES.length);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, deleting ? 50 : 85);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  // Circuit board canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], edges = [], signals = [], animId;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      build();
    }

    function build() {
      nodes = []; edges = []; signals = [];
      const STEP = 72;
      const cols = Math.ceil(W / STEP) + 3;
      const rows = Math.ceil(H / STEP) + 3;
      const grid = {};

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const xFrac = c / cols;
          if (Math.random() < 0.15 + xFrac * 0.55) {
            const id = `${r}_${c}`;
            const x = (c - 1) * STEP + (Math.random() - 0.5) * STEP * 0.3;
            const y = (r - 1) * STEP + (Math.random() - 0.5) * STEP * 0.3;
            const big = Math.random() < 0.07;
            const med = !big && Math.random() < 0.18;
            nodes.push({ id, x, y, r: big ? 4 : med ? 2.5 : 1.4, glow: big || med, bright: big });
            grid[id] = { x, y };
          }
        }
      }

      const nodeMap = {};
      nodes.forEach(n => (nodeMap[n.id] = n));
      nodes.forEach(n => {
        const [nr, nc] = n.id.split('_').map(Number);
        [[0,1],[1,0],[0,2],[2,0],[1,2],[2,1]].forEach(([dr, dc]) => {
          const nid = `${nr + dr}_${nc + dc}`;
          if (nodeMap[nid] && Math.random() < 0.48) {
            edges.push({
              x1: n.x, y1: n.y,
              x2: nodeMap[nid].x, y2: nodeMap[nid].y,
              cornerFirst: Math.random() < 0.5,
              alpha: 0.18 + Math.random() * 0.22,
            });
          }
        });
      });

      for (let i = 0; i < 24; i++) spawnSignal();
    }

    function spawnSignal() {
      if (!edges.length) return;
      const e = edges[Math.floor(Math.random() * edges.length)];
      signals.push({
        e, t: Math.random(),
        speed: (0.0005 + Math.random() * 0.0012) * (Math.random() < 0.5 ? 1 : -1),
        size: Math.random() < 0.15 ? 3 : 1.8,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Right glow
      const grd = ctx.createRadialGradient(W * 0.8, H * 0.38, 0, W * 0.8, H * 0.38, W * 0.7);
      grd.addColorStop(0, 'rgba(20,35,60,0.22)');
      grd.addColorStop(1, 'rgba(4,5,7,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Edges
      edges.forEach(e => {
        const cx = e.cornerFirst ? e.x2 : e.x1;
        const cy = e.cornerFirst ? e.y1 : e.y2;
        ctx.beginPath();
        ctx.moveTo(e.x1, e.y1);
        ctx.lineTo(cx, cy);
        ctx.lineTo(e.x2, e.y2);
        ctx.strokeStyle = `rgba(55,80,120,${e.alpha})`;
        ctx.lineWidth = 0.9;
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      // Nodes
      nodes.forEach(n => {
        if (n.glow) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * (n.bright ? 9 : 5.5));
          g.addColorStop(0, n.bright ? 'rgba(126,200,227,0.28)' : 'rgba(91,155,213,0.2)');
          g.addColorStop(1, 'rgba(91,155,213,0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * (n.bright ? 9 : 5.5), 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = n.bright ? 'rgba(126,200,227,0.35)' : 'rgba(91,155,213,0.25)';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.bright
          ? 'rgba(200,230,255,0.95)'
          : n.glow
          ? 'rgba(126,200,227,0.8)'
          : 'rgba(74,111,165,0.65)';
        ctx.fill();
      });

      // Signals
      signals.forEach(s => {
        s.t += s.speed;
        if (s.t > 1 || s.t < 0) {
          s.e = edges[Math.floor(Math.random() * edges.length)];
          s.t = s.t > 1 ? 0 : 1;
          s.speed = (0.0005 + Math.random() * 0.0012) * (Math.random() < 0.5 ? 1 : -1);
          return;
        }
        const e = s.e;
        const cx = e.cornerFirst ? e.x2 : e.x1;
        const cy = e.cornerFirst ? e.y1 : e.y2;
        const seg1 = Math.hypot(cx - e.x1, cy - e.y1);
        const seg2 = Math.hypot(e.x2 - cx, e.y2 - cy);
        const total = seg1 + seg2;
        const traveled = s.t * total;
        let sx, sy;
        if (traveled <= seg1) {
          const tt = seg1 > 0 ? traveled / seg1 : 0;
          sx = e.x1 + (cx - e.x1) * tt;
          sy = e.y1 + (cy - e.y1) * tt;
        } else {
          const tt = seg2 > 0 ? (traveled - seg1) / seg2 : 0;
          sx = cx + (e.x2 - cx) * tt;
          sy = cy + (e.y2 - cy) * tt;
        }

        const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, s.size * 4);
        sg.addColorStop(0, 'rgba(126,200,227,0.7)');
        sg.addColorStop(0.4, 'rgba(91,155,213,0.3)');
        sg.addColorStop(1, 'rgba(91,155,213,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210,240,255,0.95)';
        ctx.fill();
      });

      while (signals.length < 24) spawnSignal();
      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Vignette */}
      <div className="fixed inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(4,5,7,0.6) 0%, rgba(4,5,7,0.3) 60%, rgba(4,5,7,0) 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-20">
        {/* Text Content */}
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-[#5b9bd5] mb-4 flex items-center gap-3"
            style={{ opacity: 0, animation: 'fadeUp 0.8s 0.3s forwards' }}>
            <span className="w-7 h-px bg-[#5b9bd5]" />
            PORTFOLIO_2025.EXE
          </p>

          <h1 className="font-mono text-4xl md:text-5xl font-black leading-tight text-white"
            style={{ opacity: 0, animation: 'fadeUp 0.8s 0.5s forwards' }}>
            Hello,
            <span className="block"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px #5b9bd5',
                filter: 'drop-shadow(0 0 8px rgba(91,155,213,0.35))'
              }}>
              I'm Josh.
            </span>
          </h1>

          <p className="font-mono text-sm text-[#6b80a0] mt-4 mb-6 flex items-center gap-2"
            style={{ opacity: 0, animation: 'fadeUp 0.8s 0.7s forwards' }}>
            <span className="text-[#3d4f6b]">$&nbsp;</span>
            <span className="text-[#7ec8e3]">{typed}</span>
            <span className="text-[#7ec8e3]" style={{ animation: 'blink 0.7s infinite' }}>_</span>
          </p>

          <p className="text-[#9aafc8] leading-relaxed max-w-md text-sm"
            style={{ opacity: 0, animation: 'fadeUp 0.8s 0.9s forwards' }}>
            22-year-old developer crafting seamless mobile and web experiences.
            3 years of hands-on experience building full-stack applications
            powered by modern tech and PostgreSQL.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap"
            style={{ opacity: 0, animation: 'fadeUp 0.8s 1.1s forwards' }}>
            <a href="#projects" className="font-mono text-xs tracking-widest px-6 py-3 text-white transition-all hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg,#3a7abf,#5b9bd5)',
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'
              }}>
              VIEW PROJECTS
            </a>
            <a href="#contact"
              className="font-mono text-xs tracking-widest px-6 py-3 text-[#6b80a0] border border-[#2a3348] hover:border-[#5b9bd5] hover:text-[#7ec8e3] transition-all"
              style={{ clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              GET IN TOUCH
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center" style={{ opacity: 0, animation: 'fadeUp 0.8s 1.3s forwards' }}>
          <div className="relative w-60 h-60 md:w-72 md:h-72">
            {/* Hex glow border */}
            <div className="absolute inset-[-3px] z-[1]"
              style={{
                clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
                background: 'linear-gradient(135deg,#3a7abf,#7ec8e3,#3a7abf)',
                opacity: 0.6,
                animation: 'hexPulse 4s ease-in-out infinite'
              }} />
            <img
              src="/profile.jpg"
              alt="Josh Ralph Singson"
              className="w-full h-full object-cover relative z-[2]"
              style={{
                clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0 75%,0 25%)',
                filter: 'grayscale(20%) brightness(0.95) contrast(1.05)'
              }}
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
            {/* Scan line */}
            <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none"
              style={{ clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0 75%,0 25%)' }}>
              <div className="absolute left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg,transparent,rgba(126,200,227,0.6),transparent)',
                  animation: 'scan 3s ease-in-out infinite'
                }} />
            </div>
            {/* Orbit ring */}
            <div className="absolute rounded-full border border-[#5b9bd5]/22"
              style={{ inset: '-26px', animation: 'spin 18s linear infinite' }}>
              <span className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#7ec8e3] rounded-full shadow-[0_0_10px_#7ec8e3]" />
            </div>
            <div className="absolute rounded-full border border-dashed border-[#5b9bd5]/10"
              style={{ inset: '-48px', animation: 'spin 28s linear infinite reverse' }} />
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#5b9bd5] opacity-60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#5b9bd5] opacity-60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#5b9bd5] opacity-60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#5b9bd5] opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}