const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB database');
});

// define schema for to-do items
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: Boolean,
  index: Number
});

const Todo = mongoose.model('Todo', todoSchema);

app.get("/", (req, res) =>{
    res.send("server is running");
});

// API routes
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/todos', async (req, res) => {
  const { title, description } = req.body;
  const todo = new Todo({
    title,
    description,
    isCompleted: false,
    index: 0
  });
  try {
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted, index } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).send('Todo not found');
    todo.title = title;
    todo.description = description;
    todo.isCompleted = isCompleted;
    todo.index = index;
    await todo.save();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


//thankyou