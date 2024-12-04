export class Todo {
    id;
    title;
    description;
    completed;

    constructor(title) {
        this.id = Date.now();
        this.title = title;
        this.description = '';
        this.completed = false;
    }
}