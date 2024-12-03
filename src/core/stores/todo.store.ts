import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '../models/todo.model'
import { TodoService } from '../services/todo.service'

const todoService = new TodoService()

export const useTodoStore = defineStore('todos', () => {
    const todos = ref<Todo[]>([])

    const addTodo = (title: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            title,
            completed: false
        }
        todos.value.push(newTodo)
        saveTodos()
    }

    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id)
        saveTodos()
    }

    const toggleTodo = (id: number) => {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveTodos()
        }
    }

    const saveTodos = () => {
        todoService.saveTodos(todos.value)
    }

    const loadTodos = () => {
        todos.value = todoService.getTodos()
    }

    loadTodos()

    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodo
    }
})
