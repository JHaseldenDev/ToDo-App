import { Todo } from './todo.js';

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = []; // Array of Todo instances
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

    getTodoByIndex(index) {
        if (index >= 0 && index < this.todos.length) {
            return this.todos[index];
        }
        return null;
    }

    getTodoByTitle(title) {
        return this.todos.find(todo => todo.title === title) || null;
    }

    updateTodoTitle(index, newTitle) {
        const todo = this.getTodoByIndex(index);
        if (todo) {
            todo.updateTitle(newTitle);
        }
    }

    toggleTodoCompletion(index) {
        const todo = this.getTodoByIndex(index);
        if (todo) {
            todo.toggleChecklistItem(0); // Assuming the first item indicates overall completion
        }
    }
}
