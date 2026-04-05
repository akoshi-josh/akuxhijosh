import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    tag: 'MOBILE APP',
    num: '01',
    title: 'MobileConnect App',
    desc: 'Cross-platform mobile app with real-time chat, push notifications, and a PostgreSQL backend built with React Native.',
    techs: ['React Native', 'Node.js', 'PostgreSQL', 'Socket.io'],
    img: '/project1.png',
    demo: '#',
    code: '#',
  },
  {
    tag: 'WEB APP',
    num: '02',
    title: 'Dashboard Platform',
    desc: 'Full-stack web dashboard with role-based auth, data visualization, and REST API powered by Express and PostgreSQL.',
    techs: ['React.js', 'Express', 'PostgreSQL', 'Tailwind'],
    img: '/project2.png',
    demo: '#',
    code: '#',
  },
  {
    tag: 'FULL STACK',
    num: '03',
    title: 'E-Commerce System',
    desc: 'End-to-end e-commerce platform with product management, cart system, payment integration, and admin panel.',
    techs: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    img: '/project3.png',
    demo: '#',
    code: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 120);
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
    <section id="projects" className="relative z-10 py-24 px-6 bg-[#05070b]/90" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal font-mono text-xs tracking-[0.3em] text-[#5b9bd5] mb-2 flex items-center gap-3">
          <span className="w-6 h-px bg-[#5b9bd5]" />MY_WORK
        </p>
        <h2 className="reveal font-mono text-3xl md:text-4xl font-bold text-white mb-2">Projects</h2>
        <div className="reveal w-12 h-px bg-gradient-to-r from-[#5b9bd5] to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map(p => (
            <div key={p.num}
              className="reveal bg-[#08090e]/97 border border-[#5b9bd5]/11 overflow-hidden group transition-all duration-400 hover:-translate-y-2 hover:border-[#5b9bd5]/42"
              style={{ boxShadow: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.7),0 0 0 1px rgba(91,155,213,0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-[#0d1017]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ filter: 'grayscale(50%) brightness(0.82)' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom,rgba(4,5,7,0) 20%,rgba(4,5,7,0.92))' }} />
                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-[#7ec8e3] bg-[#5b9bd5]/18 border border-[#5b9bd5]/38 px-2 py-0.5">
                  {p.tag}
                </span>
                <span className="absolute bottom-2 right-3 font-mono text-3xl font-black text-[#5b9bd5]/7">
                  {p.num}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-mono text-sm font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-[#6b80a0] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.techs.map(t => (
                    <span key={t}
                      className="font-mono text-[10px] px-2 py-0.5 border border-[#5b9bd5]/18 text-[#6b80a0] group-hover:border-[#5b9bd5]/42 group-hover:text-[#7ec8e3] transition-all">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-3 border-t border-[#5b9bd5]/9">
                  <a href={p.demo} className="font-mono text-[10px] text-[#6b80a0] hover:text-[#7ec8e3] transition-colors tracking-wider">
                    → Live Demo
                  </a>
                  <a href={p.code} className="font-mono text-[10px] text-[#6b80a0] hover:text-[#7ec8e3] transition-colors tracking-wider">
                    → Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}