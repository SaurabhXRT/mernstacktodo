import React from 'react';
import TodoList from '../components/Todo/TodoList';

const TodoPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
      <TodoList />
    </div>
  );
};

export default TodoPage;
