import { supabase } from '@/core/supabase/config';
import { Todo } from '../model/todo.model';

export class TodoService {
    async getTodos(userId: string): Promise<Todo[]> {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        return todos.map((todo: any) => {
            return {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completed: todo.completed,
                dueDate: todo.due_date,
                userId: todo.user_id,
                createdAt: todo.created_at
            };
        });
    }

    async saveTodo(todo: Todo): Promise<Todo> {
        const { data, error } = await supabase
            .from('todos')
            .upsert({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completed: todo.completed,
                due_date: todo.dueDate,
                user_id: todo.userId,
                created_at: todo.createdAt
            })
            .select()
            .single();

        if (error) throw error;

        return data;
    }

    async deleteTodo(todo: Todo): Promise<void> {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', todo.id);

        if (error) throw error;
    }
}
