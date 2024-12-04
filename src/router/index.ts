import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TodoList from "@/feature/todos/views/TodoList.vue";
import {useAuthStore} from "@/core/stores/auth.store";
import TodoItemDetails from "@/feature/todos/views/TodoItemDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/todos',
  },
  {
    path: '/todos',
    name: 'TodoList',
    component: TodoList,
    meta: { requiresAuth: true }
  },
  {
    path: '/todos/:id',
    name: 'TodoDetails',
    component: TodoItemDetails,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // const isAuthenticated = !authStore.isAuthenticated;
  const isAuthenticated = true;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
