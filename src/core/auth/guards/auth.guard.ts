import { useAuthStore } from '@/core/auth/stores/auth.store';
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

export const authGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    await authStore.checkAuth();

    console.log('Route requires auth:', to.meta.requiresAuth || false);
    console.log('User is authenticated:', authStore.isAuthenticated);

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.log("guard auth not authenticated");
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        console.log("guard next " + authStore.isAuthenticated);
        next();
    }
};