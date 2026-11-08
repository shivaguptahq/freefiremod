import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How FreeFire Mods may handle information when you access this website."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
    >
      <LegalNotice>
        This Privacy Policy is based on the current application as inspected during implementation.
        The current frontend code does not include analytics scripts, advertising scripts, account
        registration, payment processing, or a contact form. If analytics, advertising, cookies, or
        other third-party integrations are added later, this policy must be updated before those
        changes are published. This document should be reviewed by a qualified lawyer before
        publication.
      </LegalNotice>

      <Section title="1. Introduction">
        <p>
          This Privacy Policy explains what information may be collected or processed when you visit
          FreeFire Mods. It is intended to describe the website’s current behavior and common hosting
          or browser interactions that may occur when a website is accessed.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>
          The current version of this website does not provide account registration, comments,
          payments, newsletters, or a contact form. As a result, FreeFire Mods does not intentionally
          collect names, email addresses, phone numbers, postal addresses, or payment information
          through website forms at this time.
        </p>
      </Section>

      <Section title="3. Information We Do Not Intentionally Collect">
        <p>
          FreeFire Mods does not intentionally request or collect game passwords, one-time login
          codes, government-issued identification, financial account credentials, or sensitive
          personal information through the current site interface. Users should never submit such
          information to this website.
        </p>
      </Section>

      <Section title="4. Automatically Collected Information">
        <p>
          When you visit any website, your browser and the hosting provider may process technical
          information needed to deliver the page. This can include IP address, request time, browser
          type, operating system, device type, referring page, and requested URLs. Such information
          is commonly handled through standard web server or hosting logs.
        </p>
        <p>
          FreeFire Mods does not add custom analytics collection code in the current frontend
          implementation. However, hosting or infrastructure providers used to serve the site may
          collect standard access logs or security data according to their own practices.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          The current frontend application does not set custom cookies for analytics, advertising, or
          user accounts. If the hosting provider, embedded third-party content, or a future feature
          sets cookies, those cookies should be disclosed and managed according to applicable law and
          user expectations.
        </p>
      </Section>

      <Section title="6. Analytics">
        <p>
          No analytics service is configured in the current application code reviewed during this
          update. If analytics tools are added in the future, this Privacy Policy should identify the
          provider, the categories of data collected, the purpose of collection, retention practices,
          and any available choices or opt-out mechanisms.
        </p>
      </Section>

      <Section title="7. Advertising Partners">
        <p>
          No advertising scripts or ad network integrations are configured in the current application
          code reviewed during this update. If advertising is added later, the policy must describe
          ad technologies, cookies or identifiers, personalization practices, and third-party partner
          disclosures required by applicable law.
        </p>
      </Section>

      <Section title="8. Third-Party Services">
        <p>
          The current site loads fonts from Google Fonts as referenced in the HTML document. When a
          browser requests those resources, Google may receive technical information such as IP
          address and browser details as part of normal web resource delivery. The use of Google
          Fonts should be reviewed for compliance with applicable privacy requirements.
        </p>
        <p>
          If additional third-party services are added, such as hosting analytics, content delivery,
          embedded media, social plugins, or support tools, they should be listed here with accurate
          descriptions of the data involved.
        </p>
      </Section>

      <Section title="9. External Websites">
        <p>
          FreeFire Mods may link to external websites, app stores, publishers, or reference sources.
          Those sites operate independently and have their own privacy policies and security
          practices. Users should review third-party policies before providing information or
          installing software.
        </p>
      </Section>

      <Section title="10. IP Addresses">
        <p>
          IP addresses may be processed by hosting providers, network services, or security systems
          as part of delivering website content, preventing abuse, and maintaining service
          reliability. FreeFire Mods does not currently use custom frontend code to collect IP
          addresses for marketing profiles.
        </p>
      </Section>

      <Section title="11. Browser Information">
        <p>
          Browser and device characteristics such as user agent, screen behavior, language settings,
          and compatibility features may be processed by the browser or hosting infrastructure during
          normal page requests. This information can help deliver content correctly and diagnose
          technical issues.
        </p>
      </Section>

      <Section title="12. Device Information">
        <p>
          The website is designed for responsive display across desktop and mobile devices. Standard
          technical device information may be processed during access, but the current site does not
          intentionally collect unique advertising identifiers or install a mobile app through this
          web interface.
        </p>
      </Section>

      <Section title="13. Data Retention">
        <p>
          Because the current website does not provide user accounts or direct submission forms,
          FreeFire Mods does not intentionally maintain a user database of submitted personal
          information. Any retention of server logs or third-party service records is determined by
          the relevant hosting or service provider and should be reviewed if those providers are
          configured.
        </p>
      </Section>

      <Section title="14. Data Security">
        <p>
          Reasonable care should be taken to operate the website securely, but no website or
          internet transmission can be guaranteed to be completely secure. Users should avoid
          sending sensitive information through unofficial channels and should use caution when
          interacting with third-party websites or downloads.
        </p>
      </Section>

      <Section title="15. Children's Privacy">
        <p>
          The website is not designed to knowingly collect personal information from children through
          forms or accounts. If personal information is ever collected in the future, the operator
          should review applicable children’s privacy requirements and update this policy
          accordingly.
        </p>
      </Section>

      <Section title="16. User Rights">
        <p>
          Depending on your location, you may have rights related to personal information, such as
          rights to access, correct, delete, restrict, or object to certain processing. Because the
          current site does not intentionally collect personal information through forms, these
          rights may apply mainly to information held by hosting or third-party providers.
        </p>
      </Section>

      <Section title="17. Data Deletion Requests">
        <p>
          If future features collect personal information, the website should provide a clear method
          for submitting access or deletion requests. At present, no direct contact method is
          published. Updated contact information will be provided on the Contact Us page when
          available.
        </p>
      </Section>

      <Section title="18. International Visitors">
        <p>
          Visitors may access this website from different countries. Hosting providers and third-party
          services may process technical data in locations outside a visitor’s country. Cross-border
          data practices should be reviewed if user-submitted personal data or regulated services are
          added.
        </p>
      </Section>

      <Section title="19. Policy Updates">
        <p>
          This Privacy Policy may be updated when website features, integrations, hosting practices,
          or legal requirements change. The “Last updated” date on this page reflects the latest
          published revision.
        </p>
      </Section>

      <Section title="20. Contact Information">
        <p>
          Privacy-related contact details are not yet published. Please check the Contact Us page for
          updated information.
        </p>
      </Section>
    </PageShell>
  )
}
