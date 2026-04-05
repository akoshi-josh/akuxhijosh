import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LINKS = [
  { icon: '✉', label: 'josh.101.23.03@gmail.com', href: 'mailto:josh.101.23.03@gmail.com' },
  { icon: '☎', label: '09709644126', href: 'tel:09709644126' },
  { icon: 'FB', label: 'facebook.com/akoshijosh', href: 'https://www.facebook.com/share/1P2R4Urxbx/' },
  { icon: 'TT', label: 'TikTok: @akoshijosh', href: 'https://tiktok.com/@akoshijosh' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
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

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-6 bg-[#040507]/96" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <p className="reveal font-mono text-xs tracking-[0.3em] text-[#5b9bd5] mb-2 flex items-center gap-3">
          <span className="w-6 h-px bg-[#5b9bd5]" />REACH_OUT
        </p>
        <h2 className="reveal font-mono text-3xl md:text-4xl font-bold text-white mb-2">Contact</h2>
        <div className="reveal w-12 h-px bg-gradient-to-r from-[#5b9bd5] to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="reveal space-y-6">
            <p className="text-[#9aafc8] leading-relaxed text-sm">
              Have a project in mind or want to collaborate? I'm always open to new opportunities.
              Let's build something great together!
            </p>
            <div className="space-y-3">
              {LINKS.map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 font-mono text-xs text-[#6b80a0] hover:text-[#7ec8e3] transition-colors group">
                  <span className="w-8 h-8 border border-[#5b9bd5]/18 flex items-center justify-center text-sm flex-shrink-0 group-hover:border-[#5b9bd5] group-hover:bg-[#5b9bd5]/10 transition-all">
                    {l.icon}
                  </span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="reveal flex flex-col gap-4">
            {[
              { name: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
            ].map(f => (
              <div key={f.name} className="flex flex-col gap-1">
                <label className="font-mono text-[10px] tracking-widest text-[#3d4f6b]">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  className="bg-[#0d1017]/90 border border-[#5b9bd5]/14 text-white px-4 py-3 font-mono text-sm focus:outline-none transition-all placeholder:text-[#2a3348]"
                  style={{ '--tw-ring-color': 'rgba(91,155,213,0.1)' }}
                  onFocus={e => {
                    e.target.style.borderColor = '#5b9bd5';
                    e.target.style.boxShadow = '0 0 0 2px rgba(91,155,213,0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(91,155,213,0.14)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[10px] tracking-widest text-[#3d4f6b]">MESSAGE</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="bg-[#0d1017]/90 border border-[#5b9bd5]/14 text-white px-4 py-3 font-mono text-sm focus:outline-none transition-all resize-none placeholder:text-[#2a3348]"
                onFocus={e => {
                  e.target.style.borderColor = '#5b9bd5';
                  e.target.style.boxShadow = '0 0 0 2px rgba(91,155,213,0.1)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(91,155,213,0.14)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {status === 'success' && (
              <p className="font-mono text-xs text-[#7ec8e3] tracking-wider bg-[#7ec8e3]/10 border border-[#7ec8e3]/20 px-3 py-2">
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="font-mono text-xs text-red-400 tracking-wider bg-red-400/10 border border-red-400/20 px-3 py-2">
                ✗ Failed to send. Make sure the server is running.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="font-mono text-xs tracking-widest px-6 py-3 text-white self-start disabled:opacity-50 transition-all hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg,#3a7abf,#5b9bd5)',
                clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
              }}>
              {loading ? 'SENDING...' : 'TRANSMIT MESSAGE'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-[#5b9bd5]/10 flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-xs text-[#7ec8e3] tracking-widest">akuxhijosh</span>
        <span className="font-mono text-xs text-[#3d4f6b]">
          © 2025 Josh Ralph Singson — All systems operational.
        </span>
        <div className="flex gap-3">
          <a href="https://www.facebook.com/share/1P2R4Urxbx/" target="_blank" rel="noreferrer"
            className="w-8 h-8 border border-[#5b9bd5]/18 flex items-center justify-center font-mono text-xs text-[#3d4f6b] hover:border-[#5b9bd5] hover:text-[#7ec8e3] transition-all">
            FB
          </a>
          <a href="https://tiktok.com/@akoshijosh" target="_blank" rel="noreferrer"
            className="w-8 h-8 border border-[#5b9bd5]/18 flex items-center justify-center font-mono text-xs text-[#3d4f6b] hover:border-[#5b9bd5] hover:text-[#7ec8e3] transition-all">
            TT
          </a>
        </div>
      </div>
    </section>
  );
}