import {Todo} from "@/types/todo";

export class TodoService {
    private STORAGE_KEY = 'todos'

    getTodos(): Todo[] {
        const todos = localStorage.getItem(this.STORAGE_KEY)
        return todos ? JSON.parse(todos) : []
    }

    saveTodos(todos: Todo[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
    }
}
