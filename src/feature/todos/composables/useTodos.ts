import { ref } from 'vue'
import type { Todo } from '@/types/todo'

export function useTodos() {
    const todos = ref<Todo[]>([
        { id: 1, title: 'test 1' },
        { id: 2, title: 'blablablaz', completed: true },
        { id: 3, title: 'dzdzdzdzdzd' }
    ])
    const newTodo = ref('')

    const addTodo = () => {
        if (newTodo.value.trim()) {
            todos.value.push({
                id: Date.now(),
                title: newTodo.value.trim(),
                completed: false
            })
            newTodo.value = ''
        }
    }

    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
    }

    const toggleTodo = (id: number) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
        }
    }

    return {
        todos,
        newTodo,
        addTodo,
        removeTodo,
        toggleTodo
    }
}