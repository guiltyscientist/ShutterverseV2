import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuth } from '../../composables/useAuth'

export async function adminGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    if (!to.path.startsWith('/admin')) {
        return next()
    }

    if (to.path === '/admin/login') {
        const { isAuthenticated } = useAuth()
        return isAuthenticated.value ? next('/admin') : next()
    }

    const { isAuthenticated, refreshAccessToken } = useAuth()

    if (isAuthenticated.value) {
        return next()
    }

    // Page reload: in-memory token is gone but httpOnly cookie may still be valid
    const restored = await refreshAccessToken()
    return restored ? next() : next('/admin/login')
}
