const rows = [
  [
    { label: 'Free Fire MOD APK', icon: 'download' },
    { label: 'Free Fire MAX MOD', icon: 'spark' },
    { label: 'Free Fire Hack', icon: 'tool' },
    { label: 'Aimbot Hack', icon: 'game' },
    { label: 'Auto Headshot', icon: 'check' },
    { label: 'Headshot Hack', icon: 'gauge' },
    { label: 'Auto Aim', icon: 'game' },
    { label: 'Aim Assist', icon: 'cpu' },
    { label: 'ESP Hack', icon: 'info' },
    { label: 'Enemy Location', icon: 'users' },
  ],
  [
    { label: 'Wallhack', icon: 'shield' },
    { label: 'Unlimited Diamonds', icon: 'spark' },
    { label: 'Diamond Generator', icon: 'spark' },
    { label: 'Free Fire Skin Unlock', icon: 'image' },
    { label: 'All Skin Unlock', icon: 'image' },
    { label: 'Premium Skin MOD', icon: 'image' },
    { label: 'Character Unlock', icon: 'users' },
    { label: 'Weapon Skin MOD', icon: 'tool' },
    { label: 'No Recoil Hack', icon: 'gauge' },
    { label: 'Auto Fire', icon: 'gauge' },
  ],
  [
    { label: 'Magic Bullet', icon: 'spark' },
    { label: 'Damage Hack', icon: 'tool' },
    { label: 'Speed Hack', icon: 'gauge' },
    { label: 'Flying Hack', icon: 'game' },
    { label: 'Invisible Hack', icon: 'lock' },
    { label: 'Free Fire Injector', icon: 'tool' },
    { label: 'MOD Menu', icon: 'file' },
    { label: 'Free Fire Cheats', icon: 'info' },
    { label: 'Free Fire Tools', icon: 'tool' },
    { label: 'Free Fire APK Download', icon: 'download' },
  ],
  [
    { label: 'Free Fire MAX Hack', icon: 'spark' },
    { label: 'Headshot Settings', icon: 'cpu' },
    { label: 'Sensitivity Settings', icon: 'cpu' },
    { label: 'Free Fire Config', icon: 'file' },
    { label: 'Pro Player Settings', icon: 'users' },
    { label: 'Auto Headshot APK', icon: 'download' },
    { label: 'Free Fire MOD Features', icon: 'info' },
    { label: 'Gaming APK', icon: 'device' },
    { label: 'Latest MOD Version', icon: 'history' },
    { label: 'Android MOD APK', icon: 'device' },
  ],
  [
    { label: 'Free Fire Update', icon: 'bell' },
    { label: 'Free Fire Resources', icon: 'file' },
    { label: 'Free Fire Gameplay', icon: 'game' },
    { label: 'Free Fire Tricks', icon: 'spark' },
    { label: 'Free Fire Tips', icon: 'help' },
    { label: 'Free Fire Installation', icon: 'download' },
    { label: 'Free Fire Version', icon: 'history' },
    { label: 'Free Fire Compatibility', icon: 'check' },
    { label: 'Gaming MOD Collection', icon: 'book' },
    { label: 'Free Fire Guide', icon: 'book' },
  ],
]

function PillIcon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false',
  }
  switch (name) {
    case 'download':
      return <svg {...common}><path d="M12 15V3" /><path d="m7 10 5 5 5-5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>
    case 'device':
      return <svg {...common}><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
    case 'book':
      return <svg {...common}><path d="M12 7v14" /><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" /></svg>
    case 'history':
      return <svg {...common}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>
    case 'image':
      return <svg {...common}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
    case 'cpu':
      return <svg {...common}><rect width="16" height="16" x="4" y="4" rx="2" /><rect width="6" height="6" x="9" y="9" rx="1" /><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" /></svg>
    case 'file':
      return <svg {...common}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
    case 'gauge':
      return <svg {...common}><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
    case 'bell':
      return <svg {...common}><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg>
    case 'users':
      return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    case 'spark':
      return <svg {...common}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
    case 'help':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
    case 'shield':
      return <svg {...common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
    case 'check':
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
    case 'lock':
      return <svg {...common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    case 'game':
      return <svg {...common}><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" /></svg>
    case 'tool':
      return <svg {...common}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" /></svg>
    case 'info':
    default:
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
  }
}

function MarqueeRow({ items, reverse, duration }) {
  const loop = [...items, ...items]
  return (
    <div className="marquee-row" data-reverse={reverse ? 'true' : 'false'}>
      <div className="marquee-track" style={{ '--duration': duration }}>
        {loop.map((item, i) => (
          <span key={`${item.label}-${i}`} className="feature-pill" aria-hidden={i >= items.length}>
            <span className="pill-icon">
              <PillIcon name={item.icon} />
            </span>
            <span>{item.label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FeatureMarquee() {
  const durations = ['34s', '28s', '36s', '30s', '38s']
  return (
    <section id="apk-store" className="marquee-section" aria-labelledby="marquee-heading">
      <div className="section-inner marquee-inner">
        <div className="section-head">
          <h2 id="marquee-heading" className="section-title">
            EXPLORE THE FEATURES
          </h2>
          <p className="section-desc">
            Discover gaming information, compatibility details and the latest updates.
          </p>
        </div>
        <div className="marquee-stack">
          {rows.map((items, i) => (
            <MarqueeRow key={i} items={items} reverse={i % 2 === 1} duration={durations[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
