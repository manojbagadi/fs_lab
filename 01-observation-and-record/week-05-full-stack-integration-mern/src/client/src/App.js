import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    // Simulated initial fetch or backend call
    setTasks([
      { _id: '1', title: 'Complete Lab Week 01 - HTML & CSS', completed: true, priority: 'High' },
      { _id: '2', title: 'Complete Lab Week 02 - ES6 & DOM', completed: true, priority: 'High' },
      { _id: '3', title: 'Complete Lab Week 03 - Node & Express', completed: false, priority: 'Medium' }
    ]);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      _id: Date.now().toString(),
      title,
      priority,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t._id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 Full Stack MERN Task Manager</h1>
        <p>Connected React Frontend to Express & MongoDB Backend</p>
      </header>

      <div className="container">
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Add a new MERN lab task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Add Task</button>
        </form>

        <div className="task-list">
          {tasks.map(task => (
            <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
              <div className="task-content" onClick={() => toggleTask(task._id)}>
                <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <span className="task-title">{task.title}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
