import React from 'react';
import { Link } from 'react-router-dom';

const TodoItem = ({ todo, onDelete, onComplete }) => {
    return (
        <li className="mb-4 p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{todo.title}</h3>
            <p className="text-gray-700">{todo.description}</p>
            <p className="text-gray-600">{new Date(todo.dueDate).toLocaleDateString()} {todo.dueTime}</p>
            <button
                onClick={() => onComplete(todo._id)}
                disabled={todo.completed}
                className="mr-2 bg-green-500 text-white py-1 px-2 rounded"
            >
                {todo.completed ? 'Completed' : 'Complete'}
            </button>
            <button
                onClick={() => onDelete(todo._id)}
                className="mr-2 bg-red-500 text-white py-1 px-2 rounded"
            >
                Delete
            </button>
            <Link to={`/edit/${todo._id}`} className="bg-blue-500 text-white py-1 px-2 rounded">
                Edit
            </Link>
        </li>
    );
};

export default TodoItem;
