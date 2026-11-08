import { useState } from 'react'

const faqs = [
  {
    q: 'What is Free Fire MAX?',
    a: "Free Fire MAX is an enhanced version of Garena's Free Fire experience, featuring improved visual quality and gameplay presentation. Availability and compatibility depend on the official release and supported device.",
  },
  {
    q: 'Is Free Fire MAX available on Android?',
    a: 'Yes. Availability depends on your region and supported Android device. Check the official Google Play Store listing for current compatibility and installation information.',
  },
  {
    q: 'What is a modified Free Fire APK?',
    a: 'A modified APK is an altered version of the original application. Unofficial modifications may violate game policies, contain harmful code or create account security risks.',
  },
  {
    q: 'Can using a modified APK get my account banned?',
    a: 'Yes. Garena prohibits unauthorized modified clients and third-party cheating tools. Using them can result in account suspension or permanent bans.',
  },
  {
    q: 'Are Free Fire diamond generator websites real?',
    a: 'Be cautious. Websites promising unlimited free diamonds often use misleading offers or attempt to collect personal information. Use official Garena channels for purchases and promotions.',
  },
  {
    q: 'Can I use aimbot or headshot hacks safely?',
    a: 'There is no guaranteed safe way to use unauthorized cheating tools. Such tools violate fair-play policies and can result in permanent account suspension.',
  },
  {
    q: 'How can I check whether an APK is safe?',
    a: 'Prefer official app stores and trusted publishers. Avoid unknown APK files, never share your account password, and scan files before installation. A scan alone cannot guarantee that an application is safe.',
  },
  {
    q: 'How do I check the latest Free Fire MAX version?',
    a: 'Check the official Google Play Store listing or Garena announcements for the latest available release in your region.',
  },
  {
    q: 'Why is an APK not installing on my Android phone?',
    a: 'Possible reasons include incompatible Android versions, insufficient storage, corrupted downloads or package conflicts. Check the device requirements and use official installation sources.',
  },
  {
    q: 'Is Free Fire MAX officially affiliated with this website?',
    a: 'No. This website is an independent informational resource and is not affiliated with, endorsed by or sponsored by Garena. All trademarks belong to their respective owners.',
  },
]

function ChevronIcon({ open }) {
  return (
    <svg
      className={`faq-chevron${open ? ' is-open' : ''}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="section-inner faq-inner">
        <div className="faq-layout">
          <div className="faq-intro">
            <h2 id="faq-heading" className="faq-title">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="faq-list">
            {faqs.map((item, index) => {
              const open = openIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`
              return (
                <article key={item.q} className={`faq-item${open ? ' is-open' : ''}`}>
                  <h3 className="faq-question">
                    <button
                      id={buttonId}
                      type="button"
                      className="faq-trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      <span>{item.q}</span>
                      <ChevronIcon open={open} />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-panel"
                    hidden={!open}
                  >
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
