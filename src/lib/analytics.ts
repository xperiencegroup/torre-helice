declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export const setAnalyticsUser = (userId: string | null, displayName?: string | null) => {
  if (typeof window.gtag !== 'function') return
  window.gtag('set', 'user_properties', {
    user_id: userId ?? undefined,
    display_name: displayName ?? undefined,
  })
}