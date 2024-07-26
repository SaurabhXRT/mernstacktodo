const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require("./database/db");
db();

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.get("/", (req, res) =>{
    res.send("server is running");
});


// start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



