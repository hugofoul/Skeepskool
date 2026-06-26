import { Link } from 'react-router-dom'
import { trackConversion, trackEvent } from '../lib/analytics.js'

/**
 * Primary red CTA → turns yellow with royalBlue text on hover.
 * Renders a router Link when `to` is set, an <a> when `href` is set,
 * or a <button> otherwise.
 */
export default function CTAButton({
  to,
  href,
  children,
  className = '',
  type = 'button',
  onClick,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3 text-base font-bold text-white shadow-lg shadow-red/20 transition-all duration-300 hover:bg-yellow hover:text-royalBlue hover:shadow-yellow/30 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2'
  const classes = `${base} ${className}`

  const handleClick = (event) => {
    const target = to || href || 'button'
    const label = typeof children === 'string' ? children : 'cta'

    trackEvent('cta_click', {
      cta_target: target,
      cta_label: label,
    })

    if (
      target === '/reserver' ||
      target === '/book' ||
      target.startsWith('tel:') ||
      target.includes('wa.me')
    ) {
      trackConversion('lead_generated', {
        cta_target: target,
      })
    }

    if (onClick) onClick(event)
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}
