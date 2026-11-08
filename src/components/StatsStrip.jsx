import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    target: 73,
    suffix: 'K+',
    label: 'Downloads',
    icon: 'download',
  },
  {
    target: 4.7,
    suffix: '',
    label: 'User Rating',
    icon: 'star',
    decimals: 1,
  },
  {
    target: 20,
    suffix: '+',
    label: 'Countries',
    icon: 'globe',
  },
]

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function formatValue(value, stat) {
  if (stat.decimals) return value.toFixed(stat.decimals)
  return Math.round(value).toString()
}

function StatIcon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: 'false',
  }
  if (name === 'star') {
    return (
      <svg {...common} fill="#F5B301" stroke="#D99500" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M12 2.75l2.74 5.56c.15.3.43.5.76.55l6.13.89-4.44 4.32a1 1 0 0 0-.29.89l1.05 6.11-5.48-2.88a1 1 0 0 0-.94 0L6.05 21.07l1.05-6.11a1 1 0 0 0-.29-.89L2.37 9.75l6.13-.89a1 1 0 0 0 .76-.55L12 2.75z" />
      </svg>
    )
  }
  if (name === 'globe') {
    return (
      <svg
        {...common}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 11l5 5 5-5" />
      <path d="M12 4v12" />
    </svg>
  )
}

function startValue(stat) {
  return stat.decimals ? (0).toFixed(stat.decimals) : '0'
}

function finalValue(stat) {
  return `${formatValue(stat.target, stat)}${stat.suffix}`
}

export default function StatsStrip() {
  const sectionRef = useRef(null)
  const startedRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState(() => stats.map(startValue))

  useEffect(() => {
    const node = sectionRef.current
    if (!node || startedRef.current) return undefined

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frameId = 0

    const run = () => {
      if (startedRef.current) return
      startedRef.current = true
      setVisible(true)

      if (reduced) {
        setValues(stats.map(finalValue))
        return
      }

      const duration = 1700
      const start = performance.now()

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = easeOutCubic(progress)
        setValues(
          stats.map((stat) => `${formatValue(stat.target * eased, stat)}${stat.suffix}`),
        )
        if (progress < 1) {
          frameId = requestAnimationFrame(tick)
        }
      }

      frameId = requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return () => {
        if (frameId) cancelAnimationFrame(frameId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="stats-section" aria-labelledby="stats-heading">
      <div className="section-inner stats-inner">
        <h2 id="stats-heading" className="sr-only">
          Website information highlights
        </h2>
        <div className={`stats-grid${visible ? ' is-visible' : ''}`}>
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="stat-card"
              style={{ '--delay': `${index * 110}ms` }}
            >
              <div className="stat-top">
                <span className={`stat-icon stat-icon--${stat.icon}`} aria-hidden="true">
                  <StatIcon name={stat.icon} />
                </span>
                <p className="stat-value">{values[index]}</p>
              </div>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
