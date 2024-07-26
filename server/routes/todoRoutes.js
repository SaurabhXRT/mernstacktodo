const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const User = require('../models/User');
const authMiddleware = require("../middlewares/auth");

const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate, dueTime } = req.body;

  try {
    const todo = new Todo({
      title,
      description,
      dueDate,
      dueTime,
      completed: false
    });

    const user = await User.findById(req.userId);
    user.todos.push(todo);
    await todo.save();
    await user.save();

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating to-do', error });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('todos');
    res.json(user.todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching to-dos', error });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, dueTime, completed } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.dueDate = dueDate || todo.dueDate;
    todo.dueTime = dueTime || todo.dueTime;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating to-do', error });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }

    await todo.remove();
    res.json({ message: 'To-do deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting to-do', error });
  }
});

router.patch('/:id/complete', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'To-do not found' });
    }

    todo.completed = true;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error marking to-do as completed', error });
  }
});

module.exports = router;
