import { Todo } from './todo.js';

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = []; // Array of Todo instances
        console.log(Todo);
    }

    addTodo(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo);
        }
    }

    removeTodo(todoIndex) {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos.splice(todoIndex, 1);
        }
    }

    getTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            return this.todos[index];
        }
        return null;
    }

    

    // Additional methods for project management can be added.
}
