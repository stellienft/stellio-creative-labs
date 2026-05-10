export const promptCategories = [
  {
    id: 'automation',
    title: 'Business Automation',
    description: 'Kill repetitive operations with agents that run while you sleep.',
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M9 2v2"/><path d="M9 20v2"/><path d="M20 15h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M2 9h2"/>',
    prompts: [
      {
        title: 'Daily Intelligence Brief',
        text: 'Set up a daily brief that summarises my unread emails, Slack mentions, and any urgent items from my Notion tasks. Deliver it to me on Telegram every morning at 8am.',
        skills: ['notion', 'telegram', 'cronjob'],
        timeSaved: '45 min/day',
      },
      {
        title: 'Competitor Price Monitor',
        text: 'Monitor these 3 competitor websites weekly. Extract their pricing tables and flag any changes. Send me a comparison summary every Monday.',
        skills: ['web_search', 'browser', 'cronjob', 'telegram'],
        timeSaved: '2 hours/week',
      },
      {
        title: 'Invoice Follow-Up Bot',
        text: 'Check my accounting spreadsheet for invoices overdue by 7 days. Draft polite follow-up emails and queue them for my review before sending.',
        skills: ['google_sheets', 'email', 'google_calendar'],
        timeSaved: '3 hours/week',
      },
    ],
  },
  {
    id: 'content',
    title: 'Content Engine',
    description: 'Never start from blank. Repurpose, resize, and schedule across every channel.',
    icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    prompts: [
      {
        title: 'Podcast Transcript to 10 Posts',
        text: 'Take this podcast transcript and create: 5 LinkedIn posts, 3 Twitter threads, 1 newsletter intro paragraph, and 1 blog outline. Save everything to my Notion content calendar.',
        skills: ['notion', 'openai'],
        timeSaved: '4 hours',
      },
      {
        title: 'Weekly Content Digest',
        text: 'Every Friday at 4pm, compile all drafts I created this week and suggest 3 new angles based on trending topics in my industry. Message me the recommendations on Telegram.',
        skills: ['notion', 'web_search', 'cronjob', 'telegram'],
        timeSaved: '1.5 hours/week',
      },
      {
        title: 'Client Report Generator',
        text: 'Pull data from my Google Analytics dashboard and create a one-page PDF summary with key metrics and trend arrows. Email it to the client list every first Monday of the month.',
        skills: ['google_analytics', 'google_sheets', 'email', 'cronjob'],
        timeSaved: '5 hours/month',
      },
    ],
  },
  {
    id: 'research',
    title: 'Research & Analysis',
    description: 'Stop drowning in data. Agents compile, summarise, and surface what matters.',
    icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
    prompts: [
      {
        title: 'Industry Trend Radar',
        text: 'Monitor 5 industry blogs I care about. When any publish a new article containing keywords related to AI regulation, pricing changes, or competitor launches, summarise it and send me an alert.',
        skills: ['blogwatcher', 'web_search', 'telegram'],
        timeSaved: '6 hours/week',
      },
      {
        title: 'Meeting Prep Brief',
        text: 'Before my 9am client calls, pull their company info from LinkedIn, scan their latest posts, and draft 3 relevant talking points. Deliver 15 minutes before the call.',
        skills: ['linkedin', 'web_search', 'calendar', 'telegram'],
        timeSaved: '20 min/call',
      },
      {
        title: 'Contract Clause Scanner',
        text: 'Read this contract PDF and flag any clauses that differ from my standard template. Highlight risky language around liability, termination, and payment terms.',
        skills: ['ocr-and-documents', 'file'],
        timeSaved: '2 hours',
      },
    ],
  },
  {
    id: 'client',
    title: 'Client Operations',
    description: 'Faster delivery, fewer errors, happier clients. Agents handle the repetitive client work.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    prompts: [
      {
        title: 'Onboarding Sequence',
        text: 'When a new client is added to my CRM, trigger a 3-email onboarding sequence over 5 days. Include a welcome email, a project kickoff questionnaire, and a scheduling link.',
        skills: ['hubspot', 'email', 'webhook-subscriptions'],
        timeSaved: '1 hour/client',
      },
      {
        title: 'Brand Voice Auditor',
        text: 'Audit this website copy against my brand voice guidelines. Flag any phrases that sound too formal, too casual, or off-tone. Suggest rewrites that match the voice doc.',
        skills: ['file', 'openai'],
        timeSaved: '1.5 hours',
      },
      {
        title: 'Project Status Update',
        text: 'Every Wednesday, check my Notion project database. For any project with a deadline within 14 days, draft a status update email to the client with progress, blockers, and next steps.',
        skills: ['notion', 'email', 'cronjob'],
        timeSaved: '2 hours/week',
      },
    ],
  },
  {
    id: 'creative',
    title: 'Creative Workflow',
    description: 'Speed up creative production from concept to final asset across all formats.',
    icon: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    prompts: [
      {
        title: 'Campaign Concept Generator',
        text: 'Generate 3 visual campaign concepts for this product launch brief. For each, write the headline, describe the visual direction, and suggest the primary CTA.',
        skills: ['openai'],
        timeSaved: '3 hours',
      },
      {
        title: 'Multi-Platform Asset Sizer',
        text: 'Take this campaign concept and output sizing specs and copy variations for Instagram Feed, Instagram Story, LinkedIn, Twitter, and TikTok. Save to my shared drive folder.',
        skills: ['file', 'openai', 'google_drive'],
        timeSaved: '2 hours',
      },
      {
        title: 'Weekly Social Queue',
        text: 'Every Sunday at 6pm, pull my approved content from Notion and schedule the week\'s posts across LinkedIn, Instagram, and Twitter using my posting schedule. Confirm in Telegram when done.',
        skills: ['notion', 'cronjob', 'telegram', 'social_media'],
        timeSaved: '3 hours/week',
      },
    ],
  },
]

export const skillsList = [
  { name: 'Telegram', desc: 'Send messages, alerts, summaries directly to your phone' },
  { name: 'Notion', desc: 'Read, write, and manage pages, databases, and content calendars' },
  { name: 'Google Sheets', desc: 'Pull data, update records, generate reports from spreadsheets' },
  { name: 'Email', desc: 'Draft, send, and manage emails through your connected provider' },
  { name: 'Web Search', desc: 'Scrape, monitor, and research any public web source' },
  { name: 'Calendar', desc: 'Schedule meetings, set reminders, check availability' },
  { name: 'GitHub', desc: 'Manage repos, review PRs, track issues, deploy code' },
  { name: 'Slack', desc: 'Post updates, monitor channels, trigger workflows' },
  { name: 'CRM', desc: 'Update contacts, track deals, trigger nurture sequences' },
  { name: 'Cron Jobs', desc: 'Schedule recurring tasks that run without you online' },
]

export const testimonials = [
  {
    text: 'My agent monitors 12 RSS feeds and summarises them into a weekly brief. I read one message instead of 200 articles.',
    name: 'Marcus T.',
    role: 'Agency Owner',
    platform: 'Telegram',
  },
  {
    text: 'It audits every pull request for accessibility issues before I review. Catches things I used to miss.',
    name: 'Devon L.',
    role: 'Engineering Lead',
    platform: 'Discord',
  },
  {
    text: 'Auto-generates client reports from my Airtable data and emails them every Friday. Clients think I spend hours on them.',
    name: 'Priya K.',
    role: 'Independent Consultant',
    platform: 'Telegram',
  },
]

export const demoSteps = [
  {
    user: 'What skills do I have available?',
    raven: 'Here are your active skills: Notion, Telegram, Google Sheets, Email, Calendar, Web Search, GitHub, and 6 more. Say "use [skill]" to activate any.',
  },
  {
    user: 'Set a reminder to check competitor pricing every Monday and ping me on Telegram.',
    raven: 'Done. Created cron job CR-8821. Every Monday at 9am, I will check competitor pricing and send you a Telegram summary.',
  },
  {
    user: 'Save that pricing data to my Notion database.',
    raven: 'Connected to Notion. I will append weekly pricing data to your "Competitor Intel" database starting next Monday.',
  },
]
