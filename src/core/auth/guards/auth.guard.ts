import { useAuthStore } from '@/core/auth/stores/auth.store';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    await authStore.checkAuth();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
};