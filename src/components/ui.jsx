import React from 'react'
import { Link } from 'react-router-dom'

// Serif italic accent word/phrase inside display headings
export const Em = ({ children }) => (
  <em className="gradient-text font-normal">{children}</em>
)

// Eyebrow tag: orange dash + uppercase label
export function SecTag({ children, center }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[#FB5005] text-[0.72rem] font-700 uppercase tracking-[0.14em] ${center ? 'justify-center' : ''}`}>
      <span className="w-[22px] h-[1.5px] bg-[#FB5005]" />
      {children}
    </span>
  )
}

// Standard section header
export function SecHead({ tag, title, sub, center, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-[640px] mb-14 ${className}`}>
      <SecTag center={center}>{tag}</SecTag>
      <h2 className="font-[Satoshi] font-900 text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.035em] mt-4">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[1rem] leading-[1.65] text-[#A1A1AA]">{sub}</p>}
    </div>
  )
}

// Page-level hero (top of inner pages)
export function PageHero({ tag, title, sub, children }) {
  return (
    <section className="relative pt-[150px] pb-[70px] overflow-hidden">
      <div className="absolute -top-[260px] left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-[radial-gradient(closest-side,rgba(251,80,5,0.10),transparent)] pointer-events-none" />
      <div className="max-w-[1160px] mx-auto px-6 relative">
        <SecTag>{tag}</SecTag>
        <h1 className="font-[Satoshi] font-900 text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.04em] mt-4 max-w-[800px]">
          {title}
        </h1>
        {sub && <p className="mt-5 max-w-[620px] text-[1.05rem] leading-[1.65] text-[#A1A1AA]">{sub}</p>}
        {children}
      </div>
    </section>
  )
}

// Buttons
const btnBase = 'inline-flex items-center justify-center gap-2 font-[Satoshi] font-700 text-[0.94rem] px-[30px] py-[15px] rounded-xl transition-all duration-200'
export function BtnPrimary({ to, href, children, className = '', ...rest }) {
  const cls = `${btnBase} bg-[#FB5005] text-white hover:bg-[#E5470A] hover:-translate-y-px ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <a href={href} className={cls} {...rest}>{children}</a>
}
export function BtnGhost({ to, href, children, className = '', ...rest }) {
  const cls = `${btnBase} border border-white/[0.14] text-[#FAFAFA] hover:border-white/30 ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <a href={href} className={cls} {...rest}>{children}</a>
}

// Card shell
export function Card({ children, className = '', ...rest }) {
  return (
    <div className={`bg-[#111111] border border-white/[0.07] rounded-[18px] transition-all duration-300 hover:bg-[#161616] hover:border-white/[0.14] hover:-translate-y-[3px] ${className}`} {...rest}>
      {children}
    </div>
  )
}

// Orange icon chip
export function IconChip({ children }) {
  return (
    <div className="w-[42px] h-[42px] rounded-xl bg-[#FB5005]/10 flex items-center justify-center mb-5 text-[#FB5005]">
      {children}
    </div>
  )
}
