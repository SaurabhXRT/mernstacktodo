import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newTodos = [...todos];
    const [removed] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, removed);
    await Promise.all(newTodos.map((todo, index) =>
      axios.put(`http://127.0.0.1:5000/api/todos/${todo._id}`, { ...todo, index })
    ));
    setTodos(newTodos);
  }

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoTitle) return;
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/todos', {
        title: newTodoTitle,
        description: newTodoDescription
      });
      setTodos([...todos, res.data]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    } catch (err) {
      console.error(err);
    }
  }
  const handleTodoDescriptionChange = (e, todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t._id === todo._id);
    newTodos[index].description = e.target.value;
    setTodos(newTodos);
  }

  const handleTodoCompletedToggle = async (e, todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(t => t._id === todo._id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    try {
      await axios.put(`http://127.0.0.1:5000/api/todos/${todo._id}`, newTodos[index]);
      setTodos(newTodos);
    } catch (err) {
      console.error(err);
    }
  }

  const handleTodoDelete = async (todo) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/todos/${todo._id}`);
      const newTodos = todos.filter(t => t._id !== todo._id);
      setTodos(newTodos);
    } catch (err) {
      console.error(err);
    }
  }

  return (
   
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
  <h1 className="text-3xl font-bold my-6">To-Do List</h1>
  <form className="flex flex-col items-start w-full max-w-lg px-4 py-2 bg-white shadow-md rounded-lg" onSubmit={handleNewTodoSubmit}>
    <label className="block font-semibold mb-2" htmlFor="newTodoTitle">Title:</label>
    <input className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500" type="text" id="newTodoTitle" value={newTodoTitle} onChange={(e) => setNewTodoTitle(e.target.value)} />
    <label className="block font-semibold mb-2" htmlFor="newTodoDescription">Description:</label>
    <input className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500" type="text" id="newTodoDescription" value={newTodoDescription} onChange={(e) => setNewTodoDescription(e.target.value)} />
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200" type="submit">Add New Todo</button>
  </form>
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId="todos">
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef} className="w-full max-w-lg mt-6">
          {todos.map((todo, index) => (
            <Draggable key={todo._id} draggableId={todo._id} index={index}>
              {(provided) => (
                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={todo.isCompleted} onChange={(e) => handleTodoCompletedToggle(e, todo)} />
                      
                      <span className={todo.isCompleted ? "line-through text-gray-500" : ""}>{todo.title}</span>
                    </label>
                    <button className="line-through px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200" onClick={() => handleTodoDelete(todo)}>Delete</button>
                  </div>
                  <div>
                    <textarea className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" value={todo.description} onChange={(e) => handleTodoDescriptionChange(e, todo)} />
                  </div>
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  </DragDropContext>
</div>

  );
}
export default App;
