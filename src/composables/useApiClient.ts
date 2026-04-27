import axios from 'axios'
import { useAuth } from './useAuth'

const apiClient = axios.create({ withCredentials: true })

apiClient.interceptors.request.use(config => {
    const { accessToken } = useAuth()
    if (accessToken.value) {
        config.headers['Authorization'] = `Bearer ${accessToken.value}`
    }
    return config
})

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const original = error.config
        if (error.response?.status !== 401 || original._retry) {
            return Promise.reject(error)
        }

        original._retry = true

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push((token) => {
                    original.headers['Authorization'] = `Bearer ${token}`
                    resolve(apiClient(original))
                })
            })
        }

        isRefreshing = true
        const { refreshAccessToken, accessToken } = useAuth()
        const success = await refreshAccessToken()
        isRefreshing = false

        if (success && accessToken.value) {
            refreshQueue.forEach(cb => cb(accessToken.value!))
            refreshQueue = []
            original.headers['Authorization'] = `Bearer ${accessToken.value}`
            return apiClient(original)
        }

        refreshQueue = []
        // Import router dynamically to avoid circular dependency
        const { default: router } = await import('../routes/index')
        router.push('/admin/login')
        return Promise.reject(error)
    }
)

export function useApiClient() {
    return { apiClient }
}
