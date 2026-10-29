import React from 'react'

// Reusable JSON-LD script injector
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Site-wide: LocalBusiness + Organization
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    name: 'Stellio Creative Labs',
    alternateName: 'Stellio Graphic Design',
    url: 'https://stellio.com.au',
    logo: 'https://cuakekfosklppjqucihu.supabase.co/storage/v1/object/public/site-assets/brand/favicon_url-1781245119482.png',
    description: 'Digital studio for startups offering branding, web design, custom digital tools and AI integration.',
    telephone: '+61421675940',
    email: 'hello@stellio.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'White Rock',
      addressLocality: 'Redbank Plains',
      addressRegion: 'QLD',
      postalCode: '4301',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.6833,
      longitude: 152.8833,
    },
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'Stellio Koutsis',
      url: 'https://linkedin.com/in/stelliokoutsis',
    },
    sameAs: [
      'https://facebook.com/stelliocreativlabs',
      'https://instagram.com/stelliogd',
      'https://instagram.com/stellio.studio',
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '75',
      bestRating: '5',
    },
  }
  return <JsonLd data={data} />
}

// Per-page WebPage schema
export function WebPageSchema({ type = 'WebPage', name, description, url }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Stellio Creative Labs',
      url: 'https://stellio.com.au',
    },
  }
  return <JsonLd data={data} />
}

// Home page specifically
export function HomePageSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellio Creative Labs | Build Bold. Launch Smarter.',
    description: 'Digital studio for startups offering branding, web design, custom digital tools and AI integration.',
    url: 'https://stellio.com.au',
    publisher: {
      '@type': 'Organization',
      name: 'Stellio Creative Labs',
      url: 'https://stellio.com.au',
    },
    potentialAction: {
      '@type': 'ViewAction',
      target: 'https://stellio.com.au/contact',
      name: 'Start Your Project',
    },
  }
  return <JsonLd data={data} />
}

// BlogPosting for individual blog posts
export function BlogPostingSchema({ title, description, datePublished, dateModified, image, authorName, url }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image,
    author: {
      '@type': 'Person',
      name: authorName || 'Stellio Koutsis',
      url: 'https://linkedin.com/in/stelliokoutsis',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stellio Creative Labs',
      url: 'https://stellio.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cuakekfosklppjqucihu.supabase.co/storage/v1/object/public/site-assets/brand/favicon_url-1781245119482.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
  return <JsonLd data={data} />
}

// Service schema for Services page
export function ServiceSchema({ name, description, price, url }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Stellio Creative Labs',
      url: 'https://stellio.com.au',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    offers: price ? {
      '@type': 'Offer',
      price: price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    } : undefined,
    url,
  }
  return <JsonLd data={data} />
}

// BreadcrumbList schema
export function BreadcrumbSchema({ items }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
  return <JsonLd data={data} />
}

// FAQPage schema
export function FAQSchema({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return <JsonLd data={data} />
}

export default JsonLd


// Per-page SEO meta injector: title, description, OG, twitter, canonical
export function SeoMeta({ title, description, canonical, ogImage, ogType = 'website' }) {
  const setMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.setAttribute('content', content)
  }
  React.useEffect(() => {
    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:type', ogType)
    if (ogImage) {
      setMeta('property', 'og:image', ogImage)
      setMeta('property', 'og:image:width', '1200')
      setMeta('property', 'og:image:height', '630')
    }
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    if (ogImage) setMeta('name', 'twitter:image', ogImage)
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
    link.setAttribute('href', canonical)

    // Re-apply after global settings context settles (it overwrites title on mount)
    const reapply = setTimeout(() => {
      if (document.title !== title) {
        document.title = title
        setMeta('property', 'og:title', title)
        setMeta('name', 'twitter:title', title)
      }
    }, 2000)
    return () => clearTimeout(reapply)
  }, [title, description, canonical, ogImage, ogType])
  return null
}
