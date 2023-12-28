import { Project } from './project.js';
import { Todo } from './todo.js';
import './styles.css';

let projects = [];
let currentProjectIndex = -1;

// Project Management
function addProject(name) {
    const project = new Project(name);
    projects.push(project);
    currentProjectIndex = projects.length - 1;
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
    renderTodos();
}

function updateTodo(index, title, description, dueDate, priority) {
    if (currentProjectIndex === -1) return;
    const todo = projects[currentProjectIndex].getTodo(index);
    if (todo) {
        todo.updateTitle(title);
        todo.updateDescription(description);
        todo.setDueDate(dueDate);
        todo.setPriority(priority);
        renderTodos();
    }
}

function deleteTodo(index) {
    if (currentProjectIndex === -1) return;
    projects[currentProjectIndex].removeTodo(index);
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
        listItem.onclick = () => deleteTodo(index);  // For example, clicking deletes a todo
        todosListElement.appendChild(listItem);
    });
}

// Example Initialization
addProject('Personal');
addTodo('Grocery Shopping', 'Buy groceries for the week', '2023-01-10', 'High');

document.getElementById('add-project-btn').addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
        addProject(projectName);
    }
});

renderProjects();

// Somewhere in your application
let myProject = new Project("Example Project");
let myTodo = new Todo("Example Todo", "Description", "2023-01-01", "High");
myProject.addTodo(myTodo);

