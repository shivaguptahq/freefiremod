import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & Conditions"
      description="Terms governing access to and use of the FreeFire Mods informational website."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]}
    >
      <LegalNotice>
        These Terms are provided for general informational purposes and describe intended website
        practices. They should be reviewed by a qualified lawyer before publication, especially
        clauses related to liability, indemnification, governing law, consumer rights, and
        intellectual property procedures.
      </LegalNotice>

      <Section title="1. Acceptance of Terms">
        <p>
          By accessing or using FreeFire Mods, you agree to these Terms &amp; Conditions and any
          policies referenced on this website, including the Privacy Policy, Disclaimer, and DMCA /
          Copyright Policy. If you do not agree with these terms, you should stop using the
          website.
        </p>
      </Section>

      <Section title="2. Website Purpose">
        <p>
          FreeFire Mods is an independent informational platform. The website may publish
          information about gaming APK topics, version details, compatibility notes, update
          summaries, installation guidance, screenshots, and related resources. The website is not
          an official publisher, developer, distributor, or support channel for Free Fire, Free
          Fire MAX, Garena, or other third-party products unless expressly stated in writing.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p>
          You may use this website only if you can form a binding agreement under applicable law or
          have permission from a parent or legal guardian where required. If the website is used
          by or on behalf of a minor, a parent or guardian is responsible for supervision and for
          decisions about third-party software, downloads, and device security.
        </p>
      </Section>

      <Section title="4. Permitted Use">
        <p>You may use the website for lawful, personal, non-commercial informational purposes, such as:</p>
        <ul>
          <li>Reading published guides, version notes, and compatibility information.</li>
          <li>Navigating public pages and sharing links to public pages where lawful.</li>
          <li>Submitting a copyright concern through the process described on the DMCA / Copyright Policy page when contact details are available.</li>
        </ul>
      </Section>

      <Section title="5. Prohibited Activities">
        <p>You agree not to:</p>
        <ul>
          <li>Use the website in violation of applicable law, regulation, or third-party rights.</li>
          <li>Attempt to gain unauthorized access to the website, hosting environment, or related systems.</li>
          <li>Upload, transmit, or distribute malware, malicious code, or harmful automated traffic.</li>
          <li>Scrape, copy, or republish site content in a way that violates intellectual property rights or applicable terms.</li>
          <li>Misrepresent the website as an official Garena service or as an authorized source unless such authorization actually exists.</li>
          <li>Use the website to promote fraud, impersonation, account theft, or deceptive practices.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          Unless otherwise stated, original text, layout, design elements, and site branding created
          for FreeFire Mods are protected by applicable intellectual property laws. Free Fire, Free
          Fire MAX, Garena, Android, Google Play, and other names, logos, and trademarks referenced
          on the website belong to their respective owners. References are used for identification
          or informational purposes only.
        </p>
      </Section>

      <Section title="7. Third-Party Content">
        <p>
          The website may refer to third-party applications, publishers, stores, screenshots,
          version details, trademarks, or informational sources. FreeFire Mods does not control
          third-party content and does not guarantee its accuracy, availability, legality, or
          safety. A reference to third-party material does not imply endorsement, sponsorship, or
          authorization.
        </p>
      </Section>

      <Section title="8. External Links">
        <p>
          External links may be provided for convenience or reference. FreeFire Mods is not
          responsible for the content, privacy practices, security, or policies of external
          websites. Users should review the terms and privacy notices of any third-party site they
          visit.
        </p>
      </Section>

      <Section title="9. Application Compatibility">
        <p>
          Compatibility information is provided as general guidance only. Whether an application,
          APK, update, or game build works on a particular device depends on factors such as
          region, Android version, device hardware, storage, permissions, publisher restrictions,
          and current release status. No compatibility outcome is guaranteed.
        </p>
      </Section>

      <Section title="10. Software Installation Risks">
        <p>
          Installing software from unofficial or unknown sources can involve security and privacy
          risks, including malware, unwanted permissions, data exposure, device instability, or
          loss of access to accounts or services. Users should prefer official distribution channels
          when available, verify publishers carefully, keep backups, and use appropriate device
          security measures.
        </p>
      </Section>

      <Section title="11. Account Security">
        <p>
          Users are responsible for protecting their own accounts, passwords, recovery methods, and
          devices. FreeFire Mods does not ask for game passwords, one-time codes, payment details,
          or account credentials. Use of unauthorized modified clients or third-party cheating tools
          may violate publisher rules and can result in account restrictions, suspension, or
          permanent bans.
        </p>
      </Section>

      <Section title="12. User Responsibilities">
        <p>
          You are responsible for evaluating the legality, safety, suitability, and publisher
          compliance of any software or action you take based on information found on this website.
          You should not rely on website summaries as a substitute for official publisher guidance,
          legal advice, or professional security advice.
        </p>
      </Section>

      <Section title="13. Service Availability">
        <p>
          The website may be unavailable, interrupted, delayed, or changed at any time due to
          maintenance, hosting issues, updates, technical problems, or other operational reasons.
          FreeFire Mods does not guarantee uninterrupted access or error-free operation.
        </p>
      </Section>

      <Section title="14. Website Modifications">
        <p>
          FreeFire Mods may add, update, restrict, or remove pages, features, descriptions, links,
          or policies at any time. Published information may become outdated, and users should check
          the relevant page date or official sources for current details.
        </p>
      </Section>

      <Section title="15. Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, FreeFire Mods and its operators are
          not liable for indirect, incidental, special, consequential, or punitive damages, or for
          loss of data, device damage, account loss, loss of profits, or business interruption
          arising from or related to use of the website or reliance on website information.
        </p>
        <p>
          Nothing in these Terms excludes or limits rights that cannot be excluded or limited under
          applicable law, including mandatory consumer protections where they apply.
        </p>
      </Section>

      <Section title="16. Indemnification">
        <p>
          Where permitted by applicable law, you agree to be responsible for claims, losses, or
          expenses arising from your unlawful use of the website, your violation of these Terms, or
          your infringement of third-party rights. This clause should be reviewed by qualified legal
          counsel before publication because enforceability varies by jurisdiction.
        </p>
      </Section>

      <Section title="17. Copyright Complaints">
        <p>
          Copyright or trademark concerns should be submitted according to the DMCA / Copyright
          Policy page. FreeFire Mods may review and respond to valid notices when sufficient
          information is provided and contact details for receiving notices are published.
        </p>
      </Section>

      <Section title="18. Termination of Access">
        <p>
          FreeFire Mods may restrict or terminate access to the website, in whole or in part, for
          users who misuse the site, violate these Terms, interfere with site operation, or create
          legal or security risk, subject to applicable law.
        </p>
      </Section>

      <Section title="19. Governing Law">
        <p>
          Governing law and dispute resolution terms should be selected based on the operator’s
          location, users, hosting arrangements, and applicable legal requirements. No governing law
          is stated here because this placeholder must be reviewed and completed by a qualified
          lawyer before publication.
        </p>
      </Section>

      <Section title="20. Changes to Terms">
        <p>
          These Terms may be updated to reflect website changes, operational practices, or legal
          requirements. The “Last updated” date indicates the latest revision shown on this page.
          Continued use of the website after changes are posted may indicate acceptance where
          permitted by applicable law.
        </p>
      </Section>

      <Section title="21. Contact Information">
        <p>
          Contact details for Terms-related questions are not yet published. Please check the
          Contact Us page for updated information.
        </p>
      </Section>
    </PageShell>
  )
}
