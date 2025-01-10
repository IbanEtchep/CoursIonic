import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TodoList from "@/feature/todos/views/TodoList.vue";
import TodoItemDetails from "@/feature/todos/views/TodoItemDetails.vue";
import {authGuard} from "@/core/auth/guards/auth.guard";
import LoginView from "@/core/auth/views/LoginView.vue";
import RegisterView from "@/core/auth/views/RegisterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/todos',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
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

router.beforeEach(authGuard)

export default router
