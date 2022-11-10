var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

var removeSVG = '<i class="fa-light fa-eraser"></i>';
var completeSVG = '<i class="fa-solid fa-check"></i>';

renderTodoList();

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addItem(value);
    }
});

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    dataObjectUpdated();

}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) {
        return;
    }

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;
    // console.log(item,"ITem");
    // console.log(parent,"Parent");
    // console.log(id,"ID");
    // console.log(value,"Value");
    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function addItemToDOM(text, completed) {
    // console.log(completed,"sdfghj");
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;
    // console.log(item.innerText);

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    // console.log(remove);
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    // console.log(remove.innerHTML);

    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    complete.addEventListener('click', completeItem);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

