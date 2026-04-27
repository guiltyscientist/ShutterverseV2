import { ref, computed } from 'vue'
import axios from 'axios'

// Module-level singleton — survives component unmount, gone on page reload (by design)
const accessToken = ref<string | null>(null)

export function useAuth() {
    const isAuthenticated = computed(() => accessToken.value !== null)

    async function login(username: string, password: string): Promise<void> {
        const { data } = await axios.post('/api/auth/login', { username, password }, {
            withCredentials: true
        })
        accessToken.value = data.accessToken
    }

    async function logout(): Promise<void> {
        await axios.post('/api/auth/logout', {}, { withCredentials: true }).catch(() => {})
        accessToken.value = null
    }

    async function refreshAccessToken(): Promise<boolean> {
        try {
            const { data } = await axios.post('/api/auth/refresh', {}, {
                withCredentials: true
            })
            accessToken.value = data.accessToken
            return true
        } catch {
            accessToken.value = null
            return false
        }
    }

    return { accessToken, isAuthenticated, login, logout, refreshAccessToken }
}
