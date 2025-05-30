import { useState } from 'react';
import type { Task } from './types';
import TaskInput from './components/TaskInput';
import './index.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title, completed: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
          <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
      alt="React Logo"
      className="logo"
      width="64"
      height="64"
    />
      <h1>Task Tracker</h1>
      <TaskInput onAdd={addTask} />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              className={`task-text ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.title}
            </span>
            <div className="task-buttons">
              <button onClick={() => toggleComplete(task.id)}>✓</button>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
