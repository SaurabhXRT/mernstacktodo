import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditTodo from './components/Todo/EditTodo';

const App = () => {
  const { authToken } = useContext(AuthContext);

  return (

    <Router>
      {/* here navbar is for todo name which is fixed for every page and below thatrouting in react is applied for different pages  */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* niche edittodo konsecure kiye hai */}
        {authToken &&
        /*  yaha hm todoitem se aaye hai link wale route ne hmko bheja hai yaha se ab edit todo jayenge */
        <Route path="/edit/:id" element={<EditTodo />} />
        }
      </Routes>
    </Router>
  );
};

export default App;
