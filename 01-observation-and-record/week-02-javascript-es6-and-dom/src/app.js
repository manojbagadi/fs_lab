// 1. Live Digital Clock using setInterval
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = new Date().toLocaleTimeString();
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. ES6 Class for Student Profile
class Student {
    constructor(name, rollNo, department, cgpa) {
        this.name = name;
        this.rollNo = rollNo;
        this.department = department;
        this.cgpa = cgpa;
    }

    getGradeStatus() {
        const score = parseFloat(this.cgpa);
        if (score >= 9.0) return 'Outstanding (O)';
        if (score >= 8.0) return 'Excellent (A+)';
        if (score >= 7.0) return 'Very Good (A)';
        return 'Good (B)';
    }
}

// 3. Event Listener for Student Profile Generation
document.getElementById('generateBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const roll = document.getElementById('roll').value.trim();
    const dept = document.getElementById('dept').value.trim();
    const cgpa = document.getElementById('cgpa').value.trim();

    if (!name || !roll || !dept || !cgpa) {
        alert('Please fill out all student fields.');
        return;
    }

    const student = new Student(name, roll, dept, cgpa);
    const container = document.getElementById('profileContainer');

    container.innerHTML = `
        <div class="card">
            <h3>${student.name}</h3>
            <p><strong>Roll No:</strong> ${student.rollNo}</p>
            <p><strong>Department:</strong> ${student.department}</p>
            <p><strong>CGPA:</strong> ${student.cgpa} (${student.getGradeStatus()})</p>
        </div>
    `;
});

// 4. Dynamic Task Management with DOM Manipulation
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const taskItem = document.createElement('div');
    taskItem.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = taskText;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => {
        taskItem.classList.toggle('done');
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-del';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(span);
    taskItem.appendChild(delBtn);
    taskList.appendChild(taskItem);

    taskInput.value = '';
});
