import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = [];

//Get data from local storage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos');
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        todos = [];
    }
}

//Save todo in local storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}


//expose todos arrey
const getTodos = () => todos;

// createTodo
const createTodo = (input) => {
    todos.push({
        id: uuidv4(),
        text: input,
        completed: false
    });
    saveTodos();
}

//remove todo form list by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1);
        saveTodos();
    }
}

//Modify data on check box change
const checkedModify = (id) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
    }
}

loadTodos()

export { getTodos, createTodo, removeTodo, checkedModify, loadTodos }
