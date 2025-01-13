export class Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    dueDate?: string;
    userId: string;
    createdAt?: string;

    constructor(title: string, userId: string) {
        this.id = Date.now();
        this.title = title;
        this.description = '';
        this.completed = false;
        this.userId = userId;
    }
}