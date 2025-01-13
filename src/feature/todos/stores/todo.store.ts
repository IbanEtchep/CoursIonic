import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TodoService } from '../services/todo.service'
import { Todo } from "@/feature/todos/model/todo.model";
import { useAuthStore } from '@/core/auth/stores/auth.store'

const todoService = new TodoService()

export const useTodoStore = defineStore('todos', () => {
    const todos = ref<Todo[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchTodos = async () => {
        const authStore = useAuthStore()
        try {
            if (!authStore.user) throw new Error('Utilisateur non connecté')

            todos.value = await todoService.getTodos(authStore.user.id)
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur lors du chargement'
            throw e
        }
    }

    const addTodo = async (title: string) => {
        const authStore = useAuthStore()
        if (!authStore.user) throw new Error('Utilisateur non connecté')

        const newTodo = new Todo(title, authStore.user.id)
        await todoService.saveTodo(newTodo)
        await fetchTodos()
        console.log('Todo ajouté:', newTodo)
    }

    const removeTodo = async (id: number) => {
        const todo = getTodo(id)
        if (todo) {
            await todoService.deleteTodo(todo)
            todos.value = todos.value.filter(t => t.id !== id)
        }
    }

    const toggleTodo = async (id: number) => {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.completed = !todo.completed
            await todoService.saveTodo(todo)
        }
    }

    const getTodo = (id: number): Todo | null => {
        return todos.value.find(todo => todo.id === id) || null
    }

    const updateTodo = async (todo: Todo) => {
        try {
            await todoService.saveTodo(todo)
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Erreur lors de la sauvegarde'
            throw e
        }
    }

    const loadTodos = async () => {
        await fetchTodos()
    }

    return {
        todos,
        isLoading,
        error,
        addTodo,
        removeTodo,
        toggleTodo,
        getTodo,
        saveTodo: updateTodo,
        loadTodos
    }
})
