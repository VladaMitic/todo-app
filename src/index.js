
import { setFilters } from './filters';
import { getTodos, createTodo, loadTodos } from './todos';
import { renderTodo } from './views';

// Render initial todos
renderTodo();

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodo();
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        checked: e.target.checked
    })
    renderTodo();
})

// Set up form submission handler
document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.elements.todoText.value.trim();
    if(input.length > 0) {
        createTodo(input);
        e.target.elements.todoText.value = '';
        renderTodo();
    }
})

//Add a watcher for local storage
window.addEventListener('storage', (e) => {
    if(e.key === 'todos') {
        loadTodos();
        renderTodo();
    }
});
