import { useEffect, useRef } from 'react';

const SKILLS = [
  {
    cat: '// MOBILE',
    items: [
      { name: 'React Native', pct: 88 },
      { name: 'Flutter', pct: 72 },
      { name: 'Android (Java)', pct: 68 },
    ],
  },
  {
    cat: '// FRONTEND',
    items: [
      { name: 'React.js', pct: 92 },
      { name: 'Tailwind CSS', pct: 90 },
      { name: 'JavaScript / TS', pct: 85 },
    ],
  },
  {
    cat: '// BACKEND & DB',
    items: [
      { name: 'Node.js / Express', pct: 82 },
      { name: 'PostgreSQL', pct: 80 },
      { name: 'REST APIs', pct: 88 },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);

  useEffect(() => {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 120);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const barObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-width]').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          barObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (ref.current) {
      ref.current.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(34px)';
        el.style.transition = 'opacity 0.7s, transform 0.7s';
        revealObs.observe(el);
      });
      ref.current.querySelectorAll('.skill-cat').forEach(el => barObs.observe(el));
    }

    return () => { revealObs.disconnect(); barObs.disconnect(); };
  }, []);

  return (
    <section id="skills" className="relative z-10 py-24 px-6 bg-[#040507]/96" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal font-mono text-xs tracking-[0.3em] text-[#5b9bd5] mb-2 flex items-center gap-3">
          <span className="w-6 h-px bg-[#5b9bd5]" />TECH_STACK
        </p>
        <h2 className="reveal font-mono text-3xl md:text-4xl font-bold text-white mb-2">Skills</h2>
        <div className="reveal w-12 h-px bg-gradient-to-r from-[#5b9bd5] to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILLS.map(group => (
            <div key={group.cat}
              className="skill-cat reveal bg-[#08090e]/97 border border-[#5b9bd5]/11 p-7 hover:border-[#5b9bd5]/32 transition-colors duration-300">
              <p className="font-mono text-xs tracking-widest text-[#7ec8e3] mb-5">{group.cat}</p>
              {group.items.map(skill => (
                <div key={skill.name} className="mb-5">
                  <div className="flex justify-between font-mono text-xs text-[#6b80a0] mb-1.5">
                    <span>{skill.name}</span>
                    <span className="text-[#7ec8e3]">{skill.pct}%</span>
                  </div>
                  <div className="h-[3px] bg-[#5b9bd5]/9 overflow-hidden relative">
                    <div
                      data-width={skill.pct}
                      className="h-full w-0 relative"
                      style={{
                        background: 'linear-gradient(90deg,#3a7abf,#7ec8e3)',
                        transition: 'width 1.3s cubic-bezier(0.4,0,0.2,1)',
                      }}>
                      <span className="absolute right-0 -top-[3px] w-[5px] h-[9px] bg-[#7ec8e3]"
                        style={{ boxShadow: '0 0 7px #7ec8e3' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}