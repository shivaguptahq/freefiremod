import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function DmcaPage() {
  return (
    <PageShell
      title="DMCA / Copyright Policy"
      description="Information about copyright complaints, trademark concerns, and material review requests."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'DMCA / Copyright Policy' }]}
    >
      <LegalNotice>
        This page describes a general copyright concern process. It does not claim that a DMCA agent
        has been designated or that any specific legal procedure has been fully implemented. Contact
        details for copyright notices will be published when available. This policy should be
        reviewed by a qualified lawyer before publication.
      </LegalNotice>

      <Section title="1. Copyright Ownership">
        <p>
          FreeFire Mods respects the intellectual property rights of publishers, developers, artists,
          and other rights holders. Original site materials are protected where applicable, and
          third-party copyrights remain the property of their respective owners.
        </p>
      </Section>

      <Section title="2. Third-Party Intellectual Property">
        <p>
          References to third-party games, applications, screenshots, names, logos, or trademarks may
          appear for identification, commentary, compatibility reference, or informational purposes.
          Such references do not imply ownership, endorsement, or authorization unless expressly
          stated.
        </p>
      </Section>

      <Section title="3. Trademark Acknowledgment">
        <p>
          Free Fire, Free Fire MAX, Garena, Android, Google Play, and other marks referenced on this
          website are trademarks or registered trademarks of their respective owners. All rights in
          those marks remain with the applicable owners.
        </p>
      </Section>

      <Section title="4. Copyright Infringement Complaints">
        <p>
          If you believe that material on this website infringes your copyright, you may submit a
          written notice when copyright contact details are published on the Contact Us page. Notices
          should be specific enough to identify the copyrighted work and the material at issue.
        </p>
      </Section>

      <Section title="5. Required Information for a Complaint">
        <p>A complete notice should generally include:</p>
        <ol style={{ margin: '0.85rem 0 0', paddingLeft: '1.25rem', listStyleType: 'decimal', listStyleColor: '#2563eb', display: 'grid', gap: '0.45rem', lineHeight: 1.7, color: '#a8b5cc' }}>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the material that is claimed to be infringing or the subject of infringing activity.</li>
          <li>Information reasonably sufficient to locate the material, such as the relevant page URL.</li>
          <li>Information sufficient to contact the complaining party, once a contact method is published.</li>
          <li>A statement that the complaining party has a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information in the notice is accurate.</li>
          <li>A statement, under penalty of perjury where applicable, that the complaining party is authorized to act on behalf of the copyright owner.</li>
          <li>A physical or electronic signature, if required by the applicable process.</li>
        </ol>
      </Section>

      <Section title="6. Identification of Copyrighted Work">
        <p>
          The notice should clearly identify the work claimed to be protected, such as a registered
          work, application, image, text, logo, or other material. If multiple works are involved,
          the notice should identify them with enough detail to allow reasonable review.
        </p>
      </Section>

      <Section title="7. Identification of Allegedly Infringing Material">
        <p>
          The notice should identify the specific page, text, image, file reference, or other
          material on FreeFire Mods that is claimed to be infringing. General complaints without
          specific location information may delay review.
        </p>
      </Section>

      <Section title="8. Good-Faith Declaration">
        <p>
          The complaining party should include a good-faith statement that the disputed use is not
          authorized by the copyright owner, an authorized agent, or applicable law. Submitting a
          knowingly inaccurate notice can create legal risk for the sender.
        </p>
      </Section>

      <Section title="9. Authority Declaration">
        <p>
          The notice should confirm that the sender is the copyright owner or is authorized to act on
          the owner’s behalf. If an agent submits the notice, the notice should identify the owner
          and the basis for authority where appropriate.
        </p>
      </Section>

      <Section title="10. Review and Removal Process">
        <p>
          When a sufficiently detailed notice is received through a published contact method,
          FreeFire Mods may review the material, request clarification, restrict access to the
          material, remove it, or take other appropriate action. Response times and outcomes depend
          on the completeness of the notice and the information available.
        </p>
      </Section>

      <Section title="11. Counter-Notification Process">
        <p>
          If a counter-notification process is implemented and legally applicable, information about
          how to submit a counter-notice will be published with the relevant contact details and
          requirements. No counter-notification procedure is represented as active until those
          details are published.
        </p>
      </Section>

      <Section title="12. Repeat Infringement Handling">
        <p>
          Where appropriate and supported by reliable information, FreeFire Mods may restrict access
          to content or take other measures in response to repeated infringement concerns. Any such
          process should be applied consistently and reviewed for legal suitability before formal
          adoption.
        </p>
      </Section>

      <Section title="13. Policy Updates">
        <p>
          This policy may be updated as contact methods, hosting arrangements, review procedures, or
          legal requirements change. The “Last updated” date reflects the latest published revision.
        </p>
      </Section>
    </PageShell>
  )
}
