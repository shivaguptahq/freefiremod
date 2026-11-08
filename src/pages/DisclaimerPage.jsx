import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Disclaimer"
      description="Important limitations, third-party rights notices, and safety information for FreeFire Mods."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Disclaimer' }]}
    >
      <LegalNotice>
        This Disclaimer is intended to explain website limitations in plain terms. It does not
        guarantee legal protection, remove mandatory rights under applicable law, or replace advice
        from a qualified lawyer.
      </LegalNotice>

      <Section title="1. Independent Informational Website">
        <p>
          FreeFire Mods is an independent informational website. It is not affiliated with, endorsed
          by, sponsored by, or authorized by Garena or any other game publisher unless a separate
          written authorization is expressly published.
        </p>
      </Section>

      <Section title="2. Trademarks and Third-Party Ownership">
        <p>
          Game names, trademarks, logos, images, product names, and company names referenced on this
          website belong to their respective owners. Their use is intended for identification,
          commentary, compatibility reference, or informational purposes where applicable. FreeFire
          Mods does not claim ownership of third-party applications or brands.
        </p>
      </Section>

      <Section title="3. Accuracy and Availability of Information">
        <p>
          Information published on this website may be incomplete, outdated, region-specific, or
          changed by third parties without notice. Version details, screenshots, compatibility notes,
          and feature descriptions are provided for general information only and should be verified
          with official sources before reliance.
        </p>
      </Section>

      <Section title="4. Original, Authorized, and Unauthorized Software">
        <p>
          Users should understand the difference between original software from an official source,
          software redistributed with proper authorization, and unauthorized modified applications.
          Obtaining an APK from another website does not by itself grant redistribution rights, and a
          modification does not become authorized merely because it is publicly available.
        </p>
        <p>
          FreeFire Mods does not claim that all applications, files, builds, or modifications
          referenced on the site are legally authorized for distribution. Rights holders and official
          publishers control their own licenses, trademarks, and distribution permissions.
        </p>
      </Section>

      <Section title="5. Security and Installation Risks">
        <p>
          Third-party software may contain security risks, including malware, unwanted permissions,
          data collection, unstable behavior, or compatibility problems. Users should prefer official
          distribution channels when available, review permissions carefully, avoid sharing account
          credentials, and use appropriate device security practices.
        </p>
      </Section>

      <Section title="6. Modified Applications and Publisher Policies">
        <p>
          Unofficial modified applications, injectors, cheats, or third-party tools may violate game
          publisher terms, fair-play rules, or applicable laws. Use of such software can lead to
          account restrictions, suspension, or permanent bans. FreeFire Mods does not provide any
          anti-ban guarantee, security guarantee, or promise that unofficial software will work as
          described.
        </p>
      </Section>

      <Section title="7. External Websites">
        <p>
          Links to external websites, app stores, publishers, or resources may be provided for
          convenience. External sites operate independently, and FreeFire Mods is not responsible for
          their content, availability, security, accuracy, or privacy practices.
        </p>
      </Section>

      <Section title="8. No Professional Advice">
        <p>
          Content on this website is not legal advice, security certification, technical support from
          an official publisher, or a guarantee of device compatibility. Users should seek qualified
          professional advice or official publisher guidance when needed.
        </p>
      </Section>
    </PageShell>
  )
}
