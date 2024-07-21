import { Project } from './project.js';
import { Todo } from './todo.js';
import './styles.css';

let projects = [];
let currentProjectIndex = -1;

// Load projects from localStorage
function loadProjects() {
    const projectsData = localStorage.getItem('projects');
    if (!projectsData) return [];
    const parsedProjects = JSON.parse(projectsData);
    return parsedProjects.map(projectData => {
        const project = new Project(projectData.name);
        projectData.todos.forEach(todoData => {
            const todo = new Todo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.notes,
                todoData.checklist
            );
            project.addTodo(todo);
        });
        return project;
    });
}

// Save projects to localStorage
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Project Management
function addProject(name) {
    const project = new Project(name);
    projects.push(project);
    currentProjectIndex = projects.length - 1;
    saveProjects();
    renderProjects();
    renderTodos();
}

function selectProject(index) {
    currentProjectIndex = index;
    renderTodos();
}

// Todo Management
function addTodo(title, description, dueDate, priority) {
    if (currentProjectIndex === -1) return;
    const todo = new Todo(title, description, dueDate, priority);
    projects[currentProjectIndex].addTodo(todo);
    saveProjects();
    renderTodos();
}

function updateTodo(index, title, description, dueDate, priority) {
    if (currentProjectIndex === -1) return;
    const todo = projects[currentProjectIndex].getTodoByIndex(index);
    if (todo) {
        todo.updateTitle(title);
        todo.updateDescription(description);
        todo.setDueDate(dueDate);
        todo.setPriority(priority);
        saveProjects();
        renderTodos();
    }
}

function deleteTodo(index) {
    if (currentProjectIndex === -1) return;
    projects[currentProjectIndex].removeTodo(index);
    saveProjects();
    renderTodos();
}

// Render Functions
function renderProjects() {
    const projectListElement = document.getElementById('project-list');
    projectListElement.innerHTML = '';
    projects.forEach((project, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;
        listItem.onclick = () => selectProject(index);
        projectListElement.appendChild(listItem);
    });
}

function renderTodos() {
    if (currentProjectIndex === -1) return;
    const todosListElement = document.getElementById('todos-list');
    todosListElement.innerHTML = '';
    projects[currentProjectIndex].todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
        listItem.className = todo.priority;
        listItem.onclick = () => deleteTodo(index);  // For example, clicking deletes a todo
        todosListElement.appendChild(listItem);
    });
}

// Ensure DOM content is loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data from localStorage
    projects = loadProjects();
    if (projects.length > 0) {
        currentProjectIndex = 0;
    }
    renderProjects();
    renderTodos();

    // Add event listeners for buttons
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const projectName = prompt('Enter project name:');
        if (projectName) {
            addProject(projectName);
        }
    });

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        const title = prompt('Enter todo title:');
        const description = prompt('Enter todo description:');
        const dueDate = prompt('Enter due date (YYYY-MM-DD):');
        const priority = prompt('Enter priority (high, medium, low):');
        if (title && description && dueDate && priority) {
            addTodo(title, description, dueDate, priority);
        }
    });
});
