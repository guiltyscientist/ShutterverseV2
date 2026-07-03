import axios from 'axios'

export interface AuthUser {
  username: string
  email: string
  role: 'admin' | 'editor'
}

let accessToken = $state<string | null>(null)
let currentUser = $state<AuthUser | null>(null)

export const auth = {
  get isAuthenticated() { return accessToken !== null },
  get user() { return currentUser },
  getToken() { return accessToken },

  async login(username: string, password: string): Promise<void> {
    const { data } = await axios.post('/api/auth/login', { username, password }, { withCredentials: true })
    accessToken = data.accessToken
    currentUser = data.user ?? null
  },

  async logout(): Promise<void> {
    await axios.post('/api/auth/logout', {}, { withCredentials: true }).catch(() => {})
    accessToken = null
    currentUser = null
  },

  async refreshToken(): Promise<boolean> {
    try {
      const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true })
      accessToken = data.accessToken
      currentUser = data.user ?? null
      return true
    } catch {
      accessToken = null
      currentUser = null
      return false
    }
  },
}
