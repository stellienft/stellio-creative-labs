import React from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'

export default function Privacy() {
  return (
    <>
      <WebPageSchema
        name="Privacy Policy - Stellio Creative Labs"
        description="Privacy policy for Stellio Creative Labs website and services."
        url="https://stellio.com.au/privacy"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'Privacy', url: 'https://stellio.com.au/privacy' },
      ]} />
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Legal</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Privacy Policy
              </h1>
            </TextReveal>
            <p className="text-[1.05rem] text-[#A1A1AA] max-w-[600px] mx-auto">
              Last updated: June 2026
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-[120px]">
        <div className="max-w-[720px] mx-auto px-6">
          <AnimatedSection>
            <div className="space-y-8 text-[1rem] text-[#A1A1AA] leading-relaxed">
              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">1. Information We Collect</h2>
                <p className="mb-3">When you contact us through our website, we collect the information you provide, including your name, email address, company name, service interest, and message content.</p>
                <p>We also collect standard technical information when you visit our site, including IP address, browser type, pages visited, and time spent on each page. This data is collected automatically and helps us improve the site experience.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">2. How We Use Your Information</h2>
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Respond to your enquiries and provide the services you request</li>
                  <li>Send project updates and relevant communications</li>
                  <li>Improve our website and service offerings</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">3. Information Sharing</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist in operating our business (such as hosting providers and email services), but only to the extent necessary for them to perform their services.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">4. Data Storage and Security</h2>
                <p className="mb-3">Your data is stored on secure servers with appropriate technical and organisational measures to protect against unauthorised access, alteration, or destruction.</p>
                <p>While we take reasonable steps to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">5. Cookies</h2>
                <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect some site functionality.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">6. Third-Party Links</h2>
                <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any third-party sites you visit.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">7. Your Rights</h2>
                <p className="mb-3">Under the Australian Privacy Act 1988, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">8. Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">9. Contact</h2>
                <p>If you have questions about this privacy policy or how your data is handled, contact us at <a href="mailto:hello@stellio.com.au" className="text-[#FB5005] hover:text-[#FAFAFA] transition-colors">hello@stellio.com.au</a> or call <a href="tel:0421675940" className="text-[#FB5005] hover:text-[#FAFAFA] transition-colors">0421 675 940</a>.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
