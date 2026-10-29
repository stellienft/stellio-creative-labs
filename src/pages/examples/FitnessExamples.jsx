import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ===== FITNESS GRIND - Dark/industrial, intense, membership tiers =====
// Layout: Full-screen intensity hero. Workout programs. Membership pricing.
// For gyms where the workout is the product.
export function FitnessGrind() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const accent = '#22C55E'
  const brand = 'IRONFORGE Gym'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav - tough */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6.5 6.5h11M6.5 17.5h11M3 8v8M21 8v8M6 6.5V4M18 6.5V4M6 17.5V20M18 17.5V20"/></svg>
            </div>
            <span className="text-[0.9rem] font-700 tracking-[0.06em] uppercase">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#programs" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Programs</a>
            <a href="#pricing" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Pricing</a>
            <a href="#results" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Results</a>
            <a href="#join" className="px-5 py-2 rounded-lg text-[#0A0A0A] text-[0.78rem] font-700" style={{ background: accent }}>Start Free Trial</a>
          </div>
        </div>
      </nav>

      {/* Hero - full intensity */}
      <section className="pt-[80px] min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: `${accent}06` }} />
        <div className="max-w-[1100px] mx-auto px-6 w-full">
          <div className="max-w-[700px]">
            <span className="text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-6 block" style={{ color: accent }}>No shortcuts. Just results.</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.2rem)] font-700 leading-[1] mb-5">
              Stop wishing.<br />Start lifting.
            </h1>
            <p className="text-[1.1rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mb-10">
              IRONFORGE is not a health club. It is a training facility for people who are serious about getting stronger, leaner, and faster. No mirrors. No juice bar. Just iron.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#join" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[#0A0A0A] text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]" style={{ background: accent }}>
                7-Day Free Trial
              </a>
              <a href="#programs" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.12] text-[1rem] font-600 hover:border-white/[0.25] transition-all">
                View Programs
              </a>
            </div>
            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { num: '2,400+', label: 'Active Members' },
                { num: '150+', label: 'Classes/Week' },
                { num: '24/7', label: 'Access' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-[1.2rem] font-700" style={{ color: accent }}>{s.num}</div>
                  <div className="text-[0.72rem] text-[#71717A] uppercase tracking-[0.06em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">Training programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Strength', desc: 'Powerlifting-inspired programming. Squat, bench, deadlift. Progressive overload. Built for numbers.', level: 'All Levels', icon: 'dumbbell' },
              { name: 'HIIT & Conditioning', desc: '30-minute high-intensity sessions. Burn fat, build endurance. Heart rate monitored.', level: 'Intermediate+', icon: 'flame' },
              { name: 'Functional Fitness', desc: 'Real-world movement patterns. Kettlebells, sleds, bodyweight. Move better, live better.', level: 'All Levels', icon: 'target' },
            ].map((p, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-all">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${accent}10` }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon === 'dumbbell' && <g><path d="M6.5 6.5h11M6.5 17.5h11M3 8v8M21 8v8M6 6.5V4M18 6.5V4M6 17.5V20M18 17.5V20"/></g>}
                    {p.icon === 'flame' && <g><path d="M12 2c.5 4.5-3.5 6-3.5 10a5.5 5.5 0 0011 0c0-4-4-5.5-3.5-10-2 3-5.5 4-5.5 8a3 3 0 006 0c0-3-4.5-5-4.5-8z"/></g>}
                    {p.icon === 'target' && <g><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></g>}
                  </svg>
                </div>
                <h3 className="text-[1.1rem] font-700 mb-2">{p.name}</h3>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-3">{p.desc}</p>
                <span className="text-[0.72rem] font-600 uppercase tracking-[0.06em]" style={{ color: accent }}>{p.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership pricing */}
      <section id="pricing" className="py-[80px]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Membership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Starter', price: '$29', period: '/week', desc: 'Gym floor access. Basic programming.', features: ['24/7 gym access', 'Basic program', 'Locker room'], popular: false },
              { name: 'Athlete', price: '$49', period: '/week', desc: 'Full access + unlimited classes.', features: ['24/7 gym access', 'Unlimited classes', 'Custom program', 'InBody scan monthly'], popular: true },
              { name: 'Elite', price: '$79', period: '/week', desc: 'Everything + 1-on-1 PT sessions.', features: ['24/7 gym access', 'Unlimited classes', 'Custom program', '2x PT sessions/week', 'Nutrition plan'], popular: false },
            ].map((m, i) => (
              <div key={i} className={`rounded-2xl p-6 relative ${m.popular ? 'border-2' : 'border'}`} style={{ background: m.popular ? '#111111' : '#0E0E0E', borderColor: m.popular ? accent : 'rgba(255,255,255,0.06)' }}>
                {m.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[0.68rem] font-700 text-[#0A0A0A]" style={{ background: accent }}>Most Popular</span>}
                <h3 className="text-[1rem] font-700 mb-1">{m.name}</h3>
                <p className="text-[0.82rem] text-[#A1A1AA] mb-4">{m.desc}</p>
                <div className="mb-5">
                  <span className="text-[2rem] font-700" style={{ color: accent }}>{m.price}</span>
                  <span className="text-[0.82rem] text-[#71717A]">{m.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {m.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-[0.82rem] text-[#A1A1AA]">
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-xl text-[0.88rem] font-600 transition-all" style={{ background: m.popular ? accent : 'transparent', color: m.popular ? '#0A0A0A' : 'white', border: m.popular ? 'none' : '1px solid rgba(255,255,255,0.12)' }}>
                  {m.popular ? 'Start Free Trial' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Member results</h2>
          <div className="space-y-5">
            {[
              { name: 'Jake R.', result: 'Lost 18kg in 5 months', quote: 'I walked in overweight and out of shape. The coaches did not judge me - they just got to work. Now I am stronger at 35 than I was at 25.' },
              { name: 'Sarah K.', result: 'First pull-up at 40', quote: 'I never thought I could do a pull-up. The strength program built me up progressively. When I got my first one, the whole gym cheered.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-xl p-5">
                <span className="inline-block px-3 py-1 rounded-lg text-[0.72rem] font-700 mb-3" style={{ background: `${accent}12`, color: accent }}>{r.result}</span>
                <p className="text-[0.9rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-[0.82rem] font-600">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section id="join" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Your first week is free</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">No contracts. No joining fee. Just show up and train.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
              <input type="text" placeholder="Last name" className="bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            </div>
            <input type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-700" style={{ background: accent }}>Start 7-Day Free Trial</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700 tracking-[0.04em] uppercase">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">12 Industry Lane, Springfield QLD | 24/7 Access</p>
        </div>
      </footer>
    </div>
  )
}

// ===== FITNESS TRIBE - Community, class timetable, social =====
// Layout: Timetable-first. Community photos. Class types. Social atmosphere.
// For group-fitness studios where community drives retention.
export function FitnessTribe() {
  const [activeDay, setActiveDay] = useState('Mon')
  const accent = '#F59E0B'
  const brand = 'TribeFit Studio'

  const timetable = {
    Mon: [{ time: '5:30am', name: 'HIIT Burn', coach: 'Mike' }, { time: '6:30am', name: 'Box Fit', coach: 'Sarah' }, { time: '9:00am', name: 'Yoga Flow', coach: 'Jen' }, { time: '5:30pm', name: 'HIIT Burn', coach: 'Mike' }, { time: '6:30pm', name: 'Strength', coach: 'Mike' }],
    Tue: [{ time: '5:30am', name: 'Strength', coach: 'Mike' }, { time: '6:30am', name: 'Spin', coach: 'Sarah' }, { time: '9:00am', name: 'Pilates', coach: 'Jen' }, { time: '5:30pm', name: 'Box Fit', coach: 'Sarah' }, { time: '6:30pm', name: 'HIIT Burn', coach: 'Mike' }],
    Wed: [{ time: '5:30am', name: 'HIIT Burn', coach: 'Mike' }, { time: '6:30am', name: 'Yoga Flow', coach: 'Jen' }, { time: '9:00am', name: 'Barre', coach: 'Jen' }, { time: '5:30pm', name: 'Strength', coach: 'Mike' }, { time: '6:30pm', name: 'Spin', coach: 'Sarah' }],
    Thu: [{ time: '5:30am', name: 'Spin', coach: 'Sarah' }, { time: '6:30am', name: 'Box Fit', coach: 'Sarah' }, { time: '9:00am', name: 'Yoga Flow', coach: 'Jen' }, { time: '5:30pm', name: 'HIIT Burn', coach: 'Mike' }, { time: '6:30pm', name: 'Strength', coach: 'Mike' }],
    Fri: [{ time: '5:30am', name: 'HIIT Burn', coach: 'Mike' }, { time: '6:30am', name: 'Strength', coach: 'Mike' }, { time: '9:00am', name: 'Pilates', coach: 'Jen' }, { time: '4:30pm', name: 'Friday Burn', coach: 'All Coaches' }],
    Sat: [{ time: '7:00am', name: 'Saturday Savage', coach: 'Mike' }, { time: '8:00am', name: 'Yoga Flow', coach: 'Jen' }],
    Sun: [{ time: '8:00am', name: 'Recovery Yoga', coach: 'Jen' }],
  }

  const dayClasses = timetable[activeDay] || []

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <svg className="w-4 h-4 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <span className="text-[0.9rem] font-700">{brand}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#timetable" className="text-[0.78rem] text-[#888] hover:text-white">Timetable</a>
            <a href="#classes" className="text-[0.78rem] text-[#888] hover:text-white">Classes</a>
            <a href="#community" className="text-[0.78rem] text-[#888] hover:text-white">Community</a>
            <a href="#join" className="px-5 py-2 rounded-lg text-[#0A0A0A] text-[0.78rem] font-700" style={{ background: accent }}>Join the Tribe</a>
          </div>
        </div>
      </nav>

      {/* Hero - community vibe */}
      <section className="pt-[100px] pb-[60px]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <span className="text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5 block" style={{ color: accent }}>Group Fitness Studio</span>
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-700 leading-[1.05] mb-5">
            Stronger together.
          </h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[520px] mx-auto mb-8">
            TribeFit is more than a gym. It is a crew of people who show up for each other. Every class is coached. Every session counts. No one gets left behind.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#join" className="px-7 py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-700" style={{ background: accent }}>Free Trial Class</a>
            <a href="#timetable" className="px-7 py-3.5 rounded-xl border border-white/[0.12] text-[0.92rem] font-600 hover:border-white/[0.25] transition-all">See Timetable</a>
          </div>
        </div>
      </section>

      {/* Timetable - interactive */}
      <section id="timetable" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-8">This week</h2>
          {/* Day selector */}
          <div className="flex gap-2 justify-center mb-8">
            {Object.keys(timetable).map(day => (
              <button key={day} onClick={() => setActiveDay(day)} className="px-4 py-2 rounded-lg text-[0.78rem] font-600 transition-all" style={{ background: activeDay === day ? accent : '#111111', color: activeDay === day ? '#0A0A0A' : '#A1A1AA' }}>
                {day}
              </button>
            ))}
          </div>
          {/* Classes list */}
          <div className="space-y-3">
            {dayClasses.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-[#111111] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-[0.88rem] font-700 w-[70px]" style={{ color: accent }}>{c.time}</span>
                  <div>
                    <h3 className="text-[0.92rem] font-600">{c.name}</h3>
                    <p className="text-[0.75rem] text-[#71717A]">with {c.coach}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-lg text-[0.72rem] font-600 border transition-all hover:bg-white hover:text-[#0A0A0A]" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>Book</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class types */}
      <section id="classes" className="py-[80px]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Our classes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'HIIT Burn', desc: '30 min. High intensity. Maximum calorie burn.', color: '#2A1A0A' },
              { name: 'Box Fit', desc: '45 min. Boxing technique plus cardio.', color: '#1A1A2A' },
              { name: 'Strength', desc: '45 min. Build lean muscle. All levels.', color: '#1A2A1A' },
              { name: 'Yoga Flow', desc: '45 min. Recovery and flexibility.', color: '#2A1A2A' },
              { name: 'Spin', desc: '30 min. Indoor cycling. Legs on fire.', color: '#0A1A2A' },
              { name: 'Pilates', desc: '45 min. Core strength and posture.', color: '#2A0A1A' },
              { name: 'Barre', desc: '45 min. Dance-inspired toning.', color: '#1A2A2A' },
              { name: 'Saturday Savage', desc: '60 min. The ultimate weekend warrior session.', color: '#2A2A0A' },
            ].map((c, i) => (
              <div key={i} className="rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer" style={{ background: c.color }}>
                <h3 className="text-[0.88rem] font-700 mb-1">{c.name}</h3>
                <p className="text-[0.75rem] text-[#A1A1AA]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community section */}
      <section id="community" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-10">The tribe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&h=300&fit=crop&auto=format',
            ].map((url, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden">
                <img src={url} alt="Community workout" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[0.95rem] text-[#A1A1AA] max-w-[500px] mx-auto mb-8">
            From early-morning regulars to weekend warriors, our members keep each other motivated. Join a community that actually shows up.
          </p>
          <a href="#join" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-700" style={{ background: accent }}>
            Join the Tribe
          </a>
        </div>
      </section>

      {/* Join form */}
      <section id="join" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Try your first class free</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Pick any class. On us. No strings attached.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <select className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-[#71717A] focus:outline-none">
              <option>Which class interests you?</option>
              <option>HIIT Burn</option><option>Box Fit</option><option>Strength</option><option>Yoga Flow</option><option>Spin</option><option>Other</option>
            </select>
            <button className="w-full py-3.5 rounded-xl text-[#0A0A0A] text-[0.92rem] font-700" style={{ background: accent }}>Book Free Trial Class</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">8 Fitness Lane, Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}

// ===== FITNESS TRANSFORMATION - Before/after, results-driven, PT booking =====
// Layout: Results-first. Transformation stories. PT profiles. Direct booking.
// For PTs and studios that sell through visible client results.
export function FitnessTransformation() {
  const accent = '#8B5CF6'
  const brand = 'TransformHQ'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-[0.9rem] font-700 tracking-[0.04em]">{brand}</span>
          <div className="hidden md:flex items-center gap-6">
            <a href="#results" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Results</a>
            <a href="#programs" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Programs</a>
            <a href="#coaches" className="text-[0.78rem] text-[#888] hover:text-white transition-colors">Coaches</a>
            <a href="#start" className="px-5 py-2 rounded-lg text-white text-[0.78rem] font-700" style={{ background: accent }}>Start Your Transformation</a>
          </div>
        </div>
      </nav>

      {/* Hero - transformation promise */}
      <section className="pt-[100px] pb-[60px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[200px] pointer-events-none" style={{ background: `${accent}06` }} />
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <span className="text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-5 block" style={{ color: accent }}>Personal Training Studio</span>
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-700 leading-[1.02] mb-5">
            12 weeks to a body<br />you are proud of.
          </h1>
          <p className="text-[1.05rem] text-[#A1A1AA] leading-relaxed max-w-[500px] mx-auto mb-8">
            Real transformations. Real accountability. Our 12-week program combines 1-on-1 coaching, custom nutrition, and a support system that will not let you quit.
          </p>
          <a href="#start" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white text-[1rem] font-700 transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]" style={{ background: accent }}>
            Book Free Consultation
          </a>
        </div>
      </section>

      {/* Transformation stories */}
      <section id="results" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Real results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Emma, 34', before: '86kg', after: '68kg', time: '12 weeks', quote: 'I had tried every diet and gym. TransformHQ was different because I had a coach who kept me accountable. The weight came off and has stayed off for 8 months.' },
              { name: 'Chris, 41', before: '102kg', after: '82kg', time: '16 weeks', quote: 'As a dad of 3, I thought I did not have time. My coach worked around my schedule. The nutrition plan was actually doable. Best investment I ever made.' },
              { name: 'Mia, 28', before: '72kg', after: '62kg', time: '10 weeks', quote: 'I did not just lose weight - I got strong. I can do push-ups, deadlift my bodyweight, and I actually enjoy training now.' },
              { name: 'James, 52', before: '95kg', after: '80kg', time: '14 weeks', quote: 'My doctor told me I needed to make a change. I wish I had found TransformHQ sooner. Blood pressure is down, energy is up, and I feel 10 years younger.' },
            ].map((r, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-4 mb-4">
                  {/* Before/After visual */}
                  <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(239,68,68,0.08)' }}>
                    <span className="text-[0.68rem] uppercase tracking-[0.1em] text-[#EF4444] block mb-1">Before</span>
                    <span className="text-[1.1rem] font-700">{r.before}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#71717A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  <div className="flex-1 rounded-xl p-3 text-center" style={{ background: 'rgba(34,197,94,0.08)' }}>
                    <span className="text-[0.68rem] uppercase tracking-[0.1em] text-[#22C55E] block mb-1">After</span>
                    <span className="text-[1.1rem] font-700">{r.after}</span>
                  </div>
                </div>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed mb-3">&ldquo;{r.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-[0.82rem] font-600">{r.name}</span>
                  <span className="text-[0.72rem] px-2 py-0.5 rounded" style={{ background: `${accent}12`, color: accent }}>{r.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-[80px]">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Programs</h2>
          <div className="space-y-4">
            {[
              { name: '12-Week Transformation', price: '$1,997', desc: '3x PT sessions/week, custom nutrition plan, weekly check-ins, before/after photos, InBody scans.', popular: true },
              { name: '8-Week Lean', price: '$1,397', desc: '2x PT sessions/week, nutrition guide, fortnightly check-ins.', popular: false },
              { name: '6-Week Kickstart', price: '$897', desc: '2x PT sessions/week, basic meal plan, start/finish assessment.', popular: false },
            ].map((p, i) => (
              <div key={i} className={`rounded-xl p-6 border ${p.popular ? 'border-[#8B5CF6]' : 'border-white/[0.06]'}`} style={{ background: p.popular ? 'rgba(139,92,246,0.05)' : '#111111' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[1rem] font-700">{p.name}</h3>
                  <span className="text-[1.1rem] font-700" style={{ color: accent }}>{p.price}</span>
                </div>
                <p className="text-[0.88rem] text-[#A1A1AA] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="py-[80px] bg-[#0E0E0E]">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 text-center mb-10">Your coaches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'Mike Chen', speciality: 'Strength & Fat Loss', exp: '8 years', cert: 'Cert III & IV', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format' },
              { name: 'Sarah Park', speciality: 'HIIT & Boxing', exp: '6 years', cert: 'Cert III & IV', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop&auto=format' },
              { name: 'Jen Hall', speciality: 'Yoga & Recovery', exp: '10 years', cert: 'RYT-500', img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=300&fit=crop&auto=format' },
            ].map((c, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-[0.95rem] font-700 mb-0.5">{c.name}</h3>
                <p className="text-[0.82rem] mb-2" style={{ color: accent }}>{c.speciality}</p>
                <p className="text-[0.75rem] text-[#71717A]">{c.exp} exp - {c.cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start CTA */}
      <section id="start" className="py-[80px]">
        <div className="max-w-[500px] mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-700 mb-3">Start your transformation</h2>
          <p className="text-[0.95rem] text-[#A1A1AA] mb-8">Free 30-minute consultation. We will map out a plan that fits your life and goals.</p>
          <div className="bg-[#111111] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <input type="text" placeholder="Your name" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <input type="email" placeholder="Email" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <input type="tel" placeholder="Phone" className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl px-4 py-3 text-[0.88rem] text-white focus:outline-none" />
            <button className="w-full py-3.5 rounded-xl text-white text-[0.92rem] font-700" style={{ background: accent }}>Book Free Consultation</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.82rem] font-700">{brand}</span>
          <p className="text-[0.7rem] text-[#71717A]">15 Health St, Springfield QLD</p>
        </div>
      </footer>
    </div>
  )
}
