// Stellio Client Onboarding - shared schema for the form page and Admin owner view
export const ONBOARDING_SECTIONS = [
  {
    id: 'you',
    num: '01',
    title: 'You and your business',
    blurb: 'The basics, plus who we should invoice and who signs off on designs.',
    fields: [
      { id: 'contact_name', label: 'Your full name', type: 'text', required: true },
      { id: 'contact_role', label: 'Your role', type: 'text', note: 'e.g. Managing Director' },
      { id: 'contact_email', label: 'Email', type: 'email', required: true },
      { id: 'contact_phone', label: 'Phone', type: 'tel' },
      { id: 'current_name', label: 'Current business name', type: 'text', required: true },
      { id: 'new_name_known', label: 'New business name (if decided)', type: 'text', note: 'Leave blank if the name is still being worked out.' },
      { id: 'invoice_entity', label: 'Name to invoice', type: 'text', note: 'Company or legal entity name exactly as it should appear on invoices.' },
      { id: 'abn', label: 'ABN', type: 'text' },
      { id: 'billing_email', label: 'Billing email (if different)', type: 'email' },
      { id: 'address', label: 'Office address', type: 'textarea', note: 'For the website footer and Google Business listing.' },
      { id: 'signoff', label: 'Who has final sign-off on designs?', type: 'text', note: 'One nominated decision-maker keeps feedback quick and clear.' },
    ],
  },
  {
    id: 'what',
    num: '02',
    title: 'What you do',
    blurb: 'Help us understand the business the way your best clients see it.',
    fields: [
      { id: 'about', label: 'Describe the business in a few sentences', type: 'textarea', required: true },
      { id: 'years', label: 'Years in business', type: 'text' },
      { id: 'team_size', label: 'Team size', type: 'text' },
      { id: 'services', label: 'Main services you offer', type: 'textarea', note: 'List them in order of importance to the business.' },
      { id: 'industries', label: 'Industries or sectors you specialise in', type: 'textarea' },
      { id: 'locations', label: 'Areas you service', type: 'text', note: 'e.g. Brisbane and South East Queensland' },
      { id: 'difference', label: 'What makes you different from competitors?', type: 'textarea' },
      { id: 'competitors', label: 'Main competitors (names or websites)', type: 'textarea' },
    ],
  },
  {
    id: 'audience',
    num: '03',
    title: "Who you're talking to",
    blurb: 'The brand and website should speak directly to the people who matter most.',
    fields: [
      { id: 'ideal_client', label: 'Describe your ideal client', type: 'textarea' },
      { id: 'secondary_audience', label: 'Any other important audiences?', type: 'textarea', note: 'e.g. candidates, partners, suppliers, investors.' },
      { id: 'client_problems', label: 'What problems do they come to you to solve?', type: 'textarea' },
      { id: 'faqs', label: 'Questions or objections you hear most often', type: 'textarea' },
    ],
  },
  {
    id: 'naming',
    num: '04',
    title: 'Naming and domain',
    blurb: "If you're moving to a new name, this is where we start.",
    fields: [
      { id: 'name_status', label: 'Where are you at with the name?', type: 'single', options: ['Decided', 'Have a shortlist', 'Need help finding one', 'Keeping our current name'] },
      { id: 'name_shortlist', label: "Names you're considering", type: 'textarea', note: 'One per line, or separated by commas.' },
      { id: 'name_feel', label: 'What should the name suggest or make people feel?', type: 'textarea' },
      { id: 'name_avoid', label: 'Words, styles or names to avoid', type: 'textarea' },
      { id: 'domain_picks', label: 'Domain ideas', type: 'domains' },
      { id: 'domain_pref', label: 'Preferred domain (if known)', type: 'text', note: 'e.g. yourbrand.com.au' },
      { id: 'domain_owned', label: 'Do you already own any domains for the new name?', type: 'single', options: ['Yes', 'No', 'Not sure'] },
      { id: 'business_reg', label: 'Has the new business name or company been registered with ASIC?', type: 'single', options: ['Yes', 'Not yet', 'Not needed'] },
    ],
  },
  {
    id: 'personality',
    num: '05',
    title: 'Brand personality',
    blurb: 'There are no wrong answers here. Gut reactions are the most useful.',
    fields: [
      { id: 'brand_words', label: 'Three to five words that should describe the brand', type: 'text', note: 'e.g. trusted, local, sharp, approachable' },
      { id: 'scale_tone', label: 'Tone', type: 'scale', from: 'Corporate', to: 'Friendly' },
      { id: 'scale_style', label: 'Style', type: 'scale', from: 'Classic', to: 'Modern' },
      { id: 'scale_volume', label: 'Presence', type: 'scale', from: 'Understated', to: 'Bold' },
      { id: 'colours_like', label: 'Colours you like', type: 'text' },
      { id: 'colours_avoid', label: 'Colours to avoid', type: 'text' },
      { id: 'brands_admire', label: 'Brands you admire (any industry) and why', type: 'textarea' },
      { id: 'brand_uses', label: 'Where will the brand be used?', type: 'multi', options: ['Website', 'Social media', 'Email signatures', 'Business cards', 'Signage', 'Vehicles', 'Uniforms', 'Proposals and documents', 'Job ads', 'Presentations'] },
    ],
  },
  {
    id: 'website',
    num: '06',
    title: 'The website',
    blurb: "What the site needs to do, and how you'll measure whether it's working.",
    fields: [
      { id: 'site_goals', label: 'Main goals for the website', type: 'multi', options: ['Generate enquiries', 'Build credibility', 'Show services', 'List jobs or products', 'Attract staff', 'Take bookings', 'Sell online', 'Educate or inform'] },
      { id: 'primary_action', label: 'The one action you most want visitors to take', type: 'text', note: 'e.g. Book a call, submit a role, apply for a job' },
      { id: 'pages', label: 'Pages you expect to need', type: 'multi', options: ['Home', 'About', 'Services', 'Industries', 'Team', 'Jobs / listings', 'Case studies', 'Testimonials', 'News / blog', 'FAQs', 'Contact', 'Careers'] },
      { id: 'features', label: "Features you'd like", type: 'multi', options: ['Enquiry forms', 'Job board', 'Live chat', 'Newsletter sign-up', 'Online booking', 'Testimonials', 'Google reviews', 'Downloadable resources', 'Client or candidate login', 'Multiple locations'] },
      { id: 'systems', label: 'Software the website needs to connect to', type: 'textarea', note: 'e.g. CRM, recruitment or booking software, email marketing, accounting.' },
      { id: 'sites_like', label: 'Websites you like and what you like about them', type: 'textarea' },
      { id: 'sites_dislike', label: "Anything you don't want on the new site", type: 'textarea' },
    ],
  },
  {
    id: 'content',
    num: '07',
    title: 'Content',
    blurb: 'Content is the most common cause of delays, so it helps to plan it early.',
    fields: [
      { id: 'copy_owner', label: 'Who will write the page copy?', type: 'single', options: ["We'll supply drafts for you to edit", "We'd like full copywriting added", 'Not sure yet'] },
      { id: 'photos', label: 'Photography', type: 'single', options: ['We have good photos', "We'll organise a shoot", 'Use licensed stock', 'Not sure yet'] },
      { id: 'testimonials', label: 'Do you have testimonials, reviews or case studies we can use?', type: 'single', options: ['Yes', 'Some', 'Not yet'] },
      { id: 'keep_content', label: 'Content from the current site to keep, update or remove', type: 'textarea' },
    ],
  },
  {
    id: 'accounts',
    num: '08',
    title: 'Email and online accounts',
    blurb: "We'll register your domain and set up hosting and Google Workspace for you. We just need to know who needs an email address and where you already are online.",
    fields: [
      { id: 'current_site', label: 'Current website (if you have one)', type: 'url', note: 'https://' },
      { id: 'mailboxes', label: 'Email addresses needed on the new domain', type: 'textarea', note: 'List each person or alias with their name, e.g. Jane Smith (jane@), info@, accounts@.' },
      { id: 'socials', label: 'Social media accounts', type: 'textarea', note: "Links to LinkedIn, Facebook, Instagram and so on, or handles you'd like us to secure for the new name." },
    ],
  },
  {
    id: 'timing',
    num: '09',
    title: 'Timing and anything else',
    blurb: 'Last one.',
    fields: [
      { id: 'deadline', label: 'Any key dates or deadlines?', type: 'textarea', note: 'e.g. a launch event, end of lease, trade show, financial year.' },
      { id: 'availability', label: 'Best days and times for the discovery workshop', type: 'text' },
      { id: 'anything_else', label: 'Anything else we should know?', type: 'textarea' },
    ],
  },
]

export const ALL_FIELDS = ONBOARDING_SECTIONS.flatMap(s => s.fields.map(f => ({ ...f, section: s.title })))

// ---- Domain idea generation ----
function cleanName(raw) {
  return raw
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(pty|ltd|limited|the)\b/g, ' ')
    .replace(/[^a-z0-9]/g, '')
}

export function domainIdeas(newNameKnown, shortlist) {
  const raw = []
  if (newNameKnown) raw.push(newNameKnown)
  if (shortlist) raw.push(...shortlist.split(/[\n,]+/))
  const names = [...new Set(raw.map(n => cleanName(n)).filter(n => n.length >= 2))].slice(0, 6)
  const ideas = []
  for (const n of names) {
    ideas.push(`${n}.com.au`, `${n}.au`, `${n}.com`)
    if (!n.includes('group')) ideas.push(`${n}group.com.au`)
    if (!n.includes('qld')) ideas.push(`${n}qld.com.au`)
    if (!n.includes('brisbane')) ideas.push(`${n}brisbane.com.au`)
    if (!n.includes('hq')) ideas.push(`${n}hq.com.au`)
    if (!n.startsWith('get')) ideas.push(`get${n}.com.au`)
  }
  return ideas
}

const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function answersAsHtml(answers) {
  let sections = ''
  for (const s of ONBOARDING_SECTIONS) {
    const rows = s.fields.filter(f => {
      const v = answers[f.id]
      return v !== undefined && v !== null && v !== '' && (!Array.isArray(v) || v.length > 0)
    })
    if (rows.length === 0) continue
    sections += `
      <h2 style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#FB5005;margin:28px 0 10px 0;padding-bottom:6px;border-bottom:2px solid #FB5005;">${s.num}. ${escHtml(s.title)}</h2>
      <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
        ${rows.map(f => {
          const v = answers[f.id]
          const val = Array.isArray(v) ? v.join(', ') : String(v)
          return `<tr>
            <td style="padding:7px 12px 7px 0;font-size:13px;color:#666666;vertical-align:top;width:42%;">${escHtml(f.label)}</td>
            <td style="padding:7px 0;font-size:14px;color:#111111;vertical-align:top;white-space:pre-wrap;">${escHtml(val)}</td>
          </tr>`
        }).join('')}
      </table>`
  }
  return sections
}

export function answersAsText(answers) {
  let out = ''
  for (const s of ONBOARDING_SECTIONS) {
    out += `${s.num}. ${s.title.toUpperCase()}\n${'-'.repeat(40)}\n`
    for (const f of s.fields) {
      const v = answers[f.id]
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) continue
      out += `${f.label}: ${Array.isArray(v) ? v.join(', ') : v}\n`
    }
    out += '\n'
  }
  return out.trim()
}
