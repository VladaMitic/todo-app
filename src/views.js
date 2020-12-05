import { getFilters } from './filters';
import { getTodos, checkedModify, removeTodo } from './todos';

//render todos list
const renderTodo = () => {
    const { searchText, checked } = getFilters();
    const todos = getTodos();
    const todosListEl = document.querySelector('#todos');
    let filteredTodo = todos.filter((todo) => {
        const filterText = todo.text.toLowerCase().includes(searchText.toLowerCase());
        const filterCompleted = checked ? !todo.completed : true;
        return filterText && filterCompleted;
    });

    todosListEl.innerHTML = '';

    todosListEl.appendChild(generateSummary(filteredTodo));

    if(filteredTodo.length > 0) {
        filteredTodo.forEach((todo) => {
            todosListEl.appendChild(createTodoElements(todo));
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No todos to show';
        emptyMessage.classList.add('empty-message');
        todosListEl.appendChild(emptyMessage);
    }
}

//Create todo DOM element
const createTodoElements = (todo) => {
    //create elements
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkboxEl = document.createElement('input');
    const paragraphEl = document.createElement('span');
    const buttonEl = document.createElement('button');

    //setup checkbox element
    checkboxEl.setAttribute('type', 'checkbox');
    checkboxEl.checked = todo.completed;
    containerEl.appendChild(checkboxEl);
    checkboxEl.addEventListener('change', () => {
        checkedModify(todo.id);
        renderTodo();
    })

    //setup text element
    if(todo.text.length > 0) {
        paragraphEl.textContent = todo.text;
    } else {
        paragraphEl.textContent = 'Unknown task added';
    }
    containerEl.appendChild(paragraphEl);

    //setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    //setup button element
    buttonEl.textContent = 'remove';
    buttonEl.classList.add('button', 'button--text')
    todoEl.appendChild(buttonEl);
    buttonEl.addEventListener('click', () => {
        removeTodo(todo.id);
        renderTodo();
    })
    return todoEl;
}

// render summary
const generateSummary = (filteredTodo) => {
    const incompletedTodos = filteredTodo.filter((todo) => !todo.completed);
    const thingsToDoElement = document.createElement('h2');
    thingsToDoElement.classList.add('list-title');
    thingsToDoElement.textContent = `You have ${incompletedTodos.length} ${incompletedTodos.length === 1? 'todo' : 'todos'} left!!!`;
    return thingsToDoElement;
}

export { renderTodo };