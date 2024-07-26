import React, { useEffect, useState, useContext } from 'react';
import { getTodos, deleteTodo, completeTodo } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { authToken } = useContext(AuthContext);

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos(authToken);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching to-dos', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [authToken]);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id, authToken);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting to-do', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTodo(id, authToken);
      setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: true } : todo));
    } catch (error) {
      console.error('Error marking to-do as completed', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <CreateTodo fetchTodos={fetchTodos} />
      <ul className="mt-4">
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} onComplete={handleComplete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
