import { useState, useCallback } from 'react'
import { authApi } from '../api/auth'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (username, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authApi.login({ username, password })
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify({ username: data.username, role: data.role }))
      return true
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
  }, [])

  const isAuthenticated = () => !!localStorage.getItem('admin_token')

  const getUser = () => {
    try { return JSON.parse(localStorage.getItem('admin_user') || 'null') }
    catch { return null }
  }

  return { login, logout, isAuthenticated, getUser, loading, error }
}
