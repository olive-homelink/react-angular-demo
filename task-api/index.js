const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

let tasks = require('./tasks');

app.use(cors());
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle task completion
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Task API listening at http://localhost:${PORT}`);
});
