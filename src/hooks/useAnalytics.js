import { useEffect, useCallback, useRef } from 'react'
import { analyticsApi } from '../api/analytics'

const SESSION_KEY = 'portfolio_session'

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export function useAnalytics() {
  const sessionId = useRef(getSessionId())
  const pageStartTime = useRef(Date.now())

  const track = useCallback((eventType, extra = {}) => {
    analyticsApi.track({
      eventType,
      sessionId: sessionId.current,
      referrer: document.referrer || null,
      ...extra,
    })
  }, [])

  const trackPage = useCallback((page) => {
    pageStartTime.current = Date.now()
    track('page_view', { page })
  }, [track])

  const trackPageLeave = useCallback((page) => {
    const duration = Math.round((Date.now() - pageStartTime.current) / 1000)
    track('page_leave', { page, durationSeconds: duration })
  }, [track])

  const trackClick = useCallback((resourceId, page) => {
    track('click', { resourceId, page })
  }, [track])

  return { track, trackPage, trackPageLeave, trackClick }
}

export function usePageTracking(pageId) {
  const { trackPage, trackPageLeave } = useAnalytics()

  useEffect(() => {
    trackPage(pageId)
    return () => trackPageLeave(pageId)
  }, [pageId, trackPage, trackPageLeave])
}
