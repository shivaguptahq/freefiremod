import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function ContactPage() {
  return (
    <PageShell
      title="Contact Us"
      description="General contact information for website-related questions and copyright concerns."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
    >
      <LegalNotice>
        Contact details are not yet published. FreeFire Mods does not display invented email
        addresses, phone numbers, physical addresses, or social media accounts.
      </LegalNotice>

      <Section title="Contact Information">
        <p>
          For general inquiries, copyright concerns or website-related issues, please check back
          for updated contact information.
        </p>
        <p>
          When contact details are published, they will appear on this page with clear instructions
          for the type of request being submitted, such as general questions, content corrections,
          or copyright notices.
        </p>
      </Section>

      <Section title="Before Reaching Out">
        <ul style={{ margin: '0.85rem 0 0', paddingLeft: '1.25rem', listStyleType: 'disc', listStyleColor: '#65f044', display: 'grid', gap: '0.45rem', lineHeight: 1.7, color: '#a8b5cc' }}>
          <li>Review the FAQ for common questions about compatibility, updates, and safety.</li>
          <li>Use the Disclaimer and Terms pages to understand website limitations and permitted use.</li>
          <li>Use the DMCA / Copyright Policy page for intellectual property concerns.</li>
          <li>Do not send passwords, account credentials, payment details, or sensitive personal data.</li>
        </ul>
      </Section>
    </PageShell>
  )
}
