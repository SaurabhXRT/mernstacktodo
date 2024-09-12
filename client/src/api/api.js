import axios from 'axios';
// varsel yeh url diya hai jaise hm local url define krte the waise 
const API_URL = 'https://mernstacktodo-3lzc.vercel.app/api';
// yah user =data form data hai jo hm login aur register se bhej rhe hai
// app.post ki jgah yaha froent end me axios.post use ho rha hai
// local host/users/register route pe backend kuch krega isss userdata ke sath kya krega token generate krega dekho jake kya ho rha hai

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);

export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

export const getTodos = (token) => axios.get(`${API_URL}/todos`, {
  headers: { Authorization: token }
});

export const createTodo = (todoData, token) => axios.post(`${API_URL}/todos`, todoData, {
  headers: { Authorization: token }
});

export const updateTodo = (id, todoData, token) => axios.put(`${API_URL}/todos/${id}`, todoData, {
  headers: { Authorization: token }
});

export const deleteTodo = (id, token) => axios.delete(`${API_URL}/todos/${id}`, {
  headers: { Authorization: token }
});

export const completeTodo = (id, token) => axios.patch(`${API_URL}/todos/${id}/complete`, {}, {
  headers: { Authorization: token }
});
