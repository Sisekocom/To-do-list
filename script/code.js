document.addEventListener('DOMContentLoaded', function () {
    displayItems();
});

function addItem() {
    const itemInput = document.getElementById('todoInput');
    const itemName = itemInput.value.trim();

    if (itemName === '' || itemName.length <= 3) {
        alert('Invalid input. Please enter a valid item name.');
        return;
    }

    const newItem = {
        id: generateUniqueId(),
        name: capitalizeFirstLetter(itemName),
        createdDate: new Date().toLocaleString(),
        completed: false,
    };

    let todoList = getTodoList();
    todoList.push(newItem);
    saveTodoList(todoList);
    displayItems();
    itemInput.value = '';
}

function sortItems() {
    let todoList = getTodoList();
    todoList.sort((a, b) => a.name.localeCompare(b.name));
    saveTodoList(todoList);
    displayItems();
}

function displayItems() {
    let todoList = getTodoList();
    let todoListContainer = document.getElementById('todoList');
    todoListContainer.innerHTML = '';

    if (todoList.length === 0) {
        todoListContainer.innerHTML = '<p>No tasks yet.</p>';
    } else {
        todoList.forEach(item => {
            let itemElement = document.createElement('li');
            itemElement.classList.add('todo-item');
            if (item.completed) {
                itemElement.classList.add('completed');
            }
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <input type="checkbox" onchange="toggleCompletion('${item.id}')" ${item.completed ? 'checked' : ''}>
                <span class="delete-btn" onclick="removeItem('${item.id}')">&#10006;</span>
            `;
            todoListContainer.appendChild(itemElement);
        });
    }
}

function toggleCompletion(itemId) {
    let todoList = getTodoList();
    const updatedList = todoList.map(item => {
        if (item.id === itemId) {
            item.completed = !item.completed;
        }
        return item;
    });
    saveTodoList(updatedList);
    displayItems();
}

function removeItem(itemId) {
    let todoList = getTodoList();
    const updatedList = todoList.filter(item => item.id !== itemId);
    saveTodoList(updatedList);
    displayItems();
}

function getTodoList() {
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : [];
}

function saveTodoList(todoList) {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}