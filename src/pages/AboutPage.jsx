import PageShell, { LegalNotice, Section } from '../components/PageShell.jsx'

export default function AboutPage() {
  return (
    <PageShell
      title="About Us"
      description="Information about FreeFire Mods, our purpose, and the limits of the material published on this website."
      updated="November 8, 2026"
      breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
    >
      <LegalNotice>
        FreeFire Mods is an independent informational website. It is not affiliated with, endorsed
        by, sponsored by, or authorized by Garena or any other game publisher unless a separate
        written authorization is expressly published.
      </LegalNotice>

      <Section title="1. What FreeFire Mods Is">
        <p>
          FreeFire Mods is an informational platform focused on gaming APK-related topics. The
          website is designed to help visitors understand publicly discussed application
          information, version details, compatibility considerations, update notes, and general
          mobile gaming resources. Content may be presented for research, comparison, or general
          awareness purposes.
        </p>
        <p>
          The name “FreeFire Mods” describes the subject matter discussed on the site and should
          not be interpreted as a claim that the site owns, operates, or officially represents
          Free Fire, Free Fire MAX, Garena, or any third-party developer.
        </p>
      </Section>

      <Section title="2. Purpose of the Website">
        <p>
          The purpose of this website is to organize information in a clear format for users who
          are researching mobile game builds, installation topics, compatibility requirements, or
          general security concerns. Where appropriate, the site may summarize version information,
          device requirements, update timing, screenshots, and feature descriptions that are
          publicly relevant to users.
        </p>
        <p>
          The website is not intended to encourage unlawful copying, unauthorized redistribution,
          cheating, account abuse, or violations of a game publisher’s terms of service. Users are
          responsible for evaluating whether any software or source they choose to use is lawful,
          safe, compatible, and permitted by the applicable publisher.
        </p>
      </Section>

      <Section title="3. Information Users Can Find">
        <ul style={{ margin: '0.85rem 0 0', paddingLeft: '1.25rem', listStyleType: 'disc', listStyleColor: '#65f044', display: 'grid', gap: '0.45rem', lineHeight: 1.7, color: '#a8b5cc' }}>
          <li>APK and app version information when available.</li>
          <li>General compatibility and device requirement guidance.</li>
          <li>Installation and troubleshooting information.</li>
          <li>Update and release-related summaries.</li>
          <li>Security awareness notes and responsible-use reminders.</li>
          <li>Links or references to relevant informational pages.</li>
        </ul>
        <p>
          Availability of specific information depends on the material being reviewed and the
          accuracy of third-party sources at the time of publication. Some pages may be updated,
          revised, or removed as information changes.
        </p>
      </Section>

      <Section title="4. APK Version and Compatibility Information">
        <p>
          Version numbers, file details, supported Android versions, storage requirements, and
          compatibility notes are provided for informational purposes only. They may differ by
          region, device model, operating system version, app store listing, or publisher update.
          Users should confirm current details with official sources before installing or relying on
          any application.
        </p>
        <p>
          A listing or mention of a build does not guarantee that it will install correctly, work
          on every device, remain available, or be safe to use.
        </p>
      </Section>

      <Section title="5. Gaming Resources and Website Limitations">
        <p>
          FreeFire Mods may publish guides, feature summaries, compatibility notes, screenshots, or
          general gaming resources. These materials are provided on an informational basis and may
          not reflect the latest official release or policy. The website does not provide legal
          advice, security certification, account recovery services, or official technical support
          for third-party games.
        </p>
        <p>
          Any statistics, ratings, compatibility labels, or feature descriptions shown on the
          website should be understood as supplied display information unless clearly identified as
          verified. Public-facing claims should be reviewed and supported by reliable evidence
          before being treated as factual assertions.
        </p>
      </Section>

      <Section title="6. Independent Status and Third-Party Rights">
        <p>
          FreeFire Mods does not claim ownership of Free Fire, Free Fire MAX, Garena trademarks,
          game assets, or other third-party applications unless expressly stated. All trademarks,
          logos, product names, company names, and brand references belong to their respective
          owners and are used for identification or informational reference where applicable.
        </p>
        <p>
          If a rights holder believes that material published on this website raises a copyright or
          trademark concern, they should use the process described on the DMCA / Copyright Policy
          page once contact details are published.
        </p>
      </Section>
    </PageShell>
  )
}
