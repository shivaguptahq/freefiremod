import { Link } from 'react-router-dom'

export default function Button({
  as: Component,
  href,
  to,
  children,
  className = '',
  icon,
  onClick,
  type,
  ...props
}) {
  const classes = `btn ${className}`.trim()
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="btn-icon" aria-hidden="true">{icon}</span> : null}
    </>
  )

  if (Component === 'button' || (!Component && !href && !to && type)) {
    return (
      <button type={type ?? 'button'} className={classes} onClick={onClick} {...props}>
        {content}
      </button>
    )
  }

  if (to || Component === Link) {
    return (
      <Link to={to ?? href ?? '/'} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href ?? '#apk-store'} className={classes} onClick={onClick} {...props}>
      {content}
    </a>
  )
}
