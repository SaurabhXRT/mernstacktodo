import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { updateTodo, getTodos } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';

const EditTodo = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const { data } = await getTodos(authToken); 
                const todoToEdit = data.find((todo) => todo._id === id); 
                if (todoToEdit) {
                    setFormData({
                        title: todoToEdit.title,
                        description: todoToEdit.description,
                        dueDate: todoToEdit.dueDate.split('T')[0], 
                        dueTime: todoToEdit.dueTime,
                    });
                }
            } catch (error) {
                console.error('Error fetching todo', error);
            }
        };
        fetchTodo();
    }, [id, authToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTodo(id, formData, authToken);
            navigate('/'); 
        } catch (error) {
            console.error('Error updating todo', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Edit To-Do</h2>
            <form onSubmit={handleSubmit}>
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
                    Update To-Do
                </button>
            </form>
        </div>
    );
};

export default EditTodo;
