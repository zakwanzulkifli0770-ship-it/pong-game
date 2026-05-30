// DOM Elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalCount = document.getElementById('totalCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');

// Local Storage Key
const STORAGE_KEY = 'todos';

// App State
let todos = [];
let currentFilter = 'all';

// Initialize app
function init() {
    loadTodos();
    setupEventListeners();
    render();
}

// Load todos from local storage
function loadTodos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    todos = stored ? JSON.parse(stored) : [];
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Setup event listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            render();
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);
    clearAllBtn.addEventListener('click', clearAll);
}

// Add a new todo
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.unshift(todo);
    saveTodos();
    todoInput.value = '';
    todoInput.focus();
    render();
}

// Toggle todo completion
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        render();
    }
}

// Delete a todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        render();
    }
}

// Edit a todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const modal = createEditModal(todo);
    document.body.appendChild(modal);
    modal.classList.add('show');

    const input = modal.querySelector('.modal-input');
    input.focus();
    input.select();

    const saveBtn = modal.querySelector('.modal-btn.save');
    const cancelBtn = modal.querySelector('.modal-btn.cancel');

    saveBtn.addEventListener('click', () => {
        const newText = input.value.trim();
        if (newText !== '') {
            todo.text = newText;
            saveTodos();
            render();
        }
        document.body.removeChild(modal);
    });

    cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) cancelBtn.click();
    });
}

// Create edit modal
function createEditModal(todo) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Edit Task</h2>
            <input type="text" class="modal-input" value="${escapeHtml(todo.text)}">
            <div class="modal-buttons">
                <button class="modal-btn save">Save</button>
                <button class="modal-btn cancel">Cancel</button>
            </div>
        </div>
    `;
    return modal;
}

// Clear all completed todos
function clearCompleted() {
    const count = todos.filter(t => t.completed).length;
    if (count === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    if (confirm(`Clear ${count} completed task(s)?`)) {
        todos = todos.filter(t => !t.completed);
        saveTodos();
        render();
    }
}

// Clear all todos
function clearAll() {
    if (todos.length === 0) {
        alert('No tasks to clear!');
        return;
    }
    if (confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
        todos = [];
        saveTodos();
        render();
    }
}

// Filter todos based on current filter
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;

    totalCount.textContent = total;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

// Render todos
function render() {
    updateStats();
    const filtered = getFilteredTodos();
    todoList.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
        filtered.forEach(todo => {
            const li = createTodoElement(todo);
            todoList.appendChild(li);
        });
    }
}

// Create todo element
function createTodoElement(todo) {
    const li = document.createElement('div');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <input 
            type="checkbox" 
            class="checkbox" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodo(${todo.id})"
        >
        <div class="todo-content">
            <div class="todo-text">${escapeHtml(todo.text)}</div>
            <div class="todo-time">${todo.createdAt}</div>
        </div>
        <div class="todo-actions">
            <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
    `;
    return li;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the app on load
window.addEventListener('DOMContentLoaded', init);