import { useEffect, useRef } from 'react';

const stats = [
  { num: '3+', label: 'Years Experience' },
  { num: '10+', label: 'Projects Completed' },
  { num: '8+', label: 'Technologies' },
  { num: '100%', label: 'Dedication' },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) {
      ref.current.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(34px)';
        el.style.transition = 'opacity 0.7s, transform 0.7s';
        observer.observe(el);
      });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative z-10 py-24 px-6 bg-[#06080c]/90" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal font-mono text-xs tracking-[0.3em] text-[#5b9bd5] mb-2 flex items-center gap-3">
          <span className="w-6 h-px bg-[#5b9bd5]" />WHO_AM_I
        </p>
        <h2 className="reveal font-mono text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
        <div className="reveal w-12 h-px bg-gradient-to-r from-[#5b9bd5] to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          <div className="reveal space-y-4 text-[#9aafc8] leading-relaxed text-sm">
            <p>
              Hi! I'm <span className="text-[#7ec8e3] font-semibold">Josh Ralph Singson</span>, a 22-year-old
              developer from the Philippines with{' '}
              <span className="text-[#7ec8e3]">3 years of experience</span> building mobile and web applications.
            </p>
            <p>
              I specialize in mobile development, frontend engineering, and full-stack web development.
              I love turning complex problems into clean, intuitive digital experiences.
            </p>
            <p>
              Whether it's a cross-platform mobile app or a full-stack web platform powered by{' '}
              <span className="text-[#7ec8e3]">PostgreSQL</span>, I build with precision and passion.
            </p>

            
            <div className="mt-6 p-4 bg-[#0d1017]/80 border border-[#5b9bd5]/12 font-mono text-xs space-y-2">
              <p className="text-[#3d4f6b]">// system.info</p>
              {[
                ['name', 'Josh Ralph Singson'],
                ['age', '22'],
                ['role', 'Mobile & Web Developer'],
                ['experience', '3 years'],
                ['handle', 'akuxhijosh'],
                ['database', 'PostgreSQL'],
                ['location', 'Philippines'],
              ].map(([k, v]) => (
                <p key={k}>
                  <span className="text-[#3d4f6b]">$ </span>
                  <span className="text-[#6b80a0]">{k.padEnd(12)}</span>
                  <span className="text-[#3d4f6b]">→ </span>
                  <span className="text-[#7ec8e3]">{v}</span>
                </p>
              ))}
            </div>
          </div>

     
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={s.label}
                className="reveal bg-[#0d1017]/95 border border-[#5b9bd5]/13 p-6 relative overflow-hidden group transition-all duration-300 hover:border-[#5b9bd5]/40 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#3a7abf] via-[#7ec8e3] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <p className="font-mono text-3xl font-black text-[#7ec8e3]">{s.num}</p>
                <p className="font-mono text-xs text-[#6b80a0] mt-1 tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}