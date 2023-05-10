export class TodoItem {
  createTodoItem(todoItemText, isItemActive) {
    const todoItem = this.createNode('div', 'todo-items__column', 'visible');
    todoItem.innerHTML = this.setTodoItemInner(isItemActive, todoItemText);
    return todoItem;
  }
  createNode(tag, ...className) {
    const node = document.createElement(tag);
    if (Array.isArray(className)) {
      className.forEach((item) => {
        node.classList.add(item);
      });
    } else {
      node.classList.add(className);
    }
    return node;
  }
  setTodoItemInner(isItemActive, todoItemText) {
    return `
      <label class="checkbox-container todo-item ${
        isItemActive ? 'todo-item-inactive' : ''
      }">
      <span class="todo-item-text">${todoItemText}</span>
      <input type="checkbox" name="todo-item-1" ${
        isItemActive ? 'checked' : ''
      }>
      <span class="checkmark"></span>
      </label>
      <span class="todo-remove"></span>
    `;
  }
}
export class TodoList extends TodoItem {
  constructor() {
    super();
    this.savedTodos = [];
    this.todoListContainer = document.querySelector('.todo-items');
    this.todoInput = document.querySelector('.todo-input');
    this.todoAddBtn = document.querySelector('.btn-add-todo');
    this.displayTodoList();
  }
  displayTodoList() {
    this.savedTodos = this.getSavedTodos();
    this.savedTodos.forEach((todo) => {
      const todoNode = this.createTodoItem(todo.text, todo.isActive);
      this.todoListContainer.append(todoNode);
    });
    this.savedTodos = [];
  }
  addTodoListItem(event) {
    const input = event.target
      .closest('.todo-add')
      .querySelector('.todo-input');
    if (input.value) {
      this.todoListContainer.append(super.createTodoItem(input.value));
    }
    input.value = '';
    this.saveTodoList();
  }
  saveTodoList() {
    this.savedTodos = [];
    const todoItems = this.todoListContainer.children;
    Array.from(todoItems).forEach((element) => {
      let singleTodo = {};
      singleTodo.text = element.querySelector('.todo-item-text').textContent;
      singleTodo.isActive = element
        .querySelector('.todo-item')
        .classList.contains('todo-item-inactive');
      this.savedTodos.push(singleTodo);
    });
    localStorage.setItem('savedTodos', JSON.stringify(this.savedTodos));
  }
  getSavedTodos() {
    //console.log(localStorage.getItem('savedTodos'));
    return JSON.parse(localStorage.getItem('savedTodos')) || [];
  }
  static isDisplayTodo(displayTodo) {
    const todosContainer = document.querySelector('.todo');
    const todoListContainer = document.querySelector('.todo-container');
    if (todoListContainer.classList.contains('todo-container_active')) {
      todoListContainer.classList.remove('todo-container_active');
    }
    if (displayTodo) {
      todosContainer.style.visibility = 'visible';
    } else {
      todosContainer.style.visibility = 'hidden';
    }
  }
}
