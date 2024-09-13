import React, { useState, useContext } from 'react';
import { createTodo } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const CreateTodo = ({ fetchTodos }) => {
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '', dueTime: '' });
  const { authToken } = useContext(AuthContext);
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create todo yaha in sab data jo form data ke andr hai usko backend me bhej rhe hai save krne ke liye with token
      await createTodo(formData, authToken);
      setFormData({ title: '', description: '', dueDate: '', dueTime: '' });
      // fetch yeh sab data ko backend se fe me la ke todos me store kr de rha hai josko map krke apn sjhow kr rhe hai ui me jo ki todolist  ke andr define hai
       await fetchTodos();
    } catch (error) {
      console.error('Error creating to-do', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Due Time</label>
        <input
          type="time"
          name="dueTime"
          value={formData.dueTime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Create To-Do
      </button>
    </form>
  );
};

export default CreateTodo;