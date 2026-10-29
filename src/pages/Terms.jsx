import React from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TextReveal from '../components/TextReveal'
import { WebPageSchema, BreadcrumbSchema } from '../components/JsonLd'

export default function Terms() {
  return (
    <>
      <WebPageSchema
        name="Terms of Service - Stellio Creative Labs"
        description="Terms of service for Stellio Creative Labs website and services."
        url="https://stellio.com.au/terms"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://stellio.com.au' },
        { name: 'Terms', url: 'https://stellio.com.au/terms' },
      ]} />
      <section className="pt-[140px] pb-20 text-center">
        <div className="max-w-[1100px] mx-auto px-6">
          <AnimatedSection>
            <span className="inline-block text-[#FB5005] text-[0.72rem] font-600 uppercase tracking-[0.14em] mb-4">Legal</span>
            <TextReveal>
              <h1 className="font-[Satoshi] text-[clamp(2rem,5vw,3.6rem)] font-700 leading-[1.05] mb-6">
                Terms of Service
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
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">1. Agreement to Terms</h2>
                <p>By accessing or using the Stellio Creative Labs website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our services.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">2. Services</h2>
                <p className="mb-3">Stellio Creative Labs provides branding, web design, development, AI integration, and digital platform services. The specific scope, deliverables, timeline, and fees for each project are defined in individual project proposals or contracts agreed upon before work begins.</p>
                <p>We reserve the right to refuse or decline any project at our discretion.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">3. Project Process and Revisions</h2>
                <p className="mb-3">Each project includes a defined number of revision rounds as specified in the project proposal. Additional revisions beyond the agreed scope may incur extra charges, which will be communicated before proceeding.</p>
                <p>Client feedback must be provided within the timeframes specified in the project agreement. Delays in feedback may result in adjusted delivery timelines.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">4. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>A deposit may be required before work begins, as specified in the project proposal</li>
                  <li>Final payment is due upon project completion or as outlined in the agreed payment schedule</li>
                  <li>Late payments may incur interest charges at a rate of 2% per month on outstanding balances</li>
                  <li>All prices are in Australian Dollars (AUD) unless otherwise stated</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">5. Intellectual Property</h2>
                <p className="mb-3">Upon full payment, the client receives ownership of the final deliverables as specified in the project agreement. Stellio Creative Labs retains the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>Display the work in our portfolio and marketing materials unless otherwise agreed</li>
                  <li>Use general techniques, methods, and knowledge gained during the project</li>
                  <li>Retain ownership of any pre-existing tools, frameworks, or code libraries used</li>
                </ul>
                <p>Third-party assets (fonts, stock images, plugins) remain subject to their respective licence terms.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">6. Client Responsibilities</h2>
                <p className="mb-3">The client agrees to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide timely feedback and approvals as requested</li>
                  <li>Supply accurate content and materials needed for the project</li>
                  <li>Ensure they have the right to use any content or assets they provide</li>
                  <li>Make payments according to the agreed schedule</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">7. Cancellation and Refunds</h2>
                <p className="mb-3">Either party may cancel a project with written notice. In the event of cancellation:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The client is responsible for payment of all work completed up to the cancellation date</li>
                  <li>Deposits are non-refundable once work has commenced</li>
                  <li>Stellio Creative Labs will provide all completed work upon settlement of outstanding invoices</li>
                </ul>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">8. Limitation of Liability</h2>
                <p className="mb-3">Stellio Creative Labs provides services on an "as is" basis. To the maximum extent permitted by law, we are not liable for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of revenue, data, or business opportunities</li>
                  <li>Issues arising from third-party services, hosting, or platforms not under our direct control</li>
                </ul>
                <p>Our total liability for any claim shall not exceed the total fees paid by the client for the relevant project.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">9. Confidentiality</h2>
                <p>Both parties agree to keep confidential any proprietary information shared during the project. This obligation survives the termination of the project agreement.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">10. Governing Law</h2>
                <p>These terms are governed by the laws of Queensland, Australia. Any disputes will be resolved in the courts of Queensland.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">11. Changes to These Terms</h2>
                <p>We may update these terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated terms.</p>
              </div>

              <div>
                <h2 className="font-[Satoshi] text-[1.3rem] font-700 text-[#FAFAFA] mb-3">12. Contact</h2>
                <p>For questions about these terms, contact us at <a href="mailto:hello@stellio.com.au" className="text-[#FB5005] hover:text-[#FAFAFA] transition-colors">hello@stellio.com.au</a> or call <a href="tel:0421675940" className="text-[#FB5005] hover:text-[#FAFAFA] transition-colors">0421 675 940</a>.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
