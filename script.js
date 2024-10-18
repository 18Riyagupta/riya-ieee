const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

let tasks = [];

// Function to render tasks
const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'checked' : '';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;
        editInput.style.display = 'none';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            if (editInput.style.display === 'none') {
                editInput.style.display = 'inline';
                taskText.style.display = 'none';
                editBtn.textContent = 'Save';
            } else {
                task.text = editInput.value;
                editInput.style.display = 'none';
                taskText.style.display = 'inline';
                editBtn.textContent = 'Edit';
                renderTasks();
            }
        };

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.onchange = () => {
            task.completed = checkBox.checked;
            renderTasks();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        li.appendChild(checkBox);
        li.appendChild(taskText);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
};

// Function to add a task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
};

// Function to search tasks
const searchTasks = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'checked' : '';
        li.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            searchTasks();
        };
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
};

addTaskBtn.onclick = addTask;
searchInput.onkeyup = searchTasks;
