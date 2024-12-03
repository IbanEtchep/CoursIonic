import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import TodoList from "@/feature/todos/views/TodoList.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
