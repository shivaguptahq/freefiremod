import { CheckCircleIcon } from './Icons.jsx'

export default function FeatureList({ items }) {
  return (
    <ul className="feature-list" aria-label="APK listing highlights">
      {items.map((item) => (
        <li key={item} className="feature-item">
          <CheckCircleIcon className="feature-icon" size={20} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
