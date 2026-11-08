export const apkColors = {
  bg: 'var(--bg-primary, #07152e)',
  cardTop: 'rgba(16, 31, 61, 0.72)',
  cardBottom: 'rgba(11, 25, 51, 0.78)',
  detailCard: 'rgba(16, 31, 61, 0.42)',
  blue: '#2563eb',
  green: '#65f044',
  text: '#f8fafc',
  secondary: '#a8b5cc',
  muted: '#71829f',
  publisher: '#8ea2c7',
  desc: '#c6d2e6',
  border: 'rgba(148, 163, 184, 0.14)',
  borderSoft: 'rgba(148, 163, 184, 0.12)',
  error: '#fecaca',
  disabledBg: 'rgba(148, 163, 184, 0.14)',
  disabledText: '#a8b5cc',
  disabledBorder: 'rgba(148, 163, 184, 0.12)',
}

export function getApkLayout(width) {
  return {
    isTiny: width <= 430,
    isMobile: width <= 768,
    isDesktop: width >= 1024,
  }
}
